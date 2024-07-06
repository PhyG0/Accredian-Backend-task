const express = require('express')
const router = express.Router()
const deleteAllUsers = require('../controllers/deleteAllUsers.js')

router.post('/dau', deleteAllUsers)

module.exports = router
