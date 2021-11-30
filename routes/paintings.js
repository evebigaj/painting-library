const express = require('express');
const paintings = new express.Router()
const {getPaintings, getPaintingById, getPaintingByKey, getPaintingsByKeys} = require('../database/painting-methods')

paintings.get('/', (req, res)=>{
    console.log('getting');
    if(!req.query){
    getPaintings()
    .then(result => {
        if(!result){
            res.status(404).send('Resource not found')
        }
        console.log(result);
        res.send(result)})}
    else{
        //for now, assuming single element query
        //for now, assuming we're searching specifically by medium
        //todo: refactor so there isn't duplicate code
        getPaintingsByKeys(req.query)
        .then(result => {
        if(!result){
            res.status(404).send('Resource not found')
        }
        if(Object.keys(result).length ===0){
            res.status(204).send()
        }
        console.log(result);
        res.send(result)})
        .catch(e => {console.log(e)})
    }
})

paintings.get('/:id', (req, res) => {
    getPaintingById(req.params.id)
    .then(result => {
        if(!result){res.status(404).send('Resource not found')         
}
res.send(result)
})})

module.exports = {paintings}