const router = require("express").Router();

const questionController = require("../controllers/questionController");

router
    .route("/questions")
    .post((req, res) => questionController.create(req, res))
    .get((req, res) => questionController.getAll(req, res));

router
    .route("/questions/:id")
    .get((req, res) => questionController.get(req, res))
    .delete((req, res) => questionController.delete(req, res))
    .put((req, res) => questionController.update(req, res));

module.exports = router;