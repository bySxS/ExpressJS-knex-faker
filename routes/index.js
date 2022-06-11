const express = require('express');
const usersController = require('../controller/users')
const categoryController = require('../controller/category')
const newsController = require('../controller/news')
const commentsController = require('../controller/comments')


const router = express.Router();

//users
router.post('/user_create', usersController.createUser)
router.put('/user_update/:id', usersController.updateUser)
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