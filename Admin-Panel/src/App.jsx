import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

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
import Services from "./pages/Services/Services";
import AddService from "./pages/Services/AddService";
import UpdateService from "./pages/Services/UpdateService";

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

            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/admin/case-studies" element={<CaseStudy />} />
            <Route path="/admin/services" element={<Services />} />

            <Route element={<ProtectedRoleRoute allowedRoles={caseStudyRoles} />}>
              <Route path="/admin/add-case-study" element={<AddCasestudy />} />
              <Route path="/admin/edit-case-study/:slug" element={<UpdateCasestudy />} />
              <Route path="/admin/add-service" element={<AddService />} />
              <Route path="/admin/edit-service/:slug" element={<UpdateService />} />

            </Route>

            <Route element={<ProtectedRoleRoute allowedRoles={adminRoles} />}>
              <Route path="/admin-dashboard" element={<AdminDashboard />} />
              <Route path="/admin/approvals" element={<AdminApprovals />} />
            </Route>

          </Route>
        </Route>
      </Routes>

      <Toaster position="top-right" />
    </>
  );
}

export default App;
