import AccountBox from "../components/accountBox";
import Navbar from "../components/Navbar";

function HomePage() {
  const token = sessionStorage.getItem("accessToken");
  const response = JSON.parse(sessionStorage.getItem("accounts"));

  console.log(JSON.stringify(response, null, 2)); // Log the full response for debugging

  // Extract accounts safely
  const accounts = response?.data?.accounts || [];

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
      </div>
    </>
  );
}

export default HomePage;
