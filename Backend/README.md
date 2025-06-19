# 📦 Budget-Aware Expense Tracker – Backend

This is the **backend API** for the Budget-Aware Expense Tracker web application. Built with **Node.js**, **Express**, and **MongoDB**, it supports secure authentication and full CRUD functionality for users, categories, budgets, and expenses.

---

## 🚀 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB** + Mongoose
- **JWT Authentication**
- **bcrypt.js**
- **dotenv**
- **express-validator**
- **CORS**

---

## 📌 API Features

- ✅ User Signup/Login (JWT-based)
- ✅ Protected routes with middleware
- ✅ Category CRUD
- ✅ Budget creation per month
- ✅ Expense tracking by month
- ✅ Monthly analytics report
- ✅ Password update


---

## 🛠️ Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/AnusreeE719/BudgetAwareExpenseTracker.git
cd BudgetAwareExpenseTracker/backend

Install Dependencies
npm install

Create Environment Variables
Create a .env file in the backend directory with the following content:

# PORT=3000
# MONGO_URI=your_mongodb_connection_string
# JWT_SECRET=your_jwt_secret_key
# JWT_EXPIRES_IN=1d

Start the Server
npm start
#This will start the server at http://localhost:3000

