import { useState } from "react";
import Navbar from "../components/Navbar";
import { recentTransactions } from "../mock_data";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useDarkMode } from "../context/DarkModeContext"; // Import dark mode context

const myTransactions = recentTransactions;

function TransactionDetailsPage() {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const { darkMode } = useDarkMode(); // Use dark mode state
  const navigate = useNavigate(); // Initialize the navigate function

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page in the history
  };

  return (
    <>
      <Navbar />
      <div
        className={`font-sans p-6 min-h-screen transition-colors duration-300 ${
          darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
        }`}
      >
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <button
            onClick={handleBackClick}
            className={`flex items-center ${
              darkMode ? "text-gray-400 hover:text-gray-200" : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <FaArrowLeft className="mr-2" />
            <h1 className="text-2xl font-bold">Transactions</h1>
          </button>
        </header>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Transaction List */}
          <div
            className={`rounded-lg shadow-md p-4 flex-1 transition-colors ${
              darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
            }`}
          >
            <h2 className="text-lg font-semibold border-b pb-2 mb-4">Transaction History</h2>
            <ul>
              {myTransactions.map((transaction, index) => (
                <li
                  key={index}
                  className={`p-4 border-b last:border-none cursor-pointer rounded transition ${
                    selectedTransaction?.id === transaction.id
                      ? darkMode
                        ? "bg-gray-700"
                        : "bg-gray-300"
                      : darkMode
                      ? "hover:bg-gray-700"
                      : "hover:bg-gray-100"
                  }`}
                  onClick={() => setSelectedTransaction(transaction)}
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">{transaction.description}</span>
                    <span
                      className={`font-semibold ${
                        transaction.amount < 0 ? "text-red-500" : "text-financial-success"
                      }`}
                    >
                      {transaction.amount.toFixed(2)}
                    </span>
                  </div>
                  <small className="text-sm">
                    {transaction.date}
                  </small>
                </li>
              ))}
            </ul>
          </div>

          {/* Transaction Details */}
          {selectedTransaction && (
            <div
              className={`rounded-lg shadow-md p-4 flex-1 transition-colors ${
                darkMode ? "bg-gray-800 text-gray-200" : "bg-white text-gray-800"
              }`}
            >
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">Transaction Details</h2>
              <p className="mb-2">
                <strong>Description:</strong> {selectedTransaction.description}
              </p>
              <p className="mb-2">
                <strong>Category:</strong> {selectedTransaction.category}
              </p>
              <p className="mb-2">
                <strong>Date:</strong> {selectedTransaction.date}
              </p>
              <p>
                <strong>Amount:</strong>{" "}
                <span
                  className={`font-semibold ${
                    selectedTransaction.amount < 0 ? "text-red-500" : "text-financial-success"
                  }`}
                >
                  {selectedTransaction.amount.toFixed(2)}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default TransactionDetailsPage;
