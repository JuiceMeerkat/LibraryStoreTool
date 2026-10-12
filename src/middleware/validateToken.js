import jwt from "jsonwebtoken";
import pool from "../config/db.js";

export const validateToken = async (req, res, next) => {
    const token = req.cookies.token
    console.log('req.cookies : ', req.cookies)
    if (!token) {
        return res.status(401).json({
            "status": 401,
            "error":"no jwt provided"
        })
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
        console.log('decodedToken : ', decodedToken);
        console.log('req.user.userid : ', req.user.userid);

        // Query for email address
        const response = await pool.query(`
            SELECT *
            FROM users
            WHERE userid=$1`, [req.user.userid]);

        // console.log('response : ', response)

        if (! response.rows[0]) {
            return res.status(500).json({
                "querying db went wrong": "we are currently investigating what exactly happend"
            })
        
        }
        const result = response.rows[0]
        req.user.email = result['email'];


        console.log('result : ', result);
        console.log('req.user.email : ', req.user.email);



        next();
    } catch(err) {

        // const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        // req.user = decodedToken;
        // console.log('decodedToken : ', decodedToken);
        // console.log('req.user.userid : ', req.user.userid);

        // // Query for email address
        // const response = await pool.query(`
        //     SELECT *
        //     FROM users
        //     WHERE userid=$1`, [req.user.userid]);
        // console.log('resposne : ', response)
        console.log('reached catch')
        return res.status(500).json({
            "status":err.status,
            "err":err
        })
    }

    
}