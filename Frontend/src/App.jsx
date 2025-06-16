
import AuthLayout from './Layout/AuthLayout'
import Baselayout from './Layout/BaseLayout'
import { Routes, Route } from 'react-router-dom';
import SingnInPage from './Pages/AuthPages/SingnInPage';
import ProtectedRoute from './Routes/ProtectRoutes';

import SignUp from './Pages/AuthPages/SignUp';
import MonthlyAnalytics from './Pages/MonthlyAnalytics/MonthlyAnalytics';
import AddBudget from './Pages/Budget/AddBudget';
import ViewBudget from './Pages/Budget/ViewBudget';
import ViewBudgets from './Pages/Budget/ViewBudgets';
import EditBudget from './Pages/Budget/EditBudget';
import AddCategory from './Pages/Category/AddCategory';
import ViewCategories from './Pages/Category/ViewCategories';
import ViewCategory from './Pages/Category/ViewCategory';
import EditCategory from './Pages/Category/EditCategory';
import EditExpense from './Pages/Expense/EditExpense';
import ViewExpense from './Pages/Expense/ViewExpense';
import ViewExpenses from './Pages/Expense/ViewExpenses';
import AddExpense from './Pages/Expense/AddExpense';
import UpdatePassword from './Pages/Settings/UpdatePassword';




function App() {


  return (

    <Routes>
      {/* Auth routes - no sidebar/header */}
      <Route element={<AuthLayout />}>
        <Route path="/signin" element={<SingnInPage />} />
        <Route path="/signup" element={<SignUp />} />
        {/* Add other auth routes here (register, forgot password, etc.) */}
      </Route>

      {/* Protected routes - with sidebar/header */}
      <Route element={<ProtectedRoute />}>
        <Route element={<Baselayout/>}>
          <Route path="/" element={<MonthlyAnalytics />} />

          {/* buget */}
          <Route path='/create-budget' element={ <AddBudget /> } />
          <Route path='/view-budget' element={ <ViewBudgets /> } />
          <Route path='/edit-budget/:month' element={ <EditBudget /> } />
          <Route path='/view-budget/:month' element={ <ViewBudget /> } />

          {/* category */}
          <Route path='/create-category' element={ <AddCategory /> } />
          <Route path='/view-category' element={ <ViewCategories /> } />
          <Route path='/edit-category/:categoryId' element={ <EditCategory /> } />
          <Route path='/view-category/:categoryId' element={ <ViewCategory /> } />

          {/* expense */}
          <Route path='/create-expense' element={ <AddExpense /> } />
          <Route path='/view-expense' element={ <ViewExpenses /> } />
          <Route path='/edit-expense/:month' element={ <EditExpense /> } />
          <Route path='/view-expense/:month' element={ <ViewExpense /> } />

          <Route path='/update-password' element={ <UpdatePassword /> } />

          {/* Add other protected routes here */}

        </Route>
      </Route>
     

    </Routes>
  )
}

export default App
