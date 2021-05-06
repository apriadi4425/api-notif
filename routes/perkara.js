
const router = require('express').Router()
const path = require('path');
const scriptName = path.basename(__filename).replace('.js', '');

const Controller = require(`../controllers/${scriptName}`)()

router.route('/')
    .get(Controller.getJumlahData)
    

module.exports = router
