let visitors = [];
let jVisitor = localStorage.getItem('visitors');
if (jVisitor != null) visitors = JSON.parse(jVisitor);

let stock = [];
let jStock = localStorage.getItem('stock');
if (jStock != null) stock = JSON.parse(jStock);

let cards = [];
let jCard = localStorage.getItem('cards');
if (jCard != null) cards = JSON.parse(jCard);

function loadVisitors(visitors) {
    let select = document.querySelector('#selectVisitor');
    for (let v of visitors) {
        let option = document.createElement('option');
        option.innerHTML = `${v.ID}.${v.fullname}`
        option.value = v.fullname;
        select.appendChild(option);
    }
}

function loadBooks(stock) {
    let select = document.querySelector('#selectBook');
    stock.forEach(s => {
        let option = document.createElement('option');
        option.innerHTML = `${s.ID}.${s.title}`
        option.value = s.title;
        select.appendChild(option);
    })
}

function addForm(e) {
    clearCardInput();
    myForm.style.display = "block";
    formTitle.innerHTML = "Add Card"
    add.innerHTML = "Add";
    ID.disabled = true;
    if (cards == null) ID.value = 1;
    else ID.value = cards.length + 1;
    loadVisitors(visitors);
    loadBooks(stock);
    e.preventDefault();
}

function editForm(card) {
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
                        th.innerHTML = cards[i].Book;
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

function addCard(e) {
    e.preventDefault();
    let card = new Card();
    if (add.innerHTML === 'Add') {
        card = new Card(
            ID.value,
            selectVisitor.value,
            selectBook.value,
            `${new Date().toLocaleDateString()}`,
            null);
        cards.push(card);
    }
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
        case 'name':
            sortedArr.sort((a, b) => a.fullname.localeCompare(b.fullname));
            break;
    }
    loadTable(sortedArr);
    console.log(sortedArr);
}

function searchVisitor(text) {
    let foundArr = [];
    visitors.forEach(visitor => {
        if (visitor.ID.includes(text)) {
            foundArr.push(visitor);
        }
        if (visitor.fullname.toLowerCase().includes(text.toLowerCase())) {
            foundArr.push(visitor);
        }
        if (visitor.phoneNumber.toLowerCase().includes(text.toLowerCase())) {
            foundArr.push(visitor);
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
loadTable(cards);