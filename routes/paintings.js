const express = require('express');
const paintings = new express.Router()
const {getPaintings, getPaintingById, getPaintingByKey, getPaintingsByKeys, makePaintingsUnavailable} = require('../database/painting-methods')

paintings.use(express.static('styles.css'))

paintings.get('/', (req, res)=>{
        // document.head.append('<link rel="stylesheet" type="text/css"   href="public/styles.css">')
        console.log(`the request query has keys ${Object.keys(req.query)}`)
        getPaintingsByKeys(req.query, res)
        .then(result => {
            console.log(result)
            res.send(result)
        return result})
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
    getPaintingById(req.params.id)
    .then(result => {
        if(!result){res.status(404).send('Resource not found')         
}
res.send(result)
})})

//put route
//takes {id1, ..., idn} to make unavailable
//next step: within makePaintings unavailable, 
//convert from json to array

paintings.put('/', (req, res)=>{
    console.log('received the put request')
    //this may be a source of breaking if .json doesn't work
    makePaintingsUnavailable(req.body)
    .then(()=> res.send('success'))

})

module.exports = {paintings}