const ModelSipp = require('../models/sipp')
const ModelNissa = require('../models/nisa')
const md5 = require('md5')
const jwt = require('jsonwebtoken')

exports.create = (body) => {
    return new Promise((resolve, reject) => {
        const { name, username, password, otoritas, table_reference, user_id, token_notif } = body
        ModelNissa.User.create({name, username, otoritas, table_reference, user_id, token_notif, password : md5(password)})
            .then(() => {
               resolve('sukses')
            })
            .catch(err => {
               reject(err)
            })
    })
}

exports.getAllUserSipp = async () => {
    return new Promise(async (resove, reject) => {
        const User = await ModelSipp.User.findAll({
            include: [
                {
                    association : 'uhakim',
                    include: ['hakimpn']
                },
                {
                    association : 'upanitera',
                    include: ['paniterapn']
                },
                {
                    association : 'ujurusita',
                    include: ['jurusitapn']
                }
            ]
        })
        resove(User)
    })
}