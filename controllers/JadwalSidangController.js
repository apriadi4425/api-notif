const models = require('../models/sipp')
const moment = require('moment');
const { Op } = require('sequelize');

const GetDataPihak = item => {
    let pihak = []
    if(item.perkara.alur_perkara_nama === 'Perdata Gugatan'){
       if(item.perkara.jenis_perkara_nama === 'Cerai Gugat' || item.perkara.jenis_perkara_nama === 'Cerai Talak'){
        let P, T;
        if(item.perkara.jenis_perkara_nama === 'Cerai Gugat') {
            P = 'Penggugat'; 
            T = 'Tergugat'
        }else{
            P = 'Pemohon'; 
            T = 'Termohon'
        }
        pihak[0] = `${P}: ${item.perkara.pihak1_text}`; 
        pihak[1] = `${T}: ${item.perkara.pihak2_text}`; 
       }
       if(item.perkara.jenis_perkara_nama === 'Kewarisan'){
        const Pihak1 = item.perkara.pihak1_text.split('<br />').map((pihak, index) => (`Pemohon ${index + 1} : ${pihak.replace(/[0-9]/, '')}`))
        const Pihak2 = item.perkara.pihak2_text.split('<br />').map((pihak, index) => (`Termohon ${index + 1} : ${pihak.replace(/[0-9]/, '')}`))

        pihak = [...Pihak1, Pihak2]
       }
    }else{
        const PihakPemohon = item.perkara.pihak1_text.split('<br />')
        for(let i = 0; i < PihakPemohon.length; i++){
            pihak[i] = `Pemohon ${i + 1} : ${PihakPemohon[i]}`
        }
    }
    return{...item.dataValues, pihak}
}

exports.GetData = (req, res) => {
    const {tgl_sidang, user} = req.query
    let where = {
        tanggal_sidang : tgl_sidang
    }

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
        where
    })
        .then(result => {
            const NewData = user ? result.filter(item => item.perkara.panitera.panitera_nama === user)
                                         .map(GetDataPihak) 
                                         : result.map(GetDataPihak)
            res.json(NewData)
        })
}