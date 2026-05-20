import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaEdit, FaTrash, FaEye, FaSearch, FaUniversity } from "react-icons/fa";

const StudyDataManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("all");

  useEffect(() => {
    fetchUniversities();
  }, []);

  const fetchUniversities = async () => {
    try {
      setLoading(true);
      const res = await axiosSecure.get("/studyData");
      setUniversities(res.data);
    } catch (error) {
      console.error("Error fetching universities:", error);
      Swal.fire("Error", "Failed to fetch study data", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, name) => {
    const result = await Swal.fire({
      title: "Delete University?",
      text: `Are you sure you want to delete "${name}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axiosSecure.delete(`/studyData/${id}`);
        Swal.fire("Deleted!", "University has been deleted.", "success");
        fetchUniversities();
      } catch (err) {
        Swal.fire("Error", "Failed to delete university", "error");
      }
    }
  };

  const countries = [...new Set(universities.map((u) => u.country))];

  const filteredUniversities = universities.filter((uni) => {
    const matchesSearch =
      uni.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      uni.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = selectedCountry === "all" || uni.country === selectedCountry;
    return matchesSearch && matchesCountry;
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Study Data Management</h2>
            <p className="text-gray-600 mt-1">Manage all university data</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="Search by name, city, or ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="input input-bordered w-full sm:w-64 pl-10"
              />
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="select select-bordered"
            >
              <option value="all">All Countries</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="table w-full">
          <thead className="bg-gray-50">
            <tr>
              <th>#</th>
              <th>University</th>
              <th>ID</th>
              <th>Location</th>
              <th>Tuition (Annual)</th>
              <th>Intakes</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUniversities.map((uni, index) => (
              <tr key={uni._id} className="hover:bg-gray-50">
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center space-x-3">
                    <img
                      src={uni.university_image}
                      alt={uni.name}
                      className="w-12 h-12 rounded-lg object-cover"
                    />
                    <div>
                      <div className="font-medium">{uni.name}</div>
                      <div className="text-xs text-gray-500">{uni.city}</div>
                    </div>
                  </div>
                </td>
                <td>
                  <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {uni.id}
                  </code>
                </td>
                <td>
                  <span className="text-lg mr-1">{uni.flag}</span> {uni.country}
                </td>
                <td>
                  <div className="font-medium">{uni.tuition_annual}</div>
                  <div className="text-xs text-gray-500">{uni.currency}</div>
                </td>
                <td>
                  <div className="flex flex-wrap gap-1">
                    {uni.intakes?.slice(0, 2).map((intake, i) => (
                      <span key={i} className="badge badge-sm badge-ghost">
                        {intake}
                      </span>
                    ))}
                    {uni.intakes?.length > 2 && (
                      <span className="badge badge-sm">+{uni.intakes.length - 2}</span>
                    )}
                  </div>
                </td>
                <td>
                  <div className="flex gap-2">
                    <button
                      onClick={() => window.location.href = `/admin/edit-university/${uni.id}`}
                      className="btn btn-sm btn-info"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(uni.id, uni.name)}
                      className="btn btn-sm btn-error"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredUniversities.length === 0 && (
        <div className="text-center py-12">
          <FaUniversity className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500">No universities found</p>
        </div>
      )}
    </div>
  );
};

export default StudyDataManagement;