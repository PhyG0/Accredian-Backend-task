const express = require('express')
const router = express.Router()
const getUser = require('../controllers/getUser.js')

router.post('/users/:username', getUser)

module.exports = router
