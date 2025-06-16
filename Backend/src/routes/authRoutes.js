const express = require("express");
const { loginUser, signUp, getCurrentUser, updatePassword } = require("../controllers/authController");
const authenticate = require("../middlewares/authMiddleware");
const { validateLogin, validateSignUp, updatePasswordValidator } = require("../middlewares/Validators/authValidations");
const router = express.Router();

// Login a user 
router.post("/login", validateLogin, loginUser);
//Signup
router.post("/signup", validateSignUp, signUp);
//Fetch loggedin user data
router.get("/fetch-user", authenticate, getCurrentUser);
// change password
router.put('/update-password', authenticate, updatePasswordValidator, updatePassword);
module.exports = router;