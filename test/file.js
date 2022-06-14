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

///////////////////////sync

// try {
//     let result = fs.readFileSync('./test/t2.json')
//     result = JSON.parse(result.toString())
//     logger.info(result[1].nickname)
// }
// catch (err) {
//     logger.error(err)
// }

///////////////////////sync

// try {
//     let arr = fs.readFileSync('./test/t1.js')
//     arr = arr.toString().split("\r")
//     logger.info(arr[1][6] + arr[1][7])
//     arr.map((val, i) => {
//         logger.info(`${i} = ${val}`);
//     })
//     arr = arr.filter((val, i) => {
//         return 0 != i
//     })
//     logger.info(arr)
// }
// catch (err) {
//     logger.error(err)
// }


function ReadDirRecurs(dir, limRecurs = 3) {
    let results = []
    limRecurs --
    if (dir === '') return results
    if ((dir[dir.length-1] === '/') && (dir.length > 1))
        dir = dir.slice(0, -1)
    let list = fs.readdirSync(dir)
    list.forEach((file) => {
        file = dir + '/' + file
        let stat = fs.statSync(file)
        if (stat && stat.isDirectory()) {
            //это папка
            results.push(file)
            if (1 <= limRecurs){//лимит
                //реккурсивно заходим в следующую папку
                results = results.concat(ReadDirRecurs(file, limRecurs))
            }
        } else {
            //это файл
            results.push(file)
        }
    })
    return results
}

console.log(ReadDirRecurs('./test/', 3))

module.exports = [ReadDirRecurs];
