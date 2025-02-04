import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/landingPage";
import HomePage from "./pages/homePage";
import TransactionDetailsPage from "./pages/TransactionDetailsPage";
import InvestmentsPage from "./pages/InvestmentsPage";
function App(){
    return(
        <>
        <Routes>
          <Route path="/" element={<LandingPage></LandingPage>} />
          <Route path="/home" element={<HomePage></HomePage>} />
          <Route path="/transaction-details" element={<TransactionDetailsPage></TransactionDetailsPage>}/>
          <Route path="/investments" element={<InvestmentsPage></InvestmentsPage>}></Route>
        </Routes>
        </>
    )
}

export default App;