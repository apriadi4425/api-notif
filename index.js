const app = require('express')()
const bodyParser = require('body-parser')

const dotenv = require("dotenv");
dotenv.config()

const router = require('./routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))

app.use('/api', router)

app.listen(8000, () => {
    console.log('Server Running ON 8000')
})