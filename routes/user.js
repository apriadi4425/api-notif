const router = require('express').Router()

const UserController = require('../controllers/UserController')

router.post('/', UserController.signUp)
router.get('/sipp', UserController.getSippUsers)

module.exports = router