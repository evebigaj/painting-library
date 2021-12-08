fetch('/api/paintings?available=true')
.then(result => result.json())
.then(result =>{
    let container = document.getElementById("container");
    result.forEach(painting => {
        let image = document.createElement('img');
        image.src = painting.url;
        container.append(image)
    }
        )
    console.log(result)})