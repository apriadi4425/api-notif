const models = require('../models/nisa')
const md5 = require('md5')
const jwt = require('jsonwebtoken')

const accessTokenSecret = process.env.SECRET_KEY;

exports.createUser = async (req, res) => {

    const { name, username, password, otoritas, table_reference, user_id, token_notif } = await req.body
    models.User.create({name, username, otoritas, table_reference, user_id, token_notif, password : md5(password)})
        .then((result) => {
            res.send({
                status : 'sukses',
                message : 'User Berhasil Diuat'
            })
        })
        .catch(err => {
            res.status(500).send({
                status : 'error',
                message : err
            })
        })
}