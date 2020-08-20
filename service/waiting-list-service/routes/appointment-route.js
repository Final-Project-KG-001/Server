const express = require('express')
const router = express.Router()

const AppointmentController = require('../controllers/appointment-controller')
const {authentication, authorization, adminAuthentication} = require('../helpers/auth')

router.post('/', authentication, AppointmentController.write)
router.get('/', authentication, AppointmentController.read)

module.exports = router