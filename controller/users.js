const usersService = require('../service/users')
const logger = require('../logger')
const { faker } = require('@faker-js/faker')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config()
const { validationResult } = require('express-validator')


const generateAccessToken = (id, nickname, roles) => {
    const payload = {
        roles,
        id,
        nickname
    }

    const jwtRes = jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "24h"} )
    return jwtRes
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function makeid(length) {
    let result           = '';
    const characters       = 'abcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() *
            charactersLength));
    }
    return result;
}


class UsersController {

    async AddRole(req, res) {
        try {
            const result = await usersService.AddRole(req.body)
            res.status(201).json(result)
        } catch (err) {
            logger.error(err, {controller_users: 'AddRole'})
            res.status(500).json('что-то пошло не так!')
        }
    }

    async login(req, res) {
        try {
            const {password, nickname} = req.body
            const user = await usersService.getUserByNickname(req.body)
            if (!user) {
                return res.status(400)
                    .json({message: `Пользователь ${nickname} не найден`})
            }
            const roles = await usersService.getRoleById(user)
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400)
                    .json({message: `Введен неверный пароль`})
            }
            const token = generateAccessToken(user.id, user.nickname, roles.name)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    async registration(req, res) {

        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400)
                    .json({message: "Ошибка при регистрации", errors})
            }
            const result = await usersService.registration(req.body)
            res.status(201).json(result)

        } catch (err) {
            logger.error(err, {controller_users: 'registration'})
            res.status(500).json('что-то пошло не так!')

        }

    }

    async createMillionUsers(req, res) {

        try {
            //logger.info('очищаем таблицу users')
            //await usersService.deleteAllUsers()

            const start = new Date().getTime()
            let users = []
            const hashPassword = bcrypt.hashSync('123', 7);
            for (let i = 0; i < 10; i++) {
                logger.info(`${i} генерируем`, {controller_users: 'createMillionUsers'})
                users = []

            for (let i = 0; i < 100000; i++) {
                users.push({
                    nickname: faker.internet.userName() + getRandomInt(1000),
                    full_name: faker.name.findName(),
                    email: makeid(5) + faker.internet.email(),
                    roles_id: 2,
                    password: hashPassword
                })
            }
                logger.info(`${i} добавляем в бд`, {controller_users: 'createMillionUsers'})
                await usersService.createUsers(users)
            }

            const end = new Date().getTime()

            res.status(201)
                .json(`10000000 users добавленно в БД, время выполнения - ${end - start}ms`)

        } catch (err) {

            logger.error(err, {controller_users: 'createMillionUsers'})
            res.status(500).json('что-то пошло не так!')

        }

    }

    async updateUser(req, res) {

        try {

            const id = await usersService.updateUser(req.params, req.body)
            res.status(201).json(`данные пользователя с id ${id} будут изменены через 1 минуту`)
        } catch (err) {
            logger.error(err, {controller_users: 'updateUser'})
            res.status(500).json('что-то пошло не так!')
        }

    }

    async getUsers(req, res) {

        try {
            const listUsers = await usersService.getUsers(req.query)
            //console.log('2',listUsers)
            //res.status(200).send(listUsers)
            res.status(200).json(listUsers)
        } catch (err) {
            logger.error(err, {controller_users: 'getUsers'})
            res.status(500).json('что-то пошло не так!')
        }
    }

    async searchUsers(req, res) {

        try {
            //const start = new Date().getTime();
            const listUsers = await usersService.searchUsers(req.query)
            //const end = new Date().getTime();
            //logger.info(`время выполнения - ${end - start}ms`, {controller_users: 'searchUsers'})
            res.status(200).json(listUsers)
        } catch (err) {
            logger.error(err, {controller_users: 'searchUsers'})
            res.status(500).json('что-то пошло не так!')
        }
    }

    async getUserById(req, res) {
        try {
            const User = await usersService.getUserById(req.params)
            res.status(200).json(User)
        } catch (err) {
            logger.error(err, {controller_users: 'getUserById'})
            res.status(500).json('что-то пошло не так!')
        }
    }


}

module.exports = new UsersController()