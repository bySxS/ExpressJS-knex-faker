const commentsDAO = require('../4dao/comments')

class CommentsService {

    createComment(Dto){
        const {news_id, user_id, text} = Dto
        return commentsDAO.createComment(news_id, user_id, text)
    }

    getCommentsByIdNews(Dto){
        const {id} = Dto
        return commentsDAO.getCommentsByIdNews(id)
    }

}

module.exports = new CommentsService()