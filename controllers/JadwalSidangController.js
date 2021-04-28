const models = require('../models/sipp')
const moment = require('moment')

exports.GetData = (req, res) => {
    models.JadwalSidang.findAll({
        include : [
            {
                association : 'perkara',
                include : ['panitera', 'jurusita'],
                order : ['id','desc']
            },
            {
                association : 'relaas',
                include : ['pihak']
            },
        ],
        where : {
            tanggal_sidang : moment(new Date).format('YYYY-MM-DD')
        }
    })
        .then(result => {
            res.json(result)
        })
}