const db = require('../db/db')
const commentsService = require('../3service/comments')
const categoryDAO = require('../4dao/category')
const usersDAO = require('../4dao/users')

class NewsDAO {

    async createNews(title, category_id, user_id, text){
        const [id] = await db('news')
            .insert({
                title,
                category_id,
                user_id,
                text
            })

        return id
    }

    async getNewsById(id){
        const result = await db('news')
            .select('*')
            .where('id', id)

        if (result[0]) {
            result[0].comments =
                await commentsService.getCommentsByIdNews(result[0])
            result[0].category =
                await categoryDAO.getCategoryById(result[0].category_id)
            result[0].user =
                await usersDAO.getUserById(result[0].user_id)
        }


        return result
    }

    async getNews(limit = 10, offset = 0){
    const news = await db('news')
        .select('*')
        .limit(limit)
        .offset(offset)
    return news
    }

}

module.exports = new NewsDAO()