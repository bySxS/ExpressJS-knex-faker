const fs = require('fs')
const logger = require('../logger')

// fs.readFile('./test/test1/t2.json',
//     (err, data) => {
//     if (err) logger.error(err)
//     let result = JSON.parse(data.toString())
//     logger.info(result[1].nickname)
//
// })
//
// fs.readFile('./test/test1/t1.js',
//     (err, data) => {
//         if (err) logger.error(err)
//         let arr = data.toString()
//         arr = arr.split("\r")
//         logger.info(arr)
//     })

///////////////////////sync

// try {
//     let result = fs.readFileSync('./test/test1/t2.json')
//     result = JSON.parse(result.toString())
//     logger.info(result[1].nickname)
// }
// catch (err) {
//     logger.error(err)
// }

///////////////////////sync

// try {
//     let arr = fs.readFileSync('./test/test1/t1.js')
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
    if ((dir[dir.length-1] === '/') && (dir.length > 1)) dir = dir.slice(0, -1)
    let list = fs.readdirSync(dir)
    list.forEach((file) => {
        file = dir + '/' + file
        let stat = fs.statSync(file)
        if (stat) {
            results.push(file)
            if ((1 <= limRecurs) && stat.isDirectory())//лимит
                results = results.concat(ReadDirRecurs(file, limRecurs))//реккурсивно заходим в следующую папку
        }
    })
    return results
}

console.log(ReadDirRecurs('./test/', 3))

module.exports = [ReadDirRecurs];
