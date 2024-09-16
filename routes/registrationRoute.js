


const express = require("express");
const { registration, userLogin, userLogout } = require("../controllers/registration");
const router = express.Router();

router.post("/registration", registration)
router.post("/login", userLogin)
router.get("/logout", userLogout)


module.exports = router