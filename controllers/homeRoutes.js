//use router.get
const router = require('express').Router();
// const { User } = require('../models');

router.get('/', async (req, res) => {
    try {
    res.render('login');
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
})

module.exports = router;