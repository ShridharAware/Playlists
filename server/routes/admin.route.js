const express = require("express");
const admin = require("../controllers/admin.controller");
const router = express.Router();
const authMiddleware = require("../utils/authMiddleware");

router.post("/", admin.createAdmin);
router.get("/", authMiddleware.authenticateToken, admin.findUsers);
router.put("/:id", authMiddleware.authenticateToken, admin.updateUser);
router.delete("/:id", authMiddleware.authenticateToken, admin.deleteUser);

module.exports = router;
