import { ReferenceItem, UL, RefBook, Shelf } from './classes';
// import { ReferenceItem, UL, RefBook, Library } from './classes';
import { Logger, Author, Librarian, Book, Magazine } from './interfaces';
import { purge, getAllBooks, printRefBook, getObjectProperty, createCustomer, getBooksByCategory, logCategorySearch, getBooksByCategoryPromise, logSearchResults } from './functions';
import { BookRequiredFields, PersonBook, UpdatedBook, СreateCustomerFunctionType } from './types';
import { Category } from './enums';
// import type { Library } from './classes/library';
import { Library } from './classes/library';

showHello('greeting', 'TypeScript');

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = `Hello from ${name}`;
}

// =============

// const a: number | string = 'abs';
// (<string>a).toUpperCase; // приведення до типу щоб ця змінна в данному конкретному місці була string, звужуємо таким чином (<string>a)
// (a as string).toUpperCase ; // або таким чином звужуємо
// (a as unknown as string).toUpperCase ;// або бувають випадки коли спочатку приводимо unknown а потім до стрінг

// ===============
// Task 02.01
// console.log(getAllBooks());
// logFirstAvailable(getAllBooks());
// logBookTitles(getBookTitlesByCategory(Category.JavaScript));
// console.log(getBookAuthorByIndex(0));
// calcTotalPages();

// Task 03.01
// const myID: string = createCustomerID('Ann',10);
// console.log(myID);
// let idGenerator: (name: string, id: number) => string; // функціональний тип - це сукупність типів параметрів і типу повертаємого значення
// let idGenerator: typeof createCustomerID;// другий спосіб задання функціонального типу , typeof оператор в позиції типу
// idGenerator = (name: string, id: number) => `${id}/${name}`; // функція
// idGenerator = createCustomerID;

// const a = typeof createCustomerID; // typeof оператор в позиції значення
// console.log(idGenerator('Boris',20));

// Task 03.02
// createCustomer('Ann');
// createCustomer('Ann',30);
// createCustomer('Ann', 30, 'Kyiv');

// console.log(getBookTitlesByCategory());
// console.log(getBookTitlesByCategory(Category.CSS));

// logFirstAvailable();

// console.log(getBookByID(1));

// console.log(сheckoutBooks('NoName Customer', 1, 2, 3, 4)); // може бути через список
// console.log(сheckoutBooks('NoName Customer', ...[1, 2, 3, 4])); // зазвичай коли це спикок через кому він приходить масивом
// коли ставимо ... то робимо з масиву список , це spred оператор який розверне цей масив і ми отримаємо той же самий результат
// console.log(сheckoutBooks('NoName Customer',[1, 2, 3,4]));// Також пколи приходить масив то ми можемо забрати три крапки в function сheckoutBooks(customer: string, bookIDs: number[]): string[]{
// але тоді у функції буде два обов'язкові параметри, раніше був один обов'язковий - це рядок

// Task 03.03
// getTitles(); // показує що існує сигнатура function getTitles(author: string): string[] (+2 overloads) і дві інші
// Expected 1-2 arguments, but got 0 показує що не можна задавати 0 чи 3+ аргументів тому що ця перевірка вже є закладена, тому що в нас немає сигнатури де немає парамерів
// В круглих дужках показує підсказки скільки і які є сиггнатури 1/3 getTitles(author: string): string[]
// Відповідно до сигнатур перевіряється що ми можемо задавати, а що не можна

// console.log(getTitles(1,true));
// console.log(getTitles(true));
// console.log(getTitles(false));
// console.log(getTitles(2, false));
// console.log(getTitles('Lea Verou'));

// Task 03.04
// console.log(bookTitleTransform('Learn TypeScript'));
// console.log(bookTitleTransform(123)); // буде помилка Uncaught Error: value should have been a string
// console.log(bookTitleTransform({})); // теж помилка буде

// Task 04.01
// const myBook: Book = { // це є літерал, тому тут повинно чітко бути стільки властивостей скільки в інтерфейсі
//     id: 5,
//     title: 'Colors, Backgrounds, and Gradients',
//     author: 'Eric A. Meyer',
//     available: true,
//     category: Category.CSS, // якщо наприклад це закоментити то вилізе помилка бо це є обов'язкова властивість в інтерфейсі Book
//     // year: 2015, //  це і наcтупне можемо закоментити , бо вони не описані в інтерфейсі Book
//     // copies: 3,
//     pages: 200,
//     // markDamaged: (reason: string) => console.log(`Damaged: ${reason}`) // перший спосіб додавання методу
//     markDamaged(reason: string){ // другий спосіб додавання методу
//         console.log(`Damaged: ${reason}`);
//     }
// };
// printBook(myBook); // Colors, Backgrounds, and Gradients by Eric A. Meyer
// myBook.markDamaged('missing back cover'); // Damaged: missing back cover

// Task 04.02
// const logDamage: DamageLogger = (reason: string) => console.log(`Damaged: ${reason}`);
// const logDamage: Logger = (reason: string) => console.log(`Damaged: ${reason}`);
// logDamage('missing back cover'); // Damaged: missing back cover

// Task 04.03
// const favoriteAuthor: Author = {
//     name: 'Anna',
//     email: 'anna@example.com',
//     numBooksPublished: 2
// };

// const favoriteLibrarian: Librarian = {
//     name: 'Boris',
//     email: 'boris@example.com',
//     department: 'Classical Literature',
//     assistCustomer: null
// };

// Task 04.04
// const offer: any = {
//     book: {
//         title: 'Essential TypeScript',
//     },
// };

// console.log(offer.magazine); // результатом буде undefined , давати перевірки для offer немає сенсу, тому що offer існує
// // magazine може існувати а може не існувати, але він останній в цьому виразі, тому немає сенсу перевіряти чи вона існує чи не існує
// //  undefined

// console.log(offer.magazine?.getTitle()); // в нас є offer, але немає magazine і для того щоб перевірити ставимо тут ?
// // undefined

// console.log(offer.book.getTitle?.()); // offer в нас існує і book теж існує , але всередині цього об'єкта в нас немає getTitle() і тому буде помилка що ми пробуємо андефайнед викликати як функцію
// // помилка: getGitle is not a function  тому ми ставимо ?.
// // undefined

// console.log(offer.book.authors?.[0]); // це приклад коли в нас є масив для прикладу, в бук ми очікували отримати властивість яка є масивом, але властивості такої немає
// // Ми отримаємо помилко що не можемо прочитати проперті в undefined (reading '0').
// // ТОму ми можемо тут використати перевірку і перевірити чи існує така властивість і якщо вона не існує ми отримаємо undefined
// // undefined

// Task 04.05

// console.log(getProperty(myBook, 'title')); // Colors, Backgrounds, and Gradients
// console.log(getProperty(myBook, 'markDamaged')); // markDamaged
// console.log(getProperty(myBook, 'isbn')); // отримаємо помилку, тому що такої властивості в нашого об'єкта немає
// або в цьому випадку якщо нам він треба і його може не бути то можем прописати в типу type BookProperties = keyof Book | 'isbn';

// Task 05.01

// const ref = new ReferenceItem(1, 'Learn TypeScript', 2022); // оголосили змінну red і проініціалізували її об'єктом ReferenceItem
// console.log(ref); // бачимо що коли створили об'єкт то запустився конструктор, який вивів в консоль Creating a new ReferenceItem...
// // в консолі буде об'єкт ReferenceItem {title: 'Learn TypeScript', year: 2022} але без метода
// // але насправді метод теж є, він є в посиланні на прототип: ReferenceItem {title: 'Learn TypeScript', year: 2022} далі  [[Prototype]]: Object далі буде метод printItem: ƒ printItem()
// // Насправді коли ми добавляємо методи , то як ми говорили методи є чимось спільним тобто це є спільна поведінка у подібних об'єктах
// // Якщо ця поведінка спільна то немає сенсу додавати її в сам об'єкт тому що коли ми наприклад створимо сотню об'єктів і в кожного об'єкта буде один і той же метод то він буде забирати пам'ять
// // Тому те що є спільне для об'єкта воно перемістилося в прототип і для кожного об'єкта який ми створюємо у нього буде посилання на його прототип.
// // Прототип буде один і метод теж буде один
// // У прототипа [[Prototype]]: Object - це об'єкт є свій прототип [[Prototype]]: Object і цей вже прототип містить стандартний набір методів, властивостей цей прототип називається Object.prototype і він є базовим, в нього прототипів вже немає
// // JS дозволяє створювати об'єкти в яких немає прототипів, але зазвичай коли ми створюємо самий звичайний літерал використовуючи фігурні дужки то ми створюємо прототипну конструкцію, цепочку із двох об'єктів - самого об'єкта і його прототипа
// // коли додали приватне ід то його в об'єкту не буде видно, в прототипі буде метод getID який ми додали
// ref.printItem(); // викликаємо метод printItem()  і отримуємо в консолі Learn TypeScript was published in 2022
// // В нас є екземпляр, на цей екземпляр посилається this, в прототипі цього об'єкту є клас ReferenceItem і якщо ми дістанемось до прототипу то ми зможемо дістатись і до конструктора(а це буде клас) і дістатися до статики
// // якщо додати в метод console.log(Object.getPrototypeOf(this)); - таким чином ми можемо дістатись до прототипу в методі
// // console.log(Object.getPrototypeOf(this).constructor.department); таким чином отримаємо значення нашої статичної властивості тобто те саме що і при console.log(ReferenceItem.department);
// ref.publisher = 'abc group'; // якщо будемо щось присвоювати через = то буде викликатись сеттер, а якщо будемо зчитувати значення то буде викликатись геттер
// console.log(ref.publisher); // в цьому випадку зчитуємо значення, тому викликається геттер  // ABC GROUP
// // setter і getter тут викликається без () бо це реалізація властивості
// // якщо зараз подивитись об'єкт  ReferenceItem {title: 'Learn TypeScript', year: 2022} title :"Learn TypeScript", year: 2022 , _publisher: "abc group"
// // то ми бачимо тут властивості _publisher, year але  це ці поля оголошені приватними через private в тс
// // але на стороні js немає ніякої приватності якщо ми використовуємо модифікатор private
// // в прототипі буде сеттер і геттер який ми і використовуємо
// console.log(ref.getID()); // і в консолі буде 1, але якщо дивитись в самому об'єкті то вона буде недоступна

// Task 05.02
// // const refBook: Encyclopedia = new Encyclopedia(1, 'Learn TypeScript', 2022, 2);
// const refBook: RefBook = new RefBook(1, 'Learn TypeScript', 2022, 2);
// refBook.printItem(); // Learn TypeScript was published in 2022 app.ts:297 Research Dep. app.ts:303 Research Dep.
// // цей метод є в базовому класі, він звідти і викликається
// // коли переписали метод printItem то тепер в консоль виводиться ще Edition: 2 (2022)
// console.log(refBook); // RefBook {title: 'Learn TypeScript', year: 2022, edition: 2}
// // тобто бачимо що в цьому екземплярі є edition, властивості з батківського класу , коли відкрили прототип то там є publisher, далі відкрили прототип  і є - getID(),printItem(),publisher і далі відкрили прототип - Object.prototype

// Task 05.03

// // const refBook: Encyclopedia = new Encyclopedia(1, 'Learn TypeScript', 2022, 2);
// // const refBook: RefBook = new RefBook(1, 'Learn TypeScript', 2022, 2);
// refBook.printCitation(); // Learn TypeScript- 2022
// console.log(refBook); // якщо подивитись в прототип об'єкту то там є метод printCitation: ƒ printCitation()
// // а якщо відкриємо прототип наступний (прототип класу ReferenceItem) то там вже немає того методу, бо не вказана реалізація

// Task 05.04
// const favoriteLibrarian = new UL.UniversityLibrarian();// якщо я не буду казати якого типу буде то тиа такої змінної такий і буде UniversityLibrarian
// const favoriteLibrarian: Librarian = new UL.UniversityLibrarian();// якщо напишемо тип інтерфейс Librarian то тип змінної зміниться і буде Librarian
// favoriteLibrarian.name = 'Anna'; // проініціалізували властивість namе
// favoriteLibrarian.assistCustomer('Boris','Learn TypeScript'); // Anna is assisting Boris with book Learn TypeScript
// викликали метод assistCustomer
// favoriteLibrarian.a =2; // щоб використововувати цю та інші властивості з класу тепер можна прописати екземпляр без вказування типу тоді тип буде UniversityLibrarian де ці властивості реалізовані
// // або вказати так екземпляр : const favoriteLibrarian: Librarian & A = new UniversityLibrarian(); (ця операція називається перетин)
// // ось така операція | не підходить

// В класі ми можемо змінювати властивість readonly яка створена в інтерфейсі, а поза класом не можемо

// Task 05.05
// const personBook: PersonBook ={ // вийшов такий об'єкт, який об'єднав властивості двох інтерфейсів
//     name: 'Anna',
//     author: 'Anna',
//     available: false,
//     category: Category.JavaScript,
//     email: 'anna@example.com',
//     id: 1,
//     title: 'Unknown'
// };

// const options = {};
// // const options: TOptions = {duration: 20}; // в такому випадку функція аналізує що ця властивість не є undefined і не чипає її
// const options2 = setDefaultConfig(options);
// console.log(options); // Object duration: 100 speed: 60
// console.log(options2); // Object duration: 100 speed: 60
// console.log(Object.is(options, options2)); // true
// питаємось чи об'єкт options є таким же як options2
// Отже насправді це один і той же об'єкт але з різним ім'ям, в функцію ми передали цей об'єк як посилання на деяку ділянку пам'яті і ми її змінили  і повернули назад
// Тобто ми написали в змінну ту ж саму ділянку пам'яті яку змінили
// Якщо нам потрібно змінити або створити копію то ми повинні копію створити

// Task 06.03, 06.04

// const refBook: RefBook = new RefBook(1, 'Learn TypeScript', 2022, 2);
// printRefBook(refBook);
// const favoriteLibrarian: Librarian = new UL.UniversityLibrarian();
// printRefBook(favoriteLibrarian);


// Task 06.05
// const flag = true; // якщо false то модуль не імпортується і проміс не виконається

// // перший варіант
// if(flag){
//     import('./classes')
//         .then(o => {
//             const reader = new o.Reader();
//             reader.name = 'Anna';
//             reader.take(getAllBooks()[0]);
//             console.log(reader);
//         })
//         .catch(err => console.log(err))
//         .finally(() => console.log('Complite'));
// }


// другий варіант
// if(flag){
//     const o = await import('./classes');
//     const reader = new o.Reader();
//     reader.name = 'Anna';
//     reader.take(getAllBooks()[0]);
//     console.log(reader);
// } // але в консолі буде помилка Module parse failed: The top-level-await experiment
// is not enabled (set experiments.topLevelAwait: true to enabled it)
// щоб помилки не було то треба в вебпак конфіг додати
// experiments: {
//     topLevelAwait: true
// }


// Task 06.06

// let library: Library = new Library();
// let library: Library = {
//     Id: 1,
//     address: '',
//     name: 'Anna'
// };

// console.log(library);

// Task 07.01
// const inventory: Book[] = [
//     { id: 10, title: 'The C Programming Language', author: '???', available: true, category: Category.Software},
//     { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
//     { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
//     { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software }
// ];

// const result = purge(); // тс вивів такий тип  purge<unknown>(inventory: unknown[]): unknown[] і помилку що треба задати параметр
// const result: string = purge(); // якщо проставимо тільки тип для змінної , не задамо параметр то буде така помилка Type 'unknown[]' is not assignable to type 'string'.
// const result: string[] = purge(); // якщо додамо [] то тип вже проставиться purge<string>(inventory: string[]): string[], помилка що треба задати параметр
// const result: string[] = purge(['123', '234', '345']); // ми можемо задати наприклад масив рядків
// const result= purge(['123', '234', '345']); // якщо приберемо цей тип то теж все працює, тс визначив тип purge<string>(inventory: string[]): string[]
// параметр типу визначається автоматично якщо не задати
// const result= purge<string>(['123', '234', '345']); // так теж все працює
// const result= purge<number>(['123', '234', '345']); // але якщо я передам сюди number то тоді вже працювати не буде, тому що я вказав чітко з чим буде працювати моя функція , але дані передав не того типу
// помилка Type 'string' is not assignable to type 'number'.
// const result= purge<number>([1,2,3]); // так вже працює
// const result= purge<number>(inventory); // помилка: Argument of type 'Book[]' is not assignable to parameter of type 'number[]'.
// const result1= purge<Book>(inventory); // тоді ми вказуємо так
// const result1= purge(inventory);// або так
// console.log(result1);
// const result2= purge([1,2,3]);
// console.log(result2);

// Task 07.02, 07.03

// const inventory: Book[] = [
//     { id: 10, title: 'The C Programming Language', author: '???', available: true, category: Category.Software},
//     { id: 11, title: 'Code Complete', author: 'Steve McConnell', available: true, category: Category.Software },
//     { id: 12, title: '8-Bit Graphics with Cobol', author: 'A. B.', available: true, category: Category.Software },
//     { id: 13, title: 'Cool autoexec.bat Scripts!', author: 'C. D.', available: true, category: Category.Software }
// ];

// // const bookShelf: Shelf<Book> = new Shelf<Book>(); // можемо так записати
// const bookShelf: Shelf<Book> = new Shelf<Book>(); // або так записати
// inventory.forEach(book => bookShelf.add(book));
// console.log(bookShelf.getFirst().title); // The C Programming Language

// const magazines: Magazine[] = [
//     { title: 'Programming Language Monthly', publisher: 'Code Mags' },
//     { title: 'Literary Fiction Quarterly', publisher: 'College Press' },
//     { title: 'Five Points', publisher: 'GSU' }
// ];

// // const magazineShelf: Shelf<Magazine> = new Shelf<Magazine>(); // або так
// const magazineShelf = new Shelf<Magazine>(); // або так
// // якби ми написали ось так const magazineShelf = new Shelf() без вказання типу то буде Shelf<unknown> і коли потім захочемо взяти title то напише що проперті title не існує на типі 'unknown'
// magazines.forEach(magazine => magazineShelf.add(magazine));
// // console.log(magazineShelf.getFirst().title); // Programming Language Monthly

// // тобто в нас є дві полиці, одназберігає один тип об'єктів, друга - другий тип об'єктів
// // все це обслуговується одним класом, одна бізнес-логіка але її  можна застосовувати для різних типів

// це вже 07.03
// magazineShelf.printTitles(); // Programming Language Monthly
// // shelf.ts:17 Literary Fiction Quarterly
// // shelf.ts:17 Five Points

// console.log(magazineShelf.find('Five Points')); // Object publisher:"GSU" title:"Five Points"

// getObjectProperty(); // getObjectProperty<unknown, never>(obj: unknown, prop: never): string  якщо ми викличемо цю функцію, але нічого не задамо то тс для першого параметра підставить unknown, для другого у нас never бо keyof unknown поверне never

// getObjectProperty(magazines[0]); // getObjectProperty<Magazine, keyof Magazine>(obj: Magazine, prop: keyof Magazine): string якщо ось так то тс зрозумів що ми вже будемо працювати з об'єктом Magazine, для проперті тоді вже стоїть тип keyof Magazine

// console.log(getObjectProperty(magazines[0], 'title')); // в консолі буде Programming Language Monthly
// console.log(getObjectProperty(inventory[1], 'title')); // Code Complete
// // типи виводяться виходячи з першого параметру
// console.log(getObjectProperty<Book, 'author'>(inventory[1], 'author')); // або так коли є необхідність вивести тип вручну
// console.log(getObjectProperty<Book, 'author' | 'title'>(inventory[1], 'author')); // або ще можемо зробити таке об'єднання, тоді буде доступне або 'author' або 'title'

// Task 07.04
// const bookRequiredFields: BookRequiredFields = {
//     author: 'Anna',
//     available: false,
//     category: Category.Angular,
//     id: 1,
//     markDamaged: null,
//     pages: 200,
//     title: 'Learn Angular'
// };

// // const updatedBook: UpdatedBook ={}; // навіть пустий об'єкт можна буде присвоїти цій змінній тому що ми не зобо'язанні задавати взагалі ніяких полів
// const updatedBook: UpdatedBook ={
//     id: 1,
//     available: true
// }; // можемо тільки декілька полів задати

// const params: СreateCustomerFunctionType;// тепер ця змінна має функціональний тип як у СreateCustomerFunctionType

// let params: Parameters<СreateCustomerFunctionType>; // нам потрібно використати утиліту Parameters для того щоб отримати тільки тип який описує параметри
// // тепер змінна буде мати тип тюпл [name: string, age?: number, city?: string]
// params = ['Anna', 30, 'Lviv']; // тепер ми можемо в цю змінну присвоїти значення
// createCustomer(...params); // ставимо три крапки для того щоб спред оператор розгорнув наш тюпл і передав значення як список через кому
// в консолі буде Customer name: Anna
// functions.ts:104 Cusomer age: 30
// functions.ts:107 Cusomer city: Lviv


// Task 08.01

// const favoriteLibrarian1 = new UL.UniversityLibrarian(); // створили екземпляр класу UniversityLibrarian
// // як тільки ми створили об'єкт то  в консолі виводиться інформація Sealing the constructor UniversityLibrarian
// // decorators.ts:7 class UniversityLibrarian {
// //    constructor() {
// //         this.a = 1; // наприклад якщо наш клас буде мати ще одну властивість але коли захочемо викликати через favoriteLibrarian. то її не буде тому що її …
// // decorators.ts:8 {constructor: ƒ, assistCustomer: ƒ}
// // як бачимо перший вивід в консоль це те що ми передали в params , а друге це те що в консоль лог виводили constructor і як бачимо що конструктор це є власне клас тобто конструкція це є функція
// // третій вивід це є constructor.prototype , тобто об'єкт і в цьому об'єкті є метод assistCustomer, власне виведеться прототип нашого класу, де знаходяться методи
// // І ми застосувати Object.seal до конструктора і до прототипу, це означає що він запакований ну і відповідно якщо ми захочемо щось змінити з цим екземпляром то в нас не повинно це відбуватись
// favoriteLibrarian1['a'] =1; // додавати властивості ми можемо, тому що seal дозволяє це робити. Він не дозволяє видаляти, переконфігуровувати
// UL.UniversityLibrarian['a'] =2; // якщо спробуємо на класі додати властивіть то буде помилка TypeError: Cannot add property a, object is not extensible
// // На екземплярі ми змогли додати властивість, а на класі не можемо
// // тому що декоратор забороняє створювати на класі якісь властивості, а на екземплярі дозволяє, на прототипі також не повинен дозволяти
// UL.UniversityLibrarian.prototype['a'] =2; // на прототипі вже не можна буде створити властивість, така ж помилка буде як попередня
// // Тобто ми заборонили додавати в прототип нові методи

// const favoriteLibrarian2 = new UL.UniversityLibrarian(); // якщо захочемо другий раз створити, то вже інформації в консолі не буде тому що декоратор вже спрацював, зробив свою роботи і ми тепер користуємось цим зміненим класом
// // декоратор запускається тільки один раз

// Task 08.02
// const favoriteLibrarian1 = new UL.UniversityLibrarian();
// console.log(favoriteLibrarian1); // виводить :
// // Creating new instance // це означає що запустився конструктор який ми створили за допомогою декоратора
// // decorators.ts:17 class UniversityLibrarian {// вивів конструтор. тобто це є наш клас
// // app.ts:395 newConstructor {age: 30} // ми виводимо екземпляр і в цьому екземплярі є age: 30 який ми додали за допопомогою декоратора
// // в цьому новому об'єкті в прототипі є printLibrarian . Тобто ми створили метод newConstructor.prototype.printLibrarian і він потрапив в прототип . Прототипом цього об'єкта [[Prototype]]:Object є прототип нашого класу який ми декоруємо - UniversityLibrarian з методом assistCustomer
// // ЯКЩО МИ НЕ БУДЕМО ВИКОРИСТОВУВАТИ цей рядок newConstructor.prototype = Object.create(constructor.prototype); то в нас ця цепочка не буде такою, тоді в нас буде в прототипі printLibrarian , а далі буде [[Prototype]]:Object і ми загубили зв'язок з тим класом який ми декоруємо, в нас немає методів цього класу

// // favoriteLibrarian1.printLibrarian(); // метод printLibrarian фактично вже не є статичним, він є в рантаймі і тс нічого не знає що там метод добавиться колись. ТС про цей метод ще нічого не знає, тому не вийде так викликати
// // є варіант коли ми створюємо об'єкт ми повинні поставити йому тип який буде включати метод printLibrarian

// // favoriteLibrarian1['printLibrarian'](); // або цей об'єкт привести до типу який має цей метод або якщо дозволено використати індексну сигнатуру
// // тоді ми будемо мати в консолі Librarian name: undefined, Librarian age: 30 тому що ми не проініціалізували змінну name

// favoriteLibrarian1.name = 'Anna';
// favoriteLibrarian1['printLibrarian'](); // коли вже проініціалізували змінну то результатом буде Librarian name: Anna, Librarian age: 30


// Task 08.03
// const favoriteLibrarian = new UL.UniversityLibrarian();
// console.log(favoriteLibrarian); // так як ми застосували декоратор два раз, то він і використався два рази і в сонлях буде наступне:
// // console.log(target); - як ми бачимо це буде прототип оскільки ми декоруємо метод екземпляра:  {constructor: ƒ, assistCustomer: ƒ, assistFaculty: ƒ, teachCommunity: ƒ}
// // console.log(methodName); // assistFaculty
// // console.log(descriptor); // {writable: true, enumerable: false, configurable: true, value: ƒ} // в value буде наш метод assistFaculty

// // console.log(target); -  {constructor: ƒ, assistCustomer: ƒ, assistFaculty: ƒ, teachCommunity: ƒ}
// // console.log(methodName); - teachCommunity
// // console.log(descriptor); - {writable: true, enumerable: false, configurable: true, value: ƒ}

// // якщо додамо static assistFaculty() тоді декоратори спрацюють в зворотньому порядку - спочатку для teachCommunity, а потім для assistFaculty
// // тоді ще в консолі виведеться class UniversityLibrarian {
// //    constructor() {
// //        this.a = 1;
// // тобто це є конструктор для assistFaculty
// // тобто різниця в тому що в target якщо буде статика то буде клас, якщо статики немає то буде прототип

// favoriteLibrarian.assistFaculty = null; // ми можемо змінити метод assistFaculty

// favoriteLibrarian.teachCommunity = null; // а метод teachCommunity ми змінити не можемо
// // буде писати помилку Cannot assign to read only property 'teachCommunity' of object '#<UniversityLibrarian>' тому що є декоратор @writable(false)

// Task 08.04

// const refBook: RefBook = new RefBook(1, 'Learn TypeScript', 2022, 2);
// refBook.printItem(); // як бачимо коли запустили метод, то з'явився window.confirm
// // відбувається те, що метод refBook.printItem() почав викликати super.printItem() з encyclopedia, а super.printItem() це є printItem() в reference-item, але цей метод у нас є задекорований і значить декоратор вніс зміни до методу і насправді він вже не такий як був, а тепер є як в декораторі ми визначили його
// // І починає виводись той код, виводиться window.confirm, якщо кажимо що ні, то метод originalMethod вже викликатись не буде і в консолі тоді буде тільки Edition: 2 (2022)
// // а Edition: 2 (2022) це частина методу printItem() в encyclopedia, тобто тоді ми відмінили  super.printItem()
// // Якщо ми скажемо так, то консоль лог Edition: 2 (2022) виводиться синхронна, а частинка super.printItem() з encyclopedia стала вже асинхронна, тому що там запустився таймер і через 2 секунди в нас запускається метод originalMethod
// // метод originalMethod це є метод, який виводить
// // console.log(`${this.title} was published in ${this.year}`);
// // console.log(ReferenceItem.department); // якщо нам потрібно вивести статичну властивість то беремо назву класу і назву властивості
// // console.log(Object.getPrototypeOf(this).constructor.department);

// // ну і відповідно ці рядки в консолі з'явились через деякий час

// Task 08.05
// const favoriteLibrarian = new UL.UniversityLibrarian();
// console.log(favoriteLibrarian); // в консолі бачимо що в UniversityLibrarian {a: 1} в [[Prototype]]:Object є властивість assistCustomer_decor_params_indexes:(2) [1, 0] яка була створена нашими декораторами
// // Значення в параметрі в звороньому порядку бо спрацьовує спочатку останній декоратор параметру, а потім попередній
// // коли ми створили екземпляр але метод не викликали, тому сам метод не спрацював і в консолі не вивелась інформація

// favoriteLibrarian.name ='Anna';
// favoriteLibrarian.assistCustomer('Boris', 'Learn TS'); // ми додали name до екземпляру і викликали
// // Тепер інформація в консолі з'явилась тому що декоратору потрібна інформація 'Boris', 'Learn TS' щоб получити доступ до неї
// // в консолі буде Method: assistCustomer, ParamIndex: 0, ParamValue: Boris
// // decorators.ts:101 Method: assistCustomer, ParamIndex: 1, ParamValue: Learn TS
// // Спочатку відбувається так: ми в args взяли масив ('Boris', 'Learn TS') і перевіряємо чи нульовий індекс знаходиться в індексі масивів, так знаходиться, тоді для нього виводиться значення ParamValue: Boris
// // Далі беремо наступний і перевіряємо чи його індекс знаходиться в масиві, там знаходиться, тому виводиться ParamValue: Learn TS

// // university-librarian.ts:22 Anna is assisting Boris with book Learn TS // і сам метод вивів таку інформацію

// Task 08.06
// const favoriteLibrarian = new UL.UniversityLibrarian();

// favoriteLibrarian.name = 'Anna';// коли будемо встановлювати властивість, тоді і буде викликатись сеттер
// console.log(favoriteLibrarian.name); // Mr./Mrs. Anna - як бачимо додається префікс
// // коли будемо його отримувати, тоді повинен викликатись геттер, який добавить наш декоратор і той геттер додасть нам префікс для відповідного поля

// favoriteLibrarian.assistCustomer('Boris', 'Learn TS'); // Mr./Mrs. Anna is assisting Boris with book Learn TS - префікс Mr./Mrs. теж підставилось за допопомогою декоратора
// // тут метод assistCustomer теж використовує name

// console.log(favoriteLibrarian); // як бачимо для того поля який ми задекорували з'явився геттер і сеттер
// // UniversityLibrarian {a: 1}
// // a:1
// // name:"Mr./Mrs. Anna"
// // get name:ƒ get()
// // set name:ƒ set(value)
// // В [[Prototype]]:Object в нас з'явився сеттер - set name:ƒ set(firstValue)

// Task 08.07
// const refBook: RefBook = new RefBook(1, 'Learn TypeScript', 2022, 2);

// // refBook.copies = 10; // якщо ми будемо присвоювати значення то буде викликатись сеттер
// // console.log(refBook.copies);// якщо будемо зчитувати значення то буде викликатись геттер
// // в консолі буде 10 бо воно підходить цьому єкземпляру (з декоратора задовільняє умову що має бути не менше 1 і ціле)

// refBook.copies = -10;
// console.log(refBook.copies); // з'являється помилка decorators.ts:166 Uncaught Error: Invalid value , бо ми перевірили і значення не встановилось

// Task 09.01
// console.log('Begin');
// getBooksByCategory(Category.JavaScript, logCategorySearch);
// getBooksByCategory(Category.Software, logCategorySearch);

// console.log('End');

// В консолі будуть такі результати:
// app.ts:495 Begin
// app.ts:499 End
// functions.ts:237 (3) ['Refactoring JavaScript', 'JavaScript Testing', 'Mastering JavaScript Object-Oriented Programming']
// functions.ts:235 No books found.
// Як бачимо перші два рядки виведені відразу ж, тобто наша функція getBooksByCategory відкладена на 2с і тому ніякого результату вона не виводить
// Потім через 2 с відпрацьовує функція getBooksByCategory(Category.JavaScript, logCategorySearch) яка повертає книги
// Наступний раз функція getBooksByCategory(Category.Software, logCategorySearch) повертає No books found, тобто той уксепшон який в нас виник, коли ми перевірили що в нас немає книг ну і його ми отримали
// якщо нам потрібно написати функцію, яка приймає колбек, то ми бачимо що тип для параметра може бути описаний наприклад інтерфейсом, дженерік інтерфейсом, функціональним типом, аліасом і т.д.


// Task 09.02
// getBooksByCategoryPromise(Category.JavaScript);
// getBooksByCategoryPromise(Category.Software);
// Якщо викличемо так функції, то в консолі  в першому випадку не буде нічого, бо проміс перейшов в стан resolve, але ми ніяк на це не відреагували (немає ніякого колбеку)
// а в другому випадку проміс перейшов в стан reject і в консолі з'явилось functions.ts:251 Uncaught (in promise) No books found.


// console.log('Begin');

// getBooksByCategoryPromise(Category.JavaScript)
//     .then(titles => console.log(titles)) // ми отримали titles якщо все було успішно і наприклад виводимо їх в консоль
//     .catch(reason => console.log(reason));// а якщо не успішно то ми отримуємо reason і теж виведемо його в консоль

// getBooksByCategoryPromise(Category.Software)
//     .then(titles => console.log(titles))
//     .catch(reason => console.log(reason));

// console.log('End');

// В консолях будуть результати :
// app.ts:519 Begin
// app.ts:529 End
// app.ts:522 (3) ['Refactoring JavaScript', 'JavaScript Testing', 'Mastering JavaScript Object-Oriented Programming']
// app.ts:527
// тобто спочатку в консоль вивелись Begin, End а потім через 2 орієнтовно спрацювали проміси
// В першому випадку Category.JavaScript книги були, спрацював перехід цього промісу в стан resolve і відповідно спрацював then який вивів titles в консоль, catch вже не спрацював тому що в нас немає ні ексепшена, ні reject не з'явився
// В другому випадку у нас Category.Software книг немає і відповідно у нас згенерувався ексепшон, а це означає що наш проміс нормально не завершиться і виконається catch

// console.log('Begin');

// getBooksByCategoryPromise(Category.JavaScript)
//     .then(titles => {
//         console.log(titles);
//         // return titles.length;// ЦЕ синхронна операція. Тепер ми передаємо titles далі і для того щоб їх передати в наступний then їх спочатку потрібно повернути. В наступному then ми будемо використовувати кількість книг тому повертаємо titles.length
//         return Promise.resolve(titles.length); // щоб видно було що це деяка асинхронна операція, ми її можемо зробити через Promise.resolve - це тоді буде аналог деякої асинхронної операції, тому що у нас є дані(titles) і далі ми створюємо таким чином новий проміс і його повертаємо, а створюємо ми цей проміс через resolve, але можна також створити через конструктор (return new Promise(функція яка буде щось робити на основі тих даних))
//     })
//     .then(n => console.log(n)) // і ось тут у нас є деяка кілкьість книг, яку ми можемо вивести в консоль. НЕзалежно від того що ми попередньо повернули (чи проміс чи значення), на вхід приходить значення цього промісу і далі ми його можемо ще раз використовувати скільки нам потрібно
//     .catch(reason => console.log(reason));

// getBooksByCategoryPromise(Category.Software)
//     .then(titles => console.log(titles))
//     .catch(reason => console.log(reason));

// console.log('End');

// в консолі буде:
// app.ts:540 Begin
// app.ts:554 End
// app.ts:544 (3) ['Refactoring JavaScript', 'JavaScript Testing', 'Mastering JavaScript Object-Oriented Programming']
// app.ts:547 3
// app.ts:552 No books found.

// Як бачимо в консолі з'явилась 3 - кількість книг, який ми вивели в другому then

// Task 09.03

// console.log('Begin');
// logSearchResults(Category.JavaScript);
// logSearchResults(Category.Software);
// console.log('End');

// В консолі буде:
// app.ts:568 Begin
// app.ts:571 End
// functions.ts:261 3
// functions.ts:263 Uncaught (in promise) No books found. // це з'яилось тому що ми передали Category.Software у функцію яка повертає проміс, вона побачила що таких книг немає і зробила Promise reject, а раз прийшов Promise reject то await для Promise reject генерує ексепшон. Await тоді не може дозволити продовжити роботу коду тому що в нас немає даних, тоді він генерує ексепшон щоб пропустити подальший код і цей код пропускається і на виході з нашої функції коли в нас є ексепшон повертається проміс, але в стані реджект із цим ексепшеном і таким чином виходить що ми можемо обробити цю ситуацію, наприклад додавши catch

console.log('Begin');
logSearchResults(Category.JavaScript);
logSearchResults(Category.Software).catch(err => console.log(err)); // тепер ми обробили цю ситуацію і в консолі буде просто app.ts:581  No books found. , не ексепшон
console.log('End');