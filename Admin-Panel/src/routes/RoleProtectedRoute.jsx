import { Navigate, Outlet } from "react-router-dom"
import { adminAuth } from "../context/AdminContext"

const RoleProtectedRoute = ({ allowedRoles }) => {
    const { admin, loading } = adminAuth()

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-slate-500">Loading...</p>
            </div>
        )
    }

    if (!admin) {
        return <Navigate to="/login" replace />
    }

    if (!allowedRoles.includes(admin.role)) {
        return <Navigate to="/dashboard" replace />
    }

    return <Outlet />
}

export default RoleProtectedRoute
