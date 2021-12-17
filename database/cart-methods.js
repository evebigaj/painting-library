require('dotenv').config();
const {Pool} = require('pg')

const devConfig = {
        port: process.env.PG_PORT,
        user: process.env.PG_USER,
        database: 'painting_store',
        password: process.env.PG_PASSWORD,
        max: 20
}

const proConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false}
    // sslmode: 'require'
}

const pool = new Pool(
    process.env.NODE_ENV==='production'? proConfig: devConfig
)

const generateIdArray = async (res) => {
const newId = await pool.query(`select max(session_id) from carts`)
.then(result => {
    console.table(result.rows)
return result.rows})
.catch(e => { res.status(404);
    console.log(`oops: ${e}`);
    return e})

return newId
}

const getCart = async (session_id, res) =>
{ const cart = await pool.query(`select * from carts where session_id = ${session_id}`)
    .then(result => {console.table(result.rows)
        return result.rows})
    .then(itemIds => {
        let condition = ''
        if(itemIds.length===0){
            condition = 'false'
        }
      else{ itemIds.forEach(item_id => condition = condition.concat(`id = ${item_id.item_id} or `));
        
    condition = condition.slice(0,-3)}
    
return condition
})

.then(condition => pool.query(`select * from paintings where ${condition}`))
    .then(result=> {
        console.table(result.rows)
    return result.rows})
.catch(e => {console.log(`oops: ${e}`)
res.status(404);
return e})
return cart
}

 const addToCart = async (session_id, item_id, res) => {
    
  const cartItem =  await pool.query(`insert into carts values(${session_id}, ${item_id})`)
    
    .then(()=> pool.query(`select * from carts where session_id= ${session_id} and item_id = ${item_id}`))
    //delete below later
    .then(result => { console.table(result.rows)
    return result.rows})
    .catch(e=> {
        res.status(400)
        console.log(`oops: ${e}`)
        return e})
return cartItem
}

//1. select from cart
//2. given the item_id's there,
//iterate through them to create sentence 
//`item_id = item_id`
//concatenate these with ors 
//select * from paintings where condition 



//get item by id 
 
const getById = async (session_id, item_id, res) => {

let item = await pool.query(`select * from carts where session_id = ${session_id} and item_id=${item_id}`)
.then(result => {
    return result.rows})
.catch(e=> {console.log(`oops: ${e}`)
res.status(404);
return e})

return item
}

const deleteFromCart = async (session_id, item_id, res) => {
await pool.query(`delete from carts where session_id= ${session_id} and item_id=${item_id}`)
.then(response => response.rows)
.catch(e=> {console.log(`oops: ${e}`)
res.status(405)
return e})
}

const deleteAllFromCart = async (session_id, res) => {
    await pool.query(`delete from carts where session_id= ${session_id}`)
.then(response => response.rows)
.catch(e=> {
    console.log(`oops: ${e}`)
    res.status(405)
    return e})
}
module.exports = {deleteAllFromCart, generateIdArray, addToCart, getCart, getById, deleteFromCart}

