import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";

const SuperAdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [role, isRoleLoading] = useRole();
    const location = useLocation();

    if (loading || isRoleLoading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <span className="loading loading-spinner loading-lg text-secondary"></span>
            </div>
        );
    }

    // ONLY allow superadmin
    if (user && role === "superadmin") {
        return children;
    }

    return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

export default SuperAdminRoute;