const categoryDAO = require('../dao/category')

class CategoryService {

    createCategory(Dto){
        const {name, nameRus} = Dto
        return categoryDAO.createCategory(name, nameRus)
    }

    getCategoryById(Dto){
        const {id} = Dto
        return categoryDAO.getCategoryById(id)
    }

    getCategories(){
        return categoryDAO.getCategories()
    }

}

module.exports = new CategoryService()

