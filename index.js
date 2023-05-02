// Check if local storage is empty, then add an empty array

if (localStorage.getItem("addedBooks") === null) {
  localStorage.setItem("addedBooks", JSON.stringify([]));
}

// Store data into local storage
const storeData = JSON.parse(localStorage.getItem("addedBooks"));

function updateData() {
  localStorage.setItem("addedBooks", JSON.stringify(storeData));
}

// Getting values from input fields

// Display books to the UI from local storage
function displayBooks() {
  const listOfBooks = document.querySelector(".container");
  listOfBooks.innerHTML = "";
  storeData.forEach((book, i) => {
    const bookItem = document.createElement("li");
    bookItem.innerHTML = `
      <p>${book.title}</p>
      <p>${book.author}</p>
      <button onclick="removeBook(${i})">Remove</button>
    `;
    listOfBooks.appendChild(bookItem);
  });
}

// Add new data to local storage
function addNewData(bookTitle, bookAuthor) {
  const book = {
    title: bookTitle,
    author: bookAuthor,
  };
  storeData.push(book);
  updateData();
  displayBooks();
}
const form = document.querySelector("form");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  const title = document.querySelector(".title").value;
  const author = document.querySelector(".author").value;
  addNewData(title, author);
});

// Remove data from local storage
