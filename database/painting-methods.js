require('dotenv').config()
const {Pool} = require('pg');
const pool = new Pool({
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD, 
    database: 'painting_store',
    max: 20
    //more parameters can go here 

});

const getPaintings = async () => {

const paintings = await pool.query("select * from paintings")
.then(result => {
    //console.log(result.rows)
return result.rows})
.catch(error => {console.log(`oops: ${error}`)})
//console.log(paintings)
return paintings
}

const getPaintingById = async (id) => {
    const painting = await pool.query(`select * from paintings where id = ${id}`)
    .then(result => result.rows)
    .catch(error => {console.log(`oops: ${error}`)
return error})
    return painting
}

const getPaintingsByKeys = async (object, res) => {
    console.log(Object.keys(object))
    let sentence = `select * from paintings where `
    for(key of Object.keys(object)){
        //console.log(key)
        let sentenceToConcat = ''
        if(key == 'maxprice'){
            sentenceToConcat = `price <= ${object[key]} and `
        }
        else{ sentenceToConcat = `${key} = '${object[key]}' and `}

        sentence = sentence.concat(sentenceToConcat)
    }
    sentence = sentence.slice(0,-5)
    //console.log(sentence)

    const result = await pool.query(sentence)
     .then(result => {
        console.table(result.rows)
        return result.rows
    })
    .catch(error => {console.log(`oops: ${error}`)
    res.status(404)
return error})

return result 
    
}

//getPaintingsByKeys({medium: 'oil'})

const getPaintingByKey = async (key, value) => {
    const result = await pool.query(`select * from paintings where ${key} = '${value}'`)
    .then(result => {
        console.table(result.rows)
        return result.rows
    })
    .catch(error => {console.log(`oops: ${error}`)
return error})


return result 
}


//this is a promise because getPaintings is async
//console.log(`the result is ${getPaintings()}`)

module.exports = {getPaintings, getPaintingById, getPaintingByKey, getPaintingsByKeys}






