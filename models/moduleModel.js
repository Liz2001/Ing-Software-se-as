const mongoose = require('mongoose')

const moduleSchema = new mongoose.Schema({
  id: {
    type: String
  },

  title: {
    type: String
  },

  description: {
    type: String
  },

  avaliable: {
    type: Boolean
  },

  completed: {
    type: Boolean
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Module', moduleSchema)