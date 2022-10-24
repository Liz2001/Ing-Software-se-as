const mongoose = require('mongoose')

const questionSchema = new mongoose.Schema({
  module: {
    type: String
  },

  number: {
    type: String
  },

  question: {
    type: String
  },

  correct: {
    type: Array
  },

  incorrect: {
    type: Array
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Question', questionSchema)