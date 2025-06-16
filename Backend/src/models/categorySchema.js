const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Links to the user who owns this category
    required: true,
  },
}, { timestamps: true });

module.exports = mongoose.model("Category", categorySchema);
