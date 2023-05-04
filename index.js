// Check if local storage is empty, then add an empty array
if (localStorage.getItem('addedBooks') === null) {
  localStorage.setItem('addedBooks', JSON.stringify([]));
}

// Store data into local storage
const storeData = JSON.parse(localStorage.getItem('addedBooks'));

function updateData() {
  localStorage.setItem('addedBooks', JSON.stringify(storeData));
}

// Getting values from input fields

// Display books to the UI from local storage
function displayBooks() {
  const listOfBooks = document.querySelector('.container');
  listOfBooks.innerHTML = '';
  storeData.forEach((book, i) => {
    const bookItem = document.createElement('div');
    bookItem.className = 'book-item'; // add this line to remove the bullet points

    const bookinfo = document.createElement('div');
    bookinfo.className = 'book-info';
    bookinfo.innerHTML = `
      <span>${book.title}</span>
      <span> by ${book.author}</span>
    `;
    bookItem.appendChild(bookinfo);

    const rmvbtn = document.createElement('div');
    rmvbtn.className = 'remov-button';
    rmvbtn.innerHTML = `
    <button onclick="removeBook(${i})">Remove</button>
    `;
    bookItem.appendChild(rmvbtn);
    listOfBooks.appendChild(bookItem);
  });
}

// Add new data to local storage
const error = document.querySelector('.error');
const t = document.querySelector('.title');
const a = document.querySelector('.author');
function addNewData(bookTitle, bookAuthor) {
  if (bookTitle.trim() !== '' && bookAuthor.trim() !== '') {
    const book = {
      title: bookTitle,
      author: bookAuthor,
    };
    storeData.push(book);
    updateData();
    displayBooks();
    error.innerHTML = '';
    t.value = '';
    a.value = '';
  } else {
    error.innerHTML = 'Auther or Book Title can"t be empty';
  }
}
// eslint-disable-next-line no-unused-vars
function SubmitBook() {
  const title = document.querySelector('.title').value;
  const author = document.querySelector('.author').value;
  addNewData(title, author);
}

const addbtndiv = document.querySelector('.add-btn-div');
const addbtn = document.createElement('span');
addbtn.innerHTML = `
<button onclick={SubmitBook()}>Add</button>`;
addbtndiv.appendChild(addbtn);

// Remove data from local storage
// eslint-disable-next-line no-unused-vars
function removeBook(i) {
  storeData.splice(i, 1);
  updateData();
  displayBooks();
}
// Call the displayBooks function on page load
window.onload = displayBooks;
