let visitors = [];
let jVisitor = localStorage.getItem("visitors");
if (jVisitor != null) visitors = JSON.parse(jVisitor);

function addForm(e) {
    clearVisitorInput();
    myForm.style.display = "block";
    formTitle.innerHTML = "Add visitor"
    add.innerHTML = "Add";
    ID.disabled = true;
    if (visitors == null) ID.value = 1;
    else ID.value = visitors.length + 1;
    e.preventDefault();
}

function editForm(e, visitor) {
    myForm.style.display = "block";
    formTitle.innerHTML = "Edit visitor";
    add.innerHTML = "Edit"
    ID.disabled = true;
    // need to add the info into the inputs here
    ID.value = visitor.ID;
    fullname.value = visitor.fullname;
    phoneNumber.value = visitor.phoneNumber;

    //e.preventDefault();
}

function clearVisitorInput() {
    ID.value = "";
    fullname.value = "";
    phoneNumber.value = '';
}

function closeForm(e) {
    clearVisitorInput();
    myForm.style.display = "none";
    e.preventDefault();
}

function loadTable(visitors) {
    ttbody.innerHTML = '';
    if (visitors != null) {
        for (let i = 0; i < visitors.length; i++) {
            let tr = document.createElement('tr');
            for (let j = 0; j < 4; j++) {
                let th = document.createElement('th');
                switch (j) {
                    case 0:
                        th.innerHTML = visitors[i].ID;
                        break;
                    case 1:
                        th.innerHTML = visitors[i].fullname;
                        break;
                    case 2:
                        th.innerHTML = visitors[i].phoneNumber;
                        break;
                    case 3:
                        // button
                        let button = document.createElement('button');
                        button.innerHTML = '<i class="fa fa-pencil"></i> <u>Edit</u>'
                        button.addEventListener('click', () => {
                            editForm(MouseEvent, visitors[i]);
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

function addVisitor(e) {
    e.preventDefault();
    let visitor = new Visitor();
    if (add.innerHTML === 'Add') {
        visitor = new Visitor(
            ID.value,
            fullname.value,
            phoneNumber.value);
        visitors.push(visitor);
    } else {
        visitor = visitors.find(b => b.ID == ID.value)
        console.log(visitor);
        visitor.ID = ID.value;
        visitor.fullname = fullname.value;
        visitor.phoneNumber = phoneNumber.value;

        visitors.splice(visitors.indexOf(visitor), 1);
        visitors.push(visitor)
    }
    localStorage.setItem('visitors', JSON.stringify(visitors));
    visitors = JSON.parse(localStorage.getItem("visitors"));
    console.log(visitors);
    loadTable(visitors);
    closeForm();
}

function sortBy(sBy) {
    let sortedArr = visitors;
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
    if (confirm('Do you want to download "Visitor list.json" ?')) {
        var ary = localStorage.getItem("visitors");
        var blob = new Blob([ary], { type: "json" });
        var url = URL.createObjectURL(blob);
        var a = document.querySelector("#downloadCSV"); // id of the <a> element to render the download link
        a.href = url;
        a.download = "Visitor list.json";
    }
}

function clearStorage(e) {
    localStorage.removeItem('visitors');
    location.reload();
    e.preventDefault();

}
refreshTable.onclick = () => { loadTable(visitors) }
loadTable(visitors)