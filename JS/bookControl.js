let stock = [];
let jStock = localStorage.getItem("stock");
if (jStock != null) stock = JSON.parse(jStock);

function addBook(e) {
    e.preventDefault();
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
    localStorage.removeItem('stock');
    e.preventDefault();
    location.reload();
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
    // ID.innerHTML = "";
    // title.innerHTML = "";
    // authorName.innerHTML = "";
    // pubDate.innerHTML = "";
    // publisher.innerHTML = "";
    // noPage.innerHTML = "";
    // copies.innerHTML = "";
}

function closeForm(e) {
    clearBookInput();
    myForm.style.display = "none";
    e.preventDefault();
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

function searchBook(text) {
    let foundArr = [];
    stock.forEach(book => {
        if (book.ID.includes(text)) {
            foundArr.push(book);
        }
        if (book.title.toLowerCase().includes(text.toLowerCase())) {
            foundArr.push(book);
        }
        if (book.authorName.toLowerCase().includes(text.toLowerCase())) {
            foundArr.push(book);
        }
        if (book.publisher.toLowerCase().includes(text.toLowerCase())) {
            foundArr.push(book);
        }
    });
    if (foundArr.length <= 0) {
        alert('Search not found!')
        return;
    }
    const unique = [...new Map(foundArr.map((m) => [m.ID, m])).values()];
    loadTable(unique);
}

function download() {
    if (confirm('Do you want to download "Book list.json" ?')) {
        var ary = localStorage.getItem("stock");
        var blob = new Blob([ary], { type: "json" });
        var url = URL.createObjectURL(blob);
        var a = document.querySelector("#downloadCSV"); // id of the <a> element to render the download link
        a.href = url;
        a.download = "Book list.json";
    }
}

refreshTable.onclick = () => { loadTable(stock) };

// console.log(stock)
loadTable(stock);