const { log } = require('console');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const autenticacaoMiddleware = require(path.join(__dirname,'..','..','middlewares/autenticacaoMiddleware'));
 

router.get('/result', (req, res) => {
    res.send('listando resultado');
});

router.get('/', (req, res) => {
    fetch("http://localhost:3000/tests", {
        method: "GET",
    })
    .then((response) => response.json())
    .then((tests) => {
        res.render('test-cad', {tests: tests});
    });
});


router.get('/:testId/question', (req, res) => {
    fetch(`http://localhost:3000/tests/${req.params.testId}`, {
        method: "GET",
    })
    .then((response) => response.json())
    .then((test) => {
        res.render('question-cad', {test: test});
    });
});

router.get('/resolve', (req, res) => {
    fetch("http://localhost:3000/tests", {
        method: "GET",
    })
    .then((response) => response.json())
    .then((tests) => {
        res.render('test-resolve', {tests: tests});
    });
});

router.get('/:testId/resolve', (req, res) => {
    fetch(`http://localhost:3000/tests/${req.params.testId}`, {
        method: "GET",
    })
    .then((response) => response.json())
    .then((test) => {
        res.render('test-resolve-question', {test: test});
    });
});

module.exports = router;


