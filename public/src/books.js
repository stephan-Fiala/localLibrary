function log(logThis) {
  console.log("********************************************************");
  console.log(`this is "logThis" : ${logThis}`);
  console.log("********************************************************");
}

function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let borrowed = books.filter((book) => {
    let areBooksReturned = book.borrows.every((borrow) => {
      return borrow.returned;
    });
    return !areBooksReturned;
  });
  const returned = books.filter((book) => {
    let areBooksNotReturned = book.borrows.every((borrow) => {
      return borrow.returned;
    });
    return areBooksNotReturned;
  });
  return [borrowed, returned];
}

function getBorrowersForBook(book, accounts) {
  let borrowsList = book.borrows;
  let borrowsId = borrowsList.map((borrowsObj) => {
    let foundId = accounts.find((accounts) => accounts.id === borrowsObj.id);
    foundId.returned = borrowsObj.returned;
    return foundId;
  });
  return borrowsId.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
