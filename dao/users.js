const db = require('../db/db')

class UsersDAO {

    async getUserById(id){
        const result = await db('users')
            .select('*')
            .where('id', id)
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

    async createUser(nickname, fullName, email){
        const [id] = await db('users')
            .insert({
                nickname,
                email,
                full_name: fullName
            })

        return id
    }

    async updateUser(id, nickname, fullName, email) {
        const have = await this.getUserById(id)
        if (have[0]) {
            let result = await db('users')
                .where({id: have[0].id})
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