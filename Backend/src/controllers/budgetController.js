const Budget = require("../models/budgetSchema");
const Category = require("../models/categorySchema");

const createMonthlyBudget = async (req, res) => {
  try {
    const { month, totalBudget, categories } = req.body;
    const userId = req.user._id;
    // Validation: check for duplicate month
    const exists = await Budget.findOne({ userId, month });
    if (exists) {
      return res.status(400).json({ message: "Budget already exists for this month." });
    }

    // Validation: Check category ownership
    const categoryIds = categories.map(c => c.categoryId);
    const validCategories = await Category.find({ _id: { $in: categoryIds }, userId });

     // Check for duplicate categories in input
     const seen = new Set();
     for (const cat of categoryIds) {
       if (seen.has(cat)) {
         return res.status(400).json({ message: "Duplicate category detected in input." });
       }
       seen.add(cat);
     }

    if (validCategories.length !== categoryIds.length) {
      return res.status(400).json({ message: "One or more categories are invalid or unauthorized." });
    }

    // Calculate expected budget
    const expectingBudget = categories.reduce((sum, cat) => sum + cat.limit, 0);

    if (expectingBudget > totalBudget) {
      return res.status(400).json({
        message: `Expected category limits exceed total budget. Allowed max: ₹${totalBudget}`,
      });
    }

    const remainingBudget = totalBudget - expectingBudget;

    // Create and save budget
    const newBudget = new Budget({
      userId,
      month,
      totalBudget,
      expectingBudget,
      remainingBudget,
      categories,
    });

    await newBudget.save();

    res.status(201).json({
      message: "Monthly budget created successfully.",
      budget: newBudget,
    });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET all budgets
const getAllBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ userId: req.user._id }).sort({ month: -1 });
    if (!budgets || budgets.length === 0) {
        return res.status(404).json({ message: "Budgets not found." });
      }
    res.status(200).json({ budgets });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// GET single budget by month
const getBudgetByMonth = async (req, res) => {
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
    
    const budget = await Budget.findOne({ userId: req.user._id, month });

    if (!budget) {
      return res.status(404).json({ message: "Budget not found for this month." });
    }

    res.status(200).json({ budget });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// UPDATE budget by month (only category limits)
const updateBudgetByMonth = async (req, res) => {
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
    const { totalBudget, categories } = req.body;

   // Check if budget exists
   const budget = await Budget.findOne({ userId, month });
   if (!budget) {
     return res.status(404).json({ message: "No budget found to update." });
   }

   // Extract and validate category IDs
   const categoryIds = categories.map(c => c.categoryId);

   // Check for duplicate category IDs
   const seen = new Set();
   for (const id of categoryIds) {
     if (seen.has(id.toString())) {
       return res.status(400).json({ message: "Duplicate category detected in input." });
     }
     seen.add(id.toString());
   }

   //  Validate ownership of categories
   const validCategories = await Category.find({ _id: { $in: categoryIds }, userId });
   if (validCategories.length !== categoryIds.length) {
     return res.status(400).json({ message: "One or more categories are invalid or unauthorized." });
   }

   // Calculate expecting budget
   const expectingBudget = categories.reduce((sum, cat) => sum + cat.limit, 0);

   if (expectingBudget > totalBudget) {
     return res.status(400).json({ message: "Expected category budget exceeds total budget." });
   }

   // Update and save
   budget.totalBudget = totalBudget;
   budget.expectingBudget = expectingBudget;
   budget.remainingBudget = totalBudget - expectingBudget;
   budget.categories = categories;

   await budget.save();

   res.status(200).json({ message: "Budget updated successfully", budget });

 } catch (err) {
   res.status(500).json({ message: "Server error", error: err.message });
 }
};

// DELETE budget by month
const deleteBudgetByMonth = async (req, res) => {
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
 
    const result = await Budget.findOneAndDelete({ userId: req.user._id, month });

    if (!result) {
      return res.status(404).json({ message: "Budget not found" });
    }

    res.status(200).json({ message: "Budget deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


module.exports = {
    createMonthlyBudget,
    getAllBudgets,
    getBudgetByMonth,
    updateBudgetByMonth,
    deleteBudgetByMonth,
};