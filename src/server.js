// Node module imports
import express from "express";
import path from "path";
import cookieParser from "cookie-parser"
import dotenv from "dotenv";
dotenv.config();

// Intra-project imports
import homeRouter from './routes/homeRoute.js'
import authRouterGET from './routes/authRoutesGET.js'
import authRouterPOST from './routes/authRoutesPOST.js'
import accountrouter from './routes/account.js'
import bookRouterGETwithURL from './routes/bookRouterGETwithUrl.js'
import bookRouterGET from './routes/bookRouterGET.js';
import yourCollectionsPageRouterRENDER from './routes/yourCollectionsRENDER.js';
import yourCollectionsGET from './routes/dbCollections.js'
import faviconRouter from "./routes/favicon.js";

// TEMPORARY IMPORTS
import { addBookToBooksTable } from "./controllers/addBookToBooksTable.js";
import { findBook_idOfIsbn } from "./model/books.js";
import { findISBNobjectOfABook_id } from "./model/books.js";


const app = express();

// Ensure app can understand url encoded stuff and json
app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());


// MIDDLEWARE - app.use for all routes
app.use('/', homeRouter);

app.use('/', authRouterGET);
app.use('/api/auth', authRouterPOST);
app.use('/account', accountrouter);

app.use('/api', bookRouterGETwithURL);
app.use('/api', yourCollectionsGET);

app.use('/searchForBooks', bookRouterGET);
app.use('/yourCollections', yourCollectionsPageRouterRENDER);

app.use('/', faviconRouter);



// Define a few variables
const __dirname = path.resolve();
console.log('__dirname : ', __dirname)
console.log('express.static(path.join(__dirname, "public")) : ', path.join(__dirname, "public"));


// Activate ejs as viewing engine

// Set the static dir
app.use(express.static(path.join(__dirname, "public")));
// Configure view engine to ejs
app.set('view engine', 'ejs');

// TEMP - for testing

// 9781982107031
// addBookToBooksTable([{'isbn13': '9781982107031'}])

// const book_id = await findBook_idOfIsbn({'isbn13': '9781982107031'});
// console.log('book_id : ', book_id);

// const isbnObject = await findISBNobjectOfABook_id(49);
// console.log('isbnObject : ', isbnObject);


// Activate server

const PORT = process.env.PORT || 5500
const HOST = process.env.HOST || 'localhost'
console.log('HOST PORT : ', HOST, PORT)

app.listen(PORT, () => {
    console.log(`Listening on PORT ${PORT}. \n url: http://${HOST}:${PORT}`)
})