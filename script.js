// Create a Book class
class Book {
  constructor(title, author, pages, havRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.havRead = havRead;
  }

  toggleReadStatus() {
    this.havRead = this.havRead === "Read" ? "Not read" : "Read";
  }
}

// Create a Library class to manage the library of books
class Library {
  constructor() {
    this.books = [];
  }

  addBook(book) {
    this.books.push(book);
  }

  removeBook(index) {
    this.books.splice(index, 1);
  }
}

// DOM elements
const bookCardContainer = document.getElementById("book-card-container");
const userTitle = document.getElementById("title");
const userAuthor = document.getElementById("author");
const userPages = document.getElementById("pages");
const userRead = document.getElementById("read");
const submitBtn = document.getElementById("submit-button");
const formModal = document.getElementById("form-modal");
const addBookBtn = document.getElementById("add-book-button");

// Create a Library instance
const library = new Library();

// Add book button shows form modal
addBookBtn.addEventListener("click", () => {
  formModal.showModal();
});

// Handle form submission and add a new book
submitBtn.addEventListener("click", (event) => {
  event.preventDefault();
  formModal.close();
  const title = userTitle.value;
  const author = userAuthor.value;
  const pages = userPages.value + " pages";
  const havRead = userRead.checked ? "Read" : "Not read";
  const newBook = new Book(title, author, pages, havRead);
  library.addBook(newBook);
  renderBookCards();
});

// Render book cards
function renderBookCards() {
  bookCardContainer.innerHTML = "";
  populateBookCards();
}

// Populate book cards with book details
function populateBookCards() {
  library.books.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCard.dataset.index = index;
    bookCardContainer.appendChild(bookCard);

    const removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    removeButton.textContent = "Remove";
    bookCard.prepend(removeButton);

    removeButton.addEventListener("click", () => {
      library.removeBook(index);
      renderBookCards();
    });

    for (const key in book) {
      const infoField = document.createElement("p");
      infoField.classList.add("info-field");
      infoField.textContent = `${key}: ${book[key]}`;
      bookCard.appendChild(infoField);
    }

    const changeReadButton = document.createElement("button");
    changeReadButton.classList.add("change-read-button");
    changeReadButton.textContent = "Change read/unread";
    bookCard.appendChild(changeReadButton);

    changeReadButton.addEventListener("click", () => {
      book.toggleReadStatus();
      renderBookCards();
    });
  });
}

// Initial rendering of book cards
renderBookCards();
