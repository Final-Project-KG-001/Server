const express = require('express')
const router = express.Router()

const AppointmentController = require('../controllers/appointment-controller')
const {authentication} = require('../helpers/auth')

router.post('/', authentication, AppointmentController.write)
router.get('/', authentication, AppointmentController.read)

module.exports = router