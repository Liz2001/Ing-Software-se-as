const router = require('express').Router()
const moduleCtrl = require('../controllers/moduleCtrl')

router.post('/register', moduleCtrl.register)
router.get('/all_infor', moduleCtrl.getModuleAllInfor)

module.exports = router