const { body } = require("express-validator");

const validateSignUp = [
    body("name").notEmpty().withMessage("Name is required"),
    body("email").notEmpty().withMessage('Email is required').isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
  ];
const validateLogin = [
    body("email").notEmpty().withMessage('Email is required').isEmail().withMessage("Invalid email format"),
    body("password").notEmpty().withMessage('Password is required').isLength({ min: 6 }).withMessage("Password must be at least 6 characters long")
  ];
  const updatePasswordValidator = [
    body('currentPassword')
      .notEmpty()
      .withMessage('Current password is required'),
  
    body('newPassword')
      .notEmpty()
      .withMessage('New password is required')
      .isLength({ min: 6 })
      .withMessage('New password must be at least 6 characters'),
  
    body('confirmPassword')
      .notEmpty()
      .withMessage('Confirm password is required')
  ];
  
  module.exports = { validateSignUp, validateLogin, updatePasswordValidator };