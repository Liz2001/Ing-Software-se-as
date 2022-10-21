const router = require('express').Router()
const questionCtrl = require('../controllers/questionCtrl')

router.post('/register', questionCtrl.register)
router.get('/single_infor/:module/:number', questionCtrl.getQuestionSingleInfor)
router.get('/all_infor', questionCtrl.getQuestionAllInfor)

module.exports = router