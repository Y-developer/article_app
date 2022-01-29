const myform = document.getElementById("myform"),
    title = document.getElementById("title"),
    discription = document.getElementById("discription");


const addArticle = (newDate) => {
    fetch('http://127.0.0.1:5000/add', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newDate),
    })
        .then(resp => resp.json())
        .then((data) => {
            console.log(data);
        })
        .catch(error => console.log(error))
}

myform.addEventListener('submit', (e) => {
    e.preventDefault();
    const newData = {
        title: title.value,
        body: discription.value
    };
    addArticle(newData);
});