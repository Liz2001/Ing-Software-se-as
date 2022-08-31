const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Por favor, ingrese su nombre.'],
        trim: true
    },

    email: {
        type: String,
        required: [true, 'Por favor, ingrese su email.'],
        trim: true,
        unique: true
    },

    password: {
        type: String,
        required: [true, 'Por favor, ingrese su contraseña.']
    },

    role: {
        type: Number,
        default: 0 //0 = alumno, 1 = administrador / docente
    },

    avatar: {
        type: String,
        default: 'https://res.cloudinary.com/devatchannel/image/upload/v1602752402/avatar/avatar_cugq40.png'
    }
}, {
    timestamps: true
})

module.exports = mongoose.model('Users', userSchema)