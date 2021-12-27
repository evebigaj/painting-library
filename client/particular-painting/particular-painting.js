//finding the id of the painting to fetch from the url: 
let url = window.location.href
//finds first number immediately after backslash
//(since there may be numbers in the url)
let idIndex = url.search(/\/[0-9]/)
let numStringsToCut = idIndex +1
let id = url.slice(numStringsToCut,url.length-1)


let cartActionIcon = document.getElementById('cartActionIcon');
let cartActionDescription = document.getElementById("cartActionDescription")


// Sets session_id to be either what is in local storage
//or maximum session_id in 'carts' database + 1. 

//WARNING: newly generated id is only put in 'carts' database
//when the first item is placed in a cart 
//so two people may be assigned same session_id 
//if one goes on the site before the other adds to cart

//this is ~fine given current small number of users 
//but should be fixed in final version



const createStorageId = async () => {
    result = await fetch('/api/cart/session')
.then(result => result.json())
.then(result => {console.log(result) 
    return result.max +1})
.then(newId => {sessionStorage.setItem('session_id', newId)
})
return result 
}

const session = sessionStorage.getItem('session_id') || createStorageId()
console.log(`the session id is ${session}`)

fetch(`/api/cart/${id}?session=${session}`)
.then(result => {
    
    if(result.status === 200){
    
    return true
}
else 
{
    return false}
})
.then(isInCart => { 
cartActionIcon.src = isInCart? "/photos/minus.png":"/photos/plus.png"
return isInCart
} )
.then(isInCart => {cartActionDescription.innerHTML = 
isInCart? 'Remove from basket': 'Add to basket'})


console.log(`fetching the painting`)
fetch(`/api/paintings/${id}`)
.then(result => result.json())
.then(result => {
    let painting = result[0]
    let imageBox = document.getElementById("image-box")
    let description = document.getElementById('description')
   
    let image = document.createElement('img')
    image.src = painting.url;
    imageBox.append(image)
    let heading = document.createElement('h1')
    heading.innerHTML = painting.title;
    description.append(heading);
    let dimensions = document.createElement('p');
    dimensions.innerHTML = `${painting.width}"x${painting.height}"`
    description.append(dimensions)
    let price = document.createElement('p');
    price.innerHTML = `$${painting.price}`
    description.append(price)
})




const addToCart = async () => {
//console.log(`/api/cart/${id}?session=${session}`)
let isInCart = await fetch(`/api/cart/${id}?session=${session}`)
.then(result => {
    console.log(result.status)

    if(result.status === 200){

    return true
}
else 
{
    return false}
})

console.log(`Is in cart is ${isInCart}`)
    
    
   if(!isInCart){
       console.log('about to send to cart')
       await fetch(`/api/cart/${id}?session=${session}`, {method: 'POST'})
   

   cartActionIcon.src = '/photos/minus.png'
   
   cartActionDescription.innerHTML = "Remove from basket"
   
   }

   else if(isInCart){console.log('is in cart')
       await fetch(`/api/cart/${id}?session=${sessionStorage.getItem('session_id')}`, {method: 'DELETE'})
       cartActionIcon.src = '/photos/plus.png'
    cartActionDescription.innerHTML = "Add to basket"

   }
   //make remove from basket appear on load
   //make the button action for when it's remove
   //(i.e. delete route)

   //make the state depend on the state of the cart rather than defaulting
   //change text
   //change state so that clicking now removes from cart 
}