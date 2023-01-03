// Якщо є параметр то це буде не просто декоратор то це буде фабрична функція яка повертає декоратор
// Якщо вона нічого не повертає то значить вона не замінює конструктор, а просто робить якісь зміни
// Object.freeze() vs Object.seal() vs Object.preventExtensions() дозволяють модифікувати наш об'єкт (або його запукувати або заморозити або заборонити додавання нових властивостей)
// фабрична функція має параметри і повертає декоратор
export function sealed(param: string) { // пишемо фабричну функцію, ТС автоматично виведе тип значення яке повертається
    return function(constructor: Function): void { // повертаємо функцію, яка приймає один параметр - функцію
        console.log(`Sealing the constructor ${param}`);
        console.log(constructor); // виведемов консоль щоб побачити що то таке
        console.log(constructor.prototype);
        Object.seal(constructor);// тепер ми будемо працювати з нашим конструктором
        Object.seal(constructor.prototype);// використаємо Object.seal для прототипу, а прототип є властивістю конструктора
    };
}

export function logger<TFunction extends Function>(constructor: TFunction): TFunction { // використаємо сигнатуру яка повертає функцію. Пиемо що це одразу декоратор, бо про параметри нічого не вказано. ЦЕ є дженерік функція
    const newConstructor: Function = function(){ // ми присвоюємо функцію яка буде новим конструктором нашого класу, якщо треба параметри, то ми їх заводимо
        console.log('Creating new instance');
        console.log(constructor); // виводити переданий параметр (ім'я класу).
        this.age = 30;// так як це є функція конструктор щоб створити властивість беремо this

    };
    // справа в тому що якщо ми задекоруємо цим декоратором клас то він не тільки змінить конструктор, а він змінить і прототип тому що наш прототип буде називатись newConstructor.prototype і тут не буде методів того класу який ми декоруємо
    // Якщо  нам потрібні це методи то ми повинні зробити так щоб цей об'єкт створювався на базі того прототипу того класу який ми декоруємо і це можна зробити за допопомогою Object.create() або Object.setPrototypeOf().
    newConstructor.prototype = Object.create(constructor.prototype);// Тобто ми створюємо прототип за допомогою і вказуємо його прототипом буде конструктор prototype
    // це є таким звязком між старим об'єктом прототайп де є методи і між об'єктом прототайп в якому ми будемо створювати нові методи

    newConstructor.prototype.printLibrarian = function (): void { // створюємо новий метод
        console.log(`Librarian name: ${this.name}, Librarian age: ${this.age}`);
    };
    return newConstructor as TFunction; // переводимо до типу TFunction. Повертаємо з декоратора новий конструктор
}

export function writable(isWritable: boolean){// ми говоримо цим декоратором про те, що якесь поле (в даному випадку метод) яким ми будемо декорувати цим декоратором або можна буде змінити або не можна буде змінити і якщо це досить критичний метод, наприклад обнулити чи перезаписати то ми поставимо writable: false і ніхто його не зможе обнулити
    return function (target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor{// повертає функцію, яка має в сигнатурі вже 3 параметри
        // PropertyDescriptor є встроєнним типом
        console.log(target);
        console.log(methodName);
        console.log(descriptor);

        descriptor.writable = isWritable; // writable є однією з необов'язкових властивостей descriptor
        return descriptor;
    };
}

// декоратор який переписує метод
// цей декоратор буде впливати на те, чи буде виконуватись цей метод. Якщо він буде, то коли
// шаблон який дозволяє метод переписати
export function timeout(ms: number){// декоратор цей вже буде модифікувати наш метод . Тобто будемо переписувати метод
    return function(target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor{
        const originalMethod =  descriptor.value;// descriptor.value завжди буде повертати посилання на метод
        descriptor.value = function(...args: any[]){// тепер ми пишемо новий метод, якщо треба буде параметри то можемо написати їх в параметри функції
            if(window.confirm('Are you sure?')){
                setTimeout(() =>{ // деякий таймер який запускає функцію через час
                    // originalMethod(); // ми не можемо тут  так викликати наш метод. Він спрацює, але не дасть той результат який ми би хотіли тому що коли ми запускаємо функції в них є таке поняття як контекст(this) . Тут this буде мати значення window
                    // значення this залежить від того як ми запускаємо цю функцію, наприклад ми можемо запустити просто функцію(f()) , можемо запустити метод об'єкта (o.f()), ми можемо запустити функцію як new f() і створити об'єкт, ми можемо запустити функцію як f.call()
                    // нам потрібно щоб коли ми запускаємо метод , this зсилалося на об'єктметод якого ми запускаємо, бо ми ж не просто функцію запускаємо, ми повинні запустити метод і в цому методі буде this зсилатись на якісь поля даного об'єкту
                    originalMethod.apply(this, args); // тут нам потрібно викликати наш метод за допопомогою call або apply , для того щоб вказати значення для контексту в першому параметрі. Значення для this як на диво буде this (тому що ми пишемо новий метод і його записуємо в властивість value, тобто це є метод а всередині методу this буде посиланням на об'єкт для якого ми цей метод для якого ми цей метод будемо виконувати). Ми використали спеціально стрілкову функцію для того щоб контекст не змінився
                    // АЛе в метода який ми викликаємо можуть бути якісь параметри і нам потрібно задати ці параметри, і тут ми можемо задати args параметри (бо другим параметром в apply задається масив аргументів)
                }, ms);
            }
        };
        // таким чином ми викличемо метод який ми декоруємо, наша додаткова функціональність закладена в рядках    if(window.confirm('Are you sure?')){setTimeout(() =>{
        return descriptor; // ми змінили descriptor тому потрібно його повернути
    };
}

// декоратор параметрів
// для кожного методу буде своя властивість
// властивість організувати як масив, тому що в нас може бути декілька параметрів
export function logParameter(target: any, methodName: string, index: number){ // так як нічого не сказано про параметри, то одразу пишемо сигнатуру, яка приймає три параметри
    const key = `${methodName}_decor_params_indexes`;// оскільки нам потрібно створити властивість, то ми можемо завести key і вказати що це буде така назва

    // target[key] = [];// якщо ми впевнені в тому що ми будемо декорувати тільки методи екземпляра то target  у нас буде завжди прототипом то ми тоді можемо одразу створити властивість через target[key] і присвоїти пустий масив наприклад
    // target.prototype[key] = [];// якщо ми не впевнені то в нас може бути target бути конструктором і нам потрібно брати prototype

    // тому бажано зробити аналіз
    const proto = typeof target === 'function'? target.prototype: target;
    // proto[key] = [index];// тоді можемо написати властивість ось так . Але проблема в тому що даний декоратор logParameter ми можемо використовувати декілька разів і ось коли цей декоратор буде викликатись перший раз то він запише перший індекс, а коли буде викликатись другий раз то він вже перезапише, а нам треба щоб новий індекс додавався в масив, але ми не знаємо чи цей масив існує якщо хочемо використаити push
    (proto[key] ??= []).push(index);// нам потрібно перевірити чи існує цей масив і тут в нагоді стане оператор ??=
// перевіряємо чи proto[key] є undefined і якщо undefined то присвоюємо масив і якщо ми вже присвоїли масив то тепер ми можемо викликати push і додати цей індекс
// другий раз коли цей декоратор запуститься proto[key] вже буде масивом і тоді ми просто виконуємо push і додаємо новий індекс
}


// коли ми пишемо декоратори то вони повинні бути незалежними або вони можуть бути залежними якщо ми знаємо в якій послідовності вони виконуються
// і тут в прикладі декоратор метода параметра (logParameter) буде виконуватись раніше аніж декоратор методу, тому декоратор параметру можна використати для запису, а декоратор методу можна використати для зчитання
// декоратор методу який перевизначає метод, до якого він застосовується та повертає новий дескриптор.
export function logMethod(target: any, methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor{
    const originalMethod =  descriptor.value;
    descriptor.value = function(...args: any[]){ // args є масивом, в які входять всі аргументи

        const key = `${methodName}_decor_params_indexes`;   // нам потрібно знову ж таки взяти ключ
        const proto = typeof target === 'function'? target.prototype: target; // можемо взяти рядок з таргетом щоб визначитись однозначно що в нас є прототип
        const indexes = proto[key]; // і тепер ми можемо отримати масив індексів
        // наприклад може бути ситуація що ми не задекорували параметрів тоді б попередній код в декораторі параметрів не виконався і в нас не буде такої властивості , тобто indexes буде undefined
        // якщо ми задекорували параметр або декілька то в нас цей код виконувався і indexes буде масивом
        if(Array.isArray(indexes)){// тому нам потрібно перед тим як працювати з масивом і перед тим як дістати, потрібно перевірити чи дійсно це є масив, якщо це масив то робимо певні дії
        // в indexes входять тільки ті аргументи, які ми задекорували
            args.forEach((arg, index) =>{
                if(indexes.includes(index)){// переходить чи входить індекс в масив індексів чи ні. Можемо перевіряти через includes або indexOf
                    // arg буде значенням того параметру, який ми задекорували
                    console.log(`Method: ${methodName}, ParamIndex: ${index}, ParamValue: ${arg}`);
                }
            });
        }
        // це все тут з  const key ... до  if(Array.isArray(indexes) включно є додатковою функціональністю
        // originalMethod.apply(this, args); // викликаємо тепер оригінальний метод за допомогою call або apply.Тут краще використати apply бо ми скажемо this і args
        // метод originalMethod може щось повертати, а може не повертати
        return originalMethod.apply(this, args); // напишемо return щоб повернути те значення яке метод може поовертати
    };
    // таким чином ми викличемо метод який ми декоруємо, наша додаткова функціональність закладена в рядках    if(window.confirm('Are you sure?')){setTimeout(() =>{
    return descriptor;
}



// функція makeProperty є дженерік функцією тут
function makeProperty<T>(
    prototype: any,  // параметр який є в декораторі
    propertyName: string, // параметр який є в декораторі
    getTransformer?: (value: any) => T, // необов'язкова функція . Якщо вони задаються то використовуються, якщо вони не задаються то значення властивості просто зчитується і записується прямо у цю властивість
    setTransformer?: (value: any) => T // необов'язкова функція
) {
    const values = new Map<any, T>();

    Object.defineProperty(prototype, propertyName, { // за допомогою Object.defineProperty на прототипі сворюється propertyName
        set(firstValue: any) { // але для propertyName створюється сеттер
            Object.defineProperty(this, propertyName, { // всередині сеттеру знову викликається Object.defineProperty і тут уже підставляється this . За рахунок того що це контекст сеттеру ми отримуємо доступ безспосередньо до об'єкта і на нього створюємо для propertyName геттер і сеттер
                get() { // якщо у нас є геттер то ми можемо за допопомогою функції getTransformer взяти значення і його якимось чином перетворити якщо цей getTransformer є. Якщо getTransformer немає то просто беремо це значення
                    if (getTransformer) {
                        return getTransformer(values.get(this));
                    } else {
                        values.get(this);
                    }
                },
                set(value: any) { // в сеттері якщо є setTransformer то ми записуємо за допопомогою setTransformer і якщо немає setTransformer то просто значення записуємо в values
                    if (setTransformer) {
                        values.set(this, setTransformer(value));
                    } else {
                        values.set(this, value);
                    }
                },
                enumerable: true
            });
            this[propertyName] = firstValue;
        },
        enumerable: true,
        configurable: true
    });
}

// фабрична функція декоратора властивості
// розглядаємо варіант коли це буде властивість екземпляра
export function format(pref: string = 'Mr./Mrs.'){
    return function(target: any, propName: string){
        makeProperty(target, propName, value => `${pref} ${value}`, value => value);
    };
}

// декоратор геттеру і сеттеру
export function positiveInteger(target: any, propertyName: string, descriptor: PropertyDescriptor ): PropertyDescriptor{
    const originalSet = descriptor.set;// якщо властивості властовлюють це значення значить це декоратор сеттеру

    descriptor.set = function(value: number) {// перевизначаємо даний сеттер. Сеттер це функція яка має один параметр
        if(value<1 || !Number.isInteger(value)){ // Number.isInteger() перевіряє чи число є ціле
            throw new Error('Invalid value');
        }
        if(originalSet){// нам потрібно викликати сеттер якщо такий існує. Можливий бути варіант що ми задекорували геттер, а сеттеру немає. ВИходить ми могли черезгеттер створили сеттер, а старого сеттеру немає і немає що викликати
            originalSet.call(this,value);
        }
    };
    return descriptor;
}


