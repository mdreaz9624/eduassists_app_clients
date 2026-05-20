// import { useQuery } from "@tanstack/react-query";
// import useAuth from "./useAuth"; // Your custom Firebase Auth hook
// import useAxiosSecure from "./useAxiosSecure";

// const useRole = () => {
//     const { user, loading } = useAuth();
//     const axiosSecure = useAxiosSecure();

//     const { data: role = null, isPending: isRoleLoading } = useQuery({
//         queryKey: [user?.email, 'userRole'],
//         enabled: !loading && !!user?.email, // Only run when auth loading finishes
//         queryFn: async () => {
//             const res = await axiosSecure.get(`/users/role/${user.email}`);
//             return res.data.role; // returns 'student', 'admin', or 'superadmin'
//         }
//     });

//     return [role, isRoleLoading];
// };

// export default useRole; 


//new version without react-query

import { useQuery } from "@tanstack/react-query";
import useAuth from "./useAuth";
import useAxiosSecure from "./useAxiosSecure";

const useRole = () => {
    const { user, loading } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: role = null, isPending: isRoleLoading } = useQuery({
        queryKey: [user?.email, 'userRole'],
        enabled: !loading && !!user?.email, 
        queryFn: async () => {
            // ⚠️ CRITICAL: Ensure this string reads exactly /users/role/
            const res = await axiosSecure.get(`/users/role/${user.email}`);
            return res.data?.role || 'student';
        }
    });

    return [role, isRoleLoading];
};

export default useRole;