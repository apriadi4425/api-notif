const router = require('express').Router()

const jadwal = require('./jadwal')
const perkara = require('./perkara')

router.use('/jadwal-sidang', jadwal)
router.use('/perkara', perkara)

module.exports = router