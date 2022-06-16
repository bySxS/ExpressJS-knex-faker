const commentsService = require('../service/comments')
const logger = require('../logger')

class CommentsController {

    async createComment(req, res) {
        try {
            const id = await commentsService.createComment(req.body)
            res.status(201).json(id)
        } catch (err) {
            logger.error(err, {controller_comments: 'createComment'})
            res.status(500).json('что-то пошло не так!')
        }
    }

    async getCommentsByIdNews(req, res) {
        try {
            const comments_list =
                await commentsService.getCommentsByIdNews(req.params, req.query)
            res.status(200).json(comments_list)
        } catch (err) {
            logger.error(err, {controller_comments: 'getCommentsByIdNews'})
            res.status(500).json('что-то пошло не так!')
        }
    }

}

module.exports = new CommentsController()