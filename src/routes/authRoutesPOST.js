import express from "express"
import validateInput from "../middleware/inputValidation.js";
import pool from "../config/db.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"


const router = express.Router()

router.post('/register', validateInput, async (req, res, next) => {
    console.log('FUNC: register (but POST)**')
    // Receive name, email and password from req.body
    console.log('req.body : ', req.body);
    const username = req.body.username
    const email = req.body.email
    const password = req.body.password

    console.log('username, email, password : ', username, email, password);

    // Quickly hash password to integrate security
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user with email already exists
    const checkingResponse = await pool.query(`
        SELECT *
        FROM  users
        WHERE email = $1`, [email])

    if (checkingResponse.rows[0]) {
        return res.status(409).json({
            "status": 409,
            "error": "email already in use",
            "message for user": 'That email is already in use, please choose another'
        })
    }

    // Query the table to insert this as a new user
    const response = await pool.query(`
        INSERT INTO users (username, email, password, role)
        VALUES ($1, $2, $3, $4)`, [username, email, hashedPassword, 'user'])

    console.log('response : ', response)

    // return res.redirect('/login');

    return res.status(200).json({
        "status": 200,
        "message": `Successfully registerd`,
        "message for user": `Thank you for registering, ${username}. Click the Login button to sign in to your account.`
    })

});

router.post('/login', async(req, res, next) => {
    const { email, password } = req.body;

    // Change password to hashedPassword

    // Query the table for the user
    const response = await pool.query(`
        SELECT *
        FROM users
        WHERE email = $1`, [email]);
    const result = response.rows[0];
    console.log('response : ', response);
    console.log('result : ', result)
    const user = result
    console.log('user.userid : ', user.userid)

    if (response.rows.length == 0) {
        return res.status(404).json({
            "status": 404,
            "message": `User with email ${email} was not found`
        })
    }
    
    

    console.log(await bcrypt.compare(password, user.password));
    
    if (! await bcrypt.compare(password, user.password)) {
        return res.status(401).json({
            "status": 401,
            "error:" : "incorrect login credentials inputted"})
    }

    const token = jwt.sign(
        {userid:user.userid, role:user.role, username:user.username},
        process.env.JWT_SECRET,
        {expiresIn: "1h"}
    )
    

    res.cookie("token", token, {
        httpOnly: true,
        secure: false, // turn on if protocol changes 
        sameSite: 'strict'
    })

    res.redirect('/')

})

export default router;