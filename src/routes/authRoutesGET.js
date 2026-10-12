import express from "express";
import { serveRegisterPage, serveLoginPage, signout } from "../controllers/authControllerGET.js";
import { softAuth } from "../middleware/softAuth.js";


const router = express.Router();

router.get('/register', softAuth, serveRegisterPage)
router.get('/login', softAuth, serveLoginPage)
router.get('/signout', softAuth, signout)


export default router