const {Router} = require('express')
const { sendEmail } = require('../database/submit-methods')
const submit = new Router()


submit.post('/', (req, res)=>{
sendEmail(req.body.content)
res.send('success')
})

module.exports = {submit}

//next step: onsubmit, run a function which will post the content 
//and also which will make the paintings unavailable