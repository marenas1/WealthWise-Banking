import PropTypes from "prop-types";
import { Link } from "react-router-dom";

TransactionBox.propTypes = {
  title: PropTypes.string,
  transactions: PropTypes.array,
};

function TransactionBox(props) {
  // Only get the last 5 transactions
  const recentTransactions = props.transactions.slice(0, 5);

  // Calculate money in (positive transactions) and money out (negative transactions)
  const moneyIn = props.transactions
    .filter(transaction => transaction.amount > 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const moneyOut = props.transactions
    .filter(transaction => transaction.amount < 0)
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  return (
    <div
      className="rounded-lg shadow-md p-4 w-full max-w-md transition-all duration-300 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-200"
    >
      <h3 className="text-lg font-semibold mb-4">{props.title}</h3>
      {/* Add money in and money out section */}
      <div className="text-sm font-medium mb-4">
        <div className="flex justify-between">
          <span>Money In:</span>
          <span className="text-green-600 dark:text-green-400">
            {moneyIn.toFixed(2)}
          </span>
        </div>
        <div className="flex justify-between">
          <span>Money Out:</span>
          <span className="text-red-500 dark:text-red-400">
            {Math.abs(moneyOut).toFixed(2)}
          </span>
        </div>
      </div>
      <ul className="space-y-4">
        {recentTransactions.map((transaction, index) => (
          <li
            key={index}
            className={`flex justify-between items-center p-4 border-b last:border-none cursor-pointer rounded transition-all duration-300 ${
              transaction.amount < 0
                ? "bg-red-100 dark:bg-red-900 text-red-600 dark:text-red-300"
                : "bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300"
            }`}
          >
            <div className="flex flex-col">
              <span className="font-medium">{transaction.name}</span>
              <small>{transaction.date}</small>
            </div>
            <span
              className={`font-semibold ${
                transaction.amount < 0
                  ? "text-red-500 dark:text-red-400"
                  : "text-green-600 dark:text-green-400"
              }`}
            >
              {transaction.amount.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      {/* Link to the transaction details page */}
      <Link
        to="/transaction-details"
        className="font-medium hover:underline mt-4 block text-center text-blue-600 dark:text-blue-400"
      >
        See All
      </Link>
    </div>
  );
}

export default TransactionBox;
