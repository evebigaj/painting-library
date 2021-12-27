// I set the customer id to be either 
// sessionStorage.getItem('session_id') or generateNewId() 
// [need functionality for generateNewId():
// this queries the database and goes one higher than max id]
// and then sessionStorage.setItem('session_id', newId)




console.log('getting session storage')
if(!sessionStorage.getItem('session_id')){ 
fetch('/api/cart/session')
.then(result => result.json())
.then(result => {console.log(result) 
    return result.max +1})
.then(newId => {sessionStorage.setItem('session_id', newId)
})
}

console.log(`the session storage is ${sessionStorage.getItem('session_id')}`)