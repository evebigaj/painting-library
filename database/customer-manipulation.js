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


const addUser = async (firstName, lastName) =>
{try{ await client.connect();
    await client.query('BEGIN');
    //below isn't working for some reason
const result = await client.query('select * from customers');
console.table(result.rows)
await client.query('COMMIT')

}
catch(e){
    console.log(`Oops: ${e}`);
    client.query('ROLLBACK')
}
finally{
    client.end();
    console.log('ended')

}}

addUser('pug', 'hug')

