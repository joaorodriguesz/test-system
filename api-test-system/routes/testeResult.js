const router = require("express").Router();

const testResultController = require("../controllers/testResultController");

router
    .route("/tests/:id/results")
    .post((req, res) => testResultController.create(req, res))
    .get((req, res) => testResultController.getAll(req, res));

router
    .route("/tests/:id/results/:id")
    .get((req, res) => testResultController.get(req, res))
    .delete((req, res) => testResultController.delete(req, res))
    .put((req, res) => testResultController.update(req, res));    

module.exports = router;