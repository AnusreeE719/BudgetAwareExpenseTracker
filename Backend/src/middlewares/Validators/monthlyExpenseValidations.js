const { body, validationResult } = require("express-validator");
const mongoose = require("mongoose");

// Middleware array for validating expense creation
const validateExpense = [
  body("month")
    .notEmpty().withMessage("Month is required")
    .matches(/^\d{4}-(0[1-9]|1[0-2])$/).withMessage("Month format must be YYYY-MM"),

  body("categories")
    .isArray({ min: 1 }).withMessage("At least one category is required"),

  body("categories.*.categoryId")
    .notEmpty().withMessage("Category ID is required")
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage("Invalid Category ID"),

  body("categories.*.spent")
    .notEmpty().withMessage("Category spent is required")
    .isNumeric().withMessage("Spent must be a number")
    .custom(value => value >= 0).withMessage("spent cannot be negative"),

  body("categories.*.description")
    .optional()
    .isString().withMessage("Description must be a string"),

  // Final error handler
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

const validateUpdateExpense = [
  body("categories")
    .isArray({ min: 1 }).withMessage("At least one category is required"),

  body("categories.*.categoryId")
    .notEmpty().withMessage("Category ID is required")
    .custom(value => mongoose.Types.ObjectId.isValid(value)).withMessage("Invalid Category ID"),

  body("categories.*.spent")
    .notEmpty().withMessage("Category spent is required")
    .isNumeric().withMessage("Spent must be a number")
    .custom(value => value >= 0).withMessage("spent cannot be negative"),

  body("categories.*.description")
    .optional()
    .isString().withMessage("Description must be a string"),

  // Final error handler
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    next();
  }
];

module.exports = { validateExpense, validateUpdateExpense };
