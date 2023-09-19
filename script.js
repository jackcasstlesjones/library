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

class UIManager {
  constructor() {
    this.formModal = document.getElementById("form-modal");
    this.addBookBtn = document.getElementById("add-book-button");
    this.submitBtn = document.getElementById("submit-button");
    this.bookCardContainer = document.getElementById("book-card-container");

    this.addBookBtn.addEventListener("click", this.showFormModal.bind(this));
    this.submitBtn.addEventListener("click", this.handleSubmit.bind(this));
  }

  showFormModal() {
    this.formModal.showModal();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.formModal.close();
    const title = userTitle.value;
    const author = userAuthor.value;
    const pages = userPages.value;
    const havRead = userRead.checked ? "Read" : "Not read";
    const newBook = new Book(title, author, pages, havRead);
    library.addBook(newBook);
    this.renderBookCards();
  }

  renderBookCards() {
    this.bookCardContainer.innerHTML = "";
    library.books.forEach((book, index) => {
      const bookCard = this.createBookCardElement(book, index);
      this.bookCardContainer.appendChild(bookCard);
    });
  }

  createBookCardElement(book, index) {
    // Create and return a book card element
  }
}

const library = new Library();
const uiManager = new UIManager();

// Initial rendering of book cards
uiManager.renderBookCards();
