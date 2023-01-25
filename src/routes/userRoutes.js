const express = require("express");
const {
  validateSignupRequest,
  isRequestValidated,
  validateSigninRequest,
} = require("../../validators/auth");
const router = express.Router();

const {
  signup,
  signin,
  authVerifyUser,
} = require("../controller/UserController");
const { requireSignin } = require("../middleware");

router.post("/signup", validateSignupRequest, isRequestValidated, signup);
router.post("/signin", validateSigninRequest, isRequestValidated, signin);
router.get("/authVerifyUser", requireSignin, authVerifyUser);

module.exports = router;
