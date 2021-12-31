require('dotenv').config()
const {Pool} = require('pg');

const devConfig = {
        port: process.env.PG_PORT,
        user: process.env.PG_USER,
        database: 'painting_store',
        password: process.env.PG_PASSWORD
}

const proConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized:false}
}

const pool = new Pool(
    process.env.NODE_ENV==='production'? proConfig: devConfig
   
);


const getPaintingById = async (id, res) => {
    const painting = await pool.query(`select * from paintings where id = ${id}`)
    .then(result => {
        return result.rows})
    .catch(error => {console.log(`oops: ${error}`)
    res.status(404)
    return error})
    return painting
}

const getPaintingsByKeys = async (object, res) => {

    let sentence = `select * from paintings where `
    for(key of Object.keys(object)){
        
        let sentenceToConcat = ''
        //current implementation doesn't use this case:
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
        //removes final ' and ':
    sentence = sentence.slice(0,-5)
    

    const result = await pool.query(sentence)
     .then(result => result.rows)
    .catch(error => {console.log(`oops: ${error}`)
        res.status(404).send('Resource not found')
        return error})

    return result 
    
}

//used in makePaintingsUnavailable:
const convertToArray = object => {
    let array = []
for(let key of Object.keys(object)){
    console.log(`the request body has key ${key}`)
    array.push(key)
}
return array 
}

const makePaintingsUnavailable = async (object, res) => {

    let array = convertToArray(object)
    let condition = ''
    array.forEach(id => {
       condition = condition.concat(`id=${id} or `)
    })
    let sentence = `update paintings set available=false where `.concat(condition)
    //removes final ' or ':
    sentence = sentence.slice(0,-4)
    console.log(sentence)
const result = pool.query(sentence)
.catch(e=>{console.log(`oops: ${e}`)
res.status(405).send(`Could not make paintings unavailable because ${e}`)
return e})
return result
}


module.exports = {makePaintingsUnavailable, getPaintingById, getPaintingsByKeys}






