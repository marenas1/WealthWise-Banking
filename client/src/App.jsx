
//import './App.css'

import { usePlaidLink } from 'react-plaid-link';
import axios from "axios"
import { useEffect, useState } from "react"
import PropTypes from "prop-types"
axios.defaults.baseURL = "http://localhost:8000"

function PlaidAuth({publicToken}){
  const [account, setAccount] = useState();
  const [balance, setBalance] = useState(0);

  useEffect(()=>{
    async function fetchData(){
      let accessToken = await axios.post("/exchange_public_token", {public_token: publicToken});
      console.log("access" + accessToken.data)
      const auth = await axios.post("/auth", {access_token: accessToken.data.accessToken});
      console.log("auth data", auth.data)
      const balance = await axios.post("/get_account_balances",{access_token: accessToken.data.accessToken})
      setAccount(auth.data.numbers.ach[0])
      console.log("bal data",JSON.stringify(balance,null,2))
      setBalance(balance.data.accounts[0].balances.current)
    }
    fetchData()
  }, []);
  return account && (
    <>
  <p>Account number: {account.account}</p>
  <p>Routing number: {account.routing}</p>
  <p>Balance : {balance}</p>
  </>
  );
}

PlaidAuth.propTypes = {
  publicToken: PropTypes.string,  // Ensures publicToken is a string and is required
};


function App() {
  const [linkToken, setLinkToken] = useState();
  const [publicToken, setPublicToken] = useState();

  useEffect(()=>{
    async function fetch(){
      const response = await axios.post("/create_link_token")
      //console.log("response",response.data)
      setLinkToken(response.data.link_token)
      console.log(response.data)
    }
    fetch()
  },[]);

  const { open, ready } = usePlaidLink({
    token: linkToken,
    onSuccess: (public_token, metadata) => {
    // send public_token to server
    setPublicToken(public_token);
    console.log("success",public_token,metadata)
    },
  });

  return publicToken ? (<PlaidAuth publicToken={publicToken}/>) : (
    <button onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </button>
  );
}

export default App
