const moviesService = require('../service/movies')
const logger = require('../logger')

class MoviesController {

    async getMovies(req, res) {

        try {
            const list = await moviesService.getMovies(req.query)
            res.status(200).json(list)
        } catch (err) {
            logger.error(err, {controller_movies: 'getMovies'})
            res.status(500).json('что-то пошло не так!')
        }
    }

}

module.exports = new MoviesController()