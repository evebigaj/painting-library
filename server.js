require('dotenv').config()
const PORT = process.env.PORT || 3000
const express = require('express')
const app = express();
const {paintings} = require('./routes/paintings')

const {cart} = require('./routes/cart')
const {submit} = require('./routes/submit')
const path = require('path');


//const cors = require('cors')

//app.use(cors())

//app.use(express.static(__dirname + '/public'))
//possible that I'll need to use __dirname for heroku
// if(process.env.NODE_ENV === 'production'){
// app.use(express.static(path.join(__dirname, 'client/build')))
// }

app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname, 'client/public')))
console.log(path.join(__dirname, 'client/public'))
// app.use('*', express.static(path.join(__dirname, 'public')))

// // parse json
app.use(express.json())

app.use('/paintings', express.static('client/paintings'))
app.use('/cart', express.static('client/cart'))
app.use('/paintings/:id', express.static('client/particular-painting'))
app.use('/api/paintings', paintings)
app.use('/api/cart', cart)

app.use('/submit', submit)

// app.get('/', (res, req) => {
//     res.sendFile(path.resolve(__dirname, './public/index.html'))
// })

app.listen(PORT, () => console.log(`listening on port ${PORT}`))