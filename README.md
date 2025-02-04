**WealthWise Banking** 💰

**WealthWise Banking** is a personal finance and investment tracking application that leverages **Plaid** to securely link to user bank accounts, allowing them to track spending, view transaction history, and explore investment options.

---

## **Table of Contents**
- [Hosting and Deployment](#hosting-and-deployment)
- [Tech Stack](#tech-stack)
- [Features](#features)
- [How Plaid Integration Works](#how-plaid-integration-works)
- [Video Demo](#video-demo)
- [License](#license)

---

## **Hosting and Deployment**
- **Frontend Deployment:** [WealthWise Banking Frontend](https://wealthwise-banking-client.onrender.com)
- **Backend Deployment:** [WealthWise Banking Backend](https://wealthwise-banking-server-production.up.railway.app)

---

## **Tech Stack**
WealthWise Banking utilizes a modern web stack to provide users with a fast and secure finance management experience:

- **Frontend:**
  - **React** – JavaScript library for building user interfaces
  - **Tailwind CSS** – Utility-first CSS framework for fast styling
  - **React Router** – For routing and navigation within the app
  - **Axios** – For making HTTP requests to the backend

- **Backend:**
  - **Express.js** – Web framework for Node.js, used to create a REST API
  - **Plaid API** – Financial data provider used to link and fetch transactions from users' bank accounts

- **Hosting and Deployment:**
  - **Render** – For frontend deployment, may take around 50 seconds to start up due to app inactivity
  - **Railway** – For backend deployment and hosting the REST API

---

## **Features**
- **Track Transactions:** Securely fetch and display recent bank transactions from linked bank accounts using Plaid. Filter and open them to view more details.
- **Investment Options:** Explore investment opportunities to grow finances with real-time data.
- **Dark Mode:** Toggle between light and dark themes for a personalized user experience.
- **User-Friendly Dashboard:** A clean, responsive interface built with Tailwind CSS for seamless user interactions.

---

## **How Plaid Integration Works**

**Plaid** is used to securely connect the user's bank account to the application.

1. **Plaid Link Token Generation:**
   - On page load, a request is sent to the backend to generate a **Link Token** from Plaid using the `/create_link_token` API endpoint.
   - The token is used to open the Plaid Link UI, allowing users to securely log in to their bank accounts.

2. **Plaid Link UI:**
   - Once the token is received, the Plaid Link UI is opened, and the user selects their bank and logs in using their credentials.
   
3. **Exchange Public Token for Access Token:**
   - Upon successful login, Plaid provides a **public_token**, which is exchanged for a long-lived **access_token** using the `/exchange_public_token` API endpoint.
   
4. **Fetching Transactions and Account Balances:**
   - With the **access_token**, the backend makes requests to Plaid’s API to fetch:
     - Account balances (`/get_account_balances` endpoint)
     - Transaction history within a specified date range (`/get_transactions` endpoint)

5. **Storing Data in Session:**
   - All relevant data (transactions, account balances, and access tokens) is securely stored in the user's session storage for use throughout the application.

---

## **Video Demo**

<div style="position: relative; padding-bottom: 62.5%; height: 0;"><iframe src="https://www.loom.com/embed/d21089e023eb44e79f3d55ddad0b393f?sid=c37b80f2-7de3-4edf-af6e-21bcc2b553c1" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;"></iframe></div>
---

## **License**

This project is licensed under the MIT License – see the [LICENSE](LICENSE)or details.

