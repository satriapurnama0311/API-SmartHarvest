const express = require('express')
const { getAllUser, Register, Login } = require('./user.controller')
const verifyToken = require('../middleware/verify.token')

const router = express.Router()

router.get('/users', verifyToken, getAllUser)
router.post('/register', Register)
router.post('/login', Login)

module.exports = router
