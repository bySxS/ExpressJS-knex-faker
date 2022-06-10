const commentsService = require('../service/comments')
//const { faker } = require('@faker-js/faker');

class CommentsController {

    async createComment(req, res) {
        try {
            const id = await commentsService.createComment(req.body)
            res.status(201).json(id)
        } catch (err) {
            console.error(err)
            res.status(500).json('что-то пошло не так!')
        }
    }

    async getCommentsByIdNews(req, res) {
        try {
            const comments_list =
                await commentsService.getCommentsByIdNews(req.params)
            res.status(200).json(comments_list)
        } catch (err) {
            console.error(err)
            res.status(500).json('что-то пошло не так!')
        }
    }

}

module.exports = new CommentsController()