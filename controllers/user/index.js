const userService = require('../../service/userService')

const Controller = () => {
    
    const signIn = (req, res) => {
        const { username, password } = req.body
        userService.userValidate({ username, password })
            .then(result => {
                res.send(result)
            }).catch(err => {
                res.status(401).send(err)
            })
    }
    
    const signUp = (req, res) => {
        userService.createUser(req.body)
            .then(() => {
                res.send({
                    status : 'sukses',
                    message : 'User Berhasil Diuat'
                })
            })
            .catch(err => {
                res.status(500).send({
                    status : 'error',
                    message : err
                })
            })
    }
    
    const getSippUsers = async (req, res) => {
        const {jabatan = 'panitera'} = req.query
        const dataUser = await userService.getAllUserSipp()
        const newDataUser = []
        const ReduceParameter = (namepn, jabatan, table) => {
            return {
                jabatan : jabatan,
                detil : {
                        table : table,
                        id : namepn.id,
                        nama : namepn.nama_gelar,
                        nip : namepn.nip,
                    },
                aktif : namepn.aktif
            }
        }
        dataUser.forEach(user => {
            let newData;
                if(user.uhakim !== null){
                    newData = ReduceParameter(user.uhakim.hakimpn, 'hakim', 'hakim_pn')
                }
                else if(user.upanitera !== null){
                    newData = ReduceParameter(user.upanitera.paniterapn, 'panitera', 'panitera_pn')
                }
                else if(user.ujurusita !== null){
                    newData = ReduceParameter(user.ujurusita.jurusitapn, 'jurusita', 'jurusita')
                }else{
                    newData = { jabatan : '-' }
                }
    
            newDataUser.push({
                userid : user.userid,
                newData
            })
        })
    
        const sendData = newDataUser.filter(item => item.newData.jabatan === jabatan && item.newData.aktif === 'Y')
    
        sendData.forEach(user => {
            const body = {name : user.newData.detil.nama, username : user.newData.detil.nip, password : '123456', otoritas : user.newData.jabatan, table_reference : user.newData.detil.table, user_id : user.newData.detil.id, token_notif : ''}
            userService.create(body)
        })
        res.json(sendData)
    }


    return { signIn, signUp, getSippUsers }
}

module.exports = Controller