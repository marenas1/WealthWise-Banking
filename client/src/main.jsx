import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route } from 'react-router-dom'

import App from './App.jsx'
import LandingPage from './pages/LandingPage.jsx'
import HomePage from './pages/HomePage.jsx'
import TransactionDetailsPage from './pages/TransactionDetailsPage.jsx'

import "./index.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route index element={<LandingPage />} />
          <Route path="/home" element={<HomePage></HomePage>} />
          <Route path="/app" element={<App></App>} />
          <Route path="transaction-details" element={<TransactionDetailsPage></TransactionDetailsPage>}/>
        </Routes>
      </BrowserRouter>
  </StrictMode>,
)
