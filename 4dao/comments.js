const db = require('../db/db')

class CommentsDAO {

    async createComment(news_id, user_id, text){
        const [id] = await db('comments')
            .insert({news_id, user_id, text})

        return id
    }

    async getCommentsByIdNews(id){
        const result = await db('comments')
            .select('*')
            .where('news_id', id)
        return result
    }

}

module.exports = new CommentsDAO()