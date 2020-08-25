const express = require('express')
const router = express.Router()

const AppointmentController = require('../controllers/appointment-controller')
const {authentication, isAdmin} = require('../middlewares/auth')

router.post('/', authentication, AppointmentController.write)
router.get('/', authentication, AppointmentController.read)
router.put('/:id', authentication, isAdmin, AppointmentController.changeStatus)

module.exports = router