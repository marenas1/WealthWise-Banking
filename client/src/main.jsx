import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

import LandingPage from './pages/landingPage.jsx'
import HomePage from './pages/homePage.jsx'
import TransactionDetailsPage from './pages/TransactionDetailsPage.jsx'
import InvestmentsPage from './pages/InvestmentsPage.jsx'
import "./index.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter basename='wealthwise-banking-client-production.up.railway.app'>
        <Routes>
          <Route index element={<LandingPage></LandingPage>} />
          <Route path="/home" element={<HomePage></HomePage>} />
          <Route path="/transaction-details" element={<TransactionDetailsPage></TransactionDetailsPage>}/>
          <Route path="/investments" element={<InvestmentsPage></InvestmentsPage>}></Route>
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
