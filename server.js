const express = require('express')
const app = express();
const {paintings} = require('./routes/paintings')
const {register} = require('./routes/register')
const {cart} = require('./routes/cart')
const {submit} = require('./routes/submit')
const path = require('path')
//const cors = require('cors')

//app.use(cors())

//app.use(express.static(__dirname + '/public'))

app.use(express.static('client/public'))
// app.use('*', express.static(path.join(__dirname, 'public')))

app.use(express.urlencoded({ extended: true }))
// // parse json
app.use(express.json())

app.use('/paintings', express.static('client/paintings'))
app.use('/cart', express.static('client/cart'))
app.use('/paintings/:id', express.static('client/particular-painting'))
app.use('/api/paintings', paintings)
app.use('/api/cart', cart)
app.use('/register', register)
app.use('/submit', submit)

// app.get('/', (res, req) => {
//     res.sendFile(path.resolve(__dirname, './public/index.html'))
// })

app.listen(3000, () => console.log('listening on port 3000'))