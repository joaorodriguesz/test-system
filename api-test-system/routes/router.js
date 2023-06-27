const router = require("express").Router();

const questionRouter = require("./questions");
const testRouter = require("./tests");
const testResultRouter = require("./testeResult");

//# Tests reouter
router.use("/", testRouter);

//# Questions router
router.use("/", questionRouter);

//# TestResults router
router.use("/", testResultRouter);

module.exports = router;