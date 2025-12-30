import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import AdminLayout from "./components/AdminLayout";
import ProtectedRoute from "./routes/ProtectedRoute";
import RoleProtectedRoute from "./routes/RoleProtectedRoute";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import Home from "./pages/Home";
import AdminApprovals from "./pages/AdminApprovals";

function App() {
  return (
    <>
      {/* ROUTES */}
      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* normal dashboard (all roles) */}
        <Route element={<ProtectedRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
          </Route>
        </Route>

        {/* admin dashboard (only admin & superadmin) */}
        <Route element={<ProtectedRoute />}>
          <Route
            element={
              <RoleProtectedRoute allowedRoles={["superadmin", "admin"]} />
            }
          >
            <Route element={<AdminLayout />}>
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
