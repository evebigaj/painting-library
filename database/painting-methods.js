require('dotenv').config()
const {Pool} = require('pg');
const pool = new Pool({
    port: process.env.PG_PORT,
    user: process.env.PG_USER,
    password: process.env.PG_PASSWORD, 
    database: process.env.PG_DATABASE,
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
    console.log(`The object keys are ${Object.keys(object)}`)
    let sentence = `select * from paintings where `
    for(key of Object.keys(object)){
        //console.log(key)
        let sentenceToConcat = ''
        if(key == 'maxprice'){
            sentenceToConcat = `price <= ${object[key]} and `
        }
        else if(key==='size'){
            switch(object[key]){
                case 'small': 
                    sentenceToConcat = `(width<=16 and height <=16) and `
                    break;
                case 'medium':
                    sentenceToConcat = `(width>16 or height>16) and width<=24 and height<=24 and `
                    break;
                case 'large':
                    sentenceToConcat = `(width>24 or height>24) and ` 
                    break;
        }
        }

        else{ sentenceToConcat = `${key} = '${object[key]}' and `}

        sentence = sentence.concat(sentenceToConcat)
    }
    sentence = sentence.slice(0,-5)
    console.log(sentence)

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

//takes in [id1, id2, ..., idn] and sets available:false

const convertToArray = object => {
    let array = []
for(let key of Object.keys(object)){
    array.push(key)
}
return array 
}

const makePaintingsUnavailable = async object => {

    let array = convertToArray(object)
    console.log(`The array is ${array}`)
    let condition = ''
    array.forEach(id => {
       condition = condition.concat(`id=${id} or `)
    })
    let sentence = `update paintings set available=false where `.concat(condition)
    sentence = sentence.slice(0,-4)
    console.log(sentence)
const result = pool.query(sentence)
.catch(e=>console.log(`oops: ${e}`))
return result
}

makePaintingsUnavailable([2,3])
//this is a promise because getPaintings is async
//console.log(`the result is ${getPaintings()}`)

module.exports = {makePaintingsUnavailable, getPaintings, getPaintingById, getPaintingByKey, getPaintingsByKeys}






