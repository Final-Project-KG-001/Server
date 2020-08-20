const express = require('express')
const router = express.Router()

const UserRoute = require('./user-route')
const AppointmentRoute = require('./appointment-route')

router.use('/user', UserRoute)
router.use('/appointment', AppointmentRoute)

module.exports = router