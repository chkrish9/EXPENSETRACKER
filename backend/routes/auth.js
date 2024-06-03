const express = require('express')
const router = express.Router()
const auth = require('../controllers/auth')
const loginLimiter = require('../middleware/loginLimiter')

router.route('/')
    .post(loginLimiter, auth.login)

router.route('/refresh')
    .get(auth.refresh)

router.route('/logout')
    .post(auth.logout)

module.exports = router