const myLibrary = [];

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
};

addBookToLibrary("The Hunger Games", "Suzanne Collins", 123, 2008, true);
