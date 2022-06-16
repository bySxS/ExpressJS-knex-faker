const fs = require('fs')
const axios = require('axios');

const API_URL = "https://imdb-api.com/ru/API/InTheaters/k_7rok4r7w"

const GetApi = async (API_URL) => {
    try {
    const res = await axios.get(API_URL)
    return res.data
    } catch (e) {
        return String(e)
    }

}

function SaveToFile(pathToSave = '', data) {
    if (pathToSave === '') return 'путь сохранения не указан'
    try {
        fs.writeFileSync(pathToSave, data, {encoding: 'utf8'})
        return 'Успешно сохранено в файл'
    } catch (err) {
        return String(err)
    }
}

async function start() {
    const data = await GetApi(API_URL)
    const res = SaveToFile('./test/test1/movies.json', JSON.stringify(data))
    return console.log(res)
}
start()

// GetApi(API_URL).then(value => {
//     SaveToFile('./test/test1/movies.json', JSON.stringify(value))
//         .then(res => console.log(res), err => console.log(err))
//     }, error => {
//     console.log(error)
// })




