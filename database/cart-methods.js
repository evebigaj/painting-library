require('dotenv').config();
const {Client} = require('pg')
const client = new Client(
    {port: process.env.PORT,
        user: process.env.USER,
        database: 'painting_store',
        password: process.env.PASSWORD
    }
)

const addToCart = async (id) => {
    //nb currently doesn't return anything
  const cartItem =  await client.connect()
    .then(()=>{ console.log('connected')
        client.query(`insert into cart values(${id})`)})
    //this may be an issue if id isn't string
    .then(()=> client.query(`select * from cart where item_id = ${id}`))
    //delete below later
    .then(result => {console.table(result.rows)
    return result.rows})
    .catch(e=> console.log(`oops: ${e}`))
    .finally(result =>{client.end()
    return result})
return cartItem
}

module.exports = {addToCart}

