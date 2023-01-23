function log(logThis) {
  console.log("********************************************************");
  console.log(`this is "logThis" : ${logThis}`);
  console.log("********************************************************");
}

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  return books.reduce((count, bookObj) => {
    let bookNotReturned = bookObj.borrows.some(
        (borrow) => borrow.returned === false
    );

    if (bookNotReturned) {
      count++;
    }
    return count;
  }, 0);}

function getMostCommonGenres(books) {
  let MostCommonGenres = {};
  books.forEach((book) => {
    if (book.genre in MostCommonGenres) {
      MostCommonGenres[book.genre]++;
    } else {
      MostCommonGenres[book.genre] = 1;
    }
  });

  let result = Object.keys(MostCommonGenres).map((genreName) => {
    return { name: genreName, count: MostCommonGenres[genreName] };
  });

  result.sort((a, b) => {
    return b.count - a.count;
  });

  return result.slice(0, 5);
}

function getMostPopularBooks(books) {
  return books
      .sort((a, b) => {
        return b.borrows.length - a.borrows.length;
      })
      .map((book) => {
        return { name: book.title, count: book.borrows.length };
      })
      .slice(0, 5);
}

function getMostPopularAuthors(books, authors) {
  let fiveMostPopularBooks = books
      .sort((a, b) => {
        return b.borrows.length - a.borrows.length;
      })
      .slice(0, 5);

  return fiveMostPopularBooks.map((books) => {
    let bookAuthor = authors.find((author) => author.id === books.authorId);

    let fullName = helperJoinFirstAndLastNames(
        bookAuthor.name.first,
        bookAuthor.name.last
    );

    return { name: fullName, count: books.borrows.length };
  });
}

function helperJoinFirstAndLastNames(first, last) {
  return `${first} ${last}`;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};