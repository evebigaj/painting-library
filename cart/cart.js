fetch('/api/cart')
.then(result => result.json())
.then(result =>{
    result.forEach(painting => {
    let cartContents = document.getElementById("cart-contents")
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
    cartContents.append(price)})
})

    // let container = document.getElementById("container");
    // result.forEach(painting => {
    //     let image = document.createElement('img');
    //     image.src = painting.url;
    //     container.append(image)
    // }
    //     )})
   