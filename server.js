const express = require('express')
const app = express();
const {paintings} = require('./routes/paintings')
const {register} = require('./routes/register')

app.use(express.urlencoded({ extended: true }))
// // parse json
app.use(express.json())

app.use('/paintings', paintings)
app.use('/register', register)

app.listen(3000, () => console.log('listening on port 3000'))