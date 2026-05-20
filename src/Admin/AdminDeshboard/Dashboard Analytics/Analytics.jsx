import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaUsers, FaUniversity, FaGlobe, FaChartLine } from "react-icons/fa";

const Analytics = () => {
  const axiosSecure = useAxiosSecure();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalUniversities: 0,
    totalCountries: 0,
    totalAdmins: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [usersRes, uniRes] = await Promise.all([
        axiosSecure.get("/users"),
        axiosSecure.get("/studyData"),
      ]);

      const users = usersRes.data;
      const universities = uniRes.data;

      setStats({
        totalUsers: users.length,
        totalUniversities: universities.length,
        totalCountries: new Set(universities.map((u) => u.country)).size,
        totalAdmins: users.filter((u) => u.role === "admin" || u.role === "superadmin").length,
      });
    } catch (error) {
      console.error("Error fetching stats:", error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      title: "Total Users",
      value: stats.totalUsers,
      icon: <FaUsers className="w-8 h-8" />,
      color: "bg-gradient-to-r from-blue-500 to-blue-600",
    },
    {
      title: "Universities",
      value: stats.totalUniversities,
      icon: <FaUniversity className="w-8 h-8" />,
      color: "bg-gradient-to-r from-green-500 to-green-600",
    },
    {
      title: "Countries",
      value: stats.totalCountries,
      icon: <FaGlobe className="w-8 h-8" />,
      color: "bg-gradient-to-r from-purple-500 to-purple-600",
    },
    {
      title: "Admins",
      value: stats.totalAdmins,
      icon: <FaChartLine className="w-8 h-8" />,
      color: "bg-gradient-to-r from-orange-500 to-orange-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">Analytics Dashboard</h2>
        <p className="text-gray-600 mt-1">Overview of your platform statistics</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {statCards.map((card, index) => (
          <div
            key={index}
            className={`${card.color} rounded-lg shadow-lg p-6 text-white transform hover:scale-105 transition-transform duration-200`}
          >
            <div className="flex justify-between items-start">
              <div>
                <p className="text-white/80 text-sm mb-1">{card.title}</p>
                <p className="text-3xl font-bold">{card.value}</p>
              </div>
              <div className="bg-white/20 rounded-lg p-3">{card.icon}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <button
            onClick={() => (window.location.href = "/admin/users")}
            className="btn btn-outline btn-primary justify-start"
          >
            <FaUsers className="mr-2" /> Manage Users
          </button>
          <button
            onClick={() => (window.location.href = "/admin/study-data")}
            className="btn btn-outline btn-primary justify-start"
          >
            <FaUniversity className="mr-2" /> Manage Universities
          </button>
          <button
            onClick={() => (window.location.href = "/admin/add-university")}
            className="btn btn-outline btn-primary justify-start"
          >
            <FaUniversity className="mr-2" /> Add New University
          </button>
        </div>
      </div>
    </div>
  );
};

export default Analytics;