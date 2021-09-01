const getApi = () => {
    const inputField = document.getElementById('inputField');
    const inputValue = inputField.value;
    inputField.value = '';
    const url = `http://openlibrary.org/search.json?q=${inputValue}`;
    fetch(url)
        .then(res => res.json())
    .then(data=>getDetails(data))
}
const getDetails = data => {
    console.log(data)
    const dataDoc=data.docs
    const mainDiv = document.getElementById('main');
    dataDoc.forEach(item => {
        console.log(item.docs)
        const div = document.createElement('div');
        div.innerHTML = `
        <div class="card" style="width: 18rem;">
    <div class="card-body">
    <h4 class="card-title">Book Name: ${item.title}</h4>
    <h5 class="card-text">Author Name: ${item.author_name}</h5>
    <h5 class="card-text">Publish Date: ${item.publish_date}</h5>
    <h5 class="card-text">Search Found: ${data.numFound}</h5>
    

    <a href="#" class="btn btn-outline-info">Details</a>
  </div>
</div>`
        mainDiv.appendChild(div);
    })
}

const getImageApi = () => {
    const url=`https://covers.openlibrary.org/b/id/{cover_i}-L.jpg`
}
