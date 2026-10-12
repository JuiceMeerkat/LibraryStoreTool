// This whole file is for initialising a connection with a POSTGRES database.
import pkg from 'pg';
const { Pool } = pkg;

import dotenv from "dotenv"
dotenv.config();

const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})


pool.on('connect', () => {
    console.log('Connection pool established in 1982 -- I mean established with the database');
});

export default pool;