require('dotenv').config()
const {Client} = require('pg');
const client = new Client({
    port: process.env.PORT,
    user: process.env.USER,
    password: process.env.PASSWORD, 
    database: 'painting_store'
});

const getPaintings = async () => {

const paintings = await (client.connect()
.then(console.log('connected'))
.then(() => client.query("select * from paintings"))
.then(result => {
    //console.log(result.rows)
return result.rows})
.catch(error => {console.log(`oops: ${error}`)})
.finally((result) => {client.end()
return result}))
//console.log(paintings)
return paintings
}

const getPaintingById = async (id) => {
    const painting = await client.connect()
    .then(() => client.query(`select * from paintings where id = ${id}`))
    .then(result => result.rows)
    .catch(error => {console.log(`oops: ${error}`)
return error})
    .finally(result => {
        client.end()
    })
    return painting
}

const getPaintingByKey = async (key, value) => {
    const result = await client.connect()
    .then(() =>{console.log('connected')})
    .then(() => client.query(`select * from paintings where ${key} = '${value}'`))
    .then(result => {
        console.table(result.rows)
        return result.rows
    })
    .catch(error => {console.log(`oops: ${error}`)
return error})
.finally(()=>{client.end()})

return result 
}


//this is a promise because getPaintings is async
//console.log(`the result is ${getPaintings()}`)

module.exports = {getPaintings, getPaintingById, getPaintingByKey}






