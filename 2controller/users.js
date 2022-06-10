const usersService = require('../3service/users')
const { faker } = require('@faker-js/faker');

class UsersController {


    async createUser(req, res) {

        try {

            const id = await usersService.createUser(req.body)
            res.status(201).json(id)

        } catch (err) {

            console.error(err)
            res.status(500).json('что-то пошло не так!')

        }

    }

    async createMillionUsers(req, res) {

        try {
            console.log('очищаем таблицу users')
            await usersService.deleteAllUsers()

            const start = new Date().getTime()
            let users = []
            for (let i = 0; i < 10; i++) {
                console.log(i, 'генерируем')
                users = []
            for (let i = 0; i < 100000; i++) {
                users.push({
                    nickname: faker.internet.userName(),
                    full_name: faker.name.findName(),
                    email: faker.internet.email()
                })
            }
                console.log(i, 'добавляем в бд')
                await usersService.createUsers(users)
            }

            const end = new Date().getTime()

            res.status(201)
                .json(`10000000 users добавленно в БД, время выполнения - ${end - start}ms`)

        } catch (err) {

            console.error(err)
            res.status(500).json('что-то пошло не так!')

        }

    }

    async updateUser(req, res) {

        try {
            const id = await usersService.updateUser(req.body)
            res.status(201).json(`данные пользователя с id ${id} успешно изменили`)
        } catch (err) {
            console.error(err)
            res.status(500).json('что-то пошло не так!')
        }

    }

    async getUsers(req, res) {

        try {
            const listUsers = await usersService.getUsers(req.query)
            res.status(200).json(listUsers)
        } catch (err) {
            console.error(err)
            res.status(500).json('что-то пошло не так!')
        }
    }

    async searchUsers(req, res) {

        try {
            const start = new Date().getTime();
            const listUsers = await usersService.searchUsers(req.query)
            const end = new Date().getTime();
            console.log(`время выполнения - ${end - start}ms`)
            res.status(200).json(listUsers)
        } catch (err) {
            console.error(err)
            res.status(500).json('что-то пошло не так!')
        }
    }

    async getUserById(req, res) {

        try {
            const User = await usersService.getUserById(req.params)
            res.status(200).json(User)
        } catch (err) {
            console.error(err)
            res.status(500).json('что-то пошло не так!')
        }

    }

}

module.exports = new UsersController()