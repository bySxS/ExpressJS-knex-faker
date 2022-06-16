const db = require('../db/db')

class CategoryDAO {

    async createCategory(name, nameRus, moduleName){
        const [id] = await db('category')
            .insert({
                name,
                name_rus: nameRus,
                module_name: moduleName
            })

        return id
    }

    async getCategoryById(id){
        const result = await db('category')
            .select('*')
            .where('id', id)
        return result
    }

    async getCategories(moduleName){
        const category = await db('category')
            .select('*')
            .where('module_name', moduleName)
        return category

    }



}

module.exports = new CategoryDAO()