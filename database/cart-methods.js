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

const addToCart = async (id) => {
    //nb currently doesn't return anything
  const cartItem =  await pool.query(`insert into cart values(${id})`)
    //this may be an issue if id isn't string
    .then(()=> client.query(`select * from cart where item_id = ${id}`))
    //delete below later
    .then(result => {console.table(result.rows)
    return result.rows})
    .catch(e=> console.log(`oops: ${e}`))
return cartItem
}

//1. select from cart
//2. given the item_id's there,
//iterate through them to create sentence 
//`id = item_id`
//concatenate these with ors 
//select * from paintings where condition 

const getCart = async () =>
{ const cart = await pool.query(`select * from cart`)
    .then(result => {console.table(result.rows)
        return result.rows})
    .then(itemIds => {
        let condition = ''
        itemIds.forEach(item_id => condition = condition.concat(`id = ${item_id.item_id} or `));
        console.log(`initially, the condition is ${condition}`)
    condition = condition.slice(0,-3)
    console.log(condition)
return condition})
.then(condition => pool.query(`select * from paintings where ${condition}`))
    .then(result=> {console.table(result.rows)
    return result.rows})
    .catch(e => console.log(`oops: ${e}`))
return cart
}

module.exports = {addToCart, getCart}

