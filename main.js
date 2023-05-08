let myLibrary = []

let rowNumber = 0

function Book (title, author, pages, isRead) {
    this.title = title
    this.author = author
    this.pages = pages
    this.isRead = isRead

    this.info = () => {
        return `${this.title} by ${this.author}, ${this.pages} pages, ${this.isRead}`
    }
}



const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', 295, 'no')
const fermentation = new Book('The Art of Fermentation', 'Sandor Katz', 600, 'yes')

myLibrary.push(theHobbit, fermentation)

const bookTable = document.querySelector('table')

function displayLibrary() {
    //loops myLibrary array and adds Book properties and remove button to the table
    myLibrary.forEach((book) => {
        addLine(book)
    })

}

const addButton = document.querySelector('.add-button')
const bookForm = document.querySelector('.book-form')
const submitButton = document.querySelector('.submit-button')

addButton.addEventListener('click', formDisplay)
submitButton.addEventListener('click', addBookToLibrary)



function formDisplay() {
    bookForm.style.display = 'inline'
}

function addLine(book) {
    let tr = document.createElement('tr')
    let removeButton = document.createElement('button')
    removeButton.textContent = 'Remove'
    removeButton.classList.add('remove-button')
    removeButton.setAttribute('data-row', rowNumber)
    bookTable.appendChild(tr)
    const row = document.querySelector('table>tr:not([data-row])')
    row.setAttribute('data-row', rowNumber)
    rowNumber++
    for (const property in book) {
        if (property == 'isRead') {
            let td = document.createElement('td');
            let button = document.createElement('button')
            button.addEventListener('click', readToggle)
            button.textContent = book['isRead']
            td.appendChild(button)
            row.appendChild(td)
            continue
        }

        if (typeof book[property] !== 'function') {
            let td = document.createElement('td');
            td.textContent = book[property];
            row.appendChild(td);
        }
    }
    let td = document.createElement('td');
    row.appendChild(td)
    td.appendChild(removeButton)
    removeButton.addEventListener('click', removeLine)
}


function addBookToLibrary(e) {
    //    some function 
    e.preventDefault()
    bookForm.style.display = 'none'
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const pages = document.getElementById("pages").value;
    const isRead = document.getElementById("is-read").checked ? "yes" : "no";
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook)
    addLine(newBook)

    const allInputs = document.querySelectorAll('input')
    allInputs.forEach(input => {input.value = ""})
    }


displayLibrary()

function removeLine(e) {
    let rowNumber = e.target.getAttribute('data-row')
    let tr = document.querySelector(`tr[data-row = "${rowNumber}"]`)
    bookTable.removeChild(tr)
}

function readToggle(e) {
    let status = e.target.textContent
    status == 'yes' ? e.target.textContent = 'no' : e.target.textContent = 'yes'
}
