const date = new Date();
const n = date.toDateString();
const time = date.toLocaleTimeString();
const disdate = document.querySelector('.date');
const p = document.createElement('p');
p.innerHTML = `${n}, ${time}`;
disdate.appendChild(p);
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
      <span>"${book.title}"</span>
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
    error.innerHTML = 'Success !!!';
    error.classList.replace('error', 'success');
    t.value = '';
    a.value = '';
  } else {
    error.classList.replace('success', 'error');
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

// link features
const list = document.querySelector('.book-list');
const newbook = document.querySelector('.add_new-book');
const contact = document.querySelector('.contact');
const spanlist = document.querySelector('.list');
const spanaddnew = document.querySelector('.add-new');
const spancontact = document.querySelector('.contact-info');

spanlist.addEventListener('click', () => {
  newbook.classList.remove('add_new-book');
  newbook.classList.add('non-display');
  spanaddnew.classList.remove('color');

  contact.classList.remove('contect');
  contact.classList.add('non-display');
  spancontact.classList.remove('color');

  list.classList.remove('non-display');
  list.classList.add('book-list');
  spanlist.classList.add('color');
});

spanaddnew.addEventListener('click', () => {
  contact.classList.remove('contect');
  contact.classList.add('non-display');
  spancontact.classList.remove('color');

  list.classList.remove('book-list');
  list.classList.add('non-display');
  spanlist.classList.remove('color');

  newbook.classList.remove('non-display');
  newbook.classList.add('add_new-book');
  spanaddnew.classList.add('color');
});

spancontact.addEventListener('click', () => {
  newbook.classList.replace('add_new-book', 'non-display');
  spanaddnew.classList.remove('color');

  list.classList.replace('book-list', 'non-display');
  spanlist.classList.remove('color');

  contact.classList.replace('non-display', 'contact');
  spancontact.classList.add('color');
});
