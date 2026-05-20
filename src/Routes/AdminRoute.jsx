import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/useRole";

const AdminRoute = ({ children }) => {
    const { user, loading } = useAuth();
    const [role, isRoleLoading] = useRole();
    const location = useLocation();

    // 1. If Firebase finishes loading and finds NO logged-in user at all, 
    // kick them to the login screen immediately instead of getting stuck spinning.
    if (!loading && !user) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    // 2. Show spinner ONLY while background auth or database checks are running
    if (loading || isRoleLoading) {
        return (
            <div className="flex justify-center items-center h-screen w-full">
                <span className="loading loading-spinner loading-lg text-accent"></span>
            </div>
        );
    }

    // 3. Grant access if user role matches admin or superadmin configurations
    if (user && (role === "admin" || role === "superadmin")) {
        return children;
    }

    // 4. Force regular unauthorized students or franchises to the landing page
    return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;