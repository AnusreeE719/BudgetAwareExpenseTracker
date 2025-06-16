const express = require("express");
const authenticate = require("../middlewares/authMiddleware");
const { validateAddOrUpdateCategory } = require("../middlewares/Validators/categoryValidations");
const { addCategory, getAllCategoryByUser, getCategoryById, updateCategory, deleteCategory } = require("../controllers/categoryController");

const router = express.Router();

// Add user category
router.post("/add-category", authenticate, validateAddOrUpdateCategory, addCategory);
//Fetch all category
router.get("/get-all-categories", authenticate, getAllCategoryByUser);
//Fetch user category by Id
router.get("/get-category/:categoryId", authenticate, getCategoryById);
//Update category
router.put('/update-category/:categoryId', authenticate, validateAddOrUpdateCategory, updateCategory);
//Delete category
router.delete('/delete-category/:categoryId', authenticate, deleteCategory)

module.exports = router;