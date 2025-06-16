const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");

// Middleware array for validating budget creation
const validateBudget = [
  body("month")
    .notEmpty().withMessage("Month is required")
    .matches(/^\d{4}-(0[1-9]|1[0-2])$/).withMessage("Month format must be YYYY-MM"),

  body("totalBudget")
    .notEmpty().withMessage("Total budget is required")
    .isNumeric().withMessage("Total budget must be a number")
    .custom(value => value >= 0).withMessage("Total budget cannot be negative"),

  body("categories")
    .isArray({ min: 1 }).withMessage("At least one category is required"),

  body("categories.*.categoryId")
    .notEmpty().withMessage("Category ID is required")
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage("Invalid Category ID"),

  body("categories.*.limit")
    .notEmpty().withMessage("Category limit is required")
    .isNumeric().withMessage("Limit must be a number")
    .custom(value => value >= 0).withMessage("Limit cannot be negative"),

  // Final error handler
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

const validateUpdateBudget = [

  body("totalBudget")
    .notEmpty().withMessage("Total budget is required")
    .isNumeric().withMessage("Total budget must be a number")
    .custom(value => value >= 0).withMessage("Total budget cannot be negative"),

  body("categories")
    .isArray({ min: 1 }).withMessage("At least one category is required"),

  body("categories.*.categoryId")
    .notEmpty().withMessage("Category ID is required")
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage("Invalid Category ID"),

  body("categories.*.limit")
    .notEmpty().withMessage("Category limit is required")
    .isNumeric().withMessage("Limit must be a number")
    .custom(value => value >= 0).withMessage("Limit cannot be negative"),

  // Final error handler
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];


module.exports = { validateBudget, validateUpdateBudget };
