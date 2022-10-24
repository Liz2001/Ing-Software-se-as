const Module = require('../models/moduleModel')

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
      const { id } = req.params
      const { avaliable, completed } = req.body
      await Module.findByIdAndUpdate({ id }, {
        avaliable, completed
      })
      res.json({ msg: 'Información actualizada correctamente.' })
    } catch (err) {
      return res.status(500).json({ msg: err.message })
    }
  },
}

module.exports = moduleCtrl