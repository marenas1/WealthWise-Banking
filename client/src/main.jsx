import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter,Routes,Route } from 'react-router-dom'
//import App from './App.jsx'
import LandingPage from './pages/landingPage.jsx'
import HomePage from "./pages/homePage.jsx"
import "./index.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route index element={<LandingPage />} />
        <Route path="/home" element={<HomePage></HomePage>} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)
