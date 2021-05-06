const PerkaraService = require('../../service/PerkaraService')

const Controller = () => {

    const getJumlahData = async (req, res) => {
        const JumlahPerkaraGugatan = await PerkaraService.getDataPerkara('%Pdt.G%')
        const JumlahPerkaraPermohonan = await PerkaraService.getDataPerkara('%Pdt.P%')
    
         res.json({
             gugatan : JumlahPerkaraGugatan,
             permohonan : JumlahPerkaraPermohonan,
         })
    }

    return { getJumlahData }
}

module.exports = Controller