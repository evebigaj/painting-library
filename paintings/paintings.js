let url = window.location.href
let questionIndex = url.indexOf('?')
let queryString = url.slice(questionIndex +1)

fetch(`/api/paintings?available=true&${queryString}`)
.then(result => result.json())
.then(result =>{
    let container = document.getElementById("container");
    result.forEach(painting => {
        let image = document.createElement('img');
        image.src = painting.url;
        image.onclick = () => {location.href = painting.id}
        container.append(image)
    }
        )
    console.log(result)})