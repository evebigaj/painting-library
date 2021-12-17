const {Router} = require('express')
const res = require('express/lib/response')
const cart = new Router()
const {generateIdArray, addToCart, getCart, getById, deleteFromCart, deleteAllFromCart} = require('../database/cart-methods')

// let's do a get cart/session
//which will return the new id

//this generates and fetches new session id:
cart.get('/session', (req, res)=>{
    console.log(`asking helper function to generate new id`)
generateIdArray(res)
.then(result => {
    res.send(result[0])})
    .catch(e =>{console.log(e);
    res.status(404).send(e)})

})

cart.get('/', (req, res) => {
    console.log(`fetching cart contents, the request query is ${req.query}`)
    getCart(req.query.session, res)
    .then(result => {
        if(result.length === 0){
            res.status(204).end()}
        else {console.log(`we're sending tehe paintings in the cart back to client`)
            res.send(result)}})
    .catch(e=>res.status(404).send(e)) 
})

//used in removing particular items from cart, 
// to check if they're there:

cart.get('/:id', (req, res)=>{
    
    getById(req.query.session, req.params.id, res)
    .then(result => {
        
            if(result.length === 0){
                
                res.status(204).end()
            }
       else{ res.send(result)}
    }
        
        
        
    )


})

cart.post('/:id', (req, res)=> {
   console.log('sending post request over to helper function')
addToCart(req.query.session, req.params.id, res)
.then(result =>{
 res.send(result)})
})





cart.delete('/:id', (req, res) =>{
    deleteFromCart(req.query.session, req.params.id, res)
    .then(result => res.send(result))
})

//used on submit:
cart.delete('/', (req, res)=>{
    deleteAllFromCart(req.query.session, res)
    .then(result => res.send(result))
})

//next: use this in particular-painting.js


module.exports = {cart}