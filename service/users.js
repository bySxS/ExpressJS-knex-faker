const usersDAO = require('../dao/users')

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

    updateUser(idDto, bodyDto){
        const {id} = idDto
        const {nickname, fullName, email} = bodyDto
        return usersDAO.updateUser(id, nickname, fullName, email)
    }

}

module.exports = new UsersService()