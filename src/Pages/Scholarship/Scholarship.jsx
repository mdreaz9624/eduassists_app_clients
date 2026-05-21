// import React from 'react';

// const Scholarship = () => {
//     return (
//         <div className='mt-28'>
//             <h1 className='text-center text-red-800 font-extrabold'>Comming Soon..............</h1>
            
//         </div>
//     );
// };

// export default Scholarship;



//another code

import { useState, useEffect } from "react";
import { 
  FaSearch, 
  FaFilter, 
  FaGlobe, 
  FaUniversity, 
  FaGraduationCap, 
  FaMoneyBillWave,
  FaCalendarAlt,
  FaExternalLinkAlt,
  FaHeart,
  FaRegHeart,
  FaClock,
  FaTrophy,
  FaCheckCircle
} from "react-icons/fa";

const Scholarship = () => {
    const [scholarships, setScholarships] = useState([]);
    const [filteredScholarships, setFilteredScholarships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [selectedCountry, setSelectedCountry] = useState("All");
    const [showFilters, setShowFilters] = useState(false);
    const [favorites, setFavorites] = useState([]);
    const [categories, setCategories] = useState([]);
    const [countries, setCountries] = useState([]);

    // Fetch scholarships data
    useEffect(() => {
        const fetchScholarships = async () => {
            try {
                const response = await fetch('/scholarshipsData.json');
                const data = await response.json();
                setScholarships(data.scholarships);
                setFilteredScholarships(data.scholarships);
                setCategories(data.categories || ["All", "Fully Funded", "Partially Funded", "Urgent Deadline", "Popular"]);
                
                // Extract unique countries
                const uniqueCountries = ["All", ...new Set(data.scholarships.map(s => s.country))];
                setCountries(uniqueCountries);
                
                // Load favorites from localStorage
                const savedFavorites = localStorage.getItem("favoriteScholarships");
                if (savedFavorites) {
                    setFavorites(JSON.parse(savedFavorites));
                }
            } catch (error) {
                console.error("Error loading scholarships:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchScholarships();
    }, []);

    // Filter scholarships
    useEffect(() => {
        let filtered = scholarships;

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(scholarship =>
                scholarship.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                scholarship.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
                scholarship.university.toLowerCase().includes(searchTerm.toLowerCase()) ||
                scholarship.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Category filter
        if (selectedCategory !== "All") {
            switch(selectedCategory) {
                case "Fully Funded":
                    filtered = filtered.filter(s => s.funding === "100% Funded" || s.funding === "Fully Funded");
                    break;
                case "Partially Funded":
                    filtered = filtered.filter(s => s.funding === "Partially Funded");
                    break;
                case "Urgent Deadline":
                    filtered = filtered.filter(s => s.deadline_urgent === true);
                    break;
                case "Popular":
                    filtered = filtered.filter(s => s.popular === true);
                    break;
                default:
                    break;
            }
        }

        // Country filter
        if (selectedCountry !== "All") {
            filtered = filtered.filter(s => s.country === selectedCountry);
        }

        setFilteredScholarships(filtered);
    }, [searchTerm, selectedCategory, selectedCountry, scholarships]);

    const handleFavorite = (scholarshipId) => {
        let newFavorites;
        if (favorites.includes(scholarshipId)) {
            newFavorites = favorites.filter(id => id !== scholarshipId);
        } else {
            newFavorites = [...favorites, scholarshipId];
        }
        setFavorites(newFavorites);
        localStorage.setItem("favoriteScholarships", JSON.stringify(newFavorites));
    };

    const getTimeRemaining = (deadline) => {
        const deadlineDate = new Date(deadline);
        const today = new Date();
        const diffTime = deadlineDate - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays < 0) return "Expired";
        if (diffDays === 0) return "Today";
        if (diffDays <= 7) return `${diffDays} days left`;
        return `${diffDays} days left`;
    };

    const isDeadlineUrgent = (deadline) => {
        const deadlineDate = new Date(deadline);
        const today = new Date();
        const diffDays = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
        return diffDays <= 14 && diffDays > 0;
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="mt-4 text-gray-600">Loading scholarships...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen mt-24 bg-gray-50 py-8 px-4">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        International Scholarships
                    </h1>
                    <p className="text-gray-600 mt-3 text-lg">
                        Discover fully funded scholarships to study abroad
                    </p>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search scholarships by title, country, or university..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="btn btn-outline btn-primary gap-2"
                        >
                            <FaFilter />
                            {showFilters ? "Hide Filters" : "Show Filters"}
                        </button>
                    </div>

                    {/* Advanced Filters */}
                    {showFilters && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Category
                                    </label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        {categories.map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Country
                                    </label>
                                    <select
                                        value={selectedCountry}
                                        onChange={(e) => setSelectedCountry(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        {countries.map(country => (
                                            <option key={country} value={country}>{country}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Featured/Popular Scholarships Section */}
                <div className="mb-12">
                    <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                        <FaTrophy className="text-yellow-500" />
                        Popular Scholarships
                        <span className="text-sm font-normal text-gray-500 ml-2">Trending Now</span>
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredScholarships.filter(s => s.popular).slice(0, 3).map(scholarship => (
                            <div key={scholarship.id} className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
                                <figure className="relative h-48">
                                    <img 
                                        src={scholarship.image} 
                                        alt={scholarship.title}
                                        className="w-full h-full object-cover"
                                    />
                                    <div className="absolute top-4 right-4">
                                        <button
                                            onClick={() => handleFavorite(scholarship.id)}
                                            className="btn btn-circle btn-sm bg-white/90 hover:bg-white"
                                        >
                                            {favorites.includes(scholarship.id) ? (
                                                <FaHeart className="text-red-500" />
                                            ) : (
                                                <FaRegHeart className="text-gray-600" />
                                            )}
                                        </button>
                                    </div>
                                    {scholarship.funding === "100% Funded" && (
                                        <div className="absolute top-4 left-4">
                                            <div className="badge badge-success gap-2">
                                                <FaCheckCircle /> Fully Funded
                                            </div>
                                        </div>
                                    )}
                                    {isDeadlineUrgent(scholarship.deadline) && (
                                        <div className="absolute bottom-4 left-4">
                                            <div className="badge badge-error gap-2 animate-pulse">
                                                <FaClock /> Urgent
                                            </div>
                                        </div>
                                    )}
                                </figure>
                                <div className="card-body">
                                    <div className="flex items-center justify-between mb-2">
                                        <div className="flex items-center gap-1">
                                            <span className="text-2xl">{scholarship.flag}</span>
                                            <span className="text-sm text-gray-600">{scholarship.country}</span>
                                        </div>
                                        <div className="flex items-center gap-1 text-orange-500">
                                            <FaTrophy className="text-sm" />
                                            <span className="text-xs font-semibold">Popular</span>
                                        </div>
                                    </div>
                                    <h3 className="card-title text-lg">{scholarship.title}</h3>
                                    <p className="text-sm text-gray-600 line-clamp-2">{scholarship.description}</p>
                                    <div className="mt-3 space-y-2">
                                        <div className="flex items-center gap-2 text-sm">
                                            <FaUniversity className="text-primary" />
                                            <span>{scholarship.university}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <FaGraduationCap className="text-primary" />
                                            <span>{scholarship.degree}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <FaMoneyBillWave className="text-green-500" />
                                            <span className="font-semibold text-green-600">{scholarship.coverage}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <FaCalendarAlt className="text-red-500" />
                                            <span className={isDeadlineUrgent(scholarship.deadline) ? "text-red-600 font-semibold" : ""}>
                                                Deadline: {scholarship.deadline}
                                            </span>
                                        </div>
                                    </div>
                                    <div className="card-actions justify-end mt-4">
                                        <a 
                                            href={scholarship.link} 
                                            className="btn btn-primary btn-sm gap-2"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Apply Now <FaExternalLinkAlt className="text-xs" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* All Scholarships Grid */}
                <div>
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">All Scholarships</h2>
                        <p className="text-gray-600">Found {filteredScholarships.length} scholarships</p>
                    </div>

                    {filteredScholarships.length === 0 ? (
                        <div className="text-center py-12 bg-white rounded-lg">
                            <p className="text-gray-500">No scholarships found matching your criteria</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredScholarships.map(scholarship => (
                                <div key={scholarship.id} className="card bg-base-100 shadow-md hover:shadow-xl transition-all duration-300">
                                    <figure className="relative h-40">
                                        <img 
                                            src={scholarship.image} 
                                            alt={scholarship.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <button
                                            onClick={() => handleFavorite(scholarship.id)}
                                            className="absolute top-2 right-2 btn btn-circle btn-xs bg-white/90"
                                        >
                                            {favorites.includes(scholarship.id) ? (
                                                <FaHeart className="text-red-500 text-sm" />
                                            ) : (
                                                <FaRegHeart className="text-gray-600 text-sm" />
                                            )}
                                        </button>
                                    </figure>
                                    <div className="card-body p-4">
                                        <div className="flex items-center justify-between mb-2">
                                            <div className="flex items-center gap-1">
                                                <span>{scholarship.flag}</span>
                                                <span className="text-xs text-gray-600">{scholarship.country}</span>
                                            </div>
                                            {scholarship.popular && (
                                                <span className="badge badge-sm badge-warning">Popular</span>
                                            )}
                                        </div>
                                        <h3 className="font-bold text-md line-clamp-1">{scholarship.title}</h3>
                                        <div className="flex items-center gap-2 text-xs text-gray-600">
                                            <FaUniversity />
                                            <span className="line-clamp-1">{scholarship.university}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-green-600 font-semibold">
                                            <FaMoneyBillWave />
                                            <span>{scholarship.coverage}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs text-red-500">
                                            <FaCalendarAlt />
                                            <span>{getTimeRemaining(scholarship.deadline)}</span>
                                        </div>
                                        <div className="card-actions justify-end mt-2">
                                            <a 
                                                href={scholarship.link} 
                                                className="btn btn-primary btn-xs gap-1"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                View Details <FaExternalLinkAlt className="text-xs" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Newsletter Section */}
                <div className="mt-12 bg-gradient-to-r from-primary to-secondary rounded-lg p-8 text-white text-center">
                    <h3 className="text-2xl font-bold mb-2">Get Scholarship Alerts</h3>
                    <p className="mb-4">Subscribe to receive the latest scholarship opportunities</p>
                    <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="Your email address"
                            className="flex-1 px-4 py-2 rounded-lg text-gray-900"
                        />
                        <button className="btn bg-white text-primary hover:bg-gray-100">
                            Subscribe
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Scholarship;