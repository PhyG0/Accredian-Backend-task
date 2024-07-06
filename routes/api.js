const express = require('express')
const router = express.Router()
const getUser = require('../controllers/getUser.js')
const sendMail = require('../controllers/sendMail.js')

router.post('/users/:username', getUser)
router.post('/sendMail', sendMail)

module.exports = router
