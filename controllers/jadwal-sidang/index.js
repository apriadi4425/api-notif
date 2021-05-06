const PerkaraService = require('../../service/PerkaraService')

const Controller = () => {
    const GetData = (req, res) => {
        const {tgl_sidang, user} = req.query
        PerkaraService.getJadwalsidang(tgl_sidang)
            .then(result => {
                const NewData = user ? 
                    result.filter(item => item.perkara.panitera.panitera_nama === user)
                        .map(PerkaraService.refactoryDataPihak) 
                    : result.map(PerkaraService.refactoryDataPihak)
                res.json(NewData)
            })
    }

    return { GetData }
}

module.exports = Controller