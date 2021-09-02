const mainDiv = document.getElementById('main');
const div = document.createElement('div');
const getApi = () => {
    //search functionality
    const inputField = document.getElementById('inputField');
    const inputValue = inputField.value;
    inputField.value = '';
    if (inputValue === '') {
        mainDiv.innerHTML = '';
        div.innerHTML = `
        <h2 class='text-danger text-center shadow p-3 bg-body rounded'>
        Please! Write a book name to get the result.</h2>`
        mainDiv.appendChild(div);
    }
    else {
        //Fetch Api
        const url = `https://openlibrary.org/search.json?q=${inputValue}`;
    fetch(url)
    .then(res => res.json())
    .then(data=>getDetails(data))
    }
}
//details functions
const getDetails = data => {
    if (data.numFound === 0) {
        mainDiv.innerHTML = '';
        div.innerHTML = `<h2 class='text-danger text-center mx-auto shadow p-3 mb-5 bg-body rounded'>
        Sorry! There is no mathcing book found.</h2>`
        mainDiv.appendChild(div);
    }
    else {
        const dataDoc = data.docs;
        //check if everything is exist or not
        let dataShowing = dataDoc.filter(
            (item) => item.cover_i !== undefined &&
                item.author_name !== undefined &&
                item.publisher !== undefined &&
                item.title !== undefined
          );
        const p = document.getElementById('search');
        p.innerText = `Search Result Found: ${data.numFound}`;
        mainDiv.innerHTML = '';
        //getting all single book from an array using forEach
        dataShowing.forEach(book => {
        const imgUrl = `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`;
        const div = document.createElement('div');
        div.innerHTML = `
            <div class="card mb-3 mx-auto shadow p-3 mb-5 bg-body rounded" style="max-width: 540px;">
                 <div class="row g-0">
                    <div class="col-md-4">
                        <img src="${imgUrl}" class="img-fluid rounded-start" alt="Book Image ThumbNail">
                    </div>
                <div class="col-md-8">
                    <div class="card-body">
                        <h5 class="card-title">Book Name: <span class="text-success">${book.title}</span></h5>
                        <h6 class="card-text mt-2">by: <span class="text-info">${book.author_name[0]}</span></h6>
                        <p class="card-text">Publisher: <small class="text-muted">${book.publisher[0]}</small></p>
                        <p class="card-text">Publish Date: <small class="text-muted">${book.publish_date[0]}</small></p>
                        </div>
                    </div>
                </div>
            </div>`
        mainDiv.appendChild(div);
        })
    }
} 