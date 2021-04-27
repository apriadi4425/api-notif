const models = require('../models/sipp')

exports.GetData = (req, res) => {
    models.Perkara.findAll({raw : true, limit : 10})
        .then(result => {
            res.json({
                data : result
            })
        })
}