const {Router} = require('express')
const { sendEmail } = require('../methods/submit-methods')
const submit = new Router()


submit.post('/', (req, res)=>{
    sendEmail(req.body.content, res)
    res.send('success')
    })

module.exports = {submit}

