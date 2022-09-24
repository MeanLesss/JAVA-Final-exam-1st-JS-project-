// let stock = [
//     // new Book(101, 'Book hello', 'Stan Lee', '23/10/2002', 'Marvel', 100, 80)
// ]

let stock = [];
let jStock = localStorage.getItem("stock");
stock = JSON.parse(jStock);

function addBook(e) {
    //e.preventDefault();
    let book = new Book();
    if (add.innerHTML === 'Add') {
        book = new Book(
            ID.value,
            title.value,
            authorName.value,
            pubDate.value,
            publisher.value,
            noPage.value,
            copies.value);
        stock.push(book);
    } else {
        book = stock.find(b => b.ID == ID.value)
        console.log(book);
        book.ID = ID.value;
        book.title = title.value;
        book.authorName = authorName.value;
        book.publishingDate = pubDate.value;
        book.publisher = publisher.value;
        book.noPages = noPage.value;
        book.copiesInLib = copies.value;
        stock.splice(stock.indexOf(book), 1);
        stock.push(book)
    }
    localStorage.setItem('stock', JSON.stringify(stock));
    stock = JSON.parse(localStorage.getItem("stock"));
    console.log(stock)
    loadTable(stock);
    closeForm();
}

function clearStorage(e) {
    localStorage.clear();
    stock = [];
    e.preventDefault();
    loadTable();
}

function addForm(e) {
    clearBookInput();
    myForm.style.display = "block";
    formTitle.innerHTML = "Add Book"
    add.innerHTML = "Add";
    ID.disabled = false;
    e.preventDefault();
}

function loadTable(stock) {

    ttbody.innerHTML = '';
    if (stock != null) {
        for (let i = 0; i < stock.length; i++) {
            let tr = document.createElement('tr');
            for (let j = 0; j < 8; j++) {
                let th = document.createElement('th');
                switch (j) {
                    case 0:
                        th.innerHTML = stock[i].ID;
                        break;
                    case 1:
                        th.innerHTML = stock[i].title;
                        break;
                    case 2:
                        th.innerHTML = stock[i].authorName;
                        break;
                    case 3:
                        th.innerHTML = stock[i].publishingDate;
                        break;
                    case 4:
                        th.innerHTML = stock[i].publisher;
                        break;
                    case 5:
                        th.innerHTML = stock[i].noPages;
                        break;
                    case 6:
                        th.innerHTML = stock[i].copiesInLib;
                        break;
                    case 7:
                        // button
                        let button = document.createElement('button');
                        button.innerHTML = '<u>Edit</u>'
                        button.addEventListener('click', () => {
                            editForm(MouseEvent, stock[i]);
                        })
                        th.appendChild(button);
                        break;

                }
                tr.appendChild(th);
            }
            ttbody.appendChild(tr);
        }
    }

}

function editForm(e, book) {
    myForm.style.display = "block";
    formTitle.innerHTML = "Edit Book";
    add.innerHTML = "Edit"
    ID.disabled = true;
    // need to add the info into the inputs here
    ID.value = book.ID;
    title.value = book.title;
    authorName.value = book.authorName;
    pubDate.value = book.publishingDate;
    publisher.value = book.publisher;
    noPage.value = book.noPages;
    copies.value = book.copiesInLib;
    //e.preventDefault();
}

function clearBookInput() {
    ID.value = "";
    title.value = "";
    authorName.value = "";
    pubDate.value = "";
    publisher.value = "";
    noPage.value = "";
    copies.value = "";
}

function closeForm(e) {
    clearBookInput();
    myForm.style.display = "none";
    //e.preventDefault();
}

function sortBy(sBy) {
    let sortedArr = stock;
    switch (sBy.toLowerCase()) {
        case 'id':
            sortedArr.sort(function(a, b) {
                return a.ID - b.ID;
            })
            break;
        case 'title':
            sortedArr.sort((a, b) => a.title.localeCompare(b.title));
            break;
        case 'authorname':
            sortedArr.sort((a, b) => a.authorName.localeCompare(b.authorName));
            break;
        case 'publisher':
            sortedArr.sort((a, b) => a.publisher.localeCompare(b.publisher));
            break;
        case 'instock':
            sortedArr.sort((a, b) => a.copiesInLib - b.copiesInLib);
            break;
    }
    loadTable(sortedArr);
    console.log(sortedArr);
}


console.log(stock)
loadTable(stock);