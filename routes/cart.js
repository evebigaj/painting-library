const {Router} = require('express')
const cart = new Router()
const {getMaxIdArray, addToCart, getCart, getById, deleteFromCart, deleteAllFromCart} = require('../methods/cart-methods')



//this fetches the maximum id of all sessions we've had so far:
cart.get('/session', (req, res)=>{
    getMaxIdArray(res)
    .then(result => {
    res.send(result[0])})
    .catch(e =>{console.log(e);
        res.status(404).send(e)})

})

cart.get('/', (req, res) => {
    getCart(req.query.session, res)
    .then(result => {
        if(result.length === 0){
            res.status(204).end()}
        else {
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

//used when adding to cart:
cart.post('/:id', (req, res)=> {
addToCart(req.query.session, req.params.id, res)
.then(result =>{
 res.send(result)})
})


//used when removing from cart:
cart.delete('/:id', (req, res) =>{
    deleteFromCart(req.query.session, req.params.id, res)
    .then(result => res.send(result))
})

//used on submit:
cart.delete('/', (req, res)=>{
    deleteAllFromCart(req.query.session, res)
    .then(result => res.send(result))
})



module.exports = {cart}