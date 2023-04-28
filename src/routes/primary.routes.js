const { log } = require('console');
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.render('home', {"title": 'Home', "token": global.tokenAuth});
});

router.get("/login", (req, res) => {
    res.render('login', {"title": 'Login'});
});

router.post("/login", (req, res) => {
    if (req.body.username === 'aaa' && req.body.password === 'aaa') {
        global.tokenAuth = true;
        return res.status(200).json({ message: 'Credenciais validas' });
    } 
    
    return res.status(401).json({ message: 'Credenciais inválidas' });
});

module.exports = router;