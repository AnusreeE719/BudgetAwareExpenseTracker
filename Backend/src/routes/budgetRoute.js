const express = require("express");
const authenticate = require("../middlewares/authMiddleware");
const { validateBudget, validateUpdateBudget } = require("../middlewares/Validators/monthlyBudgetValidations");
const { createMonthlyBudget, getAllBudgets, getBudgetByMonth, updateBudgetByMonth, deleteBudgetByMonth } = require("../controllers/budgetController");


const router = express.Router();

// create monthly budget
router.post("/create-monthly-budget", authenticate, validateBudget, createMonthlyBudget );
// get all budget
router.get("/get-all-budgets", authenticate, getAllBudgets);
//get budget by month
router.get("/get-budget/:month", authenticate, getBudgetByMonth);
//update budget by month
router.put("/update-budget/:month", authenticate, validateUpdateBudget, updateBudgetByMonth);
//delete budget by month
router.delete("/delete-budget/:month", authenticate, deleteBudgetByMonth);

module.exports = router;