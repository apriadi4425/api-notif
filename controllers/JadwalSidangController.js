const models = require('../models')

exports.GetData = (req, res) => {
    models.Perkara.findAll({raw : true})
        .then(result => {
            res.json({
                data : result
            })
        })
}