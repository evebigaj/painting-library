const express = require('express');
const paintings = new express.Router()
const { getPaintingById,  getPaintingsByKeys, makePaintingsUnavailable} = require('../methods/painting-methods')



paintings.get('/', (req, res)=>{

        getPaintingsByKeys(req.query, res)
        .then(result => {        
            res.send(result)
        return result})
        .catch(e => {console.log(e)})
}
)

paintings.get('/:id', (req, res) => {
    getPaintingById(req.params.id, res)
    .then(result => {
res.send(result)
return result
})
.catch(e=>{console.log(e)})

})

//put route
//takes {id1, ..., idn} to make unavailable
//and sends to helper function
// which makes paintings unavailable in database: 
paintings.put('/', (req, res)=>{
    makePaintingsUnavailable(req.body, res)
    .then(()=> res.send('success'))

})

module.exports = {paintings}