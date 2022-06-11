const commentsDAO = require('../dao/comments')

class CommentsService {

    createComment(Dto){
        const {news_id, user_id, text} = Dto
        return commentsDAO.createComment(news_id, user_id, text)
    }

    getCommentsByIdNews(idDto, limitDto){
        const {id} = idDto
        const {limit, offset} = limitDto
        return commentsDAO.getCommentsByIdNews(id, limit, offset)
    }

}

module.exports = new CommentsService()