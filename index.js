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
    bookItem.className = 'book-item';
    bookItem.style.listStyleType = 'none'; // add this line to remove the bullet points

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
function addNewData(bookTitle, bookAuthor) {
  if (bookTitle.trim() !== '' && bookAuthor.trim() !== '') {
    const book = {
      title: bookTitle,
      author: bookAuthor,
    };
    storeData.push(book);
    updateData();
    displayBooks();
  }
}
const form = document.querySelector('form');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const title = document.querySelector('.title').value;
  const author = document.querySelector('.author').value;
  addNewData(title, author);
});

// Remove data from local storage
// eslint-disable-next-line no-unused-vars
function removeBook(i) {
  storeData.splice(i, 1);
  updateData();
  displayBooks();
}
// Call the displayBooks function on page load
window.onload = displayBooks;

// link features
const list = document.querySelector('.book-list');
const newbook = document.querySelector('.add-new-book');
const contact = document.querySelector('.contact');
const spanlist = document.querySelector('.list');
const spanaddnew = document.querySelector('.add-new');
const spancontact = document.querySelector('.contact-info');
spanaddnew.addEventListener('click', () => {
  list.className = 'non-display';
  contact.className = 'non-display';
  newbook.className = 'add_new-book';
});
spanlist.addEventListener('click', () => {
  contact.className = 'non-display';
  newbook.className = 'non-display';
  list.className = 'book-list';
});
spancontact.addEventListener('click', () => {
  newbook.classList.replace('add_new-book', 'non-display');
  list.classList.replace('book-list', 'non-display');
  contact.classList.replace('non-display', 'contact');
});
