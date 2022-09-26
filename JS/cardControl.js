//load all the values from the storage
let visitors = [];
let jVisitor = localStorage.getItem('visitors');
if (jVisitor != null) visitors = JSON.parse(jVisitor);

let stock = [];
let jStock = localStorage.getItem('stock');
if (jStock != null) stock = JSON.parse(jStock);

let cards = [];
let jCard = localStorage.getItem('cards');
if (jCard != null) cards = JSON.parse(jCard);

//load all visitor into the drow down 
function loadVisitors(visitors) {
    let select = document.querySelector('#selectVisitor');
    for (let v of visitors) {
        let option = document.createElement('option');
        option.innerHTML = `${v.ID}.${v.fullname}`
        option.value = v.fullname;
        select.appendChild(option);
    }
}
//load all book into the drow down 
function loadBooks(stock) {
    stock.sort((a, b) => {
        return a.ID - b.ID;
    })
    let select = document.querySelector('#selectBook');
    stock.forEach(s => {
        if (s.copiesInLib > 0) {
            let option = document.createElement('option');
            option.innerHTML = `${s.ID}.${s.title}`
            option.value = s.ID;
            select.appendChild(option);
        }
    })
}

function addForm(e) {
    //open the form
    clearCardInput();
    myForm.style.display = "block";
    formTitle.innerHTML = "Add Card"
    add.innerHTML = "Add";
    ID.disabled = true;
    //auto generate the ID
    if (cards == null) ID.value = 1;
    else ID.value = cards.length + 1;
    //load everything to addForm drop down
    loadVisitors(visitors);
    loadBooks(stock);
    e.preventDefault();
}

function editForm(card) {
    //update the book stock when add a card
    let borrowBook = stock.find(b => b.ID === card.Book.ID);
    updateStock(borrowBook, true);

    //change the interface to display date
    let foundCard = cards.find(c => c.ID === card.ID);
    foundCard.returnDate = new Date().toLocaleDateString();
    console.log(foundCard);

    cards.splice(cards.indexOf(card), 1)
    cards.push(foundCard);
    localStorage.setItem('cards', JSON.stringify(cards));
    cards = JSON.parse(localStorage.getItem("cards"));
    loadTable(cards);
}

function clearCardInput() {
    ID.value = "";
    selectVisitor.innerHTML = '';
    selectBook.innerHTML = '';
}

function closeForm() {
    clearCardInput();
    myForm.style.display = "none";
}

function loadTable(cards) {
    ttbody.innerHTML = '';
    if (cards != null) {
        for (let i = 0; i < cards.length; i++) {
            let tr = document.createElement('tr');
            for (let j = 0; j < 5; j++) {
                let th = document.createElement('th');
                switch (j) {
                    case 0:
                        th.innerHTML = cards[i].ID;
                        break;
                    case 1:
                        th.innerHTML = cards[i].Visitor;
                        break;
                    case 2:
                        th.innerHTML = cards[i].Book.title;
                        break;
                    case 3:
                        th.innerHTML = cards[i].borrowDate;
                        break;
                    case 4:
                        // button
                        if (cards[i].returnDate == null) {
                            let button = document.createElement('button');
                            button.innerHTML = '<i class="fa fa-reply"></i>'
                            button.addEventListener('click', () => {
                                // th.innerHTML = `<b>${new Date().toLocaleDateString()}</b>`
                                editForm(cards[i]);
                            })
                            th.appendChild(button);
                        } else {
                            th.innerHTML = cards[i].returnDate;
                        }
                        break;
                }
                tr.appendChild(th);
            }
            ttbody.appendChild(tr);
        }
    }

}

function updateStock(borrowBook, returnBook) {
    //returnBook is boolean
    if (!returnBook) borrowBook.copiesInLib = borrowBook.copiesInLib - 1;
    else borrowBook.copiesInLib = borrowBook.copiesInLib + 1;

    stock.splice(stock.indexOf(borrowBook), 1)
    stock.push(borrowBook);
    localStorage.setItem('stock', JSON.stringify(stock));
    stock = JSON.parse(localStorage.getItem("stock"));
}

function addCard(e) {
    e.preventDefault();
    let card = new Card();
    //update the book stock when add a card
    let borrowBook = stock.find(b => b.ID === selectBook.value)
    updateStock(borrowBook, false);

    //update the card table 
    card = new Card(
        ID.value,
        selectVisitor.value,
        borrowBook,
        `${new Date().toLocaleDateString()}`,
        null);
    cards.push(card);
    //Save everything to the localStorage
    localStorage.setItem('cards', JSON.stringify(cards));
    cards = JSON.parse(localStorage.getItem("cards"));
    loadTable(cards);
    closeForm();
}

function sortBy(sBy) {
    let sortedArr = cards;
    switch (sBy.toLowerCase()) {
        case 'id':
            sortedArr.sort(function(a, b) {
                return a.ID - b.ID;
            })
            break;
        case 'visitor':
            sortedArr.sort((a, b) => a.Visitor.localeCompare(b.Visitor));
            break;
        case 'book':
            sortedArr.sort((a, b) => a.Book.title.localeCompare(b.Book.title));
            break;
        case 'borrow':
            sortedArr.sort((a, b) => a.borrowDate.localeCompare(b.borrowDate));
            break;
    }
    loadTable(sortedArr);
    console.log(sortedArr);
}

function searchCard(text) {
    let foundArr = [];
    cards.forEach(card => {
        if (card.ID.includes(text)) {
            foundArr.push(card);
        }
        if (card.Visitor.toLowerCase().includes(text.toLowerCase())) {
            foundArr.push(card);
        }
        if (card.Book.title.toLowerCase().includes(text.toLowerCase())) {
            foundArr.push(card);
        }
        if (card.borrowDate.toLowerCase().includes(text.toLowerCase())) {
            foundArr.push(card);
        }
        if (card.returnDate != null) {
            if (card.returnDate.toLowerCase().includes(text.toLowerCase())) {
                foundArr.push(card);
            }
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
    if (confirm('Do you want to download "Card list.json" ?')) {
        var ary = localStorage.getItem("cards");
        var blob = new Blob([ary], { type: "json" });
        var url = URL.createObjectURL(blob);
        var a = document.querySelector("#downloadCSV"); // id of the <a> element to render the download link
        a.href = url;
        a.download = "Card list.json";
    }
}

function clearStorage(e) {
    localStorage.removeItem('cards');
    e.preventDefault();
    location.reload();
}

refreshTable.onclick = () => { loadTable(cards); }
loadTable(cards);