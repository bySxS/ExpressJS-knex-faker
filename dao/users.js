const {db, userQueueDB, cacheRedisDB} = require('../db/db')
const bcrypt = require('bcryptjs');
const logger = require('../logger')
const milliseconds = require('milliseconds')
const rolesModel = require('../models/roles')
const usersModel = require('../models/users')

class UsersDAO {

    ////////////roles
    async AddRole(name, nameRus) {
            const res = await rolesModel.query().insert({
                name,
                name_rus: nameRus
            })
            return res
    }

    // async getIdRoleByName(name){
    //     const result = await rolesModel.query()
    //         .findOne('nickname', nickname)
    //         .select('id')
    //     return result
    //     // const [res] = await db('roles').select('id')
    //     //     .where('name', '=', name)
    //     // if(res) {return res.id} else {return 0}
    // }

    async getRoleById(id){
        const res = await rolesModel.query().findById(id)
        // const [res] = await db('roles').select('*')
        //     .where('id', '=', id)
        return res
    }
    ////////////roles

    async registration(nickname, fullName, email, password, roles_id = 3) {

        const candidate = await usersModel.query()
            .findOne('nickname', nickname)
            .select('nickname')
        if (candidate) {
            return {message: "Пользователь с таким именем уже существует"}
        }
        const hashPassword = bcrypt.hashSync(password, 7);

        if (roles_id > 0) {
            const result = await usersModel.query().insert({
                nickname,
                email,
                full_name: fullName,
                roles_id,
                password: hashPassword
            })
            return {registration: result, message: `Пользователь ${nickname} успешно зарегистрирован`}
        } else return {message: `Группы ${roles_id} - нет`}

    }


    async getUserById(id){
        let user = JSON.parse(await cacheRedisDB.get('user:'+id))
        //await promiseClientRedis.hSet('user2:'+id, 'codePrivateHash', JSON.stringify(user))
        //await promiseClientRedis.expire('user2:'+id, 1800)
        //console.log(await promiseClientRedis.hGet('user2:'+id, 'codePrivateHash'))
        //await promiseClientRedis.del('user:'+id)
        if (!user) {
        user = await usersModel.query().findById(id)
            await cacheRedisDB.set('user:'+id, JSON.stringify(user))
            await cacheRedisDB.expire('user:'+id, 1800)//удалять через пол часа
        } else {
            await cacheRedisDB.expire('user:'+id, 1800)//удалять через пол часа
        }
        return user
    }

    async getUserByNickname(nik){
        const result = await usersModel.query().findOne('nickname', nik)
        // const [result] = await db('users')
        //     .select('*')
        //     .where('nickname', nik)
        return result

    }

    async createUsers(listUsers){
        //await usersModel.query().insertGraph(listUsers) долго
         await db('users')
             .insert(listUsers)
        return `Добавлено в БД ${listUsers.count} пользователей`
    }

    // async deleteAllUsers(){
    //     await usersModel.query()
    //         .delete()
    //
    //     return `Все пользователи из БД удалены`
    // }

    async updateUser(id, nickname, fullName, email, password, roles_id) {
        const user = usersModel.query().findById(id)
        if (user) {
            let PayLoad = {id, nickname, fullName, email, password, roles_id}
            await userQueueDB.add('update', PayLoad, {delay: milliseconds.minutes(1)})
            return id
        }
    }

    async getUsers(limit = 10, offset = 0) {
        const res = await usersModel.query().limit(limit).offset(offset)
        return res
    }

    async searchUsers(nickname, limit = 10, offset = 0) {
        const users = await usersModel.query().limit(limit).offset(offset)
            .where('nickname', 'like',`%${nickname}%`)

        return users
    }


}

module.exports = new UsersDAO()