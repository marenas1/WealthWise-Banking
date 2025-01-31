const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyParser = require("body-parser");
const { Configuration, PlaidApi, PlaidEnvironments } = require("plaid");
const dotenv = require("dotenv");

dotenv.config();

// Plaid Client Configuration
const plaidClientId = process.env.PLAID_CLIENT_ID;
const plaidSecret = process.env.PLAID_SECRET;

const configuration = new Configuration({
  basePath: PlaidEnvironments.sandbox, // Use sandbox environment
  baseOptions: {
    headers: {
      "PLAID-CLIENT-ID": plaidClientId,
      "PLAID-SECRET": plaidSecret,
    },
  },
});

const plaidClient = new PlaidApi(configuration);

const app = express();
app.use(cors());
app.use(bodyParser.json());
// Serve static files from the React build folder
app.use(express.static(path.join(__dirname, "client/build")));


// Catch-all handler for React routing
app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
});

// ---- Create Public Token with Pre-Populated Account ----
app.post('/sandbox/create_prepopulated_public_token', async (req, res) => {
  const { institution_id, initial_products } = req.body;

  // Validate the request body
  if (!institution_id || !initial_products) {
    return res.status(400).send("Missing required fields: institution_id, initial_products");
  }

  try {
    // Create public token with Plaid sandbox
    const publicTokenResponse = await plaidClient.sandboxPublicTokenCreate({
      institution_id, // Required: The ID of the institution the Item will be associated with
      initial_products, // Required: The products to initially pull for the Item (e.g., transactions)
      
    });
    
    const publicToken = publicTokenResponse.data.public_token;
    console.log("public" + publicToken)

    // Exchange the public token for an access token
    const exchangeRequest = {
      public_token: publicToken,
    };
    const exchangeTokenResponse = await plaidClient.itemPublicTokenExchange(exchangeRequest);
    const accessToken = exchangeTokenResponse.data.access_token;

    // Log the access token and send it back in the response
    console.log("Access token:", accessToken);
    res.json({ access_token: accessToken }); // Send access token to client

  } catch (error) {
    console.error("Error creating public token:", error);
    res.status(500).send("Failed to create public token");
  }
});

app.post('/webhook', (req, res) => {
  const webhookData = req.body;

  // Log the webhook data for testing
  console.log('Received Webhook:', webhookData);

  // You can handle the data as needed, e.g., update the user's account status
  // Example: check for product readiness
  if (webhookData.item_ready) {
    // The product is now ready for use
    // You can trigger further actions here, like fetching transactions
    console.log('Product is ready for use!');
  }

  res.status(200).send('Webhook received');
});






// ---- Trigger Transactions Refresh (Optional for Testing) ----
app.post("/sandbox/refresh_transactions", async (req, res) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).send("Missing required access_token");
    }

    await plaidClient.transactionsRefresh({ access_token });

    res.json({ message: "Transactions refreshed successfully" });
  } catch (error) {
    console.error("Error refreshing transactions:", error.response?.data);
    res.status(500).send("Failed to refresh transactions");
  }
});


// ---- Link Token Creation ----
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
    //Returns Public Token
    res.json(createTokenResponse.data);
  } catch (error) {
    res.status(500).send("Failed to create link token");
  }
});

// ---- Exchange Public Token ----
app.post("/exchange_public_token", async (req, res) => {
  try {
    const { public_token } = req.body;

    if (!public_token) {
      return res.status(400).send("Missing public_token");
    }

    const exchangeResponse = await plaidClient.itemPublicTokenExchange({
      public_token,
    });

    const accessToken = exchangeResponse.data.access_token;
    const itemID = exchangeResponse.data.item_id;

    res.json({ accessToken, itemID });
  } catch (error) {
    console.error("Error exchanging public token:", error.response?.data);
    res.status(500).send("Failed to exchange public token");
  }
});

// ---- Auth Endpoint ----
app.post("/auth", async (req, res) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).send("Missing required access_token");
    }

    const plaidResponse = await plaidClient.authGet({ access_token });
    res.json(plaidResponse.data);
  } catch (error) {
    console.error("Error fetching auth data:", error.response?.data);
    res.status(500).send("Failed to fetch auth data");
  }
});

// ---- Identity Call ----
app.post("/get_identity", async (req, res) => {
  try {
    // Fetch identity information from Plaid
    const plaidResponse = await plaidClient.identityGet(req);

    // Extract account holder details (name, phone, and email)
    const accountHolders = plaidResponse.data.accounts.flatMap(account => account.owners);

    // Map to extract desired fields (name, phone, and email)
    const identities = accountHolders.map(owner => ({
      name: owner.full_name,
      phone: owner.phone_number,
      email: owner.email,
    }));

    // Send the identities back in the response
    res.status(200).json(identities);

  } catch (error) {
    // Handle error
    console.error("Error fetching identity:", error.response?.data || error);
    res.status(500).send("Failed to get account identity");
  }
});


// ---- Account Balances ----
app.post("/get_account_balances", async (req, res) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).send("Missing required access_token");
    }

    const plaidResponse = await plaidClient.accountsGet({ access_token });
    res.json(plaidResponse.data);
  } catch (error) {
    console.error("Error fetching account balances:", error.response?.data);
    res.status(500).send("Failed to get account balances");
  }
});

// ---- Regular Transactions ----
app.post("/get_transactions", async (req, res) => {
  try {
    const { access_token, start_date, end_date } = req.body;

    if (!access_token) {
      return res.status(400).send("Missing required access_token");
    }

    if (!start_date || !end_date) {
      return res.status(400).send("Missing start_date or end_date");
    }

    const plaidRequest = {
      access_token,
      start_date,
      end_date,
      options: {
        count: 100,
        offset: 0,
      },
    };

    const plaidResponse = await plaidClient.transactionsGet(plaidRequest);
    res.json(plaidResponse.data);
  } catch (error) {
    console.error("Error fetching transactions:", error.response?.data);
    res.status(500).send("Failed to fetch transactions");
  }
});

// ---- Recurring Transactions ----
app.post("/get_transactions_recurring", async (req, res) => {
  try {
    const { access_token } = req.body;

    if (!access_token) {
      return res.status(400).send("Missing required access_token");
    }

    const plaidResponse = await plaidClient.transactionsRecurringGet({
      access_token,
    });

    const inflowStreams = plaidResponse.data.inflow_streams;
    const outflowStreams = plaidResponse.data.outflow_streams;

    res.json({ inflowStreams, outflowStreams });
  } catch (error) {
    console.error("Error fetching recurring transactions:", error.response?.data);
    res.status(500).send("Failed to fetch recurring transactions");
  }
});

// ---- Test Hello Endpoint ----
app.post("/hello", (req, res) => {
  res.json({ message: `Hello ${req.body.name}` });
});

// ---- Start Server ----
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
