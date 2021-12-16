//window.open('mailto:evebigaj@gmail.com')



fetch(`/api/cart?session=${sessionStorage.getItem('session_id')}`)
.then(result => result.json())
.then(result =>{
    let cartContents = document.getElementById("cart-contents")
    if(result.length===0){
        let emptyCart = document.createElement('p')
        emptyCart.innerHTML = 'Your cart is empty'
        cartContents.append(emptyCart)}
    else{
        result.forEach(painting => {
    let imageBox = document.createElement('div')
    imageBox.id = 'image-box'
    cartContents.append(imageBox)
    console.log(painting.url)
    let image = document.createElement('img')
    image.src = painting.url;
    imageBox.append(image)
    let heading = document.createElement('p')
    heading.innerHTML = painting.title;
    imageBox.append(heading);
    let dimensions = document.createElement('p');
    dimensions.innerHTML = `${painting.width}"x${painting.height}"`
    imageBox.append(dimensions)
   })}
})

    // let container = document.getElementById("container");
    // result.forEach(painting => {
    //     let image = document.createElement('img');
    //     image.src = painting.url;
    //     container.append(image)
    // }
    //     )})


const form = document.getElementById('form')

//this should
//1) email form results to me 
//2) email cart contents to me
//3) make paintings unavailable
//4) clear their cart 
//5) potentially: remove sesion id. 

//next step: debug
//I think it's the chaining of the cart contents that's the problem?
//see if I can use the const instead of needint to chain? 

const submit = async () => {
//fetch cart contents 
//make a string of titles to concatenate to order 

//1. get cart and form contents and email them 
  try{
    let emailText = await fetch(`/api/cart?session=${sessionStorage.getItem('session_id')}`)
   .then(result => result.json())
   .then(result => {   
      let emailText = 'Paintings:'
      result.forEach(painting => emailText = emailText + '\n' + painting.title
      )
      return emailText})
    //at this point, the email text has all cart contents 

    const formData = new FormData(document.querySelector('form'))
    
    for (let pair of formData.entries()) {
      emailText = emailText +`\n` + pair[0]  + ': ' + pair[1]
    }
    //now email text is cart contents + form contents
    //about to post it to /submit
    //which will send an email

    await fetch('/submit', {
      method: 'POST', 
      headers: {
      'Content-Type': 'application/json'
      },
      body: JSON.stringify({"content": emailText})
    })
    
  }
  
  catch(e){
    console.log(`The error is ${e}`)
  }

//make paintings unavailable:
//fetch all id's from the cart
//define a helper function that takes id array 
//and for each element of the array, sets available: false 
// connect it to a put route that takes req.body = {id1: id1, id2: id2}

//to make this more backend-first:
//the put route takes in the session id
//so I think I can do app.use('/api/paintings/remove', (req, res, next) => {cart.get})
//then gets from the cart 
//then sends array of items to helper fn

//now we'll make paintings from cart unavailable:

  try{
    console.log(`starting to fetch cart contents`)
    fetch(`/api/cart?session=${sessionStorage.getItem('session_id')}`)
    .then(response => {console.log(`we got a response and it's ${response.json()}, with first element ${response.json()[0]}`)
    return response.json()})
    .then(response => {let body = {}
//have a case for empty cart
if(response.length >0){
response.forEach(painting => body[painting.item_id] = painting.item_id)
}
console.log(`the body is ${body}`)
return body
})
.then(body => {
fetch(`/api/paintings`, {method: 'PUT', body: JSON.stringify(body)}
)
})
}
catch(e){
  console.log(`the error in the put request is ${e}`)
}

await fetch(`/api/cart?session=${sessionStorage.getItem('session_id')}`, {method: 'DELETE'})

return false
}

// const submit = () => {
//     window.alert('submitted!')
//     console.log(`we're submitting!`)
//     return false
// }

form.onsubmit = submit 
   