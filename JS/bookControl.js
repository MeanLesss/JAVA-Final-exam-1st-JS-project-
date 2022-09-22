function addForm(e) {
    clearBookInput();
    myForm.style.display = "block";
    formTitle.innerHTML = "Add Book"

    e.preventDefault();
}

function editForm(e) {
    myForm.style.display = "block";
    formTitle.innerHTML = "Edit Book"
        // need to add the info into the inputs here


    e.preventDefault();
}

function clearBookInput() {
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
    e.preventDefault();
}