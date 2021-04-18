const models = require('../models/sipp')

exports.GetData = (req, res) => {
    models.Perkara.findAll({raw : true})
        .then(result => {
            res.json({
                data : result
            })
        })
}