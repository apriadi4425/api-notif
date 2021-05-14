const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')

const dotenv = require("dotenv");
dotenv.config()
const router = require('./routes')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))

app.use(cors({credentials: true}))

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html')
})
app.use('/api', router)

app.listen(8585, () => {
    console.log('Server Running ON 8585')
})