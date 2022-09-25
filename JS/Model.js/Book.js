//export class Book {
class Book {
    constructor(ID, title, authorName, publishingDate, publisher, noPages, copiesInLib) {
        this.ID = ID;
        this.title = title;
        this.authorName = authorName;
        this.publishingDate = publishingDate;
        this.publisher = publisher;
        this.noPages = noPages;
        this.copiesInLib = copiesInLib;
    }
}
// references
// an object
// const John = {
//     name: "John Doe",
//     age: 23,
// };

// // convert object to JSON string
// // using JSON.stringify()
// const jsonObj = JSON.stringify(John);

// // save to localStorage
// localStorage.setItem("John", jsonObj);

// // get the string
// // from localStorage
// const str = localStorage.getItem("John");

// // convert string to valid object
// const parsedObj = JSON.parse(str);

// console.log(parsedObj);