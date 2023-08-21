let bookCardContainer = document.getElementById("book-card-container");
const userTitle = document.getElementById("title");
const userAuthor = document.getElementById("author");
const userPages = document.getElementById("pages");
const userRead = document.getElementById("read");
const submitBtn = document.getElementById("submit-button");

submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  addBookToLibrary(
    userTitle.value,
    userAuthor.value,
    userPages.value,
    userRead.checked
  );
  createBookCard();
});

let myLibrary = [];

function Book(title, author, pages, havRead) {
  this.title = `"${title}"`;
  this.author = author;
  this.pages = `${pages} pages`;
  this.havRead = havRead;
}

function addBookToLibrary(title, author, pages, havRead) {
  havRead = havRead === true ? "Read" : "Not read";
  const newBook = new Book(title, author, pages, havRead);
  myLibrary.push(newBook);
}

// Create a book card
function createBookCard() {
  bookCardContainer.innerHTML = "";
  populateBookCard();
}

function populateBookCard() {
  myLibrary.forEach(function (number) {
    let bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCardContainer.appendChild(bookCard);
    let removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    bookCard.prepend(removeButton);
    removeButton.textContent = "Remove";

    let text = "";
    for (let x in number) {
      text += number[x];
      let infoField = document.createElement("p");
      infoField.classList.add("info-field");
      bookCard.appendChild(infoField);
      infoField.textContent = number[x];
    }
  });
}
