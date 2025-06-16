const { validationResult } = require("express-validator");
const Category = require("../models/categorySchema");
const mongoose = require("mongoose");

const addCategory = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { name } = req.body;
    
        const category = new Category({
          name,
          userId: req.user._id, // from authenticate middleware
        });
    
        await category.save();
        res.status(201).json({ message: "Category Added", category });
      } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
      }
}
const getAllCategoryByUser = async (req, res) => {
  try {
    const categories = await Category.find({ userId: req.user._id });
    if(!categories || categories.length === 0){
        return res.status(404).json({ message: "No category found" });
    }
    res.status(200).json({ message: "Categories fetched successfully", categories});
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
}
const getCategoryById = async (req, res) => {
    const { categoryId } = req.params;
    const userId = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }
    try {
      
        const category = await Category.findOne({ _id: categoryId, userId: userId});
    
        if (!category) {
          return res.status(404).json({ message: "Category not found" });
        }
    
        res.status(200).json({ message: "Category fetched successfully", category});
      } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
      }
}
const updateCategory = async (req, res) => {
    
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { name } = req.body;
        const { categoryId } = req.params;
        const userId = req.user._id;
        if (!mongoose.Types.ObjectId.isValid(categoryId)) {
          return res.status(400).json({ message: "Invalid category ID" });
        }
    
        const category = await Category.findOneAndUpdate(
          { _id: categoryId, userId: userId },
          { name },
          { new: true, runValidators: true }
        );
    
        if (!category) {
          return res.status(404).json({ message: "Category not found or unauthorized" });
        }
    
        res.status(201).json({ message: "Category updated", category });
      } catch (err) {
        res.status(500).json({ message: "Server error", error: err.message });
      }
}
const deleteCategory = async (req, res) => {
    const { categoryId } = req.params;
    const userId = req.user._id;
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
        return res.status(400).json({ message: "Invalid category ID" });
    }
    try {
  
      // Check if the category exists and belongs to the user
      const category = await Category.findOne({ _id: categoryId, userId: userId });
      if (!category) {
        return res.status(404).json({ message: "Category not found or unauthorized" });
      }
  
      // Check if any expenses exist under this category
      const expenseExists = await Expense.exists({ categoryId, userId });
      if (expenseExists) {
        return res.status(400).json({ message: "Cannot delete. Expenses exist under this category." });
      }
  
      // Check if any budget entries exist under this category
      const budgetExists = await Budget.exists({ categoryId, userId });
      if (budgetExists) {
        return res.status(400).json({ message: "Cannot delete. Budget exists for this category." });
      }
  
      // Delete the category if no dependencies found
      await Category.deleteOne({ _id: categoryId });
      res.status(200).json({ message: "Category deleted successfully" });
  
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
module.exports = {
    addCategory,
    getAllCategoryByUser,
    getCategoryById,
    updateCategory,
    deleteCategory
  };