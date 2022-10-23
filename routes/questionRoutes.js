const router = require('express').Router()
const questionCtrl = require('../controllers/questionCtrl')

router.post('/register', questionCtrl.register)
router.get('/all_infor', questionCtrl.getQuestionAllInfor)
router.get('/single_infor/:module/:number', questionCtrl.getQuestionSingleInfor)

module.exports = router