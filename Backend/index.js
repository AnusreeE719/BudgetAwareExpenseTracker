const express = require("express");
const mongoose = require("mongoose");
const dotenv = require('dotenv')
const cors = require("cors");

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require("./src/routes/authRoutes");
const categoryRoutes = require("./src/routes/categoryRoute");
const budgetRoutes = require("./src/routes/budgetRoute");
const expenseRoutes = require("./src/routes/expenseRoutes");
const monthlyAnalyticsRoutes = require("./src/routes/monthlyAnalticsRoute");

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("MongoDB Connection Error:", err));

  // Routes
app.use("/api/auth", authRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/budget", budgetRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/analytics", monthlyAnalyticsRoutes)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
