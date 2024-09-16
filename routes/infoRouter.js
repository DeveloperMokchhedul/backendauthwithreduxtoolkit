

const express = require("express");
const { studentInfo, teacherInfo } = require("../controllers/infoController");
const router = express.Router();

router.get("/student", studentInfo)
router.get("/teacher", teacherInfo)

module.exports = router