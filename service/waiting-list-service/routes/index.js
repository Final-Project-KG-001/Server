const express = require('express')
const router = express.Router()

const UserRoute = require('./user-route')
const AppointmentRoute = require('./appointment-route')
const doctorRoute = require('./doctor')
const dentalRoute = require('./dental')
const generalRoute = require('./general')

router.use('/user', UserRoute)
router.use('/appointment', AppointmentRoute)
router.use('/doctor', doctorRoute)
router.use('/dental', dentalRoute)
router.use('/general', generalRoute)

module.exports = router