function log(logThis) {
  console.log("********************************************************");
  console.log(`this is "logThis" : ${logThis}`);
  console.log("********************************************************");
}

function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  accounts.sort((accountA, accountB) => {
    return accountA.name.last.toLowerCase() < accountB.name.last.toLowerCase()
      ? -1
      : 1;
  });
  return accounts;
}

function getTotalNumberOfBorrows(account, books) {
  const borrowed = [];
  Object.keys(books).forEach((book) => {
    books[book].borrows.forEach((borrowsE) => {
      if (borrowsE.id === account.id) {
        borrowed.push(book);
      }
    });
  });

  return borrowed.length;
}

function getBooksPossessedByAccount(account = {}, books = [], authors = []) {
  let booksPossesed = books.filter((book) => {
    let isCheckedOut = false;
    book.borrows.every((borrow) => {
      if (borrow.id === account.id) {
        isCheckedOut = !borrow.returned;
      }
    });
    return isCheckedOut;
  });

  booksPossesed.forEach((book) => {
    const author = authors.find((author) => {
      return author.id === book.authorId;
    });
    book.author = {
      name: author.name,
    };
  });

  return booksPossesed;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
