const express = require('express')
const router = express.Router()
const {isAdmin, authentication, authorization} = require('../helpers/auth')

const UserController = require('../controllers/user-controller')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.put('/:id', authentication, authorization, UserController.update)
router.get('/', authentication, isAdmin, UserController.read)

module.exports = router