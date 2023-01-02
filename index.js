// Book class

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI Class
class UI {
    static displayBooks() {

        const books = Store.getBooks();
        books.forEach((books) => UI.addBookTodoList(books));
    }
    static addBookTodoList(book) {
        const grapBodyId = document.querySelector("#book-list");
        const creartRow = document.createElement("tr");
        creartRow.innerHTML = ` <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
      `;

        grapBodyId.appendChild(creartRow);
    }
    static deleteBooks(element) {
        if (element.classList.contains("delete")) {
            element.parentElement.parentElement.remove();
        }
    }
    static clearFields() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
        document.querySelector("#isbn").value = "";
    }
    static showAlert(message, className) {
        const creatDiv = document.createElement("div");
        creatDiv.className = `alert alert-${className}`;
        creatDiv.innerHTML = message;
        let getContainer = document.querySelector(".container");
        let getForm = document.querySelector(".form");
        getContainer.insertBefore(creatDiv, getForm);

        // remove alert after 3 second
        setTimeout(() => {
            let getAlert = document.querySelector(".alert");
            let removeAlert = getAlert.remove();
        }, 3000);
    }
    static showAlertOne(message, className) {
        const creatDiv = document.createElement("div");
        creatDiv.className = `alert alert-${className}`;
        creatDiv.innerHTML = message;
        let getTable = document.querySelector(".main");
        let getHeading = getTable.querySelector(".table")
        console.log(getTable);
        getTable.insertBefore(creatDiv, getHeading);

        // remove alert after 3 second
        setTimeout(() => {
            let getAlert = document.querySelector(".alert");
            let removeAlert = getAlert.remove();
        }, 3000);
    }
}

// Handling the stroge

class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem("books") === null) {
            books = []
        } else {
            books = JSON.parse(localStorage.getItem("books"))
        }
        return books;

    }
    static addBook(book) {
        let books = Store.getBooks();
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books))

    }
    static removeBook(isbn) {
        let books = Store.getBooks();

        books.forEach((singleBook, index) => {
            if (singleBook.isbn === isbn) {
                books.splice(index, 1)
            }
        })
        localStorage.setItem("books", JSON.stringify(books))
    }

}

// Events display

document.addEventListener("DOMContentLoaded", UI.displayBooks);

// Events add a book

let getForm = document.querySelector("#book-form");
getForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const title = document.querySelector("#title");
    let getTitleValue = title.value;
    const author = document.querySelector("#author");
    let getAuthorValue = author.value;
    const isbn = document.querySelector("#isbn");
    let getIsbnValue = isbn.value;
    if (getTitleValue === "" || getAuthorValue === "" || getIsbnValue === "") {
        UI.showAlert("Please fill up the Fields", "danger");
    } else {
        const newClass = new Book(getTitleValue, getAuthorValue, getIsbnValue);

        UI.addBookTodoList(newClass);

        Store.addBook(newClass);


        // adding messages 
        UI.showAlertOne("your book has been added ", "success");
        // clearfields
        UI.clearFields();
    }
});

// Events remove  a book

let removeBook = document.querySelector("#book-list");
removeBook.addEventListener("click", (e) => {

    UI.deleteBooks(e.target);
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)

    UI.showAlertOne("your book has been deleted ", "danger");

});