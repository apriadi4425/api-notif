const router = require('express').Router()

const jadwal = require('./jadwal')

router.use('/jadwal-sidang', jadwal)

module.exports = router