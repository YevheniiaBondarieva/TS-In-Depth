enum Category {
    JavaScript,
    CSS,
    HTML,
    TypeScript,
    Angular,
    Software
}
// коли ще не додали експорт і просто перенесли цю категорію, це ще не є модуль, а скриптовий файл .
// Помилки стосовно відсутності Категорії зникли бо enum Category є глобальним, так як і неймспейси і   app.ts бачить його


export {Category}; // коли додали експорт то помилки стосовно відсутності категорії знов з'явились
// тому що цей файл тепер є модуль і це вже не глобальна сутність, це стуність яка належить цьому модулю
// потрібно ще буде імпортувати, щоб помилки зникли