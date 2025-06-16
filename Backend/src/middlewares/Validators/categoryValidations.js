const { body } = require("express-validator");

const validateAddOrUpdateCategory = [
    body("name").notEmpty().withMessage("Name is required"),
 ];
module.exports = { validateAddOrUpdateCategory };