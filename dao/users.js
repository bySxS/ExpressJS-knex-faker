const {db, promiseClientRedis} = require('../db/db')
const bcrypt = require('bcryptjs');
const logger = require('../logger')

class UsersDAO {

    ////////////roles
    async AddRole(name, nameRus) {
        try {
            await db('roles').insert({name, name_rus: nameRus})
            return name
        } catch (e) {
            logger.error(e)
            return 'не'
        }
    }

    async getIdRoleByName(name){
        const [res] = await db('roles').select('id')
            .where('name', '=', name)
        if(res) {return res.id} else {return 0}
    }

    async getRoleById(id){
        const [res] = await db('roles').select('*')
            .where('id', '=', id)
        if(res) {return res}
    }
    ////////////roles

    async registration(nickname, fullName, email, roles = 'user', password) {

        const candidate = await this.getUserByNickname(nickname)
        if ((candidate)&&(candidate.nickname)) {
            return '{message: "Пользователь с таким именем уже существует"}'
        }
        const hashPassword = bcrypt.hashSync(password, 7);
        let idRole = await this.getIdRoleByName(roles)
        if ((idRole === 0) && (roles === 'user')) {//создаем группу user 1 раз
            await this.AddRole('user', 'Пользователь')
            idRole = await this.getIdRoleByName(roles)
        }
        if ((idRole === 0) && (roles === 'admin')) {//создаем группу admin 1 раз
            await this.AddRole('admin', 'Администратор')
            idRole = await this.getIdRoleByName(roles)
        }
        if (idRole > 0) {
            await db('users')
                .insert({
                    nickname,
                    email,
                    full_name: fullName,
                    roles_id: idRole,
                    password: hashPassword
                })
            return `{message: "Пользователь ${nickname} успешно зарегистрирован"}`
        } else return `{message: "Группы ${roles} - нет"}`

    }


    async getUserById(id){
        const start = new Date().getTime()
        let user = JSON.parse(await promiseClientRedis.get('user:'+id))
        //await promiseClientRedis.hSet('user2:'+id, 'codePrivateHash', JSON.stringify(user))
        //await promiseClientRedis.expire('user2:'+id, 1800)
        //console.log(await promiseClientRedis.hGet('user2:'+id, 'codePrivateHash'))
        //await promiseClientRedis.del('user:'+id)
        if (!user) {
        user = await db('users')
            .select('*')
            .where('id', id)
            await promiseClientRedis.set('user:'+id, JSON.stringify(user))
            await promiseClientRedis.expire('user:'+id, 1800)//удалять через пол часа
        } else {
            await promiseClientRedis.expire('user:'+id, 1800)//удалять через пол часа
        }
        const end = new Date().getTime()
        logger.info(`getUserById ${end - start}ms`)
        return user
    }

    async getUserByNickname(nik){
        const [result] = await db('users')
            .select('*')
            .where('nickname', nik)
        return result

    }

    async createUsers(listUsers){
        await db('users')
            .insert(listUsers)

        return `Добавлено в БД ${listUsers.count} пользователей`
    }

    async deleteAllUsers(){
        await db('users')
            .del()

        return `Все пользователи из БД удалены`
    }

    async updateUser(id, nickname, fullName, email) {
        const [have] = await this.getUserById(id)
        if (have) {
            let result = await db('users')
                .where({id: have.id})
                .update({
                    nickname,
                    email,
                    full_name: fullName
                })
            if (result == 1) result = id
            return result
        }
    }

    async getUsers(limit = 10, offset = 0) {
      const users = await db('users')
          .select('*')
          .limit(limit)
          .offset(offset)

        return users
    }

    async searchUsers(nickname, limit = 10, offset = 0) {
        const users = await db('users')
            .select('*')
            .whereILike('nickname', `%${nickname}%`)
            .limit(limit)
            .offset(offset)

        return users
    }


}

module.exports = new UsersDAO()