//we will:
//1) find id of painting to fetch
//2) find or set session id
//3) display painting and description
//4) have logic for adding and removing to cart

//1) finding the id of the painting to fetch from the url: 
let url = window.location.href
//finds first number immediately after backslash
//(since there may be numbers in the url)
let idIndex = url.search(/\/[0-9]/)
let numStringsToCut = idIndex +1
let id = url.slice(numStringsToCut,url.length-1)


let cartActionIcon = document.getElementById('cartActionIcon');
let cartActionDescription = document.getElementById("cartActionDescription")

//2) finding/setting session_id
// Sets session_id to be either what is in local storage
//or maximum session_id in 'carts' database + 1. 

//WARNING: This doesn't get updated until page refresh
//Most users navigate from home page, 
//which will have set the session_id
//but if you navigate to /painting/:id first,
//currently the cart action is broken 


if(!sessionStorage.getItem('session_id')){
  fetch('/api/cart/session')
    .then(result => result.json())
    .then(result => result.max +1)
    .then(newId => {sessionStorage.setItem('session_id', newId)})
}


const session = sessionStorage.getItem('session_id') 

//3) Fetch and display painting and description

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

//4) Add and remove from cart logic 

//choose whether to display 'add' or 'remove' to/from cart 
fetch(`/api/cart/${id}?session=${session}`)
.then(result => {
    if(result.status === 200){  
    return true
    }
else {
    return false}
})
.then(isInCart => { 
cartActionIcon.src = isInCart? "/photos/minus.png":"/photos/plus.png"
return isInCart
} )
.then(isInCart => {cartActionDescription.innerHTML = 
isInCart? 'Remove from basket': 'Add to basket'})



//onclick behavior: 
const addToCart = async () => {
    let isInCart = await fetch(`/api/cart/${id}?session=${session}`)
    .then(result => {
    if(result.status === 200){
        return true
    }
    else {
        return false
        }
    })

    
    //the case where we're adding to cart:
   
   if(!isInCart){
       //add to cart:
       await fetch(`/api/cart/${id}?session=${session}`, {method: 'POST'})
       //change icon and description to 'remmove' 
       cartActionIcon.src = '/photos/minus.png'
        cartActionDescription.innerHTML = "Remove from basket"
   }
   //case where we're removing from cart
   else if(isInCart){
       //remove from cart:
       await fetch(`/api/cart/${id}?session=${sessionStorage.getItem('session_id')}`, {method: 'DELETE'})
       //chnage icon and description to "add"
       cartActionIcon.src = '/photos/plus.png'
        cartActionDescription.innerHTML = "Add to basket"

   }
   
}