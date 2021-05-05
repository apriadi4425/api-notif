const PerkaraService = require('../service/PerkaraService')

exports.getJumlahData = async (req, res) => {
    const JumlahPerkaraGugatan = await PerkaraService.getDataPerkara('%Pdt.G%')
    const JumlahPerkaraPermohonan = await PerkaraService.getDataPerkara('%Pdt.P%')

     res.json({
         gugatan : JumlahPerkaraGugatan,
         permohonan : JumlahPerkaraPermohonan,
     })
}