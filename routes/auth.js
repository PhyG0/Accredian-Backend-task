const express = require('express')
const router = express.Router()
const handleLogin = require('../controllers/login.js')
const handleRegister = require('../controllers/register.js')
const handleReferralRegister = require('../controllers/referralRegister.js')

router.post('/register', handleRegister)
router.post('/login', handleLogin)
router.post('/register/:referralCode', handleReferralRegister)

module.exports = router
