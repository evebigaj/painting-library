const {Router} = require('express')
const register = new Router();
const {createCustomer} = require('../database/customer-methods')

// register.use('/', (req, res, next) => {
//      const {username, firstName, lastName, password} = req.body
//     createCustomer(username, firstName, lastName, password)
//     .then(customer => 
//         {if(!customer){res.status(404).send()}
//         res.send(customer)
//         })
// })
register.post('/', (req, res) =>{
    const {username, firstName, lastName, password} = req.body
    createCustomer(username, firstName, lastName, password)
    .then(customer => 
        {if(!customer){res.status(404).send()}
        res.send(customer)
        })
})

module.exports = {register}
