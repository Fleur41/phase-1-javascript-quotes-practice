document.addEventListener('DOMContentLoaded', () => {
    getQuotes()
    handleSubmit()
}) 
function getQuotes() {
    fetch("http://localhost:3000/quotes")
    .then((res) => res.json())
    .then(quotes => {
        quotes.forEach(quote => {
            displayQuote(quote)
        });
    })
}

function displayQuote(quote) {
    const li = document.createElement('li')
    li.className = 'quote-card'
    li.innerHTML = `
        <blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button id="like-${quote.id}" class='btn-success'>Likes: <span>0</span></button>
        <button id=${quote.id} class='btn-danger'>Delete</button>
        </blockquote> `
    document.getElementById('quote-list').appendChild(li)

    const deletBtn = document.getElementById('quote.id')
    deletBtn.addEventListener('click', () => {
        deleteQuote(quote);
    })

    const likeBtn = document.getElementById(`like-${quote.id}`)
    let likes= 0
    likeBtn.addEventListener('click', () => {
        likes += 1
        likeBtn.innerHTML = `likes: <span>${likes}</span>`   
        incrementLikes(quote) 
    })
 
}

function handleSubmite() {
    const form = document.querySelector('form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const author = form.author.value
        const quote = form.quote.value

        const dataObj = {
            quote: quote,
            author: author
        }
        postQuote(dataObj)
    })
}

function postQuote(quote) {
    fetch("http://localhost:3000/quotes", {
        method: 'POST'
        headers: {
            'content-type': 'application/json'
        }
        body: JSON.stringify(quote)
    })
    .then(res => res.json())
    .then((data) => displayQuote(data))
}

function deleteQuote(quote) {
    fetch(`http://localhost:3000/quotes/${quote.id}`, {
        method: 'POST'
        headers: {
            'content-type': 'application/json'
        }
        body: JSON.stringify(quote)
    })
    .then(res => res.json())
    .then(data => {
        window.location.reload()
    })
}

function incrementLikes(quote) {
    fetch('http://localhost:3000/likes', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({
            quoteId: quote.id,
            like: 1558524356
        })
        
    })
    .then(res => res.json())
    .then(data => data)
}
