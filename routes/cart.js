const {Router} = require('express')
const cart = new Router()
const {generateId, addToCart, getCart, getById, deleteFromCart} = require('../database/cart-methods')

// let's do a get cart/session
//which will return the new id

cart.get('/session', (req, res)=>{
generateId()
.then(result => {console.log( `on the backend, the id is ${result}`)
    res.send(result[0])})
})

cart.get('/:id', (req, res)=>{
    console.log('getting by id')
    getById(req.query.session, req.params.id)
    .then(result => {
        console.log(`we got a result and it's ${result}`)
        console.log(`the result length is ${result.length}`)
        if(result){
            if(result.length === 0){
                
                res.status(204).end()
            }
        res.send(result)}
        else{res.status(404).end()}
        console.log(`we got past the res.send`)
        
    })


})
cart.post('/:id', (req, res)=> {
    console.log(`the request is ${req}`)
addToCart(req.query.session, req.params.id)
.then(result =>{console.log('reached end of post request')
 res.send(result)})
})

cart.get('/', (req, res) => {
    getCart(req.query.session)
    .then(result => res.send(result)) 
})

cart.delete('/:id', (req, res) =>{
    deleteFromCart(req.query.session, req.params.id)
    .then(result => res.send(result))
})
//next: use this in particular-painting.js


module.exports = {cart}