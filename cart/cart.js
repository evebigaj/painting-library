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
    
    console.log(painting.url)
    let image = document.createElement('img')
    image.src = painting.url;
    cartContents.append(image)
    let heading = document.createElement('h1')
    heading.innerHTML = painting.title;
    cartContents.append(heading);
    let dimensions = document.createElement('p');
    dimensions.innerHTML = `${painting.width}"x${painting.height}"`
    cartContents.append(dimensions)
    let price = document.createElement('p');
    price.innerHTML = `$${painting.price}`
    cartContents.append(price)})}
})

    // let container = document.getElementById("container");
    // result.forEach(painting => {
    //     let image = document.createElement('img');
    //     image.src = painting.url;
    //     container.append(image)
    // }
    //     )})
   