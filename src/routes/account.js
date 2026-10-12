import express from "express";
import { accountController } from "../controllers/account.js";
import { softAuth } from "../middleware/softAuth.js";

import { validateToken } from "../middleware/validateToken.js";
const router = express.Router();

router.get('/', validateToken, softAuth, accountController)

export default router