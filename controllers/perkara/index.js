const PerkaraService = require('../../service/perkaraService')
const notifService = require('../../service/notifService')

const Controller = () => {

    const getJumlahData = async (req, res) => {
        const JumlahPerkaraGugatan = await PerkaraService.getDataPerkara('%Pdt.G%')
        const JumlahPerkaraPermohonan = await PerkaraService.getDataPerkara('%Pdt.P%')
    
         res.json({
             gugatan : JumlahPerkaraGugatan,
             permohonan : JumlahPerkaraPermohonan,
         })
    }

    const getStatusSidang = async (req, res) => {
        const data = await PerkaraService.statusSidang()
        const dataStatusSidang = JSON.parse(data)
        res.send(dataStatusSidang)
    }

    const checkSidang = async (req, res) => {
        const dataSidang = await notifService.checkPerkaraPBTbelumBHT()
        res.send({
            tes : 'tes'
        })
    }

    const getJumlahPerkaraTiapBulan = async (req, res) => {
        const JumlahPerkaraTiapBulan = await PerkaraService.getDataPerkaraTiapBulan()
        const objectBulan = JSON.parse(JumlahPerkaraTiapBulan)[0]
        const objectToArray = Object.values(objectBulan);

        res.send(objectToArray.filter(number => number > 1))
    }

    return { getJumlahData, getJumlahPerkaraTiapBulan, getStatusSidang, checkSidang }
}

module.exports = Controller