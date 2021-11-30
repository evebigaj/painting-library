fetch("http://localhost:3000/paintings?id=1")
.then(response => {console.log(response);
    return response.json()})
.then(response => {
    document.body.appendChild(`<p> ${response.title}</p>`)
})