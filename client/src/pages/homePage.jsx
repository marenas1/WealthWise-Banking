import AccountBox from "../components/AccountBox";
import Navbar from "../components/Navbar";
import TransactionBox from "../components/TransactionBox";

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
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200 mb-4">Account Balance</h1>

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
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mt-8 mb-4">Recent Income</h2>
        <div className="flex flex-col md:flex-row md:space-x-4">
        

          {/* Add TransactionBox on the right */}
          <TransactionBox
            title="Recent Transactions"
            transactions={transactions}
            className="flex-none md:w-1/3"
          />
        </div>
      </div>
    </>
  );
}

export default HomePage;
