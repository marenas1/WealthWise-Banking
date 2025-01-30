import { useEffect, useState } from "react";
import AccountBox from "../components/AccountBox";
import Navbar from "../components/Navbar";
import TransactionBox from "../components/TransactionBox";
import IncomeExpenseChart from "../components/IncomeExpenseChart";

function HomePage() {
  const [showWelcomeMessage, setShowWelcomeMessage] = useState(false); // Initially set to false
  const accountResponse = JSON.parse(sessionStorage.getItem("accounts"));
  const transactionResponse = JSON.parse(sessionStorage.getItem("transactions"));

  const accounts = accountResponse?.data?.accounts || [];
  const transactions = transactionResponse || [];
  const total = transactions.reduce((sum, transaction) => sum + transaction.amount, 0).toFixed(2);

  const calculateIncomeAndExpensesForMonth = (month, year) => {
    const filteredTransactions = transactions.filter((transaction) => {
      const transactionDate = new Date(transaction.date);
      return (
        transactionDate.getMonth() === month &&
        transactionDate.getFullYear() === year
      );
    });

    const income = filteredTransactions
      .filter((transaction) => transaction.amount > 0)
      .reduce((sum, transaction) => sum + transaction.amount, 0)
      .toFixed(2);

    const expenses = filteredTransactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((sum, transaction) => sum + transaction.amount, 0)
      .toFixed(2);

    return { income, expenses };
  };

  const january = calculateIncomeAndExpensesForMonth(0, 2025);
  const december = calculateIncomeAndExpensesForMonth(11, 2024);

  const labels = ["December", "January"];
  const incomeData = [parseFloat(december.income), parseFloat(january.income)];
  const expenseData = [Math.abs(parseFloat(december.expenses)), Math.abs(parseFloat(january.expenses))];

  useEffect(() => {
    // Check if the welcome message has been shown before in sessionStorage
    const welcomeMessageShown = sessionStorage.getItem("welcomeMessageShown");

    if (!welcomeMessageShown) {
      setShowWelcomeMessage(true);
      sessionStorage.setItem("welcomeMessageShown", "true"); // Mark as shown in sessionStorage
    }

    // Automatically hide the welcome message after 3 seconds
    const timer = setTimeout(() => {
      setShowWelcomeMessage(false);
    }, 3000);

    return () => clearTimeout(timer); // Cleanup the timeout when the component unmounts
  }, []);

  return (
    <>
      <Navbar />

      {showWelcomeMessage && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50 animate-fade-in-out">
          <h1 className="text-4xl text-white font-semibold">Welcome Matt</h1>
        </div>
      )}

      <div className="font-sans min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">
        <div className="container mx-auto space-y-6">
          {/* Financial Dashboard Header */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-200">Financial Dashboard</h1>
          </div>

          <div className="grid grid-cols-10 gap-6">
            {/* Left Side (70%) - Income/Expense Summary & Charts */}
            <div className="col-span-7 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                Income & Expenses Overview
              </h2>

              {/* Income & Expenses Summary (Now inside the chart box) */}
              <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">Income & Expenses Summary</h3>
                <ul>
                  {labels.map((month, index) => (
                    <li key={index} className="mb-2">
                      <strong>{month}:</strong> Income: ${incomeData[index]}, Expenses: ${expenseData[index]}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Income vs. Expense Chart */}
              <IncomeExpenseChart labels={labels} incomeData={incomeData} expenseData={expenseData} />
            </div>

            {/* Right Side (30%) - Balance & Transactions */}
            <div className="col-span-3 flex flex-col space-y-6">
              {/* Account Balance Box */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Account Balance</h2>
                {accounts.map((account) => (
                  <AccountBox key={account.account_id} name={account.name} balance={account.balances.current} />
                ))}
              </div>

              {/* Recent Transactions */}
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Recent Transactions</h2>
                <TransactionBox title={`Recent Transactions (60 Days) +$${total}`} transactions={transactions} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
