const fs = require('fs')
const logger = require('../logger')

// fs.readFile('./test/t2.json',
//     (err, data) => {
//     if (err) logger.error(err)
//     let result = JSON.parse(data.toString())
//     logger.info(result[1].nickname)
//
// })
//
// fs.readFile('./test/t1.txt',
//     (err, data) => {
//         if (err) logger.error(err)
//         let arr = data.toString()
//         arr = arr.split("\r")
//         logger.info(arr)
//     })

try {
    let result = fs.readFileSync('./test/t2.json')
    result = JSON.parse(result.toString())
    logger.info(result[1].nickname)
}
catch (err) {
    logger.error(err)
}


try {
    let arr = fs.readFileSync('./test/t1.txt')
    arr = arr.toString().split("\r")
    logger.info(arr[1][6] + arr[1][7])
    arr.map((val, i) => {
        logger.info(`${i} = ${val}`);
    })
    arr = arr.filter((val, i) => {
        return 0 != i
    })
    logger.info(arr)
}
catch (err) {
    logger.error(err)
}
