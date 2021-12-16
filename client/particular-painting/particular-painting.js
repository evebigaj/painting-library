//next: delete backend console logs 
console.log(window.location.href)
let url = window.location.href
let numStringsToCut = 'https://painting-library.herokuapp.com/paintings/'.length
// let numStringsToCut = 'http://localhost3000/paintings/'.length
let id = url.slice(numStringsToCut+1,url.length-1)


//make what we're displaying depend on whether cart has item
let cartActionIcon = document.getElementById('cartActionIcon');
let cartActionDescription = document.getElementById("cartActionDescription")
const session = sessionStorage.getItem('session_id')

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




console.log(`fetching the paintings`)
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
//now make this depend on whether the item is in the cart



const addToCart = async () => {

let isInCart = await fetch(`/api/cart/${id}?session=${session}`)
.then(result => {

    if(result.status === 200){
    
    return true
}
else 
{
    return false}
})

    
    //need to make this relative to the new cart
   if(!isInCart){
       
       await fetch(`/api/cart/${id}?session=${session}`, {method: 'POST'})
   

   cartActionIcon.src = '/photos/minus.png'
   
   cartActionDescription.innerHTML = "Remove from basket"
   }
   else if(isInCart){
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