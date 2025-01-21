import AccountBox from "../components/AccountBox";
import Navbar from "../components/Navbar";

function HomePage() {
  const token = sessionStorage.getItem("accessToken");
  const accountResponse = JSON.parse(sessionStorage.getItem("accounts"));
  const transactionResponse = JSON.parse(sessionStorage.getItem("transactions"));

  console.log("Account data:", JSON.stringify(accountResponse, null, 2)); // Log the account data for debugging
  console.log("Transaction data:", JSON.stringify(transactionResponse, null, 2)); // Log the transaction data for debugging

  // Extract accounts safely
  const accounts = accountResponse?.data?.accounts || [];
  // Extract transactions safely
  const transactions = transactionResponse || [];

  return (
    <>
      <Navbar />
      <p className="text-gray-800 dark:text-gray-200">{token}</p>
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Account Balances</h1>

        {/* Flex container to stack AccountBoxes vertically */}
        <div className="flex flex-col space-y-4">
          {accounts.map((account) => (
            <AccountBox
              key={account.account_id}
              name={account.name}
              balance={account.balances.current}
            />
          ))}
        </div>

        {/* Display transactions */}
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4">Recent Transactions</h2>
        <div className="space-y-4">
          {transactions.length > 0 ? (
            transactions.map((transaction) => (
              <div key={transaction.transaction_id} className="p-4 border rounded-lg shadow-sm bg-white dark:bg-gray-800">
                <p className="font-semibold text-gray-800 dark:text-gray-200">{transaction.name}</p>
                <p className="text-gray-600 dark:text-gray-400">{transaction.date}</p>
                <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                  {transaction.amount < 0 ? `- $${Math.abs(transaction.amount).toFixed(2)}` : `+ $${transaction.amount.toFixed(2)}`}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-600 dark:text-gray-400">No transactions found for the past month.</p>
          )}
        </div>
      </div>
    </>
  );
}

export default HomePage;
