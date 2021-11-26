const {Router} = require('express')
const register = new Router();
const {createCustomer} = require('../database/customer-methods')

register.post('/', (req, res) =>{
    const {username, firstName, lastName, password} = req.body
    createCustomer(username, firstName, lastName, password)
    .then(customer => 
        {if(!customer){res.status(404).send('resource not found')}
        res.send(customer)
        })
})

module.exports = {register}
