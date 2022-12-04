const config = {
    url: "https://openlibrary.org/api/books?jscmd=data&format=json&bibkeys=ISBN:",
    parentId: "book-cards",
    searchBtnId: "isbn-search-btn",
    searchInputId: "isbn-search",
}

let searchBtn = document.getElementById(config.searchBtnId);
searchBtn.addEventListener("click", function(){

    let parent = document.getElementById(config.parentId);

    let isbn = document.getElementById(config.searchInputId).value;
    fetch(config.url + isbn).then(response=>response.json()).then(function(data){
        console.log(data);

        if(Object.keys(data).length === 0 && data.constructor === Object){
            parent.innerHTML = "<h1>Not Found</h1>";
        }
        else{
            for(let bookKey in data){
                parent.innerHTML = "";
                parent.append(generateBookCard(data[bookKey]));
            }
        }

    });
});

function generateBookCard(book){
    let container = document.createElement("div");
    let htmlString = 
    `
        <div class="card mb-3" style="max-width: 1000px">
            <div class="row no-gutters">
                <div class="col-md-5">
                    <img src="${book.cover.medium}" class="bookImg">
                </div>                        
                <div class="col-md-7">
                    <div class="card-body">
                        <h4 class="card-title m-0 font-weight-bold">${book.title}</h4>
                        <p class="m-0">${parseDataOL(book.authors)}</p>
                        <p class="m-0 py-2">$12.11</p>
                        <p class="card-text">
                            ${book.by_statement}
                        </p>
                    </div>
                </div>
            </div>
            <div class="col-12">
                <table class="table table-striped">
                    <tbody>
                        <tr>
                            <th scope="row">Page</th>
                            <td>${book.number_of_pages}</td>
                        </tr>
                        <tr>
                            <th scope="row">Publisher</th>
                            <td>${book.pulishers}</td>
                        </tr>
                        <tr>
                            <th scope="row">Published Date</th>
                            <td>${book.publish_date}</td>
                        </tr>
                        <tr>
                            <th scope="row">Categories</th>
                            <td>${parseDataOL(book.subjects)}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    `

    container.innerHTML = htmlString;
    return container;

}


function parseDataOL(data){
    let parsed = "";
    for(let i = 0; i < data.length - 1; i++){
        parsed += (data[i].name + ",");
    }
    return parsed + data[data.length-1].name;
}