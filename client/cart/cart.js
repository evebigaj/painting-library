
//display cart contents: 

fetch(`/api/cart?session=${sessionStorage.getItem('session_id')}`)
.then(result => {if(result.status === 204){
  return []}
 else {return result.json()}})
.then(result =>{
    let cartContents = document.getElementById("cart-contents")
    if(result.length===0){
        let emptyCart = document.createElement('p')
        emptyCart.innerHTML = 'Your basket is empty'
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
    dimensions.innerHTML = `, ${painting.width}"x${painting.height}"`
    imageBox.append(dimensions)
   })}
})


const form = document.getElementById('form')

//onsubmit, the form will 
//1) email form results to me 
//2) email cart contents to me
//3) make paintings unavailable
//4) clear cart 



//1) gets cart and form contents and emails them: 

const sendEmail = async () => {
try{
    let emailText = await fetch(`/api/cart?session=${sessionStorage.getItem('session_id')}`)
   .then(result => {return result.json()})
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
}

//2) makes paintings unavailable:
//fetches all id's from the cart
//sends them to put route that takes req.body = {id_1, ...,  id_n}
// the put route sends id array to helper function 
//which sets  available: false for each element of the array


const makeUnavailable = async () => {

  try{
    //fetching from cart route
    fetch(`/api/cart?session=${sessionStorage.getItem('session_id')}`)
    .then(response => { 
      if(response.length === 0){return []}
      else { return response.json()}
    })
    .then(response => {
        let body = {}
        //putting {id_1, ..., id_n} into body:
        if(response.length >0){
          response.forEach(painting => {body[painting.id] = painting.id})
          }
  return body
  })
  //sending 'put' request with body
  .then(body => {
    fetch(`/api/paintings`, {method: 'PUT',  headers: {
      'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(body)})
  })
}
catch(e){
  console.log(`the error in the put request is ${e}`)
}
}

//3) deletes all cart entries with current session_id
const deleteCart = async () => {
    return await fetch(`/api/cart?session=${sessionStorage.getItem('session_id')}`, 
    {method: 'DELETE'})
  }


const submissionChain = async () => {
    const result = await sendEmail()
    .then(() => makeUnavailable())
    .then(()=>deleteCart()
    )
    //displays success page:
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
   //we don't want form to submit,
   //because we want all the async functions to happen unimpeded
    return false 

}

form.onsubmit = submit 
   