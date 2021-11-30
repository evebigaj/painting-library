const express = require('express');
const paintings = new express.Router()
const {getPaintings, getPaintingById, getPaintingByKey, getPaintingsByKeys} = require('../database/painting-methods')

paintings.get('/', (req, res)=>{
        getPaintingsByKeys(req.query, res)
        .then(result => {
        // if(!result){
        //     res.status(404).send('Resource not found')
        // }
        // if(Object.keys(result).length ===0){
        //     res.status(204).send()
        // }
        console.log(result);
        res.send(result)})
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

module.exports = {paintings}