
const express = require("express");
const { dashboard } = require("../controllers/dashboard");

const router = express.Router();

router.get("/user", dashboard)


module.exports = router