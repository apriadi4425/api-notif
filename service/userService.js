const ModelSipp = require('../models/sipp')
const ModelNissa = require('../models/nisa')
const md5 = require('md5')
const jwt = require('jsonwebtoken')

const accessTokenSecret = process.env.SECRET_KEY;


exports.userValidate = ({username, password}) => {
    return new Promise(async (resolve, reject) => {
        const checkUser = await ModelNissa.User.findOne({ where : { username, password : md5(password) }})
        if(checkUser){
            const accessToken = jwt.sign({ username: checkUser.username,  otoritas: checkUser.otoritas, id : checkUser.id, userId : checkUser.user_id }, accessTokenSecret);
            const data = {
                id : checkUser.id,
                userId : checkUser.user_id,
                sipp_userid : checkUser.sipp_userid,
                name : checkUser.name,
                otoritas : checkUser.otoritas,
                table_reference : checkUser.table_reference,
                accessToken : accessToken
            }
            resolve(data)
        }else{
            const data = {
                status : 'error',
                message : 'username atau password salah'
            }
            reject(data)
        }
    })
}

exports.getUser = (id) => {
    return new Promise((resolve, reject) => {
        ModelNissa.User.findOne({where : { id }}).then((res) => {
            resolve(res)
        }).catch(err => {
            reject(err)
        })
    })
}

exports.updateToken = (id, token_notif) => {
    return new Promise(resolve => {
        ModelNissa.User.update({ token_notif }, {where : { id }}).then(() => {
            resolve('sukses')
        }).reject(err => {
            reject(err)
        })
    })
}

exports.create = (body) => {
    return new Promise((resolve, reject) => {
        const { name, username, password, otoritas, table_reference, user_id, sipp_userid, token_notif } = body
        ModelNissa.User.create({name, username, otoritas, table_reference, user_id, sipp_userid, token_notif, password : md5(password)})
            .then(() => {
               resolve('sukses')
            })
            .catch(err => {
               reject(err)
            })
    })
}

exports.getUserSippById = async (userid) => {
    return new Promise(async (resove, reject) => {
        const User = await ModelSipp.sequelize.query(`
            select a.userid, a.fullname, a.username, a.email, c.name from sys_users a 
            left join sys_user_group b on a.userid = b.userid
            left join sys_groups c on b.groupid = c.groupid
            where a.userid = ${userid}
        `)
        resove( JSON.stringify(User[0], null, 2))
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