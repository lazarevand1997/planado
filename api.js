const express = require("express");
const userController = require("./controllers/userController");

var router = express.Router();

router.post("/signup", userController.create);
router.post("/signin", userController.login);
router.get("/read", userController.read);

module.exports = router;
