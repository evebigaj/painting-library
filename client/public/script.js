// Sets session_id to be either what is in local storage
//or maximum session_id in 'carts' database + 1. 

//WARNING: newly generated id is only put in 'carts' database
//when the first item is placed in a cart 
//so two people may be assigned same session_id 
//if one goes on the site before the other adds to cart

//this is ~fine given current small number of users 
//but should be fixed in final version


if(!sessionStorage.getItem('session_id')){
  fetch('/api/cart/session')
    .then(result => result.json())
    .then(result => result.max +1)
    .then(newId => {sessionStorage.setItem('session_id', newId)})
}