const express = require("express");
const router = express.Router();
const processQuery = require("../controller/process-query");

router.get("/movies", processQuery);

module.exports = router;
