const db = require('../db/db')

class MoviesDAO {

    async getMovies(limit = 10, offset = 0) {
        const movies = await db('movies')
            .select('*')
            .limit(limit)
            .offset(offset)
        return movies
}

    async addMovies(list){
        await db('movies')
            .insert(list)

        return `Добавлено в БД ${list.count} фильмов`
    }

}

module.exports = new MoviesDAO()