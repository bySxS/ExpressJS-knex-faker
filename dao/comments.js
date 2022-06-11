const db = require('../db/db')

class CommentsDAO {

    async createComment(news_id, user_id, text){
        const [id] = await db('comments')
            .insert({news_id, user_id, text})

        return id
    }

    async getCommentsByIdNews(id, limit = 10, offset = 0){
        const result = await db('comments')
            .where('news_id', id)
            .select('*')
            .limit(limit)
            .offset(offset)

        return result
    }

}

module.exports = new CommentsDAO()