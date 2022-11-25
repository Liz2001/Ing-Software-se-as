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

  avaliable: {
    type: Number,
    default: 1
  },

  completed: {
    type: Number,
    default: 1
  },

  progress: {
    type: Number,
    default: 0
  },

  role: {
    type: Number,
    default: 0 //0 = alumno, 1 = administrador / docente
  },

  avatar: {
    type: String,
    default: 'https://res.cloudinary.com/da6dpqep6/image/upload/v1666048514/avatar/user_default_gjklhs.png'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Users', userSchema)