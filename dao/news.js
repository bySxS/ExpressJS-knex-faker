const db = require('../db/db')
const commentsDAO = require('../dao/comments')
//const categoryDAO = require('../dao/category')
// const usersDAO = require('../dao/users')

class NewsDAO {

    async createNews(title, category_id, user_id, text) {
        const [id] = await db('news')
            .insert({
                title,
                category_id,
                user_id,
                text
            })

        return id
    }

    async getNewsById(id) {
        const result = await db('news')
            .where('news.id', id)
            //.join('comments', 'news.id', '=', 'comments.news_id')
            .join('users', 'news.user_id', '=', 'users.id')
            .join('category', 'news.category_id', '=', 'category.id')
            .select('news.id','news.title', 'news.text', 'news.updated_at', 'news.user_id',
                'category.name as category_name', 'category.name_rus as category_name_rus',
                //'comments.id', 'comments.text', 'comments.updated_at',
                'users.nickname as author_name', 'users.full_name as author_full_name', 'users.email as author_email')

         if (result[0]) {
            result[0].comments =
                await commentsDAO.getCommentsByIdNews(result[0].id)
            // result[0].category =
            //     await categoryDAO.getCategoryById(result[0].category_id)
            // result[0].user =
            //     await usersDAO.getUserById(result[0].user_id)
        }


        return result
    }

    async getNews(limit = 10, offset = 0) {
    const news = await db('news')
        .select('*')
        .limit(limit)
        .offset(offset)
    return news
    }

}

module.exports = new NewsDAO()