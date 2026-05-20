// const AdminDeshboard = () => {
//     return (
//         <div>
//             <h1>Admin Dashboard</h1>
//         </div>
//     );
// };

// export default AdminDeshboard;



// import { useEffect, useState } from "react";
// import useAxiosSecure from "../../hooks/useAxiosSecure";

// const AdminDashboard = () => {

//     const axiosSecure = useAxiosSecure();

//     const [users, setUsers] = useState([]);

//     useEffect(() => {

//         axiosSecure.get('/users')
//             .then(res => {
//                 setUsers(res.data);
//             })
//             .catch(error => {
//                 console.log(error);
//             });

//     }, [axiosSecure]);

//     return (
//         <div className="p-6">

//             <h2 className="text-3xl font-bold mb-6">
//                 Admin Dashboard
//             </h2>

//             <div className="overflow-x-auto">

//                 <table className="table table-zebra">

//                     <thead>
//                         <tr>
//                             <th>#</th>
//                             <th>Photo</th>
//                             <th>Name</th>
//                             <th>Email</th>
//                             <th>Role</th>
//                             <th>Phone</th>
//                         </tr>
//                     </thead>

//                     <tbody>

//                         {
//                             users.map((user, index) => (

//                                 <tr key={user._id}>

//                                     <td>{index + 1}</td>

//                                     <td>
//                                         <img
//                                             src={user.photoURL}
//                                             alt=""
//                                             className="w-12 h-12 rounded-full"
//                                         />
//                                     </td>

//                                     <td>{user.name}</td>

//                                     <td>{user.email}</td>

//                                     <td>
//                                         <span className="badge badge-primary">
//                                             {user.role}
//                                         </span>
//                                     </td>

//                                     <td>{user.phone}</td>

//                                 </tr>
//                             ))
//                         }

//                     </tbody>

//                 </table>

//             </div>

//         </div>
//     );
// };

// export default AdminDashboard;


//another version


import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2"; // Optional: For nice alert notifications

const AdminDashboard = () => {
    const axiosSecure = useAxiosSecure();
    const [users, setUsers] = useState([]);

    // Fetch all users on load
    useEffect(() => {
        axiosSecure.get('/users')
            .then(res => {
                setUsers(res.data);
            })
            .catch(error => {
                console.error("Error fetching users:", error);
            });
    }, [axiosSecure]);

    // Handle role update
    const handleMakeAdmin = (user) => {
        axiosSecure.patch(`/users/admin/${user._id}`)
            .then(res => {
                if (res.data.modifiedCount > 0) {
                    // Update state locally so UI refreshes instantly
                    const updatedUsers = users.map(u => 
                        u._id === user._id ? { ...u, role: 'admin' } : u
                    );
                    setUsers(updatedUsers);
                    
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is now an Admin!`,
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            })
            .catch(error => {
                console.error("Failed to update role:", error);
            });
    };

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold mb-6">Admin Dashboard</h2>

            <div className="overflow-x-auto bg-base-100 rounded-lg shadow-md">
                <table className="table table-zebra w-full">
                    <thead>
                        <tr className="bg-gray-100">
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Phone</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>
                                    <img
                                        src={user.photoURL || "https://via.placeholder.com/150"}
                                        alt={user.name}
                                        className="w-12 h-12 rounded-full object-cover"
                                    />
                                </td>
                                <td className="font-medium">{user.name}</td>
                                <td>{user.email}</td>
                                <td>
                                    <span className={`badge ${
                                        user.role === 'superadmin' ? 'badge-secondary' : 
                                        user.role === 'admin' ? 'badge-accent' : 'badge-primary'
                                    }`}>
                                        {user.role}
                                    </span>
                                </td>
                                <td>{user.phone || "N/A"}</td>
                                <td className="text-center">
                                    {user.role === 'student' ? (
                                        <button 
                                            onClick={() => handleMakeAdmin(user)} 
                                            className="btn btn-sm btn-outline btn-accent"
                                        >
                                            Make Admin
                                        </button>
                                    ) : (
                                        <span className="text-xs text-gray-400 italic">No Actions</span>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;