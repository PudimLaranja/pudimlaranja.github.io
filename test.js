var pages = 0
function Book(title, pages) {
    this.title = title;
    this.pages = pages;
    
}

Book.prototype.printtitle() = function () {
    console.log(this.title)
}