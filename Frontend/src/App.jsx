import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import './App.css'
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

function App() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" />

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<Contact />} />
          <Route path="my-account" element={<MyAccount />} />
          <Route path="forgot-password" element={<ForgotPassword />} />

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
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
