const express = require('express')
const { addAttendance, getAttendance } = require('../controller/attendance')

const router = express()

router.post('/addAttendance', addAttendance )
router.get('/getAttendance', getAttendance )

module.exports = router