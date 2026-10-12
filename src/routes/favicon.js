import express from 'express';

const router = express.Router();

router.get('/favicon.ico', (req, res, next) => {
    res.send('../public/images/favicon.ico');
})

export default router;