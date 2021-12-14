const {Router} = require('express')
const { sendEmail } = require('../database/submit-methods')
const submit = new Router()


submit.post('/', (req, res)=>{
sendEmail(req.body.content)
res.send('success')
})

module.exports = {submit}