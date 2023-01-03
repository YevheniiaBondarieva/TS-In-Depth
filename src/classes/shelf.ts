import { ShelfItem } from '../interfaces';

// export default class<T> { // дженерік клас
export default class<T extends ShelfItem> { // дженерік клас з обмеженням
    private items: T[] =[];
    add(item: T): void{
        this.items.push(item);
    }
    getFirst(): T{
        return this.items[0];
    }
    find(title: string): T {
        return this.items.find(item => item.title === title); // помилки поки немає обмеження будуть Property 'title' does not exist on type 'T'.
    // коли з'явилось обмеження то помилка зникла
    }
    printTitles(): void {
        this.items.forEach(item => console.log(item.title)); // помилка поки немає обмеження Property 'title' does not exist on type 'T'.
    // коли з'явилось обмеження то помилка зникла
    }
}


// import { Book, Magazine } from './../interfaces';

// export class Shelf2{ // // а якщо це буде не дженерік клас, а клас який буде обслуговувати два об'єкти
//     // спробуємо зробити так щоб цей клас обслуговував два наші типи - Book i Magazine
//      private items: (Book | Magazine)[] =[];// так буде змішаний масив із книжлк та журналів
//     private items: Book[] | Magazine[] =[]; // щоб був тип масиву який може зберігати  або Book або Magazine , тобто щось одне
//     add(item: Book | Magazine): void{ // так не підходить бо буде помилка Argument of type 'Book | Magazine' is not assignable to parameter of type 'Book & Magazine'.
//         this.items.push(item);
//     }
//     getFirst(): T{
//         return this.items[0];
//     }
// }