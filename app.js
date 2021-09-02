const mainDiv = document.getElementById('main');
const getApi = () => {
    const inputField = document.getElementById('inputField');
    const inputValue = inputField.value;
    inputField.value = '';
    if (inputValue === '') {
        const div = document.createElement('div');
        div.innerHTML = `
        <h2 class='text-danger mx-auto'>Please! Write a book name to get result.</h2>`
        mainDiv.appendChild(div);
    }
    else {
        const url = `https://openlibrary.org/search.json?q=${inputValue}`;
    fetch(url)
    .then(res => res.json())
    .then(data=>getDetails(data))
    }
}
const getDetails = data => {
    if (data.numFound === 0) {
        const div = document.createElement('div');
        div.innerHTML = `
        <h2 class='text-danger text-center'>Sorry! There is no mathcing book found.</h2>`
        mainDiv.appendChild(div);
    }
    else {
        const p = document.getElementById('search');
        p.innerText = `Search Result Found: ${data.numFound}`;
        const dataDoc = data.docs;
        mainDiv.innerHTML = '';
        dataDoc.forEach(item => {
        const imgUrl = `https://covers.openlibrary.org/b/id/${item.cover_i}-M.jpg`;
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card mb-3 mx-auto shadow p-3 mb-5 bg-body rounded" style="max-width: 540px;">
                 <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${imgUrl}" class="img-fluid rounded-start" alt="Book Image ThumbNail">
                    </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Book Name: <span class="text-success">${item.title}</span></h5>
                        <h6 class="card-text mt-2">by: <span class="text-info">${item.author_name[0]}</span></h6>
                        <p class="card-text">Publisher: <small class="text-muted">${item.publisher[0]}</small></p>
                        <p class="card-text">Publish Date: <small class="text-muted">${item.publish_date[0]}</small></p>
                        </div>
                    </div>
                </div>
            </div>`
        mainDiv.appendChild(div);
        })
    }
} 