const categoryService = require('../service/category')
//const { faker } = require('@faker-js/faker');

class CategoryController {

    async createCategory(req, res) {

        try {

            const id = await categoryService.createCategory(req.body)
            res.status(201).json(id)

        } catch (err) {

            console.error(err)
            res.status(500).json('что-то пошло не так!')

        }

    }

    async getCategoryById(req, res) {

        try {
            const category =
                await categoryService.getCategoryById(req.params)
            res.status(200).json(category)
        } catch (err) {
            console.error(err)
            res.status(500).json('что-то пошло не так!')
        }

    }

    async getCategories(req, res) {
        try {
            const categoryList = await categoryService.getCategories()
            res.status(200).json(categoryList)
        } catch (err) {
            console.error(err)
            res.status(500).json('что-то пошло не так!')
        }
    }

}

module.exports = new CategoryController()

