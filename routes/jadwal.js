const router = require('express').Router()

const JadwalSidangController = require('../controllers/JadwalSidangController')

router.get('/', JadwalSidangController.GetData)

module.exports = router