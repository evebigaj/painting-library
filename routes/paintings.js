const express = require('express');
const paintings = new express.Router()
const { getPaintingById,  getPaintingsByKeys, makePaintingsUnavailable} = require('../database/painting-methods')

paintings.use(express.static('styles.css'))

paintings.get('/', (req, res)=>{
        // document.head.append('<link rel="stylesheet" type="text/css"   href="public/styles.css">')
        
        getPaintingsByKeys(req.query, res)
        .then(result => {
            console.log(`the helper function had a result of ${result}`)
     console.log(`the helper function had a response status of ${res.status}`)
            if(!res.status){            
            res.send(result)
        return result}})
    //     .then(result => {
    //     // if(!result){
    //     //     res.status(404).send('Resource not found')
    //     // }
    //     // if(Object.keys(result).length ===0){
    //     //     res.status(204).send()
    //     // }
    //     //res.setHeader('content-type', 'text/html');
    //     let body = ''
    //     result.forEach(painting => {
    //     body = body.concat(`<h1>${painting.title}</h1>
    //     <p>medium: ${painting.medium}</p>
    //     <p>${painting.height}"x ${painting.width}"</p>
    //     $${painting.price}`)}
    //     )
    //     console.log(body)
    //     res.send(body)
    //     return body
    // })
        .catch(e => {console.log(e)})
}
)

paintings.get('/:id', (req, res) => {
    getPaintingById(req.params.id, res)
    .then(result => {
res.send(result)
})
.catch(e=>{console.log(e)})

})

//put route
//takes {id1, ..., idn} to make unavailable
//next step: within makePaintings unavailable, 
//convert from json to array

paintings.put('/', (req, res)=>{
    console.log('received the put request')
    //this may be a source of breaking if .json doesn't work
    makePaintingsUnavailable(req.body, res)
    .then(()=> res.send('success'))

})

module.exports = {paintings}