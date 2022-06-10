const usersDAO = require('../4dao/users')

class UsersService {

    createUser(Dto){
        const {nickname, fullName, email} = Dto
        return usersDAO.createUser(nickname, fullName, email)
    }

    createUsers(Dto){
        return usersDAO.createUsers(Dto)
    }

    deleteAllUsers(){
        return usersDAO.deleteAllUsers()
    }

    getUsers(Dto){
        const {limit, offset} = Dto
        return usersDAO.getUsers(limit, offset)
    }

    searchUsers(Dto){
        const {nickname, limit, offset} = Dto
        return usersDAO.searchUsers(nickname, limit, offset)
    }

    getUserById(Dto){
        const {id} = Dto
        return usersDAO.getUserById(id)
    }

    updateUser(Dto){
        const {id, nickname, fullName, email} = Dto
        return usersDAO.updateUser(id, nickname, fullName, email)
    }

}

module.exports = new UsersService()