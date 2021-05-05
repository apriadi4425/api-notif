const userService = require('../service/userService')

exports.signUp = async (req, res) => {
    await userService.createUser(req.body)
        .then(() => {
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

exports.getSippUsers = async (req, res) => {
    await userService.getAllUserSipp().then((result) => {
        res.send({
            data : result
        })
    })
}