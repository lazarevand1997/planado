const express = require("express");
const userController = require("./controllers/userController");
const waterController = require("./controllers/waterController");
const jwt =require("jsonwebtoken");
var {SECRET} = require("./config");

let checkToken = (req, secret) => {
  let token = req.headers.authorization;
  var response = {
      status: "error",
      message: "Token couldn`t be verified"
    };
  jwt.verify(token, secret, (err, decoded) => {
        if (err) {
           response = {
            status: "error",
            message: "Token is not valid"
          };
        } else {
          if (token === req.session.access_token) {
             response = {
              status: "success",
              decoded: decoded
            };
          } else {
             response = {
              status: "error",
              message: "Token is not correct (session)"
            };
          }
        }
      });
      console.log(response);
      return response;
};

var router = express.Router();

router.post("/signup", userController.create);
router.post("/signin", userController.login);
router.use((req, res, next) => {
  let auth = checkToken(req, SECRET);
  if (auth.status === "error") {
      return res.json({ status: "error", message: "Not Authorized" });
  } else {
    next();
  }
});
router.post("/changepass", userController.changePassword);
router.post("/createcounter", waterController.create);
router.get("/check", userController.check);
router.get("/read", userController.read);

module.exports = router;
