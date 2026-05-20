import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { FaSave, FaTimes } from "react-icons/fa";

const AddUniversity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    city: "",
    country: "",
    flag: "",
    university_image: "",
    tuition_annual: "",
    currency: "USD",
    application_fee: "",
    intakes: [],
  });

  useEffect(() => {
    if (id) {
      setIsEditing(true);
      fetchUniversityData();
    }
  }, [id]);

  const fetchUniversityData = async () => {
    try {
      const res = await axiosSecure.get(`/studyData/${id}`);
      const data = res.data;
      setFormData({
        id: data.id,
        name: data.name,
        city: data.city,
        country: data.country,
        flag: data.flag,
        university_image: data.university_image,
        tuition_annual: data.tuition_annual,
        currency: data.currency,
        application_fee: data.application_fee,
        intakes: data.intakes || [],
      });
    } catch (error) {
      console.error("Error fetching university:", error);
      Swal.fire("Error", "Failed to fetch university data", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleIntakesChange = (e) => {
    const intakesArray = e.target.value.split(",").map((i) => i.trim());
    setFormData((prev) => ({ ...prev, intakes: intakesArray }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isEditing) {
        await axiosSecure.put(`/studyData/${id}`, formData);
        Swal.fire("Updated!", "University data has been updated.", "success");
      } else {
        await axiosSecure.post("/studyData", formData);
        Swal.fire("Added!", "New university has been added.", "success");
      }
      navigate("/admin/study-data");
    } catch (error) {
      console.error("Error saving university:", error);
      Swal.fire("Error", "Failed to save university data", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-6 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-800">
          {isEditing ? "Edit University" : "Add New University"}
        </h2>
        <p className="text-gray-600 mt-1">
          {isEditing ? "Update university information" : "Enter new university details"}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="form-control">
            <label className="label font-medium">University ID *</label>
            <input
              type="text"
              name="id"
              value={formData.id}
              onChange={handleChange}
              className="input input-bordered"
              required
              disabled={isEditing}
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">University Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">City *</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Country *</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Flag (Emoji)</label>
            <input
              type="text"
              name="flag"
              value={formData.flag}
              onChange={handleChange}
              className="input input-bordered"
              placeholder="🇺🇸"
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">University Image URL *</label>
            <input
              type="url"
              name="university_image"
              value={formData.university_image}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Annual Tuition *</label>
            <input
              type="text"
              name="tuition_annual"
              value={formData.tuition_annual}
              onChange={handleChange}
              className="input input-bordered"
              required
              placeholder="£21,000 - £33,000"
            />
          </div>

          <div className="form-control">
            <label className="label font-medium">Currency *</label>
            <select
              name="currency"
              value={formData.currency}
              onChange={handleChange}
              className="select select-bordered"
              required
            >
              <option value="USD">USD ($)</option>
              <option value="GBP">GBP (£)</option>
              <option value="AUD">AUD (A$)</option>
              <option value="CAD">CAD (C$)</option>
              <option value="EUR">EUR (€)</option>
            </select>
          </div>

          <div className="form-control">
            <label className="label font-medium">Application Fee *</label>
            <input
              type="text"
              name="application_fee"
              value={formData.application_fee}
              onChange={handleChange}
              className="input input-bordered"
              required
              placeholder="£75"
            />
          </div>

          <div className="form-control md:col-span-2">
            <label className="label font-medium">
              Intakes (comma-separated) *
            </label>
            <input
              type="text"
              name="intakes"
              value={formData.intakes.join(", ")}
              onChange={handleIntakesChange}
              className="input input-bordered"
              required
              placeholder="Fall (September), Spring (January), Summer (May)"
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={() => navigate("/admin/study-data")}
            className="btn btn-ghost"
          >
            <FaTimes className="mr-2" /> Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            <FaSave className="mr-2" />
            {loading ? "Saving..." : isEditing ? "Update" : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddUniversity;