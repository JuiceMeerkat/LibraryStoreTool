import { renderHomepage } from "../controllers/home.js";
import express from "express";
import { softAuth } from "../middleware/softAuth.js";

const router = express.Router();

router.get('/', softAuth, renderHomepage);

export default router