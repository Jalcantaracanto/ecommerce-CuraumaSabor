const { Schema, model } = require('mongoose')
const bcrypt = require('bcrypt')

const UserSchema = new Schema(
    {
        firstName: {
            type: String,
            required: [true, 'Nombre es requerido'],
        },
        lastName: {
            type: String,
            required: [true, 'Apellido es requerido'],
        },
        email: {
            type: String,
            required: [true, 'Correo es requerido'],
            validate: {
                validator: (val) => /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(val),
                message: 'Por favor ingrese un correo valido',
            },
        },
        password: {
            type: String,
            required: [true, 'Contraseña es requerida'],
            minlength: [5, 'Contraseña debe tener al menos 5 caracteres'],
        },
        direccion: {
            ciudad: {
                type: String,
                required: [true, 'Ciudad es requerida'],
            },
            calle: {
                type: String,
                required: [true, 'Calle es requerida'],
            },
            numero: {
                type: String,
                required: [true, 'Numero es requerido'],
            },
            telefono: {
                type: String,
                required: [true, 'Telefono es requerido'],
            },
        },
        admin: {
            type: Boolean,
            default: 'false',
        }
    },
    { timestamps: true }
)

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword)
    .set((value) => (this._confirmPassword = value))

UserSchema.pre('validate', function (next) {
    if (this.password !== this.confirmPassword) {
        this.invalidate('confirmPassword', 'Las contraseñas deben ser iguales')
    }
    next()
})

UserSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10).then((hash) => {
        this.password = hash
        next()
    })
})

const User = model('User', UserSchema)

module.exports = User
