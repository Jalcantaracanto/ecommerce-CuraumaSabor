const { register, login, logout, findUser, findAllUsers, updateUser } = require('../controllers/user.controllers')

module.exports = (app) => {
    app.post('/api/user/register', register)
    app.post('/api/user/login', login)
    app.post('/api/user/logout', logout)
    app.get('/api/user/:id', findUser)
    app.get('/api/users', findAllUsers)
    app.put('/api/user/:id', updateUser)
}
