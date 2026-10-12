import pool from "../config/db.js";

export const findBook_idOfIsbn = async (isbnObject) => {
    console.log('findBookIdForISBN FUNC called');
    // Func returns the book_id of a book stored in the local 'books' table with the same isbn provided
    const isbn13 = String(isbnObject['isbn13']);
    const isbn10 = String(isbnObject['isbn10']);
    
    console.log('isbn13 : ', isbn13);
    console.log('typeof(isbn13) : ', typeof(isbn13));
    console.log('isbn10 : ', isbn10);
    console.log('typeof(isbn10) : ', typeof(isbn10));

    let query, args;

    // Fetch based on what kind of isbn you have available (start with isbn13 because that's newer)
    if (isbn13 != 'undefined') {
        console.log('findBook_idOfIsbn, isbn13');
        query = `
        SELECT book_id
        FROM books
        WHERE isbn_13 = $1`;
        args = [isbn13];
    } else if (isbn10 != 'undefined') {
        console.log('findBook_idOfIsbn, isbn10');
        query = `
        SELECT book_id
        FROM books
        WHERE isbn_10 = $1`
        args = [isbn10]
    } else {
        console.log('ERROR! : neither an isbn10, or an isbn13 were provided')
    }

    // We do it like this so that we can debug and console.log the result and response after receiving one.
    const response = await pool.query(query, args);
    console.log('response : ', response);

    const result = response.rows[0];
    console.log('result : ', result);

    if (result) {

        const book_id = result.book_id;
        console.log('book_id : ', book_id);

    
        console.log('first if');
        return book_id;
    } else {
        console.log('else');
        return false;
    }
}

export const findISBNobjectOfABook_id = async (book_id) => {
    console.log('findISBNsOfABook_id FUNC called');
    console.log('book_id');
    console.log(book_id);
    
    const response = await pool.query(`
    SELECT isbn_10, isbn_13
    FROM books
    WHERE book_id = $1`, [book_id]);

    // console.log('response : ', response);


    // We do it like this so that we can debug and console.log the result and response after receiving one.
    const result = response.rows[0];
    // const book_id = result.book_id

    console.log('result : ', result);
    // console.log('book_id : ', book_id);
    const isbnObj = result
    return isbnObj;
}




export const addBookToBooksTableModel = async (isbnObject) => {
    console.log('addBookToBooksTableModel FUNC called');
    const isbn13 = isbnObject['isbn13'];
    const isbn10 = isbnObject['isbn10'];

    console.log('isbn13 : ', isbn13);
    console.log('isbn10 : ', isbn10);

    if (isbn13 && isbn10) {
        const response = await pool.query(`
        INSERT INTO books (isbn_13, isbn_10)
        VALUES($1, $2)`, [isbn13, isbn10]);
    } else if (isbn13) {
        const response = await pool.query(`
        INSERT INTO books (isbn_13)
        VALUES($1)`, [isbn13]);
    } else if (isbn10) {
        const response = await pool.query(`
        INSERT INTO books (isbn_10)
        VALUES($1)`, [isbn10]);
    } else {
        console.log('something else entirely!')
    }

}


export const checkIfBookAlreadyExistsInBooksTable = async(isbnObject) => {
    console.log('checkIfBookAlreadyExistsInBooksTable FUNC called');
    const isbn13 = isbnObject['isbn13']
    const isbn10 = isbnObject['isbn10']

    const response = await pool.query(`
        SELECT *
        FROM books
        WHERE isbn_10 = $1 or isbn_13 = $2`, [isbn10, isbn13]);
    
    const rows = response.rows;
    console.log('(postgres) response : ', response);
    console.log('(postgres) rows : ', rows);

    return rows;
}

export const checkIfbook_idNotAlreadyInCollection_id = async (book_id, collection_id) => {
    // This function returns true if the book is NOT already in the collection, and false if it is
    console.log('checkIfbook_idNotAlreadyInCollection_id FUNC called');
    console.log('arg, book_id : ', book_id);
    console.log('arg, collection_id : ', collection_id);

    const response = await pool.query(`
        SELECT *
        FROM j_books_collections
        WHERE book_id = $1 and collection_id = $2`, [book_id, collection_id])
    
    // console.log('response : ', response);

    if (response.rows.length > 0) {
        
        // This is not ideal
        return false;
    } else {
        console.log('else. So basically, there is not already that book in the collection')
        return true;
    }

    // return 0;
}