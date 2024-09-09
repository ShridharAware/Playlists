const express = require("express");
const auth = require("../controllers/auth.controller");
const router = express.Router();

router.post("/login", auth.login);
router.post("/refresh-token", auth.refreshToken);

module.exports = router;
