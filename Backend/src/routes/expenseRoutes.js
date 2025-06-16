const express = require("express");
const authenticate = require("../middlewares/authMiddleware");
const { validateExpense, validateUpdateExpense } = require("../middlewares/Validators/monthlyExpenseValidations");
const { createMonthlyExpense, getAllExpenses, getExpenseByMonth, deleteExpense } = require("../controllers/expenseController");
const { updateBudgetByMonth } = require("../controllers/budgetController");

const router = express.Router();

// create monthly expense
router.post("/create-expense", authenticate, validateExpense, createMonthlyExpense);
// get all monthly expense
router.get("/get-all-expense", authenticate, getAllExpenses);
//get expense by month
router.get("/get-expense/:month", authenticate, getExpenseByMonth);
//update expense bby month
router.put("/update-expense/:month", authenticate, validateUpdateExpense, updateBudgetByMonth);
//delete expense by month
router.delete("/delete-expense/:month", authenticate, deleteExpense);

module.exports = router;

