const express = require('express');
const router = express.Router();
const path = require('path');
const viewDirectoriPath = path.join(__dirname, '..', 'views');

router.get("/", (req, res) => {
    res.send("Home")
});

router.get("/login", (req, res) => {
    console.log(__dirname);
    res.sendFile(`${viewDirectoriPath}/login.html`);
});

module.exports = router;