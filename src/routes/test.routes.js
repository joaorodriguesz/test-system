const { log } = require('console');
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const autenticacaoMiddleware = require(path.join(__dirname,'..','..','middlewares/autenticacaoMiddleware'));
 

router.get('/result', (req, res) => {
    res.send('listando resultado');
});

// router.get('/', (req, res) => {
//     res.type('json');
//     res.body = (require(path.join('..','..', 'data/tests.json')))
// });

router.get('/',autenticacaoMiddleware, (req, res) => {
    res.render('test-cad', {title: 'Tests'});
});

router.get('/:testId/question', (req, res) => {
    res.send('question');
});

router.post('/', (req, res) => {
    fs.writeFile( "data/tests.json", JSON.stringify(req.body), (err) => {
        if (err) {
            res.status(500).send('Erro interno');
        }
        res.status(200).send(err);
    });
});

router.post('/:testId/question', (req, res) => {

});

router.put('/:testId', (req, res) => {
    res.send('question');
});

router.put('/:testId/question', (req, res) => {
    res.send('question');
});

module.exports = router;


