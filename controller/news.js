const newsService = require('../service/news')
const logger = require('../logger')
//const { faker } = require('@faker-js/faker');

class NewsController {

    async createNews(req, res) {
        try {
            const id = await newsService.createNews(req.body)
            res.status(201).json(id)
        } catch (err) {
            logger.error(err, {controller_news: 'createNews'})
            res.status(500).json('что-то пошло не так!')
        }
    }

    async getNewsById(req, res) {

        try {
            const news = await newsService.getNewsById(req.params)
            res.status(200).json(news)
        } catch (err) {
            logger.error(err, {controller_news: 'getNewsById'})
            res.status(500).json('что-то пошло не так!')
        }

    }

    async getNews(req, res){
        try {
            const getNews = await newsService.getNews(req.query)
            res.status(200).json(getNews)
        } catch (err) {
            logger.error(err, {controller_news: 'getNews'})
            res.status(500).json('что-то пошло не так!')
        }
    }


}

module.exports = new NewsController()