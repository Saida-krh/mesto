
import '../pages/index.css'; // добавьте импорт главного файла стилей 
console.log('Hello, World!') 


const numbers = [2, 3, 5];

// Стрелочная функция. Не запнётся ли на ней Internet Explorer?
const doubledNumbers = numbers.map(number => number * 2);

console.log(doubledNumbers); // 4, 6, 10 