const router = require('express').Router()
const moduleCtrl = require('../controllers/moduleCtrl')

router.post('/register', moduleCtrl.register)
router.get('/all_infor', moduleCtrl.getModuleAllInfor)
router.patch('/update/:id/:avaliable/:completed', moduleCtrl.updateStatus)
router.patch('/updateProgreso/:id/:progress', moduleCtrl.UpdateProgreso)
module.exports = router