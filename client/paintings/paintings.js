let url = window.location.href
let queryString = ''
let questionIndex = url.indexOf('?')
if(questionIndex !== -1){
queryString = url.slice(questionIndex +1)}


fetch(`/api/paintings?available=true&${queryString}`)
.then(result => {
    return result.json()})
.then(result =>{
    let container = document.getElementById("painting-container");
    result.forEach(painting => {
        let image = document.createElement('img');
        image.classList.add('painting-image')
        image.src = painting.url;
        image.onclick = () => {location.href = painting.id}
        container.append(image)
    }
        )
    })