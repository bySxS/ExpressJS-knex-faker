const express = require('express');
const usersController = require('../2controller/users')
const categoryController = require('../2controller/category')
const newsController = require('../2controller/news')
const commentsController = require('../2controller/comments')


const router = express.Router();

//users
router.post('/user_create', usersController.createUser)
router.put('/user_update', usersController.updateUser)
router.get('/test1_create_million_user', usersController.createMillionUsers)
router.get('/users/:id', usersController.getUserById)
router.get('/users', usersController.getUsers)
router.get('/search_users', usersController.searchUsers)
//category
router.get('/category/:id', categoryController.getCategoryById)
router.get('/category', categoryController.getCategories)
router.post('/category_create', categoryController.createCategory)
//news
router.post('/news_create', newsController.createNews)
router.get('/news/:id', newsController.getNewsById)
router.get('/news', newsController.getNews)
//news
router.get('/comments/:id', commentsController.getCommentsByIdNews)
router.post('/comment_create', commentsController.createComment)





module.exports = router;