console.log(window.location.href)
let url = window.location.href
let numStringsToCut = 'http://localhost3000/paintings/'.length
let id = url.slice(numStringsToCut+1,url.length-1)
console.log(id)

fetch(`/api/paintings/${id}`)
.then(result => result.json())
.then(result => {
    let painting = result[0]
    let info = document.getElementById("info")
    console.log(painting.url)
    let image = document.createElement('img')
    image.src = painting.url;
    info.append(image)
    let heading = document.createElement('h1')
    heading.innerHTML = painting.title;
    info.append(heading);
    let dimensions = document.createElement('p');
    dimensions.innerHTML = `${painting.width}"x${painting.height}"`
    info.append(dimensions)
    let price = document.createElement('p');
    price.innerHTML = `$${painting.price}`
    info.append(price)
})