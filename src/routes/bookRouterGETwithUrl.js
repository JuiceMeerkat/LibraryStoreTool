import express from 'express';
import { fetchBookByISBN } from '../controllers/bookControllerGETwithURL.js';
import { softAuth } from "../middleware/softAuth.js";


const router = express.Router()

router.get('/volumes', fetchBookByISBN)


export default router;