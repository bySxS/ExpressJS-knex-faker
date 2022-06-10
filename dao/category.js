const db = require('../db/db')

class CategoryDAO {

    async createCategory(name, nameRus){
        const [id] = await db('category')
            .insert({
                name,
                name_rus: nameRus
            })

        return id
    }

    async getCategoryById(id){
        const result = await db('category')
            .select('*')
            .where('id', id)
        return result
    }

    async getCategories(){
        const category = await db('category')
            .select('*')
        return category

    }



}

module.exports = new CategoryDAO()