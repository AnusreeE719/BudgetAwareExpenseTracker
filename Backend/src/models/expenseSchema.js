const mongoose = require("mongoose");

const categoryExpenseSchema = new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  spent: { type: Number, default: 0, min: 0 },
  description: { type: String, trim: true },
});

const ExpenseSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  month: { type: String, required: true }, // Format: "2025-06"
  totalExpense: { type: Number, required: true, min: 0 },
  categories: [categoryExpenseSchema],
}, { timestamps: true });

module.exports = mongoose.model("Expense", ExpenseSchema);
