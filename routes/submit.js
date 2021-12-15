const {Router} = require('express')
const { sendEmail } = require('../database/submit-methods')
const submit = new Router()


submit.post('/', (req, res)=>{
    console.log('we hit the backend submission')
    console.log(`the request body is ${req.body} and its content is ${req.body.content}`)
sendEmail(req.body.content)
res.send('success')
})

module.exports = {submit}

//next step: lessons
// send the form info in req.body.contents 

//next step: onsubmit, run a function which will post the content 
//and also which will make the paintings unavailable