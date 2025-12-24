import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import './App.css'
import TopScroll from './components/TopScroll'
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Contact from "./pages/Contacat";
import MyAccount from "./pages/MyAccount";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ForgotPassword from "./pages/ForgotPassword";
import AboutUs from "./pages/page/AboutUs";
import TermsPage from "./pages/page/TermsPage";
import CmsPage from "./pages/page/CmsPage";
import Error from "./pages/page/Error";
import Faq from "./pages/page/Faq";
import Atm from "./pages/Atm";
import Services from "./pages/page/Services";
import ServiceDetails from "./pages/page/ServiceDetails";
import News from "./pages/page/News";
import NewsDetails from "./pages/page/NewsDetails";
import CaseStudy from "./pages/page/CaseStudy";
import CaseStudyDetails from "./pages/page/CaseStudyDetails";
import PersonalLoan from "./pages/PersonalLoan";
import LoanApply from "./pages/LoanApply";
import OpenAccount from "./pages/OpenAccount";
import MortgageApply from "./pages/mortgage/ApplyMortgage";
import ExploreMortgage from "./pages/mortgage/ExploreMortgage";
import RateMortgage from "./pages/mortgage/RateMortgage";
import CalculatorMortgage from "./pages/mortgage/CalculatorMortgage";
import OfferMortgage from "./pages/mortgage/OfferMortgage";
import BankingOverview   from "./pages/banking/BankingOverview";
import CheckingAccount from "./pages/banking/CheckingAccount";
import SavingAccount from "./pages/banking/SavingAccount";
import CertificateDeposite from "./pages/banking/CertificateDeposite";
import BankingIra from "./pages/banking/BankingIra";
import SmallBusssiness from "./pages/banking/SmallBusssiness";
import AtmLocate from "./pages/banking/AtmLocate";

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <TopScroll/>

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="my-account" element={<MyAccount />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="atm-locator" element={<Atm />} />
          <Route path="personal-loan" element={<PersonalLoan />} />
          <Route path="personal-loan-apply" element={<LoanApply />} />
          <Route path="open-account" element={<OpenAccount />} />

          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route path="pages/about-us" element={<AboutUs />} />
          <Route path="pages/terms-and-conditions" element={<TermsPage />} />
          <Route path="pages/:slug" element={<CmsPage />} />
          <Route path="pages/faq" element={<Faq />} />
          <Route path="404" element={<Error />} />
          <Route path="pages/services" element={<Services />} />
          <Route path="pages/services/:slug" element={<ServiceDetails />} />
          <Route path="pages/news" element={<News />} />
          <Route path="pages/news/:slug" element={<NewsDetails />} />
          <Route path="pages/case-studies" element={<CaseStudy />} />
          <Route path="pages/case-study/:slug" element={<CaseStudyDetails />} />


          <Route path="mortgage-apply" element={<MortgageApply />} />
          <Route path="mortgage-explore" element={<ExploreMortgage />} />
          <Route path="mortgage-rate" element={<RateMortgage />} />
          <Route path="mortgage-calculator" element={<CalculatorMortgage />} />
          <Route path="mortgage-offers" element={<OfferMortgage />} />

          <Route path="banking-overview" element={<BankingOverview />} />
          <Route path="banking-checking" element={<CheckingAccount />} />
          <Route path="banking-saving" element={<SavingAccount />} />
          <Route path="banking-certificates" element={<CertificateDeposite />} />
          <Route path="banking-iras" element={<BankingIra />} />
          <Route path="banking-business" element={<SmallBusssiness />} />
          <Route path="banking-atm-locator" element={<AtmLocate />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
