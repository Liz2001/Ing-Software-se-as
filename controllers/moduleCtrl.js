const { debug } = require('console')
const Module = require('../models/moduleModel')
const Users = require('../models/userModel')

const moduleCtrl = {
  register: async (req, res) => {
    try {
      const { id, title, description, avaliable, completed } = req.body
      const newModule = new Module({
        id, title, description, avaliable, completed
      })
      await newModule.save()
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },

  getModuleAllInfor: async (req, res) => {
    try {
        const modules = await Module.find()
        res.json(modules)
    } catch (err) {
        return res.status(500).json({ msg: err.message })
    }
},
updateStatus: async (req, res) => {
  try {
    const { id,avaliable,completed } = req.params
    console.log(completed,avaliable,id)
    await Users.findOneAndUpdate({ _id: id }, {
      avaliable: avaliable, completed:completed
    })
    res.json({ msg: 'Información actualizada correctamente.' })
  } catch (err) {
    console.log(err)
    return res.status(500).json({ msg: err.message })
  }
},
UpdateProgreso: async (req,res) =>{
  try {
      const { id, progress} = req.params
      console.log("Entre+" + progress)
      await Users.findOneAndUpdate({ _id: id }, {
          progress: progress
      })
      res.json({ msg: 'Información actualizada correctamente.' })
  } catch (err) {
      return res.status(500).json({ msg: err.message })
  }
}

}

module.exports = moduleCtrl