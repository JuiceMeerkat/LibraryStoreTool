import dotenv from 'dotenv'
dotenv.config()

const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY
console.log('GOOGLE_BOOKS_API_KEY (!secret!) : ', GOOGLE_BOOKS_API_KEY);

export const checkIfIsbnIsLegit = async (ISBNnoHyphens) => {
    console.log('checkIfIsbnIsLegit FUNC called');

    console.log('arg1 : ', ISBNnoHyphens);

    // Make a request to google books to check if the isbn is legit, assuming google books contains all the books with legit isbns. 
    // Note: We contact the google books api directly because a) There is no security risk in exposing the SECRET API KEY again, because this is server side code, and b) it lowers the number of requests hitting this server, because we skip that step and go straight to the google books api. 
    
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${ISBNnoHyphens}&key=${GOOGLE_BOOKS_API_KEY}`;

    const response = await fetch(url);
    const result = await response.json();
    const containsItems = Boolean(result.items);

    // console.log('response : ', response);
    // console.log('result : ', result);
    console.log('containsItems : ', containsItems);

    return containsItems
}