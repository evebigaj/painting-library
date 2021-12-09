fetch('/api/cart')
.then(result => result.json())
.then(result =>{

    let container = document.getElementById("container");
    result.forEach(painting => {
        let image = document.createElement('img');
        image.src = painting.url;
        container.append(image)
    }
        )})
   