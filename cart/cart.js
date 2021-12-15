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

const submit = () => {

  const formData = new FormData(document.querySelector('form'))
    let newData = ''
  for (let pair of formData.entries()) {
 newData = newData +`\n` + pair[0]  + ': ' + pair[1]
  }
// for (var pair of formData.entries()) {
//   console.log(pair[0] + ': ' + pair[1]);

//next step: what is req.body?

  fetch('/submit', {method: 'POST', headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({"content": newData})})
  //fetch submit, request type POST, req.body.content  = ...

return false
}

// const submit = () => {
//     window.alert('submitted!')
//     console.log(`we're submitting!`)
//     return false
// }

form.onsubmit = submit 
   