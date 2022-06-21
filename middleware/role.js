const jwt = require('jsonwebtoken')
require('dotenv').config()


module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403)
                    .json({message: "Пользователь не авторизован"})
            }
            const {roles: userRoles} = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            let needRoles = []
            const useRoles = [userRoles]
            needRoles.push('admin')//всегда даем права админу
             if (typeof (roles) === "object") {
                 needRoles = [...needRoles, ...roles]
             } else {
                 needRoles = [...needRoles, roles]
             }
            let hasRole = false
            useRoles.forEach(role => {
                if (needRoles.includes(role)) {
                    hasRole = true
                }
            })
            if (!hasRole) {
                return res.status(403)
                    .json({message: "У вас нет доступа"})
            }
            next();
        } catch (e) {
            // console.log(e)
            return res.status(403)
                .json({message: "Пользователь не авторизован"})
        }
    }
};