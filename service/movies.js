const moviesDAO = require('../dao/movies')

class MoviesService {

    getMovies(Dto){
        const {limit, offset} = Dto
        return moviesDAO.getMovies(limit, offset)
    }

    addMovies(Dto){
        return moviesDAO.addMovies(Dto)
    }

}

module.exports = new MoviesService()