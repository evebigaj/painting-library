const {Router} = require('express')
const cart = new Router()
const {addToCart} = require('../database/cart-methods')

cart.post('/:id', (req, res)=> {
    console.log(`the request is ${req}`)
addToCart(req.params.id)
.then(result =>{console.log('reached end of post request')
 res.send(result)})
})

// cart.get(':/id', (res, req)=>{
//     console.log(req.params.id)
// })

// cart.get(':/id')

module.exports = {cart}