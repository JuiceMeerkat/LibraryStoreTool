import { checkIfBookAlreadyExistsInBooksTable } from "../model/books.js";
import { addBookToBooksTableModel } from "../model/books.js";
import { checkIfIsbnIsLegit } from "../services/checkIfIsbnIsLegit.js";


export const addBookToBooksTable = async (isbnArrOfObjs) => {
    console.log('addBookToBooksTable FUNC called');
    console.log('args passed: ');
    console.log('isbnArrOfObjs : ', isbnArrOfObjs);

    // This function can handle an input including an isbn which already exists in the database - you do not want two sets of the same isbn in two different rows, so it ignores that book if it is already in the 'books' table

    let results = [];

    const lengthOfIsbnArr = isbnArrOfObjs.length
    console.log('lengthOfIsbnArr : ', lengthOfIsbnArr);
    for (let i = 0; i < lengthOfIsbnArr; i++) {
        console.log('i : ', i);
        let currentIsbnObj = isbnArrOfObjs[i]

        console.log('currentIsbnObj : ', currentIsbnObj);

        // First, check if the isbn already exists in the table (book_id already registered with that book_id)
        const response = await checkIfBookAlreadyExistsInBooksTable(currentIsbnObj);

        if (response.length > 0) {
            console.log("There is already a book in the 'books' table with the details : ", currentIsbnObj);

            const jsonError = {
                'error': 'A row  with the provided book details already exists in the "books" table',
                'currentIsbnObj': currentIsbnObj,
                'what we did': 'we ignored that book in the list of books you gave us'
            }
            results.push(jsonError)

        } else {
            console.log("There is not already a book in the 'books' table with the details : ", currentIsbnObj);

            // Check if the given isbn(s) is/are legit/valid
            // console.log('currentIsbnObj.length: ', currentIsbnObj.length);

            // Source - https://stackoverflow.com/a/4546174
            // Posted by Nick Craver, modified by community. See post 'Timeline' for change history
            // Retrieved 2026-03-09, License - CC BY-SA 4.0
            // Copy pasted (and tweaked a little) code to find the length of an object. Objects do not have a .length property like arrays
            let obj = currentIsbnObj;

            let isbn;

            if (obj['isbn13']) {
                console.log((obj['isbn13']));
                isbn = obj['isbn13'];
            } else if (obj['isbn10']) {
                console.log((obj['isbn10']));
                isbn = obj['isbn10']
            } else {
                console.log('SOMETHING else verrry bad has happened')
            }

            const isLegit = await checkIfIsbnIsLegit(isbn);


            // let objLength = 0;
            // for(let k in obj) if(obj.hasOwnProperty(k)) objLength++;
            // console.log('objLength : ', objLength)

            // for (let x = 0; x < objLength; x++) {
            //     console.log('x : ', x);

                // let isbn;
                // If x = 0, isbn13 will be used, if else, isbn10
                // Do not use currentIsbnObj here, because we are writing, not just reading
                // if (x == 0) {
                //     isbn = isbnArrOfObjs[i]['isbn13']; 
                // } else if (x == 1) {
                //     isbn = isbnArrOfObjs[i]['isbn10']; 
                // } else {
                //     console.log('something else entirely!')
                // }

                // console.log('isbn : ', isbn);

            console.log('isLegit : ', isLegit);

                // If it is legit, add it to the books db table, if not, return an error that the isbn is not legit

            if (!isLegit) {
                console.log('!isLegit')
                const jsonError = {
                    'error': 'Isbn detail given is not legit, according to checkIfIsbnIsLegit func (local)',
                    'isbn in question': isbn,
                    'what we did': 'we ignored that isbn in the list of isbns you gave us'
                }
                results.push(jsonError)
                // returns = {
                //     'what happened': 'error occured',
                //     'error': 'Isbn is not legit (according to Google Books API'
                // }
                // return returns
            } else if (isLegit) {
                console.log('isLegit');
                const response = await addBookToBooksTableModel(currentIsbnObj);
                console.log('response : ', response);
            } else {
                console.log('addBookToBooksTable something else entirely!')
            }

                // const response2 = await addBookToBooksTableModel(isbnArrOfObjs[i]);
                // console.log('response2 : ', response2);

            

            



            


        }

        // console.log('response1 : ', response1);
        // const response = await addBookToBooksTableModel();
        
        console.log('results : ', results);

    }
}


