import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoleRoute({ allowedRoles }) {
    const authData = JSON.parse(localStorage.getItem("adminData"));
    const role = authData?.admin?.role;

    if (!role) {
        return <Navigate to="/login" replace />;
    }

    if (!allowedRoles.includes(role)) {
        return <Navigate to="/admin/unauthorized" replace />;
    }

    return <Outlet />;
}

export default ProtectedRoleRoute;
