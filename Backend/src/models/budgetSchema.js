const mongoose = require("mongoose");

const categoryBudgetSchema = new mongoose.Schema({
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  limit: { type: Number, required: true, default: 0, min: 0 },
});

const budgetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  month: { type: String, required: true }, // Format: "2025-06"
  totalBudget: { type: Number, required: true, min: 0 },
  expectingBudget: { type: Number, required: true, min: 0 }, // Sum of category limits
  remainingBudget: { type: Number, required: true, min: 0 }, // totalBudget - expectingBudget
  categories: [categoryBudgetSchema],
}, { timestamps: true });

module.exports = mongoose.model("Budget", budgetSchema);
