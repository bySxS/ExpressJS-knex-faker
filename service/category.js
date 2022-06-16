const categoryDAO = require('../dao/category')

class CategoryService {

    createCategory(Dto){
        const {name, nameRus, moduleName} = Dto
        return categoryDAO.createCategory(name, nameRus, moduleName)
    }

    getCategoryById(Dto){
        const {id} = Dto
        return categoryDAO.getCategoryById(id)
    }

    getCategories(Dto){
        const {moduleName} = Dto
        return categoryDAO.getCategories(moduleName)
    }

}

module.exports = new CategoryService()

