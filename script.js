const bookCardContainer = document.getElementById("book-card-container");
const userTitle = document.getElementById("title");
const userAuthor = document.getElementById("author");
const userPages = document.getElementById("pages");
const userRead = document.getElementById("read");
const submitBtn = document.getElementById("submit-button");
const formModal = document.getElementById("form-modal");
const addBookBtn = document.getElementById("add-book-button");

// Add book button shows form modal
addBookBtn.addEventListener("click", function () {
  formModal.showModal();
});

// Submit form button that also controls the modal
submitBtn.addEventListener("click", function (event) {
  event.preventDefault();
  formModal.close();
  addBookToLibrary(
    userTitle.value,
    userAuthor.value,
    userPages.value,
    userRead.checked
  );
  createBookCard();
});

// Empty library array
let myLibrary = [];

// Create an object with the values that the use inputs
function Book(title, author, pages, havRead) {
  this.title = `"${title}"`;
  this.author = author;
  this.pages = `${pages} pages`;
  this.havRead = havRead;
}

// Push to myLibrary array
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

// Add content and remove button to each book card
function populateBookCard() {
  myLibrary.forEach(function (number) {
    // Create book card and create data attribute for each
    let bookCard = document.createElement("div");
    bookCard.classList.add("book-card");
    bookCardContainer.appendChild(bookCard);
    bookCard.dataset.index = myLibrary.indexOf(number);
    let bookcardIndex = bookCard.dataset.index;

    // Create remove button in each book card
    let removeButton = document.createElement("button");
    removeButton.classList.add("remove-button");
    bookCard.prepend(removeButton);
    removeButton.textContent = "Remove";

    // Add function to remove button
    removeButton.addEventListener("click", function () {
      myLibrary.splice(bookcardIndex, 1);
      console.log(myLibrary);
      createBookCard();
    });

    // Populate cards with the Book values that user inputs
    let text = "";
    for (let x in number) {
      text += number[x];
      let infoField = document.createElement("p");
      infoField.classList.add("info-field");
      bookCard.appendChild(infoField);
      infoField.textContent = number[x];
    }

    // Create change read/unread button
    let changeReadButton = document.createElement("button");
    changeReadButton.classList.add("change-read-button");
    changeReadButton.textContent = "Change read/unread";
    bookCard.appendChild(changeReadButton);

    // Change read/unread
    changeReadButton.addEventListener("click", function () {
      if (number.havRead === "Read") {
        number.havRead = "Not read";
      } else if (number.havRead === "Not read") {
        number.havRead = "Read";
      }
      console.log(number);
      createBookCard();
    });
  });
}
