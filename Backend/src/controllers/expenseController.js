const Expense = require("../models/expenseSchema");
const Category = require("../models/categorySchema");

//Create Monthly Expense
const createMonthlyExpense = async (req, res) => {
    try {
        const { month, categories } = req.body;
        const userId = req.user._id;
        // Validation: check for duplicate month
        const exists = await Expense.findOne({ userId, month });
        if (exists) {
            return res.status(400).json({ message: "Expense already exists for this month." });
        }

        // Extract and check duplicate categoryIds
        const categoryIds = categories.map(c => c.categoryId.toString());
        const seen = new Set();
        for (const id of categoryIds) {
            if (seen.has(id)) {
                return res.status(400).json({ message: "Duplicate category detected in input." });
            }
            seen.add(id);
        }

        // Check category ownership
        const validCategories = await Category.find({ _id: { $in: categoryIds }, userId });
        if (validCategories.length !== categoryIds.length) {
            return res.status(400).json({ message: "One or more categories are invalid or unauthorized." });
        }

        // Calculate totalExpense
        const totalExpense = categories.reduce((sum, cat) => sum + cat.spent, 0);

        // Create and save the expense document
        const newExpense = new Expense({
            userId,
            month,
            totalExpense,
            categories
        });
  
        await newExpense.save();
    
        res.status(201).json({
            message: "Expense record created successfully.",
            expense: newExpense,
        });
  
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
}

// GET Expense by Month
const getExpenseByMonth = async (req, res) => {
    const { month } = req.params;
      // Validate month
    if (!month) {
      return res.status(400).json({ message: "Month is required" });
    }

    const isValidFormat = /^\d{4}-(0[1-9]|1[0-2])$/.test(month);
    if (!isValidFormat) {
      return res.status(400).json({ message: "Invalid month format. Use YYYY-MM (e.g., 2025-06)" });
    }
    try {
      const expense = await Expense.findOne({ userId: req.user._id, month }).populate("categories.categoryId", "name");
  
      if (!expense) {
        return res.status(404).json({ message: "No expense found for this month." });
      }
  
      res.status(200).json({ message: "Expense fetched succesfully", expense });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };
  
  // GET All Expenses
  const getAllExpenses = async (req, res) => {
    try {
      const expenses = await Expense.find({ userId: req.user._id }).sort({ month: -1 });
      if (!expenses || expenses.length === 0) {
        return res.status(404).json({ message: "No expenses found." });
      }
      res.status(200).json({ message: "Expenses fetched successfully", expenses });
    } catch (err) {
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };

  const updateExpense = async (req, res) => {
    const { month } = req.params;
    // Validate month
    if (!month) {
      return res.status(400).json({ message: "Month is required" });
    }

    const isValidFormat = /^\d{4}-(0[1-9]|1[0-2])$/.test(month);
    if (!isValidFormat) {
      return res.status(400).json({ message: "Invalid month format. Use YYYY-MM (e.g., 2025-06)" });
    }
    try {
      const { categories } = req.body;
      const userId = req.user._id;
  
      const expense = await Expense.findOne({ userId, month });
      if (!expense) {
        return res.status(404).json({ message: "No expense found to update." });
      }
  
    // Extract and check duplicate categoryIds
    const categoryIds = categories.map(c => c.categoryId.toString());
    const seen = new Set();
    for (const id of categoryIds) {
      if (seen.has(id)) {
        return res.status(400).json({ message: "Duplicate category detected in input." });
      }
      seen.add(id);
    }

    // Check category ownership
    const validCategories = await Category.find({ _id: { $in: categoryIds }, userId });
    if (validCategories.length !== categoryIds.length) {
      return res.status(400).json({ message: "One or more categories are invalid or unauthorized." });
    }
  
      // Calculate new total expense
      const totalExpense = categories.reduce((sum, cat) => sum + cat.spent, 0);
  
      // Update the document
      expense.categories = categories;
      expense.totalExpense = totalExpense;
  
      await expense.save();
  
      res.status(200).json({ message: "Expense updated successfully", expense });
  
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  const deleteExpense = async (req, res) => {
    const { month } = req.params;
    // Validate month
    if (!month) {
      return res.status(400).json({ message: "Month is required" });
    }

    const isValidFormat = /^\d{4}-(0[1-9]|1[0-2])$/.test(month);
    if (!isValidFormat) {
      return res.status(400).json({ message: "Invalid month format. Use YYYY-MM (e.g., 2025-06)" });
    }
    try {
      const userId = req.user._id;
  
      const deleted = await Expense.findOneAndDelete({ userId, month });
  
      if (!deleted) {
        return res.status(404).json({ message: "No expense found for the specified month." });
      }
  
      res.status(200).json({ message: "Expense deleted successfully." });
  
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  };
  
  
  module.exports = {
    createMonthlyExpense,
    getExpenseByMonth,
    getAllExpenses,
    updateExpense,
    deleteExpense,
  };