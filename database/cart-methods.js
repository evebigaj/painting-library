require('dotenv').config();
const {Pool} = require('pg')
const pool = new Pool(
    {port: process.env.PORT,
        user: process.env.USER,
        database: 'painting_store',
        password: process.env.PASSWORD,
        max: 20
    }
)

const generateId = async () => {
const newId = await pool.query(`select max(session_id) from carts`)
.then(result => {
    console.log(result.rows)
return result.rows})
.catch(e => console.log(`oops: ${e}`))

return newId
}

 const addToCart = async (session_id, item_id) => {
    
  const cartItem =  await pool.query(`insert into carts values(${session_id}, ${item_id})`)
    //this may be an issue if item_id isn't string
    .then(()=> pool.query(`select * from carts where session_id= ${session_id} and item_id = ${item_id}`))
    //delete below later
    .then(result => {console.table(result.rows)
    return result.rows})
    .catch(e=> console.log(`oops: ${e}`))
return cartItem
}

//1. select from cart
//2. given the item_id's there,
//iterate through them to create sentence 
//`item_id = item_id`
//concatenate these with ors 
//select * from paintings where condition 

const getCart = async (session_id) =>
{ const cart = await pool.query(`select * from carts where session_id = ${session_id}`)
    .then(result => {console.table(result.rows)
        return result.rows})
    .then(itemIds => {
        let condition = ''
        if(itemIds.length===0){
            condition = `id=1000000`
        }
      else{ itemIds.forEach(item_id => condition = condition.concat(`id = ${item_id.item_id} or `));
        
    condition = condition.slice(0,-3)}
    console.log(condition)
return condition
})

.then(condition => pool.query(`select * from paintings where ${condition}`))
    .then(result=> {
    return result.rows})
    .catch(e => console.log(`oops: ${e}`))
return cart
}

//get item by id 
 
const getById = async (session_id, item_id) => {

let item = await pool.query(`select * from carts where session_id = ${session_id} and item_id=${item_id}`)
.then(result => {console.table(result.rows)
    return result.rows})
.catch(e=> console.log(`oops: ${e}`))

return item
}

const deleteFromCart = async (session_id, item_id) => {
await pool.query(`delete from carts where session_id= ${session_id} and item_id=${item_id}`)
.then(response => response.rows)
.catch(e=> console.log(`oops: ${e}`))
}

const deleteAllFromCart = async (session_id) => {
    await pool.query(`delete from carts where session_id= ${session_id}`)
.then(response => response.rows)
.catch(e=> console.log(`oops: ${e}`))
}
module.exports = {deleteAllFromCart, generateId, addToCart, getCart, getById, deleteFromCart}

