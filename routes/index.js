const express = require('express');
const usersController = require('../controller/users')
const categoryController = require('../controller/category')
const newsController = require('../controller/news')
const commentsController = require('../controller/comments')
const moviesController = require('../controller/movies')
const roleMiddleware = require('../middleware/role')
const authMiddleware = require('../middleware/auth')
const {check} = require("express-validator")


const router = express.Router();
//авторизация
router.post('/registration', [
    check('nickname', "Имя пользователя не может быть пустым").notEmpty(),
    check('password', "Пароль должен быть больше 4 и меньше 10 символов").isLength({min:4, max:10})
], usersController.registration)
router.post('/login', usersController.login)
router.post('/add_role',roleMiddleware("admin"), usersController.AddRole)
//users
router.get('/users', roleMiddleware(["user", "admin"]), usersController.getUsers)
router.put('/user_update/:id', roleMiddleware(["admin"]), usersController.updateUser)
router.get('/test1_create_million_user', roleMiddleware(["admin"]), usersController.createMillionUsers)
router.get('/users/:id', usersController.getUserById)
// router.get('/users', usersController.getUsers)
router.get('/search_users', authMiddleware, usersController.searchUsers)
//category
router.get('/category/:id', categoryController.getCategoryById)
router.get('/category', categoryController.getCategories)
router.post('/category_create', roleMiddleware(["admin"]), categoryController.createCategory)
//news
router.post('/news_create', authMiddleware, newsController.createNews)
router.get('/news/:id', newsController.getNewsById)
router.get('/news', newsController.getNews)
//news
router.get('/comments/:id', commentsController.getCommentsByIdNews)
router.post('/comment_create', authMiddleware, commentsController.createComment)
//movies
router.get('/movies/get', moviesController.getMovies)


//log
//router.post('/log', logController.pushLog)





module.exports = router;