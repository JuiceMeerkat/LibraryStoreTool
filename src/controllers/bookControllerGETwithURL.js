import dotenv from 'dotenv'
dotenv.config()
const GOOGLE_BOOKS_API_KEY = process.env.GOOGLE_BOOKS_API_KEY
console.log('GOOGLE_BOOKS_API_KEY (!secret!) : ', GOOGLE_BOOKS_API_KEY);

export const fetchBookByISBN = async(req, res, next) => {
    console.log('fetchBookByISBN function called');

    let ISBN = req.query.ISBN;
    console.log('ISBN : ', ISBN);

    // Fetch all data for the book with that ISBN from the Google Books API
    const url = `https://www.googleapis.com/books/v1/volumes?q=isbn:${ISBN}&key=${GOOGLE_BOOKS_API_KEY}`
    const options = {
        method: 'GET',
        'Content-type': 'application/json'
    }

    const response = await fetch(url, options);
    const result = await response.json();
    console.log('result : ', result);

    const volumeInfo = result.items[0].volumeInfo;
    const thumbnail = volumeInfo.imageLinks.thumbnail.replace('zoom=1', 'zoom=0')
    const newResults = {
        'authors': volumeInfo.authors,
        'title': volumeInfo.title,
        'subtitle': volumeInfo.subtitle,
        'publishedDate': volumeInfo.publishedDate,
        'description': volumeInfo.description,
        'thumbnail': volumeInfo.imageLinks.thumbnail,
        'isbn': ISBN
    }

    return res.status(200).json({
        'status': 200,
        'newResults' : newResults
    });
}