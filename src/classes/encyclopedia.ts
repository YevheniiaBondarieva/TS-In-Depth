/* eslint-disable no-underscore-dangle */
import { positiveInteger } from '../decorators';
import { ReferenceItem } from './reference-item';


export default class extends ReferenceItem { // або так експортуємо
// export default class Encyclopedia extends ReferenceItem { // або так експортуємо

    private _copies: number;

    @positiveInteger
    get copies(): number {
        return this._copies;
    };
    set copies(value: number){
        this._copies = value;
    }

    constructor(id: number,
        title: string, // модифікаторів ставити не потрібно, бо будемо їх передавати в базовий клас а не створювати на екземплярі поточного класу
        year: number,
        public edition: number){ // тут уже можемо додати модифікатор відповідно щоб створити на цьому екземплярі
        super(id,title,year); // щоб викликати конструктор базовоого класу
    }

    override printItem(): void { // перевизначаємо метод printItem()
        super.printItem(); // викликаємо цей метод з базового класу для того щоб він робив те, що робив
        console.log(`Edition: ${this.edition} (${this.year})`);
        // ми отримаємо помилку, що властивість year недоступна.
        // Щоб властивість стала доступна,треба змінити модифікатор доступу в класі ReferenceItem з private на protected.
    }

    printCitation(): void{ // реалізація абстрактого методу printCitation з базового абстрактого класу
        console.log(`${this.title}- ${this.year}`);
    }
}