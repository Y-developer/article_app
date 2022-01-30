const myform = document.getElementById("myform"),
    title = document.getElementById("title"),
    discription = document.getElementById("discription"),
    articles = document.getElementById("articles");

let articleId = null;

// post artical
const addArticle = (newData) => {
    fetch('http://127.0.0.1:5000/add', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newData),
    })
        .then(resp => resp.json())
        .then(() => getArticles())
        .catch(error => console.log(error))
}

// get articles
const getArticles = () => {
    fetch('http://127.0.0.1:5000/get', {
        method: 'GET',
    })
        .then(resp => resp.json())
        .then(data => renderArticles(data))
        .catch(error => console.log(error))
}

// delete article
const deleteArticle = (id) => {
    fetch(`http://127.0.0.1:5000/delete/${id}/`, {
        method: 'DELETE'
    });
    getArticles();
}

// get article by id
const getArticalById = (id) => {
    fetch(`http://127.0.0.1:5000/get/${id}/`, {
        method: 'GET',
    })
        .then(resp => resp.json())
        .then(data => renderArticleOnForm(data))
        .catch(error => console.log(error))
}

// update article
const updateArticle = (id, newData) => {
    fetch(`http://127.0.0.1:5000/update/${id}/`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify(newData),
    })
        .then(resp => resp.json())
        .then(() => getArticles())
        .catch(error => console.log(error))
}

const renderArticleOnForm = (data) => {
    title.value = data.title;
    discription.value = data.body;
    articleId = data.id;
}

// render all articles
const renderArticles = (data) => {
    articles.innerHTML = '';
    const getTimeAMPMformat = (date) => {
        const d = new Date(date);
        let hours = d.getHours();
        let minutes = d.getMinutes();
        let ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // the hour '0' should be '12'
        minutes = minutes < 10 ? '0' + minutes : minutes;
        return `${hours} : ${minutes} ${ampm}`;
    };
    const getDate = (date) => {
        const d = new Date(date);
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
        const getHours = (hour) => {
            return (hour);
        }
        const ampm = d.getHours() < 12 ? 'AM' : 'PM';
        return `${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
    };
    data.forEach(data => {
        articles.innerHTML += `
        <div class="card border-dark mt-2">
            <div class="card-body">
                <div class="card-title" style="font-size: 1.5rem; font-weight: 600;">${data.title}</div>
                <div class="card-text">${data.body}</div>
                <div class="card-text d-flex justify-content-end" style="font-size: 0.9rem;">${getDate(data.date)}  |  ${getTimeAMPMformat(data.date)}</div>
                <hr>
                <div class="d-flex justify-content-end">
                    <button class="btn btn-success" onclick="getArticalById(${data.id})">Update</button>
                    <button class="btn btn-danger" style="margin-left: 0.5rem" onclick="deleteArticle(${data.id})">Delete</button>
                </div>
            </div>
        </div>
        `
    });
}


// submit button
myform.addEventListener('submit', (e) => {
    e.preventDefault();
    const newData = {
        title: title.value,
        body: discription.value
    };
    if(articleId){
        updateArticle(articleId,newData);
        articleId = null;
    }else{
        addArticle(newData);
    }
    myform.reset();
});

getArticles();