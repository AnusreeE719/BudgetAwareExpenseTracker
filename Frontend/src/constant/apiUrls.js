export const apiUrls = {

    baseAddr: "http://localhost:3000/api", 
    //baseAddr: "http://192.168.1.10:3000/api", 


    loginurl:'auth/login',
    signUpUrl:'auth/signup',
    getLoggedInUserUrl:'auth/fetch-user',
    updatePasswordUrl: 'auth/update-password',

    //category
    createCategoryUrl: 'category/add-category',
    viewCategoryUrl:'category/get-all-categories',
    viewCategoryByIdUrl:'category/get-category',
    editCategoryUrl:'category/update-category',
    deleteCategoryUrl: 'category/delete-category',

    //budget
    createBudgetUrl: 'budget/create-monthly-budget',
    viewBudgetUrl:'budget/get-all-budgets',
    viewBudgetByMonthUrl:'budget/get-budget',
    editBudgetUrl:'budget/update-budget',
    deleteBudgetUrl: 'budget/delete-budget',

    //expense
    createExpensetUrl: 'expense/create-expense',
    viewExpenseUrl:'expense/get-all-expense',
    viewExpenseByMonthUrl:'expense/get-expense',
    editExpenseUrl:'expense/update-expense',
    deleteExpenseUrl: 'expense/delete-expense',

    //analytics
    viewMonthlyAnalyticsUrl:'analytics/get-monthly-analytics',
    

}
