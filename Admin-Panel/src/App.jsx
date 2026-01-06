import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import './App.css'

import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import ProtectedRoleRoute from "./routes/ProtectedRoleRoute";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import AdminApprovals from "./pages/AdminApprovals";
import CaseStudy from "./pages/case-study/CaseStudy";
import AddCasestudy from "./pages/case-study/AddCasestudy";
import UpdateCasestudy from "./pages/case-study/UpdateCasestudy";
import CaseStudyDetails from "./pages/case-study/CaseStudyDetails";
import Services from "./pages/Services/Services";
import AddService from "./pages/Services/AddService";
import UpdateService from "./pages/Services/UpdateService";
import ServiceDetails from "./pages/Services/ServiceDetails";
import News from "./pages/News/News";
import AddNews from "./pages/News/AddNews";
import UpdateNews from "./pages/News/UpdataNews";
import NewsDetails from "./pages/News/NewsDetails";
import Faq from "./pages/Faq/Faq";
import AddFaq from "./pages/Faq/AddFaq";
import UpdateFaq from "./pages/Faq/UpdateaFaq";
import Category from "./pages/Faq/Category";
import ServiceCategory from "./pages/Services/Category";
import Category_Tag from "./pages/News/Category_Tag";
import Team from "./pages/Management_Team/Team";
import AddTeam from "./pages/Management_Team/AddTeam";
import UpdateaTeam from "./pages/Management_Team/UpdateaTeam";
import CreditCard from "./pages/Credit-Cards/CreditCard";
import AddCreditCard from "./pages/Credit-Cards/AddCreditCard";
import UpdateCreditCard from "./pages/Credit-Cards/UpdateCreditCard";
import CreditCardDetails from "./pages/Credit-Cards/CreditCardDetails";
import CardCategory from "./pages/Credit-Cards/Category";
import AdminList from "./pages/AdminList";
import MortgageRates from "./pages/Mortgage-Rates/MortgageRates";
import AddMortgagerate from "./pages/Mortgage-Rates/AddMortgagerate";
import UpdateMortgageRate from "./pages/Mortgage-Rates/UpdateMortgageRate";

function App() {
  const caseStudyRoles = ["superadmin", "admin", "content_manager"];
  const adminRoles = ["superadmin", "admin"];

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>

            <Route path="dashboard" element={<Dashboard />} />
            <Route path="home" element={<Home />} />

            <Route path="admin/case-studies" element={<CaseStudy />} />
            <Route path="admin/services" element={<Services />} />
            <Route path="admin/news" element={<News />} />
            <Route path="admin/faqs" element={<Faq />} />
            <Route path="admin/category" element={<Category />} />
            <Route path="admin/service/category" element={<ServiceCategory />} />
            <Route path="admin/news/category&tag" element={<Category_Tag />} />
            <Route path="admin/management-team" element={<Team />} />
            <Route path="admin/credit-cards" element={<CreditCard />} />
            <Route path="admin/credit-cards/category" element={<CardCategory />} />
            <Route path="admin/mortgage-rate" element={<MortgageRates />} />

            <Route element={<ProtectedRoleRoute allowedRoles={caseStudyRoles} />}>
              <Route path="admin/add-case-study" element={<AddCasestudy />} />
              <Route path="admin/edit-case-study/:slug" element={<UpdateCasestudy />} />
              <Route path="admin/case-study/:slug" element={<CaseStudyDetails />} />
              <Route path="admin/add-service" element={<AddService />} />
              <Route path="admin/edit-service/:slug" element={<UpdateService />} />
              <Route path="admin/service/:slug" element={<ServiceDetails />} />
              <Route path="admin/add-news" element={<AddNews />} />
              <Route path="admin/edit-news/:slug" element={<UpdateNews />} />
              <Route path="admin/news/:slug" element={<NewsDetails />} />
              <Route path="admin/add-faq" element={<AddFaq />} />
              <Route path="admin/edit-faq/:id" element={<UpdateFaq />} />
              <Route path="admin/add-mortgage-rate" element={<AddMortgagerate />} />
              <Route path="admin/edit-mortgage-rate/:id" element={<UpdateMortgageRate />} />
            </Route>

            <Route element={<ProtectedRoleRoute allowedRoles={adminRoles} />}>
              <Route path="admin-dashboard" element={<AdminDashboard />} />
              <Route path="admin/approvals" element={<AdminApprovals />} />
              <Route path="admin/add-management-team" element={<AddTeam />} />
              <Route path="admin/edit-management-team/:id" element={<UpdateaTeam />} />
              <Route path="admin/add-credit-card" element={<AddCreditCard />} />
              <Route path="admin/edit-credit-card/:slug" element={<UpdateCreditCard />} />
              <Route path="admin/credit-card/:slug" element={<CreditCardDetails />} />
              <Route path="admin/adminlist" element={<AdminList />} />
            </Route>

          </Route>
        </Route>

      </Routes>

      <Toaster position="top-right" />
    </>
  );
}

export default App;
