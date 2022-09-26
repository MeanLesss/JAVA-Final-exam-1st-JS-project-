const bannerBookTemplate = document.querySelector('[data-book-template]')
const bannerVisitorTemplate = document.querySelector('[data-visitor-template]')
const allBookBanner = document.querySelector('.allBookBanner')
const allVisitorBanner = document.querySelector('.allVisitorBanner')
let cards = [];
let jCard = localStorage.getItem('cards')
cards = JSON.parse(jCard);


function loadTopBook() {
    //count all the duplicated book into object
    let topBook = {}
    cards.forEach(b => {
            topBook[b.Book.title] = (topBook[b.Book.title] || 0) + 1;
        })
        //console.log(topBook);
        //convert the object into array
    let top5Book = Object.entries(topBook);
    //console.log(top5Book);
    //sort the array descending
    top5Book = top5Book.sort((a, b) => b[1] - a[1]).slice(0, 5);
    //console.log(top5Book);
    //disply the top 5 book
    let i = 1;
    top5Book.forEach(c => {
        const banner = bannerBookTemplate.content.cloneNode(true).children[0];
        banner.innerHTML = `${i++}. ${c[0]} (borrowed ${c[1]} times)`;
        allBookBanner.append(banner);
    })
}

function loadTopVisitor() {
    //count all the duplicated visitor into object
    let topVisitor = {}
    cards.forEach(v => {
        topVisitor[v.Visitor] = (topVisitor[v.Visitor] || 0) + 1;
    })
    console.log(topVisitor);

    //convert the object into array
    let top5Visitors = Object.entries(topVisitor);
    console.log(top5Visitors);

    //sort the array descending
    top5Visitors = top5Visitors.sort((a, b) => b[1] - a[1]).slice(0, 5);
    console.log(top5Visitors);

    //disply the top 5 visitors
    let i = 1;
    top5Visitors.forEach(c => {
        const banner = bannerVisitorTemplate.content.cloneNode(true).children[0];
        banner.innerHTML = `${i++}. ${c[0]} (visited ${c[1]} times)`;
        allVisitorBanner.append(banner);
    })
}

loadTopBook();
loadTopVisitor();