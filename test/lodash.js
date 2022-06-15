const _ = require('lodash')
//const _ = require('lodash/fp') //карированные
const logger = require('../logger')
let users = require('./test1/t2.json')
let text = require('./test1/t1')
//users = JSON.parse(users)
//users = JSON.stringify(users)

//императивный подход по цепочке вызываем функции
function multiple(a, b) {
    return a * b
}
function divide(a, b) {
    return a / b
}
//
// function double(num) {
//     return multiple(num, 2)
// }
//
// logger.info(multiple(2,3))
// logger.info(double(21))

//декларативный подход
//partial  //higher-order function

// function partial(fn, ...fixed) {//не кросс браузерная
//     logger.info(fixed)
//     return function (...args) {
//         logger.info(args)
//         return fn.apply(this, fixed.concat(args))
//     }
// }
// function partial(fn) {//не кросс браузерная
//     logger.info('аргумент0 ' + arguments[0] + ' аргумент1 ' + arguments[1])
//     const fixed = _.tail(arguments) //tail принимает массив и возвращает все значения кроме первого
//     return function () {
//         logger.info('fixed ' + fixed)
//         logger.info('функция ' + fn)
//         return fn.apply(this, _.concat(fixed, arguments)) //concat обьединяет в массив
//     }
// }

//partial  =================== //принимает функцию и аргументы к ней
const double = _.partial(multiple, 2)
const half = _.partialRight(divide, 2)
const half2 = _.partial(divide, _, 2) //_ первый параметр оставляем под значение 20 half2(20)

logger.info('умножаем число 21 на 2 через partial  = ' + double(21))
logger.info('делим на 2 число 20 через partialRight = ' + half(20))
logger.info('делим число 20 на 2 через partial = ' + half2(20))

//curry ====================== //функция возвращает новую функцию которая ждет остальные параметры
const curriedDivide = _.curry(divide)

logger.info('делим число 20 на 2 через curry1 = ' + curriedDivide(10, 2))
logger.info('делим число 20 на 2 через curry2 = ' + curriedDivide(10)(2))

//flow ======================= //массив функций которые вызываются последовательно и отдает функцию
const notFlatArray = [1, 2, 3, [4, 5, [6, 7, 8, 9, 10]]] //сумма 55

logger.info('не правильная сумма чисел массива вложенного = ' + _.sum(notFlatArray))

const sumFlat = _.flow([_.concat, _.flattenDeep, _.sum])
//_.concat - соединяем массивы
//_.flattenDeep - избавляемся от многоуровнивости в массиве и делает плоским
//_.sum - суммируем
logger.info('сумма чисел массива вложенного = ' + sumFlat(notFlatArray))

//logger.info(users)

////////////////////////вариант 1

const output = _(users) //в функцию lodash передаем массив данный с файла users
    .filter(u => (u.id > 20262535))//вывести больше чем 20262535
    .countBy(u => u.nickname) //ПОСЧИТАТЬ людей с одинаковыми никами и вывести эти значения
    .toPairs() //преобразовать в массивы
    .map(u => _.zipObject(['nickname', 'id'], u)) //добавить названия для значений
    .orderBy(u => u.nickname, 'desc') //отсортировать по убыванию
    .take(5)//ограничится 5 значениями
    .value()


console.log('результат1 обработки данных с файла = ', output)
//logger.info('результат обработки данных с файла = ' + JSON.stringify(output))

////////////////////вариант 2

const greaterThan = _.curryRight(_.gte) ////функция возвращает новую функцию которая ждет остальные параметры
// в обратном направлении gte - сравнивает значения
const usersIdGraterThan = num => _.conforms({ id: greaterThan(num) }) //проверяет в обьекте условие
const zip = _.curry(_.zipObject)
const output2 = _(users)
    .filter(usersIdGraterThan(20262535))
    .countBy('nickname')
    .toPairs() //преобразовать в массивы
    .map(zip(['nickname','id']))
    .orderBy('nickname', 'desc')
    .take(6)
    .value()

console.log('результат2 обработки данных с файла = ', output2)

const top5Words = _.flow([
    _.toLower,
    _.words,
    _.countBy,
    _.toPairs,
    _.partial(_.orderBy, _, 1, 'desc'),
    _.partial(_.take, _, 7),
    _.fromPairs
])
console.log('результат обработки текста с файла = ',
    top5Words(text))