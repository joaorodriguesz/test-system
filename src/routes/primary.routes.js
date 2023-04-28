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
    if (!req.body.username === 'aaa' && !req.body.password === 'aaa') {
        return res.status(401).json({ message: 'Credenciais inválidas' });
    } 

    req.session.usuario = { nome: 'req.body.username', idade: 30 };
    res.status(200);
});

module.exports = router;