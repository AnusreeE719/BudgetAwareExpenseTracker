const Category = require('../models/categorySchema');
const Budget = require('../models/budgetSchema');
const Expense = require('../models/expenseSchema');


const getMonthlyAnalytics = async (req, res) => {
    const userId = req.user._id;
    const { month } = req.query;
    if (!month) {
      return res.status(400).json({ message: "Month query parameter is required (e.g., 2025-06)" });
    }
  
    // Check format: 'YYYY-MM'
    const isValidMonth = /^\d{4}-(0[1-9]|1[0-2])$/.test(month);
    if (!isValidMonth) {
      return res.status(400).json({ message: "Invalid month format. Expected 'YYYY-MM' (e.g., 2025-06)" });
    }
  
    try {
      //  Fetch all categories created by the user
      const categories = await Category.find({ userId });
  
      //  Fetch the budget document for the selected month
      const budgetDoc = await Budget.findOne({ userId, month });

      // If no budget is found, return 404 (analytics cannot be generated)
      if (!budgetDoc) return res.status(404).json({ message: "No budget found" });
  
      //  Fetch the expense document for the selected month (if exists)
      const expenseDoc = await Expense.findOne({ userId, month });
      
      // If no expense is found, return 404 (analytics cannot be generated)
      if (!expenseDoc) return res.status(404).json({ message: "No expense found" });
  
    //  Build category ID → budget limit map
    const budgetMap = {};
    budgetDoc.categories.forEach(({ categoryId, limit }) => {
      budgetMap[categoryId.toString()] = limit;
    });

    //  Build category ID → amount spent map
    const expenseMap = {};
    if (expenseDoc) {
      expenseDoc.categories.forEach(({ categoryId, spent }) => {
        expenseMap[categoryId.toString()] = spent;
      });
    }

    //  Generate category-wise analytics
    const categorySummary = categories.map(cat => {
      const id = cat._id.toString();
      const budget = budgetMap[id] || 0;
      const spent = expenseMap[id] || 0;
      const status = spent > budget ? "over" : "within";
      const difference = Math.abs(budget - spent);
    
      return {
        categoryId: cat._id,
        categoryName: cat.name,
        budget,
        spent,
        remaining: budget - spent,
        status,
        difference // remaining or overspent amount based on status
    };
});

      //  Overall budget summary
    const totalBudget = budgetDoc.totalBudget;
    const expectingBudget = budgetDoc.expectingBudget;
    const remainingBudget = budgetDoc.remainingBudget;
    const totalExpense = expenseDoc?.totalExpense || 0;

    const overallStatus = totalExpense > totalBudget ? "over" : "within";
    const difference = totalBudget - totalExpense;


    const overallSummary = {
      totalBudget,
      expectingBudget,
      remainingBudget,
      totalExpense,
      status: overallStatus,
      difference: Math.abs(difference)
    };
  
      //  Send the analytics summary as the response
      res.status(200).json({
        message: "Calculated monthly analytics",
        month,
        overall: overallSummary,
        categories: categorySummary
      });
      
    } catch (err) {
      
      console.error(err);
      res.status(500).json({ message: "Server Error in Analytics" });
    }
  };
  

  module.exports = {
    getMonthlyAnalytics
  };