import { createCustomer, getBooksByCategoryPromise } from './functions';
import { Author, Book, Person } from './interfaces';

// або так
// export type Book = {
//     id: number;
//     title: string;
//     author: string;
//     available: boolean;
//     category: Category;
// };   // це є аліас Бук



// або так
/* export type Books = {
    id: number;
    title: string;
    author: string;
    available: boolean;
    category: Category;
}[];*/


export type BookProperties = keyof Book;

export type PersonBook = Person & Book;
export type BookOrUndefined = Book | undefined;

export type BookRequiredFields = Required<Book>; // якщо так напишемо то pages і markDamaged будуть обо'язковими полями
export type UpdatedBook = Partial<Book>; // в цьому вже типі всі поля будуть не обов'язкові
export type AuthorWoEmail = Omit<Author, 'email'>; // другим параметром йде рядковий літеральний тип, де ми вкажемо що саме ми хочемо виключити
// тип AuthorWoEmail містить тільки два поля (виключився емейл) - numBooksPublished, name

export type СreateCustomerFunctionType = typeof createCustomer; // аліас для функціонального типу функції createCustomer


export type fn = (a: string, b: number, c: boolean) => symbol;
// аліаси типів Param1<T>, Param2<T>, Param3<T> повертають тип першого, другого та третього параметрів функції відповідно
export type Param1<T> = T extends (a: infer R, b: number, c: boolean) => symbol ? R : never; // використовуємо кондишіонал
export type Param2<T> = T extends (a: string, b: infer R, c: boolean) => symbol ? R : never;
export type Param3<T> = T extends (a: string, b: number, c: infer R) => symbol ? R : never;

// аліаси P1, P2, P3 за допопомгою яких отримаємо типи першого, другого та третього параметрів типу fn
export type P1 = Param1<fn>;
export type P2 = Param2<fn>;
export type P3 = Param3<fn>;

// export type RequiredProps<T extends object> = {
//     [prop in keyof T]: {} extends Pick<T, prop> ? never: prop; // поітеруватись по об'єкту і отримати ті властивості  які є обов'язковими
// // за допомогою Pick (наприклад якщо буде Pick<Book, id>) ми вибираємо ід і створюємо тип в якому є тільки ід і тоді буде {} extends id , тоді він не зможе його заекстендити якщо він буде обов'язковим полем
// // але може заекстендити якщо ід буде не обов'язковим полем
// }

// type t = RequiredProps<Book>; // тоді для тип полів що є обов'язкові стоїть рядковий літеральний тип, для тих що не обов'язкові стоїть never


export type RequiredProps<T extends object> = {
    [prop in keyof T]: {} extends Pick<T, prop> ? never: prop; }[keyof T]; // таким чином отримуємо сам тип параметрів для тип рядків які не є never

type BookRequiredProps = RequiredProps<Book>; // тоді тип буде такий type BookRequiredProps = "id" | "title" | "author" | "available" | "category"
// type BookRequiredProps = RequiredProps<number>;// якщо передамо примітивний тип то отримаємо помилку Type 'number' does not satisfy the constraint 'object'. тому що в нас стоїть обмеження що ми можемо передавати тільки об'єкт

export type OptionalProps<T extends object> = {
    [prop in keyof T]: {} extends Pick<T, prop> ? prop: never; }[keyof T];

type BookOptionalProps = OptionalProps<Book>; // тут буде тип type BookOptionalProps = "pages" | "markDamaged" , тобто отримали тип полів які є не обов'язкові


type RemoveProps <T extends object, TProps extends keyof T> ={ // використовуємо конструкцію mapped типу
    [prop in keyof T as Exclude<prop, TProps>]: T[prop] // видаляє властивості TProps з переданого типу T
};

type BookRequiredPropsType  = RemoveProps<Book, BookOptionalProps>;// хочемо створити типи які мають тільки обов'язкові поля
type BookOptionalPropsType = RemoveProps<Book, BookRequiredProps>;// хочемо створити типи які мають тільки необов'язкові поля

// умовний тип
// За допомогою infer компілятор гарантує, що ви явно оголосили всі змінні типу
// за допомогою такого коду можемо витягти тип значення промісу
export type Unpromisify<T> = T extends Promise<infer R> ? R: never;
export type UnArray<T> = T extends Array<infer R> ? R: never;

// Отримали тип значення функції getBooksByCategoryPromise(), що повертається
// type pr = Unpromisify<ReturnType<typeof getBooksByCategoryPromise>>; // type pr = string[]
type pr =UnArray<Unpromisify<ReturnType<typeof getBooksByCategoryPromise>>>; // type pr = string