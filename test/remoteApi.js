const fs = require('fs')
const axios = require('axios');

const API_URL = "https://imdb-api.com/ru/API/InTheaters/k_7rok4r7w"

async function GetApi(API_URL) {
    try {
    const res = await axios.get(API_URL)
    return Promise.resolve(res.data)
    } catch (e) {
        return Promise.reject(String(e))
    }

}

async function SaveToFile(pathToSave = '', data) {
    if (pathToSave === '') return Promise.reject('путь сохранения не указан')
    try {
        fs.writeFileSync(pathToSave, data, {encoding: 'utf8'})
        return Promise.resolve('Успешно сохранено в файл')
    } catch (err) {
        return Promise.reject(String(err))
    }
}

GetApi(API_URL).then(value => {
    SaveToFile('./test/test1/movies.json', JSON.stringify(value))
        .then(res => console.log(res), err => console.log(err))
    }, error => {
    console.log(error)
})




