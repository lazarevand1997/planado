const express = require("express");
const userController = require("./controllers/userController");

var router = express.Router();

router.get("/signup", userController.create);
router.get("/signin", userController.login);
router.get("/read", userController.read);

module.exports = router;
