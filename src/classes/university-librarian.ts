import { logMethod, logParameter, logger, sealed, writable, format } from '../decorators';
import * as Interfaces from './../interfaces';


// interface A { // нехай в нас є деякий інтерфейс де є властивість a і потім наш клас потім її реалізує
//     a: number;}

// @sealed('UniversityLibrarian') // викликаємо декоратор і наприклад передамо якісь стрінг
// @logger // так як це є декоратор, а не фабрична функція то ніяких круглих дужок не потрібно і ніяких даних не задаємо
class UniversityLibrarian implements Interfaces.Librarian // клас UniversityLibrarian, який реалізує інтерфейс Librarian та всі необхідні властивості
// , A    // а тепер це буде означати що наш клас буде реалізувати два інтерфейси
// eslint-disable-next-line brace-style
{
    @format()
    name: string;
    email: string;
    department: string;
    a: number =1; // наприклад якщо наш клас буде мати ще одну властивість але коли захочемо викликати через favoriteLibrarian. то її не буде тому що її немає в інтерфейсі
    // // тому що ми вказали в типі інтерфейс Librarian і тому він фільтрує поля

    @logMethod
    assistCustomer(@logParameter custName: string, @logParameter bookTitle: string): void { // реалізація методу
        console.log(`${this.name} is assisting ${custName} with book ${bookTitle}`); // однва властивість - name і два параметри - custName,bookTitle
    }; // цей метод знаходиться в прототипі

    // @writable(true) // 3адекорували метод assistFaculty() як змінний
    // static assistFaculty(): void{
    assistFaculty(): void{
        console.log('Assisting faculty');
    }
    // @writable(false) // 3адекорували метод assistFaculty() як незмінний
    teachCommunity(): void{
        console.log('Teaching community');
    }
}

export {UniversityLibrarian};