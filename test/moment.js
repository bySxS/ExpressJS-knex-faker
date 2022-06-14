const moment = require('moment')
const logger = require('../logger')

moment.locale('ru')
logger.info('дата в формате ' + moment('2022/02/10 13:10').format('Q квартал DD.MM.YYYY HH:mm X'))
const date = {
    year: 2007,
    day: 20,
    month: 6, //с нуля
    h: 22,
    m: 15,
    s: 37
}
const format = 'Q квартал DD.MM.YYYY HH:mm X'
let tim = moment(date)
logger.info('дата в формате ' + tim.format(format))

logger.info('день месяца ' + tim.date()) //день месяца
logger.info('день недели ' + tim.get('day')) //день недели
logger.info('год ' + tim.year()) //год
let newTim = tim.year(2009).month(7) //устанавливаем новый год и месяц(с нуля)
newTim.set('month', 5)
newTim.set({
    h: 23,
    m: 45
})
newTim.add(3, 'day').add(-1, 'month')//добавляем три дня
newTim.add({
    day: 1,
    months: 2,
    hour: -1,
    minute: 20
})

let m = newTim.clone() //клон вариант 1
let m2 = moment(tim)   //клон вариант 2

m.year(2008)
m2.year(2006)

logger.info('новая дата в строке ' + newTim.format(format))
logger.info('новая дата в часовом формате ' + tim.toDate())

logger.info('клон 1 дата ' + m.format(format))
logger.info('клон 2 в часовом формате ' + m2.toDate())

m = moment().startOf('week')
m2 = moment().endOf('year')

logger.info('начало текущей неделе ' + m.format(format))
logger.info('конец текущего года ' + m2.toDate())


logger.info('неделя началась ' + m.fromNow())
logger.info('конец текущего года ' + m2.fromNow())

logger.info('разница в неделях между датами ' + m2.diff(m, 'week'))


logger.info('является ли дата будущей ' + m2.isAfter(m))
logger.info('является ли дата прошлой ' + m2.isBefore(m))


logger.info('является ли сегоднешняя дата между датами ' + moment().isBetween(m, m2))

logger.info('валидная ли дата 2022/30/30 ' + moment('2022/30/30').isValid())
