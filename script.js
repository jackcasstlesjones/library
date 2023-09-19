// Define DOM elements
const bookCardContainer = document.getElementById("book-card-container");
const userTitle = document.getElementById("title");
const userAuthor = document.getElementById("author");
const userPages = document.getElementById("pages");
const userRead = document.getElementById("read");
const submitBtn = document.getElementById("submit-button");
const formModal = document.getElementById("form-modal");
const addBookBtn = document.getElementById("add-book-button");

// Define a Library class to manage the library of books
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

  toggleReadStatus(index) {
    this.books[index].toggleReadStatus();
  }
}

// Define a Book class
class Book {
  constructor(title, author, pages, havRead) {
    this.title = title;
    this.author = author;
    this.pages = `${pages} pages`;
    this.havRead = havRead;
  }

  toggleReadStatus() {
    this.havRead = this.havRead === "Read" ? "Not read" : "Read";
  }
}

// Create a Library instance
const library = new Library();

// Function to show the form modal
function showFormModal() {
  formModal.showModal();
}

// Function to handle form submission
function handleSubmit(event) {
  event.preventDefault();
  formModal.close();
  const title = userTitle.value;
  const author = userAuthor.value;
  const pages = userPages.value;
  const havRead = userRead.checked ? "Read" : "Not read";
  const newBook = new Book(title, author, pages, havRead);
  library.addBook(newBook);
  renderBookCards();
}

// Function to create a book card element
function createBookCardElement(book, index) {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");
  bookCard.dataset.index = index;

  const removeButton = createRemoveButton(index);
  const infoFields = createInfoFields(book);
  const changeReadButton = createChangeReadButton(index);

  bookCard.appendChild(removeButton);
  infoFields.forEach((field) => bookCard.appendChild(field));
  bookCard.appendChild(changeReadButton);

  return bookCard;
}

// Function to create a remove button for a book card
function createRemoveButton(index) {
  const removeButton = document.createElement("button");
  removeButton.classList.add("remove-button");
  removeButton.textContent = "Remove";

  removeButton.addEventListener("click", () => {
    library.removeBook(index);
    renderBookCards();
  });

  return removeButton;
}

// Function to create info fields for a book card
function createInfoFields(book) {
  const fields = [];
  for (const key in book) {
    const infoField = document.createElement("p");
    infoField.classList.add("info-field");
    infoField.textContent = `${key}: ${book[key]}`;
    fields.push(infoField);
  }
  return fields;
}

// Function to create a change read/unread button for a book card
function createChangeReadButton(index) {
  const changeReadButton = document.createElement("button");
  changeReadButton.classList.add("change-read-button");
  changeReadButton.textContent = "Change read/unread";

  changeReadButton.addEventListener("click", () => {
    library.toggleReadStatus(index);
    renderBookCards();
  });

  return changeReadButton;
}

// Function to render book cards
function renderBookCards() {
  bookCardContainer.innerHTML = "";
  library.books.forEach((book, index) => {
    const bookCard = createBookCardElement(book, index);
    bookCardContainer.appendChild(bookCard);
  });
}

// Add event listeners
addBookBtn.addEventListener("click", showFormModal);
submitBtn.addEventListener("click", handleSubmit);

// Initial rendering of book cards
renderBookCards();
