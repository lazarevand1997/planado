const express = require("express");
const userController = require("./controllers/userController");
var {SECRET} = require("./config");

let checkToken = (req, secret) => {
  let token = req.headers.authorization;
  jwt.verify(token, secret, (err, decoded) => {
        if (err) {
          response = {
            status: "error",
            message: "Token is not valid"
          };
        } else {
          if (token === req.session.token.refresh) {
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
router.get("/read", userController.read);

module.exports = router;
