import express from 'express';

import { renderYourCollectionsPage } from '../controllers/renderYourCollectionsPage.js';
import { softAuth } from '../middleware/softAuth.js';
import { validateToken } from '../middleware/validateToken.js';
const router = express.Router();

router.get('/', validateToken, softAuth, renderYourCollectionsPage);

export default router;