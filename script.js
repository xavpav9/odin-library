const myLibrary = [];
const booksDisplay = document.querySelector(".books");

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

addBookToLibrary("The Hunger Games", "Suzanne Collins", 123, 2008, true);
addBookToLibrary("The Hunger Games", "Suzanne Collins", 123, 2008, true);
addBookToLibrary("The Hunger Games", "Suzanne Collins", 123, 2008, true);
