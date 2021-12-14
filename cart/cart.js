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

// const submit = () => {
//  console.log(`we're submittiing`)
// //     const formData = new FormData(document.querySelector('form'))
// // for (var pair of formData.entries()) {
// //   console.log(pair[0] + ': ' + pair[1]);
// // }
// return false
// }

const submit = () => {
    window.alert('submitted!')
    console.log(`we're submitting!`)
    return false
}
   