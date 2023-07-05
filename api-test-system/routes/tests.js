const router = require("express").Router();

const testController = require("../controllers/testController");

router
    .route("/tests")
    .post((req, res) => testController.create(req, res))
    .get((req, res) => testController.getAll(req, res));


router
    .route("/tests/:id")
    .get((req, res) => testController.get(req, res))
    .delete((req, res) => testController.delete(req, res))
    .put((req, res) => testController.update(req, res));



module.exports = router;