//window.open('mailto:evebigaj@gmail.com')



fetch(`/api/cart?session=${sessionStorage.getItem('session_id')}`)
.then(result => {if(result.status === 204){
  return []}
 else {return result.json()}})
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



//fetch cart contents 
//make a string of titles to concatenate to order 

//1. get cart and form contents and email them 

const sendEmail = async () => {
try{
    let emailText = await fetch(`/api/cart?session=${sessionStorage.getItem('session_id')}`)
   .then(result => {return result.json()})
   .then(result => {   
      let emailText = 'Paintings:'
      result.forEach(painting => emailText = emailText + '\n' + painting.title
      )
      console.log(`The email text is now ${emailText}`)
      return emailText})
    //at this point, the email text has all cart contents 

    const formData = new FormData(document.querySelector('form'))
    
    for (let pair of formData.entries()) {
      emailText = emailText +`\n` + pair[0]  + ': ' + pair[1]
    }
    console.log(`and now the email text is ${emailText}`)
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
}

//make paintings unavailable:
//fetch all id's from the cart
//define a helper function that takes id array 
//and for each element of the array, sets available: false 
// connect it to a put route that takes req.body = {id1: id1, id2: id2}

const makeUnavailable = async () => {
console.log(`we're right before the second try clause`)
  try{
    console.log(`starting to fetch cart contents`)
    //fetching from cart route
    fetch(`/api/cart?session=${sessionStorage.getItem('session_id')}`)
    //this is the line which doesn't happen
    .then(response => { console.log(`we got a response with the list of paintings`)
    if(response.length === 0){return []}
    else { return response.json()}})
    .then(response => {let body = {}
        console.log(`the length of the response is ${response.length}`)
//have a case for empty cart
if(response.length >0){
response.forEach(painting => {console.log(`the paintings you ordered include painting number ${painting.id}`)
    body[painting.id] = painting.id})
}
return body
})
.then(body => {
    console.log('passing request to make paintings unavailable to backend')
fetch(`/api/paintings`, {method: 'PUT',  headers: {
      'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(body)}
)
})
}
catch(e){
  console.log(`the error in the put request is ${e}`)
}
}

const deleteCart = async () => {
    return await fetch(`/api/cart?session=${sessionStorage.getItem('session_id')}`, {method: 'DELETE'})}


//test:

// fetch(`/api/cart?session=${sessionStorage.getItem('session_id')}`)
// .then(() => {makeUnavailable()})

console.log(`the session id is ${sessionStorage.getItem('session_id')}`)

const submissionChain = async () => {
    let chainComplete = false
    const result = await sendEmail()
    .then(() => makeUnavailable())
    .then(()=>deleteCart()
    )
    .then(()=>{form.style.display = 'none';
    let formContainer = document.getElementById('form-container');
    formContainer.style.display = 'none'
    let cartContents = document.getElementById('cart-contents')
    cartContents.style.display = 'none'
    let container = document.getElementById('container')
    let heading = document.createElement('h1')
    heading.innerHTML = 'Success!'
    container.append(heading)
    let message = document.createElement('p')
    message.innerHTML = 'Your paintings will arrive within three days.'
    container.append(message)
})
    return result 
}



const submit = () => {
    
    submissionChain()
   

    // sendEmail()
    // .then(()=> {makeUnavailable()})
    // .catch(e=>{console.log(`chaining error ${e}`)})

    // try{
    //     //do I know that this way they happen sequentially? 
    // await sendEmail();
    
    // await makeUnavailable()}
    // catch(e){
    //     console.log(`the error in the submit function was ${e}`)
    // }
    return false 

// return false
}




//   if (form !== undefined &&  submitted === true) {
//     // Validation succeeded, submit the form
//     form.submit();
//   }

// // const submit = () => {
// //     window.alert('submitted!')
// //     console.log(`we're submitting!`)
// //     return false
// // }

form.onsubmit = submit 
   