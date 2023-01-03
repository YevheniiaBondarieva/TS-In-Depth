/* eslint-disable no-redeclare */

import { Category } from './enums';
import { Book, Callback, LibMgrCallback, TOptions } from './interfaces';
import { BookOrUndefined, BookProperties } from './types';
import RefBook from './classes/encyclopedia';

// Щоб додати експорт на початку кожної функції,  в VScode виділяємо слово function і нажимаємо CTRL + d
// тоді з`являються курсори і ми опускаємось по файлу, дивимось де курсор і нажимаємо в кінці слова CTRL + d
// або просто зажимаємо кнопку і потім відпускаємо і вниз прокручуємо щоб мигало, тоді ми можемо мигалку наперед пересунути стрілочками і прописати що треб

export function getAllBooks(): readonly Book[] {
    /* якщо було б отак
export function getAllBooks(): Book[] {
    const books: Book[] = <const> [
    то помилка булаThe type 'readonly [{ readonly id: 1; readonly, ... не може бути присовєний до типу Book бо він є мутабельний , неможливо до мутабельного типу присвоєти константу
        */
    // const books: Book[] = [
    // const books: Books = [
    // якщо б в масиві було б ще щось окрім об'єктів, наприклад число то запис був би такий const books: (Book | number)[] = [
    const books = <const>[
        {
            id: 1,
            title: 'Refactoring JavaScript',
            category: Category.JavaScript,
            author: 'Evan Burchard',
            available: true,
        },
        {
            id: 2,
            title: 'JavaScript Testing',
            category: Category.JavaScript,
            author: 'Liang Yuxian Eugene',
            available: false,
        },
        { id: 3, title: 'CSS Secrets', category: Category.CSS, author: 'Lea Verou', available: true },
        {
            id: 4,
            title: 'Mastering JavaScript Object-Oriented Programming',
            category: Category.JavaScript,
            author: 'Andrea Chiarelli',
            available: true,
        },
    ];
    return books;
}

export function logFirstAvailable(books: readonly Book[] = getAllBooks()): void {
    console.log(`Number of books: ${books.length}`);
    // можна через forEach знайти книгу - цей спосіб вимагає щоб ми перебрали всі елементи, але він не знаходить перший, ми повинні додати тоді якусь бізнес логіку чи це є перший
    // можна через filter - цей спосіб не повертає перший, а повертає всі
    // використаємо find щоб знайти відповідний елемент в масиві і отримати його в якості результату , цей спосіб повертає перший який задовільняє критерію
    const title = books.find(({ available }) => available)?.title; // тут використали диструктиризацію (її можна застосовувати як для об'єкту, так і для масиву)
    // або так const title= books.find(book => book.available === true)?.title;
    // поставили знак питання бо якщо все буде фолс, то тоді вилізе андефайнед і всластивість тайтл ми не зможемо взяти , вилізе помилка тоді
    // з знаком питанням, коли уде фолс тоді просто поверне андефайнед
    console.log(`First available book: ${title}`);
}

export function getBookTitlesByCategory(inputCategory: Category = Category.JavaScript): string[] {
    const books = getAllBooks();
    return (
        books
            .filter(book => book.category === inputCategory)
            // або так .filter(({category}) => category === inputCategory)
            .map(({ title }) => title)
    ); // map перетворить  наші об'єкти  в рядки
    // або так .map(book => book.title);
}

export function logBookTitles(titles: Array<string>): void {
    titles.forEach(title => console.log(title));
}

export function getBookAuthorByIndex(index: number): [title: string, author: string] {
    const books = getAllBooks();
    const { title, author } = books[index]; // дестриктуризація, ці змінні аідповідають властивостям нашого об'єкта
    return [title, author];
}

export function calcTotalPages(): void {
    const data = <const>[
        { lib: 'libName1', books: 1_000_000_000, avgPagesPerBook: 250 },
        { lib: 'libName2', books: 5_000_000_000, avgPagesPerBook: 300 },
        { lib: 'libName3', books: 3_000_000_000, avgPagesPerBook: 280 },
    ];
    const r = data.reduce((acc: bigint, obj) => {
        // акумлятор і об'єкт, можна любу назву прописати,  тут тип в об'єкта не ставимо бо хочемо властивості юзати, тип автоматично створеться кастомний
        return acc + BigInt(obj.books) * BigInt(obj.avgPagesPerBook);
    }, 0n);
    // map не підходить, бо є правило якщо його до масиву застосовуємо то на виход масив з такою ж самою кількістю елементів
    // reduce зводить до одного елемента, числа
    // можна і forEach який пробіжиться по масиву, перемножить одне до другого, додасть і получимо результат
    console.log(r);
}

export function createCustomerID(name: string, id: number): string {
    return `${id}/${name}`;
}

export function createCustomer(name: string, age?: number, city?: string): void {
    console.log(`Customer name: ${name}`);
    if (age) {
        console.log(`Cusomer age: ${age}`);
    }
    if (city) {
        console.log(`Cusomer city: ${city}`);
    }
}

export function getBookByID(
    // id: number): Book{
    id: Book['id'], // беремо тип властивості
): BookOrUndefined {
    // Book | undefined {
    const books = getAllBooks();
    return books.find(book => book.id === id);
}

export function сheckoutBooks(customer: string, ...bookIDs: number[]): string[] {
    console.log(`Customer name: ${customer}`);
    return bookIDs
        .map(id => getBookByID(id))
        .filter(book => book.available)
        .map(book => book.title);
    // bookIDs - масив , map щоб перейти від ід до книг, але взагаліто так не вірно бо якщо ця функція getBookByID() повертає декілька тисяч книг
    // бо по ід кожен раз будем отримувати тисючу і шукати там ці книги, для малих масивів це допустимо, а для великих не допустимо
    // за допомогою цього map ми отримуємо книги
    // серед цих книг на потрібно залишити тільки ті є які є доступні, це можна зробити за допомогою filter
    // map знову робимо перетворення елемента з книги на заголовок
}

export function getTitles(author: string): string[]; // сигнатури суто для інтерпретатора щоб він зрозумів які типи ми задаємо , в реалізації ці назви аргументів не використовуються
export function getTitles(available: boolean): string[];
export function getTitles(id: number, available: boolean): string[];
// export function getTitles(...args: any[]):string[] { або так
export function getTitles(...args: [string | boolean] | [number, boolean]): string[] {
    // або так , це означає що ось це [number, boolean] є тюпл  і відповідає третій сигнатурі
    // [string | boolean] ось це відповідає першій і 2 сигнатурі, або стрінг або буліан
    // рест параметр описує масив , можна було б вказати як два аргументи але тоді один треба було робити необов'язковим
    const books = getAllBooks();
    if (args.length === 1) {
        const [arg] = args; // можемо скористатись деструктиризацією , можемо також як args[0] присвоєти якійсь змінній
        if (typeof arg === 'string') {
            return books.filter(book => book.author === arg).map(book => book.title);
            // filter поверне нам масив книг, тому ми використовуємо map щоб оримати заголовки
        } else if (typeof arg === 'boolean') {
            return books.filter(book => book.available === arg).map(book => book.title);
        }
    } else if (args.length === 2) {
        const [id, available] = args;
        if (typeof id === 'number' && typeof available === 'boolean') {
            // цю перевірку впринципі можна не писати, вона лишня, тому що в нас сигнатура така одна і достатньо буде перевірити що в нас є два аргументи
            return books.filter(book => book.id === id && book.available === available).map(book => book.title);
        }
    }
}

export function assertStringValue(data: any): asserts data is string {
    if (typeof data !== 'string') {
        throw new Error('value should have been a string');
    }
}

export function assertRefBookInstance(condition: any): asserts condition {
    if (!condition) {
        throw new Error('It is not an instance of RefBook');
    }
}

export function bookTitleTransform(title: any): string {
    assertStringValue(title);
    return [...title].reverse().join(''); // [...title] таким чином рядок перетворюємо в масив
}

export function printBook(book: Book): void {
    console.log(`${book.title} by ${book.author}`);
}

// ця функція працює для конкретного типу
export function getProperty(book: Book, prop: BookProperties): any {
    const value = book[prop];
    return typeof value === 'function' ? value.name : value;
}


// дженерік функція
// ДРУГИЙ ВИД ОБМЕЖЕНЬ - стосується об'єднання (обмеження по конкретним типам які будуть юзатись)
// будемо задавати який саме об'єкт функція буде приймати
// будуть нашими двома параметрами типу TObject, TKey
// export function getObjectProperty<TObject, TKey>(){ // в такому варіанті виходить коли будемо підставляти TKey ми можемо підставити будь-який тип, а нам такий варіант не підходить.
// Нам потрібно щоб той тип який ми підставляємо був одним із властивостей об'єкта TObject
export function getObjectProperty<TObject, TKey extends keyof TObject>(obj: TObject, prop: TKey): TObject[TKey] | string { // тому пишемо ось так
// TObject[TKey] це буде тип для конкретного поля чи конкретної властивості, наприклад якщо TKey буде ід то TObject[TKey] буде number
    const value = obj[prop];
    return typeof value === 'function' ? value.name : value;
}

export function setDefaultConfig(options: TOptions) {
    options.duration ??= 100; // перевіряємо чи duration є  undefined чи null
    // якщо options.duration буде undefined чи null тоді присвоюємо дефолтне значення
    options.speed ??= 60;
    return options;
    // якщо ця функція не буде повертати об'єкт options, то об'єкт options зміниться який ми передаємо на вхід функції
}

export function printRefBook(data: any): void {
    assertRefBookInstance(data instanceof RefBook);
    data.printItem();
}

export function purge<T>(inventory: Array<T>): Array<T> { // для того щоб об'явити масив можна використовувати іншу форму - T[] замість Array<T>
    return inventory.slice(2);// приходить в іnventory деякий масив і нам потрібно повернути масив без двох елементів
}

// export function getBooksByCategory(category: Category, callback: LibMgrCallback): void{ // такий варіант
export function getBooksByCategory(category: Category, callback: Callback<string[]>): void{ // і такий варіант. Результат буде той же самий

    setTimeout(() => {// setTimeout - операція яка виконується асинхронно
        try{
            const titles = getBookTitlesByCategory(category); // використали функцію getBookTitlesByCategory() для отримання заголовків книг за категорією
            if(titles.length > 0){
                callback(null, titles); // Якщо знайшли книги, то викликали функцію зворотного виклику та передали два параметри: null та знайдені книги
            } else {
                throw new Error('No books found.'); // Якщо не знайшли книг, то кинули виняток
            }
        } catch(error) {
            callback(error, null); // викликали функцію зворотного виклику та передали два параметри error і null.
        }
    }, 2000);
}

export function logCategorySearch(err: Error | null, titles: string[] | null): void{
    if(err){
        console.log(err.message); // ми перевірили чи є err і відповідно викликали властивість message у об'єкта Error
    } else {
        console.log(titles);
    }
}


// функція getBooksByCategoryPromise(), яка приймає один параметр – category та повертає проміс – масив заголовків книг
export function getBooksByCategoryPromise(category: Category): Promise<string[]> {
    const p: Promise<string[]> = new Promise((resolve, reject) =>{
        setTimeout(() => {

            const titles = getBookTitlesByCategory(category);
            if(titles.length > 0){
                resolve(titles); // замість того щоб викликати колбек як функції getBooksByCategory ми змінимо стан промісу
            } else {
                reject('No books found.'); // Замість того щоб кидати помилку як в функції getBooksByCategory ми викликаємо reject
            }
        }, 2000);
    });
    return p;
}

// асинхронна функція яка використовує функцію getBooksByCategoryPromise, отримувала та виводить в консоль кількість знайдених книг
export  async function logSearchResults(category: Category){ // всередину функції теж можна додати try/catch для обробки. Але якщо ми весь код всередині завернемо в try то так не можна робити, бо так з'являється ще один рівень вложення, можна просто додати catch вже коли функція завержить свою роботу, так як ми зробили в файлі app.ts
    const titles = await getBooksByCategoryPromise(category);
    // const titles2 = await getBooksByCategoryPromise(titles); // наприклад послідовне виконання асинхронних функцій
    console.log(titles.length);
    // return titles; // тип повернутого значення буде Promise<string[]>
    return Promise.resolve(titles); // тип повертаємого значення буде той же  - Promise<string[]>
    // await Promise.all([p1,p2,p3]) // це коли паралельні асинхронні операції. Якщо ми поставимо await перед кожним промісом то це буде те ж саме що вони будуть виконуватись послідовно, тому що кожен авейт буде чекати результату промісу і запускати так по кроках
}