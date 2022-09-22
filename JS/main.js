import { Book } from './Model.js/Book.js'
import { Visitor } from './Model.js/Visitor.js'
import { Card } from './Models/Card.js'


let stock = [
    new Book(101, 'Book hello', 'Stan Lee', '23/10/2002', 'Marvel', 100, 80)
]
let visitors = [
    new Visitor(1, 'kang sokvimean', '0767625958'),
]
let cards = [
    new Card(1, 1, 101, '22/10/2022', '25/10/2022')
]
console.log(stock)
console.log(visitors)
console.log(cards)