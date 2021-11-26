require('dotenv').config()
const {Client} = require('pg');
const client = new Client({
    user: process.env.USER,
    password: process.env.PASSWORD,
    port: process.env.PORT,
    database: `painting_store`
})


// const generateId = () => {
//     client.query('select max(id) from customers')
//     .then(result => { console.log(result.rows[0])
//         return result.rows[0].max})
//     .then(value => {
//         console.log(value)
//         client.end();
//         return value
//     })
// }
// const generateId = async () => {
//     try{//await client.connect();
//     const {rows} = await client.query('select max(id) from customers')
//     console.log(rows)
//     const newId = await rows[0].max;
// return newId}
//     catch(e){console.log(`oops: ${e}`)}
//     finally{
//         await client.end()
//         return newId
//     }
// }

//console.log(`The new ID is ${generateId()}`)


const createCustomer = async (username, firstName, lastName, password) =>
client.connect()
.then(()=> client.query('BEGIN'))
.then(() => client.query('insert into customers (username, first_name, last_name, password) values($1, $2, $3, $4)', 
    [username, firstName, lastName, password]))
.then(()=> client.query('select * from customers'))
.then(result => console.table(result.rows))
.then(() => client.query('COMMIT'))
.catch((e) =>
{    console.log(`Oops: ${e}`);
    client.query('ROLLBACK')
})
.finally( () => {
    client.end();
    console.log('ended')})


// const createCustomer = async (username, firstName, lastName, password) =>
// {try{ await client.connect();
//     await client.query('BEGIN');
//     await client.query('insert into table customers (username, first_name, last_name, password) values($1, $2, $3, $4)', 
//     [username, firstName, lastName, password])
// const result = await client.query('select * from customers');
// console.table(result.rows)
// await client.query('COMMIT')

// }
// catch(e){
//     console.log(`Oops: ${e}`);
//     client.query('ROLLBACK')
// }
// finally{
//     client.end();
//     console.log('ended')

// }}

//createCustomer('eve', 'eve', 'bigaj', 'test')

module.exports = {createCustomer}


