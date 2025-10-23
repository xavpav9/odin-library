const myLibrary = [];
const booksDisplay = document.querySelector(".books");
const addBookBtn = document.querySelector(".add-book");
const addBookDialog = document.querySelector(".add-book-dialog");
const submitBtn = document.querySelector(".submit-btn");
const cancelBtn = document.querySelector(".cancel-btn");

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const yearInput = document.querySelector("#year");
const readInput = document.querySelector("#read");

document.querySelector("#year").setAttribute("max", new Date().getFullYear());

function Book(title, author, pages, year, read) {
  if (!new.target) {
    throw Error("Use new keyword with this constructor.");
  };
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.year = year;
  this.read = read;
  this.id = crypto.randomUUID();
};

function addBookToLibrary(title, author, pages, year, read) {
  myLibrary.push(new Book(title, author, pages, year, read));
  addBookToPage(myLibrary[myLibrary.length - 1]);
};

function addBookToPage(book) {
  const bookDisplay = document.createElement("div");
  bookDisplay.classList.add("book");

  for (let key in book) {
    const part = document.createElement("p");
    part.textContent = book[key]
    part.classList.add(key);
    bookDisplay.appendChild(part);
  };

  booksDisplay.appendChild(bookDisplay);
};

function refreshBooks() {
  [...booksDisplay.children].forEach(child => child.remove());
  myLibrary.forEach(book => addBookToPage(book))
};

addBookBtn.addEventListener("click", evt => {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  yearInput.value = "";
  readInput.checked = false;
  document.querySelector("#AD").checked = true;
  addBookDialog.showModal();
});

submitBtn.addEventListener("click", evt => {
  evt.preventDefault();
});

cancelBtn.addEventListener("click", evt => {
  evt.preventDefault();
  addBookDialog.close();
});

addBookToLibrary("The Hunger Games", "Suzanne Collins", 123, 2008, true);
addBookToLibrary("The Hunger Games", "Suzanne Collins", 123, 2008, true);
addBookToLibrary("The Hunger Games", "Suzanne Collins", 123, 2008, true);
