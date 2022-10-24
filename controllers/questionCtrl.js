const Question = require('../models/questionModel')

const questionCtrl = {
  register: async (req, res) => {
    try {
      const { module, number, question, correct, incorrect } = req.body
      const newQuestion = new Question({
        module, number, question, correct, incorrect
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
getQuestionByModule: async(req,res) =>{
  try {
    const { module } = req.params
    const questions = await Question.find({module: module})
    res.json(questions)
  } catch (err) {
    console.log(err)
    return res.status(500).json({ msg: err.message })
  }
},
getQuestionSingleInfor: async (req, res) => {
  try {
    const { module: module, number: number } = req.params
    const modules = await Question.findOne({ module: module, number: number })
    res.json(modules)
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}
}

module.exports = questionCtrl