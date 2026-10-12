import { findISBNobjectOfABook_id } from "../model/books.js";
import { findCollection_idByCollection_nameAnduser_id, getBook_idsInACollectionByCollection_id } from "../model/collections.js";

import dotenv from "dotenv"
dotenv.config();

const HOST = process.env.HOST;
console.log('HOST : ', HOST);
const PORT = process.env.PORT;
console.log('PORT : ', PORT);


export const readACollection = async (req, res, next) => {
    console.log('(controller) readACollection FUNC called');

    console.log('req.query : ', req.query);

    const collection_name = req.query.collection_name;
    console.log('collection_name : ', collection_name);

    // const collection_id = 12;
    // First, find the collection_id of the collection the user has with the collection name
    const user_id = req.user.userid;
    console.log('user_id : ', user_id);
    const response = await findCollection_idByCollection_nameAnduser_id(user_id, collection_name);
    const collection_id = response;
    console.log('response : ', response);


    // Find all the book_ids inside the collection_id retrieved
    // const collection_id = respo
    const book_idsArrOfObjs = await getBook_idsInACollectionByCollection_id(collection_id);
    console.log('book_idsArrOfObjs : ', book_idsArrOfObjs);

    // Then, get the corresponding book isbns (for us to fetch from google books) from the books table, using the ArrOfObjs of book_ids we just received from the previous function

    const arrOfisbnObjs = []

    for (let i = 0; i < book_idsArrOfObjs.length; i++ ) {
        console.log('i : ', i);
        let currentBook_id = book_idsArrOfObjs[i].book_id;
        const isbnObj = await findISBNobjectOfABook_id(currentBook_id);
        console.log('isbnObj : ', isbnObj);
        arrOfisbnObjs.push(isbnObj);
    }

    console.log('arrOfisbnObjs: ', arrOfisbnObjs);

    // Fetch, from our endpoint because it returns all the stuff we need, the details about each book with the isbns we just received/retrieved
    const booksDetail = [];

    for (let i = 0; i < arrOfisbnObjs.length; i++) {
        console.log('i : ', i);
        let currentIsbnObj = arrOfisbnObjs[i];
        console.log('currentIsbnObj : ', currentIsbnObj);

        let isbn;

        if (currentIsbnObj.isbn_13) {
            console.log('if (currentIsbnObj.isbn_13)');
            isbn = currentIsbnObj.isbn_13;
        } else if (currentIsbnObj.isbn_10) {
            console.log('else if (currentIsbnObj.isbn_10)')
            isbn = currentIsbnObj.isbn_10;
            
        } else {
            console.log('(readACollection) Something else entirely!');
        }

        const url = `http://${HOST}:${PORT}/api/volumes?ISBN=${isbn}`;
        console.log('url : ', url);

        const response = await fetch(url);
        // console.log('response : ', response);

        const result = await response.json();
        console.log('result : ', result);

        booksDetail.push(result);

    }

    return res.status(200).json({
        'status':'200',
        'message':'Everything should have worked',
        'booksDetail': booksDetail
    });
    
    // TEMP - for testing
    return res.status(200).json({
        'status': '200',
        'message': 'this should be temp, it is for testing'
    })
}