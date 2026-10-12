import express from 'express';
import { validateToken } from '../middleware/validateToken.js';
import { getCollections, postCollection } from '../model/collections.js';
import { addBookToCollection } from '../controllers/addBookToCollection.js';
import { readACollection } from '../controllers/readACollection.js';
import { deleteACollection } from '../controllers/deleteACollection.js';
import { updateACollectionName } from '../controllers/updateACollection.js';


const router = express.Router();

router.get('/getUserCollections', validateToken, getCollections);
router.post('/postUserCollection', validateToken, postCollection);

router.post('/addToCollection', validateToken, addBookToCollection);
router.get('/readACollection', validateToken, readACollection);

router.delete('/deleteCollection', validateToken, deleteACollection)
router.put('/updateACollectionName', validateToken, updateACollectionName)


export default router;

