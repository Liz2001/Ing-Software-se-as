const Question = require('../models/questionModel')

const questionCtrl = {
  register: async (req, res) => {
    try {
      const { module, question, correct, incorrect } = req.body
      const newQuestion = new Question({
        module, question, correct, incorrect
      })
      await newQuestion.save()
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },

  getQuestionAllInfor: async (req, res) => {
    try {
        const questions = await Question.find()
        res.json(questions)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
},
}

module.exports = questionCtrl