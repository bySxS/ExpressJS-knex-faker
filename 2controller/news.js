const newsService = require('../3service/news')
const { faker } = require('@faker-js/faker');

class NewsController {

    async createNews(req, res) {
        try {
            const id = await newsService.createNews(req.body)
            res.status(201).json(id)
        } catch (err) {
            console.error(err)
            res.status(500).json('что-то пошло не так!')
        }
    }

    async getNewsById(req, res) {

        try {
            const news = await newsService.getNewsById(req.params)
            res.status(200).json(news)
        } catch (err) {
            console.error(err)
            res.status(500).json('что-то пошло не так!')
        }

    }

    async getNews(req, res){
        try {
            const getNews = await newsService.getNews(req.query)
            res.status(200).json(getNews)
        } catch (err) {
            console.error(err)
            res.status(500).json('что-то пошло не так!')
        }
    }


}

module.exports = new NewsController()