require('dotenv').config()
const PORT = process.env.PORT || 3000
const express = require('express')
const app = express();

const {paintings} = require('./routes/paintings')
const {cart} = require('./routes/cart')
const {submit} = require('./routes/submit')

const path = require('path');

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'client/public')))

app.use('/paintings', express.static('client/paintings'))
app.use('/cart', express.static('client/cart'))
app.use('/paintings/:id', express.static('client/particular-painting'))

app.use('/api/paintings', paintings)
app.use('/api/cart', cart)
app.use('/submit', submit)

app.listen(PORT, () => console.log(`listening on port ${PORT}`))