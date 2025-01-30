import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import Navbar from "../components/Navbar";
import { FaArrowLeft, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

function TransactionDetailsPage() {
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected filter category
  const navigate = useNavigate();
  const transactions = JSON.parse(sessionStorage.getItem("transactions")) || [];

  useEffect(() => {
    window.scrollTo(0, 0); // Ensure the page always loads at the top
  }, []);

  const handleBackClick = () => {
    navigate(-1);
  };

  // Filter transactions based on search query and selected category
  const filteredTransactions = transactions.filter((transaction) => {
    const matchesQuery = transaction.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "" || transaction.category.includes(selectedCategory);
    return matchesQuery && matchesCategory;
  });

  return (
    <>
      <Navbar />
      <div className="font-sans p-6 min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <button
            onClick={handleBackClick}
            className="flex items-center text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200"
          >
            <FaArrowLeft className="mr-2" />
            <h1 className="text-2xl font-bold">Transactions</h1>
          </button>
        </header>

        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Transaction List */}
          <div className="rounded-lg shadow-md p-4 flex-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 max-h-[80vh] overflow-auto">
            <h2 className="text-lg font-semibold border-b pb-2 mb-4">Transaction History</h2>

            {/* Search Bar */}
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search transactions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full p-2 pl-10 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400 dark:text-gray-500" />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-2 mb-4">
              <button
                className={`px-3 py-1 rounded-lg text-sm ${selectedCategory === "Restaurants" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}`}
                onClick={() => setSelectedCategory("Restaurants")}
              >
                Restaurants
              </button>
              <button
                className={`px-3 py-1 rounded-lg text-sm ${selectedCategory === "Subscription" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}`}
                onClick={() => setSelectedCategory("Subscription")}
              >
                Subscriptions
              </button>
              <button
                className={`px-3 py-1 rounded-lg text-sm ${selectedCategory === "Recreation" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}`}
                onClick={() => setSelectedCategory("Recreation")}
              >
                Recreation
              </button>
              <button
                className={`px-3 py-1 rounded-lg text-sm ${selectedCategory === "" ? "bg-blue-500 text-white" : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"}`}
                onClick={() => setSelectedCategory("")}
              >
                All
              </button>
            </div>

            {/* Transactions List */}
            {filteredTransactions.length > 0 ? (
              <ul>
                {filteredTransactions.map((transaction, index) => (
                  <li
                    key={index}
                    className={`p-4 border-b last:border-none cursor-pointer rounded transition ${
                      selectedTransaction?.transaction_id === transaction.transaction_id
                        ? "bg-gray-300 dark:bg-gray-700"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`}
                    onClick={() => setSelectedTransaction(transaction)}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{transaction.name}</span>
                      <span
                        className={`font-semibold ${
                          transaction.amount < 0 ? "text-red-500" : "text-green-500"
                        }`}
                      >
                        ${transaction.amount.toFixed(2)}
                      </span>
                    </div>
                    <small className="text-sm">{transaction.date}</small>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 text-center">No transactions found.</p>
            )}
          </div>

          {/* Transaction Details */}
          {selectedTransaction && (
            <div className="rounded-lg shadow-md p-4 flex-1 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 md:max-w-sm md:sticky md:top-20 h-fit">
              <h2 className="text-lg font-semibold border-b pb-2 mb-4">Transaction Details</h2>
              <p className="mb-2">
                <strong>Name:</strong> {selectedTransaction.name}
              </p>
              <p className="mb-2">
                <strong>Category:</strong> {selectedTransaction.category.join(", ")}
              </p>
              <p className="mb-2">
                <strong>Date:</strong> {selectedTransaction.date}
              </p>
              <p>
                <strong>Amount:</strong>{" "}
                <span
                  className={`font-semibold ${
                    selectedTransaction.amount < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  ${selectedTransaction.amount.toFixed(2)}
                </span>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

TransactionDetailsPage.propTypes = {
  transactions: PropTypes.arrayOf(
    PropTypes.shape({
      transaction_id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      amount: PropTypes.number.isRequired,
      date: PropTypes.string.isRequired,
      category: PropTypes.arrayOf(PropTypes.string).isRequired,
    })
  ),
};

export default TransactionDetailsPage;
