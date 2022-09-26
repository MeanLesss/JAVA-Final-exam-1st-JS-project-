class Card {
    constructor(ID, visitor, book, borrowDate, returnDate) {
        this.ID = ID;
        this.Visitor = visitor;
        this.Book = book;
        this.borrowDate = borrowDate;
        this.returnDate = returnDate;
    }
}

//top 5 
/*
values = [1,65,8,98,689,12,33,2,3,789];
var topValues = values.sort((a,b) => b-a).slice(0,5);
console.log(topValues);
*/

//count the most active vistior references
// const arr = ['one', 'two', 'one', 'one', 'two', 'three'];

// const count = {};

// arr.forEach(element => {
//   count[element] = (count[element] || 0) + 1;
// });

// // 👇️ {one: 3, two: 2, three: 1}
// console.log(count);