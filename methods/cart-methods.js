require('dotenv').config();
const {Pool} = require('pg')

const devConfig = {
        port: process.env.PG_PORT,
        user: process.env.PG_USER,
        database: 'painting_store',
        password: process.env.PG_PASSWORD
}

const proConfig = {
    connectionString: process.env.DATABASE_URL,
    ssl: {rejectUnauthorized: false}
}

const pool = new Pool(
    process.env.NODE_ENV==='production'? proConfig: devConfig
)

const getMaxIdArray = async (res) => {
const newId = await pool.query(`select max(session_id) from carts`)
    .then(result => {
    return result.rows})
    .catch(e => { res.status(404);
    console.log(`oops: ${e}`);
    return e})

return newId
}

const getCart = async (session_id, res) => {
    const cart = await pool.query(`select * from carts where session_id = ${session_id}`)
    .then(result => {
        return result.rows})
    .then(itemIds => {
         //building towards: condition = 'id=id_1 or ... or id=id_n'
        let condition = ''
        if(itemIds.length===0){
            condition = 'false'
        }
      else{ itemIds.forEach(item_id => condition = condition.concat(`id = ${item_id.item_id} or `));
        //removes last ' or':
        condition = condition.slice(0,-3)
    }
   
    return condition
    })
    .then(condition => pool.query(`select * from paintings where ${condition}`))
    .then(result=> {
    return result.rows})
    .catch(e => {console.log(`oops: ${e}`)
        res.status(404);
        return e})
    return cart
    }

const addToCart = async (session_id, item_id, res) => {
  const cartItem =  await pool.query(`insert into carts values(${session_id}, ${item_id})`)  
    .then(()=> pool.query(`select * from carts where session_id= ${session_id} and item_id = ${item_id}`))
    .then(result => { 
    return result.rows})
    .catch(e=> {
        res.status(400)
        console.log(`oops: ${e}`)
        return e})
    return cartItem
    }

 
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
module.exports = {deleteAllFromCart, getMaxIdArray, addToCart, getCart, getById, deleteFromCart}

