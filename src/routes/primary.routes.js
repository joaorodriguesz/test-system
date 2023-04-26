const { log } = require('console');
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Home")
});

router.get("/login", (req, res) => {

    res.render('login', {title: 'Login'});
});

module.exports = router;