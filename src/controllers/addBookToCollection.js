import { addBookToCollectionModel } from '../model/collections.js';
import { checkIfbook_idNotAlreadyInCollection_id, findBook_idOfIsbn } from "../model/books.js";
import { addBookToBooksTable } from "./addBookToBooksTable.js";
import { findCollection_idByCollection_nameAnduser_id } from "../model/collections.js";

export const addBookToCollection = async (req, res, next) => {
    console.log('addToCollection FUNC called');

    const collectionName = req.body.collection;
    const isbn = req.body.isbn;

    console.log('collectionName : ', collectionName);
    console.log('isbn : ', isbn);

    // Figure out whether it is a 13 or 10 digit isbn
    console.log('isbn.length : ', isbn.length);

    let isbnObject;

    if (isbn.length == 10) {
        console.log('isbn.length == 10');
        isbnObject = {'isbn10': isbn}
    } else if (isbn.length == 13) {
        console.log('isbn.length == 13');
        isbnObject = {'isbn13': isbn}
    } else {
        console.log('something else entirely!');
    }

    console.log('isbnObject : ', isbnObject);

    // Get the book_id of the book with that isbn
    // const isbnObject = 
    // const book_id = await findBook_idOfIsbn(isbnObject);

    


    // If the book doesn't yet exist in the 'books' db (last func returns false), add it to the db. This function returns false if it's not a legit isbn

    const isbnArrOfObjs = isbnObject;
    const response = await addBookToBooksTable([isbnArrOfObjs]);
    console.log('argrah response : ', response);

    const book_id = await findBook_idOfIsbn(isbnObject);
    console.log('book_id : ', book_id);

    // console.log('book_id : ', book_id);
    // Add the row to j_books_collections junction table to say that a book has been added to a specific collection

    console.log('collectionName : ', collectionName);

    // If the collectionName doesn't exist, we find out here:
    const collection_id = await findCollection_idByCollection_nameAnduser_id(req.user.userid, collectionName);
    console.log('collection_id :', collection_id);


    if (!collection_id) {
        console.log('if (!collection_id)');
        return res.status(404).json({
            'status': '409',
            'error': 'A row(/record) with the collection name given (see "collectionName field") was not found within the collection database',
            'collectionName': collectionName
        })
    } else {

        console.log("All's good that ends good.");

        const response = await checkIfbook_idNotAlreadyInCollection_id(book_id, collection_id);
        console.log('response : ', response);
        if (response) {
            // console.log('if (response);');
            console.log('if (response)');
            

            const response2 = await addBookToCollectionModel(book_id, collection_id); // valuesArr starts with book_id
            console.log('response2 : ', response2);

            return res.status(200).json({
                'status': '200',
                'message': 'everthing should have worked'
            })

        } else {
            console.log('else');
            console.log("There's already that book in that collection");
            return res.status(400).json({
                'status': '400',
                'message': "error occured. also, I cnbb seraching up the status code so it's just your fault for now",
                'error': "There's already that book in that collection"
            })
        }
    }

    


    // TESTING function return
    return res.status(200).json({
        'status': '200',
        'message': 'yo my bro',
        'isbn': isbn,
        'collectionName': collectionName
    })
}


