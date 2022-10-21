const router = require('express').Router()
const moduleCtrl = require('../controllers/moduleCtrl')

router.post('/register', moduleCtrl.register)
router.get('/all_infor', moduleCtrl.getModuleAllInfor)
router.patch('/update/:id', moduleCtrl.updateStatus)

module.exports = router