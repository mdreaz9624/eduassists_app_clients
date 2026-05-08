

import React from 'react'; // Removed unused { Children }
import useAuth from '../hooks/useAuth';
import { Navigate, useLocation } from 'react-router'; // Added useLocation for better UX
import { ThreeCircles } from 'react-loader-spinner';

const PrivateRoutes = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation(); // To remember where the user was going

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <ThreeCircles
                    visible={true}
                    height="100"
                    width="100"
                    color="#4fa94d"
                    ariaLabel="three-circles-loading"
                />
            </div>
        );
    }

    if (!user) {
        // MUST use the 'return' keyword here
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
};

export default PrivateRoutes;