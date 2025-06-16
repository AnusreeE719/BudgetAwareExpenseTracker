const express = require("express");
const authenticate = require("../middlewares/authMiddleware");
const { getMonthlyAnalytics } = require("../controllers/monthlyAnalyticsController");
const router = express.Router();

//Fetch loggedin user data
router.get("/get-monthly-analytics", authenticate, getMonthlyAnalytics);

module.exports = router;