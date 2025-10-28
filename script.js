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
const timeframeInputs = document.querySelectorAll(".timeframe input");
const readInput = document.querySelector("#read");
const inputs = [titleInput, authorInput, pagesInput, yearInput, timeframeInputs, readInput]
let editMode = false;
let objIndexToBeEdited;

document.querySelector("#year").setAttribute("max", new Date().getFullYear());

function Book(title, author, pages, year, timeframe, read) {
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
    this.timeframe = "unprovided";
  } else {
    this.year = year;
    this.timeframe = timeframe ? "AD" : "BC";
  };
  this.read = read;
  this.id = crypto.randomUUID();
  this.texture = Math.floor(Math.random() * 3);
};

function editBook(title, author, pages, year, timeframe, read) {
  this.title = title;
  this.author = author;
  if (pages == "") {
    this.pages = "unprovided";
  } else {
    this.pages = pages;
  };
  if (year == "") {
    this.year = "unprovided";
    this.timeframe = "unprovided";
  } else {
    this.year = year;
    this.timeframe = timeframe ? "AD" : "BC";
  };
  this.read = read;
};

function addBookToLibrary(title, author, pages, year, timeframe, read, index=-1) {
  if (index === -1) {
    const book = new Book(title, author, pages, year, timeframe, read);
    const bookForDOM = createBookForDOM(book);
    myLibrary.push([book, bookForDOM]);
    booksDisplay.appendChild(bookForDOM);
  } else {
    const book = myLibrary[index][0];
    editBook.call(book, ...inputs.slice(0, -2).map(input => input.value), timeframeInputs[0].checked, readInput.checked);
    const bookForDOM = createBookForDOM(book);
    booksDisplay.removeChild([...booksDisplay.children][index]);
    nextBook = index === myLibrary.length - 1 ? null : myLibrary[index + 1][1];
    myLibrary.splice(index, 1, [book, bookForDOM]);
    booksDisplay.insertBefore(bookForDOM, nextBook);
  };

};

function createBookForDOM(book) {
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
    topContentDiv.appendChild(pagesDisplay);
  }

  if (book.year != "unprovided") {
    const yearDisplay = document.createElement("p");
    yearDisplay.textContent = `Released in ${book.year} ${book.timeframe}`;
    yearDisplay.classList.add("year");
    topContentDiv.appendChild(yearDisplay);
  }

  const readDisplay = document.createElement("p");
  readDisplay.textContent = `Status: ${(book.read) ? "Read" : "Not read yet"}`;
  readDisplay.classList.add("read");
  bottomContentDiv.appendChild(readDisplay);

  const btns = document.createElement("div");
  const readBtn = document.createElement("img");
  const editBtn = document.createElement("img");
  const removeBtn = document.createElement("img");

  if (book.read) {
    readBtn.src = "images/icons/read.svg";
    readBtn.title = "Read";
  } else {
    readBtn.src = "images/icons/not-read.svg";
    readBtn.title = "Not Read";
  }
  editBtn.src = "images/icons/edit.svg";
  editBtn.title = "Edit";
  removeBtn.src = "images/icons/remove.svg";
  removeBtn.title = "Remove";

  readBtn.addEventListener("click", evt => {
    let element = evt.target;
    while (element.dataset.id === undefined) {
      element = element.parentNode;
    };
    const id = element.dataset.id;

    for (let book of myLibrary) {
      if (book[0].id === id) {
        book[0].read = !book[0].read;
        book[1] = createBookForDOM(book[0]);
        refreshBooks();
        break;
      };
    };
  });

  editBtn.addEventListener("click", evt => {
    let element = evt.target;
    while (element.dataset.id === undefined) {
      element = element.parentNode;
    };
    for (let i = 0; i < myLibrary.length; ++i) {
      if (myLibrary[i][1] === element) {
        objIndexToBeEdited = i;
        break;
      };
    };
    const obj = myLibrary[objIndexToBeEdited][0];

    editMode = true;

    titleInput.value = obj.title;
    authorInput.value = obj.author;
    pagesInput.value = obj.pages;
    yearInput.value = obj.year;
    timeframeInputs[obj.timeframe === "AD" ? 0 : 1].checked = true;
    readInput.checked = obj.read;
    addBookDialog.querySelector("& > :first-child").textContent = "Edit Book: ";
    addBookDialog.showModal();
  });

  removeBtn.addEventListener("click", evt => {
    let element = evt.target;
    while (element.dataset.id === undefined) {
      element = element.parentNode;
    };
    const id = element.dataset.id;

    for (let i = 0; i < myLibrary.length; ++i) {
      if (myLibrary[i][0].id === id) {
        myLibrary[i][1].remove();
        myLibrary.splice(i, 1);
        break;
      };
    };
  });

  btns.appendChild(readBtn);
  btns.appendChild(editBtn);
  btns.appendChild(removeBtn);
  bottomContentDiv.appendChild(btns);

  const idDisplay = document.createElement("p");
  idDisplay.textContent = `Id: ${book.id}`;
  idDisplay.classList.add("id");
  bottomContentDiv.appendChild(idDisplay);

  [topContentDiv, bottomContentDiv].forEach(div => contentDiv.appendChild(div));
  [headerDiv, contentDiv].forEach(div => bookDisplay.appendChild(div));

  bookDisplay.style.backgroundImage = `url("images/book-covers/book-cover${book.texture}.jpg")`;
  bookDisplay.style.backgroundSize = "cover";
  bookDisplay.dataset.id = book.id;

  return bookDisplay;
};

function refreshBooks() {
  [...booksDisplay.children].forEach(child => child.remove());
  myLibrary.forEach(book => booksDisplay.appendChild(book[1]));
};

addBookBtn.addEventListener("click", evt => {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  yearInput.value = "";
  timeframeInputs[0].checked = true;
  readInput.checked = false;
  document.querySelector("#AD").checked = true;
  addBookDialog.querySelector("& > :first-child").textContent = "Add a new book: ";
  addBookDialog.showModal();
});

submitBtn.addEventListener("click", evt => {
  evt.preventDefault();

  if (document.querySelectorAll(":invalid").length == 0) {
    addBookToLibrary(...inputs.slice(0, -2).map(input => input.value), timeframeInputs[0].checked, readInput.checked, (editMode) ? objIndexToBeEdited : -1);
    editMode = false;
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
  editMode = false;
});

addBookToLibrary("The Hunger Games", "Suzanne Collins", 123, 2008, true, true);
addBookToLibrary("The Hunger Games", "Suzanne Collins", 123, 2008, false, true);
addBookToLibrary("The Hunger Games", "Suzanne Collins", 123, 2008, true, true);
