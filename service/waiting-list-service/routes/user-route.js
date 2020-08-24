const express = require('express')
const router = express.Router()
const {isAdmin, authentication, authorization} = require('../middlewares/auth')

const UserController = require('../controllers/user-controller')

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.post('/loginadmin', UserController.loginAdmin)
router.put('/:id', authentication, authorization, UserController.update)
router.get('/', authentication, isAdmin, UserController.read)

module.exports = router