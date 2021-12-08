const express = require('express')
const app = express();
const {paintings} = require('./routes/paintings')
const {register} = require('./routes/register')
const path = require('path')
//const cors = require('cors')

//app.use(cors())

//app.use(express.static(__dirname + '/public'))

app.use(express.static('public'))

//app.use(express.urlencoded({ extended: true }))
// // parse json
app.use(express.json())

app.use('/paintings', express.static('paintings'))
app.use('/api/paintings', paintings)
app.use('/register', register)

// app.get('/', (res, req) => {
//     res.sendFile(path.resolve(__dirname, './public/index.html'))
// })

app.listen(3000, () => console.log('listening on port 3000'))