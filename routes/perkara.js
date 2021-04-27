const router = require('express').Router()

const PerkaraController = require('../controllers/PerkaraController')

router.get('/', PerkaraController.getJumlahData)

module.exports = router