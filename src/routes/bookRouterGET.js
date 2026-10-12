import express from 'express';
import { renderFindBookPage } from '../controllers/bookControllerGET.js';
import { softAuth } from '../middleware/softAuth.js';

const router = express.Router();

router.get('/', softAuth, renderFindBookPage)

export default router;