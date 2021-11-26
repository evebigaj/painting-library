const express = require('express');
const paintings = new express.Router()
const {getPaintings, getPaintingById} = require('../database/painting-methods')

paintings.get('/', (req, res)=>{
    console.log('getting');
    getPaintings()
    .then(result => {
        if(!result){
            res.status(404).send('Resource not found')
        }
        console.log(result);
        res.send(result)})
})

paintings.get('/:id', (req, res) => {
    getPaintingById(req.params.id)
    .then(result => res.send(result))
})

module.exports = {paintings}