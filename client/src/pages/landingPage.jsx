import { usePlaidLink } from 'react-plaid-link';
import axios from "axios";
import { useEffect, useState } from "react";
import { FaChartLine, FaPiggyBank, FaRegMoneyBillAlt } from "react-icons/fa";
import logo from "../assets/logoWealthwise.png";
axios.defaults.baseURL = "http://localhost:8000";



function LandingPage() {
 const [linkToken, setLinkToken] = useState();

 useEffect(()=>{
    async function fetchLinkToken(){
      const response = await axios.post("/create_link_token")
      setLinkToken(response.data.link_token)
      //console.log(response.data)
    }
    fetchLinkToken()
 },[]);
//Plaid Link Hook
 const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: async (public_token, metadata) => {
        try {
            // Exchange public token for access token
            const accessTokenResponse = await axios.post("/exchange_public_token", { public_token });
            const accessToken = accessTokenResponse.data.accessToken;
    
            // Store access token in localStorage
            sessionStorage.setItem("accessToken", accessToken);

            // Retreive Plaid Account Data and Save To Session
            const accounts = await axios.post("/get_account_balances",{access_token: accessToken})
            sessionStorage.setItem("accounts",JSON.stringify(accounts))//this serializes data cuz its stored as string
            console.log("bal data",JSON.stringify(accounts,null,2))
            
            // Log the access token (optional)
            console.log("accessToken", accessToken);

            // Retrieve Transactions for the past 30 days and Save to Session
            const today = new Date();
            const startDate = new Date(today);
            startDate.setDate(today.getDate() - 60); // Subtract 30 days
            const formattedStartDate = startDate.toISOString().split("T")[0]; // Format: YYYY-MM-DD
            const endDate = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD


            const transactionsResponse = await axios.post("/get_transactions", {
              access_token: accessToken,
              start_date: formattedStartDate,
              end_date: endDate,
            });

            const transactions = transactionsResponse.data.transactions;
            sessionStorage.setItem("transactions", JSON.stringify(transactions)); // Store transactions data
            console.log("Transactions data:", JSON.stringify(transactions, null, 2));

            // Retrieve Income and save to session
            // Make the API call to get income data
            
          

        
            // Redirect to the homepage using useNavigate
            window.location.href="/home";
          } catch (error) {
            console.error("Error exchanging public token for access token:", error);
          }
    console.log("success",public_token,metadata)
    },
 });

 




  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <header className="bg-financial-primary text-white py-4 shadow-md">
        <div className="container mx-auto px-6 flex justify-between items-center">
            {/* Logo and Title */}
            <div className="flex items-center"> 
            <img
                src={logo}
                alt="Finance Tracker Logo"
                className="w-10 h-10 mr-3 rounded-md'"
            />
            <h1 className="text-2xl font-bold">WealthWise</h1>
            </div>

            
        </div>
      </header>


      {/* Hero Section */}
      <section className="bg-financial-light py-12 text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
            Take Control of Your Finances
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Manage your expenses, track your income, and achieve financial goals with ease.
          </p>
          
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {/* Stat 1 */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <FaChartLine className="text-financial-primary text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Track Expenses</h3>
            <p className="text-gray-600 mt-2">
              Stay on top of your spending with detailed transaction tracking.
            </p>
          </div>
          {/* Stat 2 */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <FaPiggyBank className="text-financial-primary text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Grow Savings</h3>
            <p className="text-gray-600 mt-2">
              Plan and save for your financial goals with our easy-to-use tools.
            </p>
          </div>
          {/* Stat 3 */}
          <div className="p-6 bg-gray-100 rounded-lg shadow-md">
            <FaRegMoneyBillAlt className="text-financial-primary text-4xl mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-700">Maximize Income</h3>
            <p className="text-gray-600 mt-2">
              Visualize and optimize your income streams for better cash flow.
            </p>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="bg-financial-primary text-white py-12 text-center">
        <div className="container mx-auto px-6">
          <h3 className="text-3xl font-bold mb-4">Ready to Take Charge?</h3>
          <p className="text-lg text-gray-200 mb-6">
            Sign up today and start your journey to financial freedom.
          </p>
          <button onClick={() => open()} disabled={!ready}>
            Connect a bank account
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4 text-center">
        <p className="text-sm">
          © 2024 Finance Tracker. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default LandingPage;
