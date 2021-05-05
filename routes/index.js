const router = require('express').Router()

const jadwal = require('./jadwal')
const perkara = require('./perkara')
const user = require('./user')

router.use('/user', user)
router.use('/jadwal-sidang', jadwal)
router.use('/perkara', perkara)

module.exports = router