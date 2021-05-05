const ModelSipp = require('../models/sipp')
const ModelNissa = require('../models/nisa')
const {Op} = require('sequelize')

exports.getDataPerkara = (like) => {
    return models.Perkara.count({where : { 
        tanggal_pendaftaran : {
            [Op.like] : '%2021%'
        },
        nomor_perkara : {
            [Op.like] : like
        }
    }})
}

exports.getJadwalsidang = (tanggal_sidang) => {
    return new Promise(resolve => {
        ModelSipp.JadwalSidang.findAll({
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
            where : { tanggal_sidang }
        })
        .then(result => {
            resolve(result)
        })
    })
}