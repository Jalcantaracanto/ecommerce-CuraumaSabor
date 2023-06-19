const User = require('../models/user.model')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports.register = (req, res) => {
    User.create(req.body)
        .then((newUser) => res.json({ user: newUser }))
        .catch((err) => {
            console.log(err)
            res.status(500).json({ error: err })
        })
}

module.exports.login = (req, res) => {
    const { email, password } = req.body

    User.findOne({ email }).then((user) => {
        if (user === null) {
            return res.status(400).json({ msg: 'Correo o contraseña incorrectos' })
        } else {
            bcrypt
                .compare(password, user.password)
                .then((isValid) => {
                    if (isValid) {
                        const userToken = jwt.sign(
                            {
                                id: user._id,
                                email: user.email,
                                firstName: user.firstName,
                                lastName: user.lastName,
                                admin: user.admin,
                                direccion: {
                                    ciudad: user.direccion.ciudad,
                                    calle: user.direccion.calle,
                                    numero: user.direccion.numero,
                                    telefono: user.direccion.telefono,
                                },
                            },
                            process.env.SECRET_KEY
                        )
                        res.cookie('usertoken', userToken, process.env.SECRET_KEY, {
                            httpOnly: true,
                        }).json({ msg: 'Conexión Exitosa!' })
                    } else {
                        res.status(403).json({ msg: 'Correo o contraseña incorrectos' })
                    }
                })
                .catch((err) => res.status(400).json({ msg: 'Correo o contraseña incorrectos', error: err }))
        }
    })
}
// module.exports.login = async (req, res) => {
//     const { email, password } = req.body

//     try {
//         const user = await User.findOne({ email })

//         if (user === null) {
//             return res.status(400).json({ message: 'Correo o contraseña incorrectos' })
//         }

//         const isValid = await bcrypt.compare(password, user.password)

//         if (isValid) {
//             const userToken = jwt.sign(
//                 {
//                     id: user._id,
//                     email: user.email,
//                     firstName: user.firstName,
//                     lastName: user.lastName,
//                     admin: user.admin,
//                     direccion: {
//                         ciudad: user.direccion.ciudad,
//                         calle: user.direccion.calle,
//                         numero: user.direccion.numero,
//                         telefono: user.direccion.telefono,
//                     },
//                 },
//                 process.env.SECRET_KEY
//             )

//             res.cookie('usertoken', userToken, process.env.SECRET_KEY, {
//                 httpOnly: true,
//             }).json({ msg: 'Conexión Exitosa!' })
//         } else {
//             res.status(403).json({ msg: 'Correo o contraseña incorrectos' })
//         }
//     } catch (error) {
//         res.status(500).json({ msg: 'Error interno del servidor', error: error.message })
//     }
// }

module.exports.logout = (req, res) => {
    User.findOne({ email: req.body.email })
        .then((user) => {
            res.clearCookie('usertoken')
            res.json({ msg: 'Usuario desconectado' })
        })
        .catch((err) => res.json({ msg: 'Error al desconectar usuario', error: err }))
}

module.exports.findUser = (req, res) => {
    User.findOne({ _id: req.params.id })
        .select({ password: 0 })
        .then((user) => res.json({ user }))
        .catch((err) => res.json({ message: 'Error al buscar usuario', error: err }))
}

module.exports.findAllUsers = (req, res) => {
    User.find()
        .select({ password: 0 })
        .then((users) => res.json({ users }))
        .catch((err) => res.json({ message: 'Error al buscar usuarios', error: err }))
}

module.exports.updateUser = (req, res) => {
    User.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then((updatedUser) => res.json({ user: updatedUser }))
        .catch((err) => res.json({ message: 'Error al actualizar usuario', error: err }))
}
