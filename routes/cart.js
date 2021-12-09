const {Router} = require('express')
const cart = new Router()
const {addToCart, getCart} = require('../database/cart-methods')

cart.post('/:id', (req, res)=> {
    console.log(`the request is ${req}`)
addToCart(req.params.id)
.then(result =>{console.log('reached end of post request')
 res.send(result)})
})

cart.get('/', (req, res) => {
    getCart()
    .then(result => res.send(result)) 
})



module.exports = {cart}