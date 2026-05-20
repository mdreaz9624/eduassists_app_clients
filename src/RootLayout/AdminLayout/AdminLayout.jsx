// import { Outlet } from "react-router";

// const AdminLayout = () => {
//     return (
//         <div>
            
//             <Outlet />
//         </div>
//     );
// };

// export default AdminLayout;


//another version


import { useState, useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/useRole";
import {
  FaTachometerAlt,
  FaUsers,
  FaUniversity,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaPlusCircle,
  FaList,
  FaChartLine,
} from "react-icons/fa";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const { user, logOut } = useAuth();
  const [role] = useRole();
  const navigate = useNavigate();

  useEffect(() => {
    setUserRole(role);
  }, [role]);

  const handleLogout = async () => {
    await logOut();
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  // Navigation items
  const navItems = [
    {
      path: "/admin",
      name: "Dashboard",
      icon: <FaTachometerAlt className="w-5 h-5" />,
    },
    {
      path: "/admin/users",
      name: "Users Management",
      icon: <FaUsers className="w-5 h-5" />,
    },
    {
      path: "/admin/study-data",
      name: "Study Data",
      icon: <FaUniversity className="w-5 h-5" />,
    },
    {
      path: "/admin/add-university",
      name: "Add University",
      icon: <FaPlusCircle className="w-5 h-5" />,
    },
    {
      path: "/admin/analytics",
      name: "Analytics",
      icon: <FaChartLine className="w-5 h-5" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile Sidebar Toggle Button */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-primary text-white shadow-lg"
      >
        {sidebarOpen ? <FaTimes size={20} /> : <FaBars size={20} />}
      </button>

      {/* Sidebar Overlay for Mobile */}
      {sidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-40 w-72 h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          {/* Logo / Brand */}
          <div className="p-6 border-b border-gray-700">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <FaUniversity className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold">EduAssists</h2>
                <p className="text-xs text-gray-400">Admin Panel</p>
              </div>
            </div>
            {userRole && (
              <div className="mt-3">
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    userRole === "superadmin"
                      ? "bg-yellow-500 text-black"
                      : "bg-blue-500"
                  }`}
                >
                  {userRole === "superadmin" ? "Super Admin" : "Admin"}
                </span>
              </div>
            )}
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-6">
            <ul className="space-y-2 px-4">
              {navItems.map((item) => (
                <li key={item.path}>
                  <NavLink
                    to={item.path}
                    onClick={closeSidebar}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                        isActive
                          ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                          : "text-gray-300 hover:bg-gray-700 hover:text-white"
                      }`
                    }
                  >
                    {item.icon}
                    <span className="font-medium">{item.name}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* User Info & Logout */}
          <div className="p-4 border-t border-gray-700">
            <div className="flex items-center space-x-3 mb-4">
              <img
                src={user?.photoURL || "https://via.placeholder.com/40"}
                alt="User"
                className="w-10 h-10 rounded-full object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{user?.name}</p>
                <p className="text-xs text-gray-400 truncate">{user?.email}</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors duration-200"
            >
              <FaSignOutAlt className="w-4 h-4" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-72 min-h-screen">
        <div className="p-4 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;