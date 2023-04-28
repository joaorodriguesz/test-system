const { log } = require('console');
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Home")
});

router.get("/login", (req, res) => {
    res.render('login', {"title": 'Login'});
});

router.post("/login", (req, res) => {
    if (req.body.username === 'aaa' && req.body.password === 'aaa') {
        global.tokenAuth = "autorizado";
        res.status(200);
    } 
    
    return res.status(401).json({ message: 'Credenciais inválidas' });
});

module.exports = router;