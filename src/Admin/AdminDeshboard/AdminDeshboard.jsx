// const AdminDeshboard = () => {
//     return (
//         <div>
//             <h1>Admin Dashboard</h1>
//         </div>
//     );
// };

// export default AdminDeshboard;



import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AdminDashboard = () => {

    const axiosSecure = useAxiosSecure();

    const [users, setUsers] = useState([]);

    useEffect(() => {

        axiosSecure.get('/users')
            .then(res => {
                setUsers(res.data);
            })
            .catch(error => {
                console.log(error);
            });

    }, [axiosSecure]);

    return (
        <div className="p-6">

            <h2 className="text-3xl font-bold mb-6">
                Admin Dashboard
            </h2>

            <div className="overflow-x-auto">

                <table className="table table-zebra">

                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Phone</th>
                        </tr>
                    </thead>

                    <tbody>

                        {
                            users.map((user, index) => (

                                <tr key={user._id}>

                                    <td>{index + 1}</td>

                                    <td>
                                        <img
                                            src={user.photoURL}
                                            alt=""
                                            className="w-12 h-12 rounded-full"
                                        />
                                    </td>

                                    <td>{user.name}</td>

                                    <td>{user.email}</td>

                                    <td>
                                        <span className="badge badge-primary">
                                            {user.role}
                                        </span>
                                    </td>

                                    <td>{user.phone}</td>

                                </tr>
                            ))
                        }

                    </tbody>

                </table>

            </div>

        </div>
    );
};

export default AdminDashboard;