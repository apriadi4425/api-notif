
const router = require('express').Router()
const path = require('path');
const scriptName = path.basename(__filename).replace('.js', '');

const Controller = require(`../controllers/${scriptName}`)()

router.route('/')
    .post(Controller.signUp)

router.route('/signin')
    .post(Controller.signIn)

router.route('/sipp')
    .get(Controller.getSippUsers)
    

module.exports = router
