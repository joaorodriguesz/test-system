const express = require('express');
const router = express.Router();

router.get('/result', (req, res) => {
    res.send('listando resultado');
});

router.get('/', (req, res) => {
    res.send('listando testes');
});

router.get('/:testId/question', (req, res) => {
    res.send('question');
});

router.post('/', (req, res) => {
    res.send('question');
});

router.post('/:testId/question', (req, res) => {
    res.send('question');
});

router.put('/:testId', (req, res) => {
    res.send('question');
});

router.put('/:testId/question', (req, res) => {
    res.send('question');
});

module.exports = router;


