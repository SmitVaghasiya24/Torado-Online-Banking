import { Navigate, Outlet } from "react-router-dom";
import { adminAuth } from "@/context/AdminContext";

const ProtectedRoute = () => {
    const { isAuthenticated, loading } = adminAuth();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-slate-500">Loading...</p>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
