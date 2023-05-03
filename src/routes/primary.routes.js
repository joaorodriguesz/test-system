const { log } = require('console');
const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    fetch("http://localhost:3001/results", {
        method: "GET",
    })
    .then((response) => response.json())
    .then((results) => {
        res.render('home', {"title": 'Home', "token": global.token, "results": results});
    });

});

router.get("/login", (req, res) => {
    res.render('login', {"title": 'Login'});
});

router.post("/login", (req, res) => {
    if (req.body.username === 'teste' && req.body.password === 'teste') {
        global.token = true;
        return res.status(200).json({ message: 'Credenciais validas' });
    } 
    
    return res.status(401).json({ message: 'Credenciais inválidas' });
});

module.exports = router;