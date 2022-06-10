const newsDAO = require('../dao/news')

class NewsService {

    createNews(Dto){
        const {title, category_id, user_id, text} = Dto
        return newsDAO.createNews(title, category_id, user_id, text)
    }

    getNewsById(Dto){
        const {id} = Dto
        return newsDAO.getNewsById(id)
    }

    getNews(Dto){
        const {limit, offset} = Dto
        return newsDAO.getNews(limit, offset)
    }


}

module.exports = new NewsService()