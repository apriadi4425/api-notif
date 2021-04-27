const models = require('../models/sipp')
const {Op} = require('sequelize')


const GetDataPerkara = (like) => {
    return models.Perkara.count({where : { 
        tanggal_pendaftaran : {
            [Op.like] : '%2021%'
        },
        nomor_perkara : {
            [Op.like] : like
        }
    }})
}

exports.getJumlahData = async (req, res) => {
    const JumlahPerkaraGugatan = await GetDataPerkara('%Pdt.G%')
    const JumlahPerkaraPermohonan = await GetDataPerkara('%Pdt.P%')

     res.json({
         gugatan : JumlahPerkaraGugatan,
         permohonan : JumlahPerkaraPermohonan,
     })
}