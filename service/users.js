const usersDAO = require('../dao/users')

class UsersService {

    AddRole(Dto){
        const {name, nameRus} = Dto
        return usersDAO.AddRole(name, nameRus)
    }

    getRoleById(Dto){
        let {id, roles_id} = Dto
        if (roles_id) id = roles_id
        return usersDAO.getRoleById(id)
    }

    getUserByNickname(Dto){
        const {nickname} = Dto
        return usersDAO.getUserByNickname(nickname)
    }

    registration(Dto){
        const {nickname, fullName, email, roles, password} = Dto
        return usersDAO.registration(nickname, fullName, email,
            roles, password)
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