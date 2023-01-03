import { Category } from './enums';

interface Book {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
    pages?: number;
    // markDamaged?: (reason: string) => void; // оголошуємо метод способом як функціональний тип, це як комбінація типів параметрів і типу повертаємого значення
    // це був перший варіант оголошення методу
    // markDamaged?(reason: string): void; // другий спосіб оголошення методу, тс дійсно визначає це як метод
    markDamaged?: DamageLogger; // ще один варіант оголошення методу, вказуємо інтерфейс який описує функціональний тип
} // це є інтерфейс Бук

interface DamageLogger{ // цей інтерфейс буде для функціонального типу
    (reason: string): void;
}

interface Person{
    // name?: string;
    name: string;
    email: string;}
interface Author extends Person {
    numBooksPublished: number;
    // name: string;
}


// const author: Author ={
//     email: 'fjfj@gmail',
//     // name: 'Jihf', name в цьому випадку є обо'язкове
//     numBooksPublished: 2
// }

interface A {
    [prop: string]: string | number;
}

interface Librarian extends Person {
    department: string;
    assistCustomer: (custName: string,bookTitle: string) => void; // функціональний тип
}

interface TOptions {
    duration?: number;
    speed?: number;
}

interface Magazine { // це не дженерік інтерфейс
    title: string;
    publisher: string;
}

interface ShelfItem{
    title: string;
}

interface LibMgrCallback { // інтерфейс для функції зворотного виклику
    // якщо подивитись на інтерфейс, то ми можемо їх використовувати для тих колбеків, у яких є другий параметр
    (err: Error | null, titles: string[] | null): void; // перший параметр- об'єкт Error або null
}

interface Callback<T>{ // дженерік інтерфейс для функції зворотного виклику
    (err: Error | null, data: T | null): void;
}

export {Author, LibMgrCallback,Callback, ShelfItem , Magazine, TOptions, Librarian, Person, Book, A, DamageLogger as Logger};