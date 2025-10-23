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
const inputs = [titleInput, authorInput, pagesInput, yearInput, readInput]

document.querySelector("#year").setAttribute("max", new Date().getFullYear());

function Book(title, author, pages, year, read) {
  if (!new.target) {
    throw Error("Use new keyword with this constructor.");
  };
  this.title = title;
  this.author = author;
  if (pages == "") {
    this.pages = "unprovided";
  } else {
    this.pages = pages;
  };
  if (year == "") {
    this.year = "unprovided";
  } else {
    this.year = year;
  };
  this.read = read;
  this.id = crypto.randomUUID();
};

function addBookToLibrary(title, author, pages, year, read) {
  myLibrary.push(new Book(title, author, pages, year, read));
  addBookToPage(myLibrary[myLibrary.length - 1]);
};

function addBookToPage(book) {
  const headerDiv = document.createElement("div");
  headerDiv.classList.add("book-header");
  const contentDiv = document.createElement("div");
  contentDiv.classList.add("book-content");
  const topContentDiv = document.createElement("div");
  const bottomContentDiv = document.createElement("div");

  const bookDisplay = document.createElement("div");
  bookDisplay.classList.add("book");

  const titleDisplay = document.createElement("h2");
  titleDisplay.textContent = book.title;
  titleDisplay.classList.add("title");
  headerDiv.appendChild(titleDisplay);

  const authorDisplay = document.createElement("p");
  authorDisplay.textContent = `by ${book.author}`;
  authorDisplay.classList.add("author");
  headerDiv.appendChild(authorDisplay);

  if (book.pages != "unprovided") {
    const pagesDisplay = document.createElement("p");
    pagesDisplay.textContent = `${book.pages} pages`;
    pagesDisplay.classList.add("pages");
    bottomContentDiv.appendChild(pagesDisplay);
  }

  if (book.year != "unprovided") {
    const yearDisplay = document.createElement("p");
    yearDisplay.textContent = `Released in ${book.year}`;
    yearDisplay.classList.add("year");
    bottomContentDiv.appendChild(yearDisplay);
  }

  const readDisplay = document.createElement("p");
  readDisplay.textContent = `Status: ${(book.read) ? "Read" : "Not read yet"}`;
  readDisplay.classList.add("read");
  topContentDiv.appendChild(readDisplay);

  const idDisplay = document.createElement("p");
  idDisplay.textContent = `Id: ${book.id}`;
  idDisplay.classList.add("id");
  topContentDiv.appendChild(idDisplay);

  [bottomContentDiv, topContentDiv].forEach(div => contentDiv.appendChild(div));
  [headerDiv, contentDiv].forEach(div => bookDisplay.appendChild(div));

  bookDisplay.style.backgroundImage = `url("images/book-cover${Math.floor(Math.random() * 3)}.jpg")`;
  bookDisplay.style.backgroundSize = "cover";

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

  if (document.querySelectorAll(":invalid").length == 0) {
    addBookToLibrary(...inputs.slice(0, -1).map(input => input.value), readInput.checked);
    addBookDialog.close();
  } else {
    submitBtn.style.color = "#F44";
    setTimeout(() => submitBtn.style.color = "white", 200);
  };
});

addBookDialog.addEventListener("keydown", evt => {
  if (evt.key == "Enter") {
    evt.preventDefault();
  }
});

cancelBtn.addEventListener("click", evt => {
  evt.preventDefault();
  addBookDialog.close();
});

addBookToLibrary("The Hunger Games", "Suzanne Collins", 123, 2008, true);
addBookToLibrary("The Hunger Games", "Suzanne Collins", 123, 2008, true);
addBookToLibrary("The Hunger Games", "Suzanne Collins", 123, 2008, true);
