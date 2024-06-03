const express = require('express')
const router = express.Router()
const user = require('../controllers/user')

router.route('/')
    .get(user.getUsers)
    .post(user.createUser)
    .patch(user.updateUser)

module.exports = router
