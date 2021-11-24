const express = require('express')
const app = express();
const {paintings} = require('./routes/paintings')

app.use(express.urlencoded({ extended: true }))
// // parse json
app.use(express.json())

app.use('/paintings', paintings)

app.listen(3000, () => console.log('listening on port 3000'))