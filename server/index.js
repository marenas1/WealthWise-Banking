const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');
const dotenv = require("dotenv");

dotenv.config();

const plaidClientId = process.env.PLAID_CLIENT_ID;
const plaidSecret = process.env.PLAID_SECRET;
const plaidEnv = process.env.PLAID_ENV;


const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox,
  baseOptions: {
    headers: {
      'PLAID-CLIENT-ID': plaidClientId,
      'PLAID-SECRET': plaidSecret,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.post("/hello", (req, res) => {
  res.json({ message: "hello " + req.body.name });
});

app.post('/create_link_token', async (req, res) => {
  const plaidRequest = {
    user: {
      client_user_id: "user",
    },
    client_name: 'Plaid Test App',
    products: ["auth","transactions"],
    language: 'en',
    redirect_uri: 'http://localhost:5173/',
    country_codes: ['US'],
  };
  try {
    const createTokenResponse = await plaidClient.linkTokenCreate(plaidRequest);
    res.json(createTokenResponse.data);
  } catch (error) {
    res.status(500).send("Failed to create link token");
  }
});

app.post("/auth", async function (request,response) {
    try{
        const access_token = request.body.access_token;
        const plaidRequest = {
            access_token: access_token,
        };
        const plaidResponse = await plaidClient.authGet(plaidRequest);
        response.json(plaidResponse.data);
         
          
    }catch(e){
        response.status(500).send("Failed to authorize")
    }
})

app.post("/get_account_balances", async function (req, res) {
    try{
        const access_token = req.body.access_token;
        const plaidRequest = {
            access_token: access_token,
        };
        const plaidResponse = await plaidClient.accountsGet(plaidRequest);
        res.json(plaidResponse.data);
    }catch(e){
        res.status(500).send("Failed to get balance")
    }
});

app.post("/get_transactions", async function (req, res) {
  try {
      const { access_token, start_date, end_date } = req.body; // Get access_token, start_date, and end_date from request body
      
      // Validate that all required parameters are provided
      if (!access_token || !start_date || !end_date) {
          return res.status(400).send("Missing required parameters");
      }

      // Plaid request to fetch transactions
      const plaidRequest = {
          access_token: access_token,
          start_date: start_date,
          end_date: end_date,
          options: {
              count: 100, // Adjust the number of transactions to fetch
              offset: 0,  // Pagination offset (use for further requests)
          }
      };

      // Make API call to Plaid to get transactions
      const plaidResponse = await plaidClient.transactionsGet(plaidRequest);

      // Return the transactions data
      res.json(plaidResponse.data);
  } catch (e) {
      console.error("Error fetching transactions:", e);
      res.status(500).send("Failed to fetch transactions",e);
  }
});






app.post('/exchange_public_token', async function (
    request,
    response,
    next,
  ) {
    const publicToken = request.body.public_token;
    try {
      const plaidResponse = await plaidClient.itemPublicTokenExchange({
        public_token: publicToken,
      });
  
      // These values should be saved to a persistent database and
      // associated with the currently signed-in user
      const accessToken = plaidResponse.data.access_token;
      const itemID = plaidResponse.data.item_id;
  
      response.json({ accessToken});
    } catch (error) {
      // handle error
      response.status(500).send("Failed to exchange public token")
    }
  });



const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
