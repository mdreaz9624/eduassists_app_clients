import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, 
  FaCalendarAlt, 
  FaMoneyBillWave, 
  FaUniversity, 
  FaGraduationCap,
  FaCheckCircle,
  FaTimesCircle,
  FaExternalLinkAlt,
  FaHeart,
  FaRegHeart,
  FaShare,
  FaPrint
} from "react-icons/fa";

const ScholarshipDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [scholarship, setScholarship] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const fetchScholarship = async () => {
            try {
                const response = await fetch('/scholarshipsData.json');
                const data = await response.json();
                const found = data.scholarships.find(s => s.id === parseInt(id));
                setScholarship(found);
                
                // Check if favorite
                const favorites = JSON.parse(localStorage.getItem("favoriteScholarships") || "[]");
                setIsFavorite(favorites.includes(found?.id));
            } catch (error) {
                console.error("Error loading scholarship:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchScholarship();
    }, [id]);

    const handleFavorite = () => {
        const favorites = JSON.parse(localStorage.getItem("favoriteScholarships") || "[]");
        let newFavorites;
        
        if (isFavorite) {
            newFavorites = favorites.filter(favId => favId !== scholarship.id);
        } else {
            newFavorites = [...favorites, scholarship.id];
        }
        
        localStorage.setItem("favoriteScholarships", JSON.stringify(newFavorites));
        setIsFavorite(!isFavorite);
    };

    const handleShare = () => {
        navigator.share({
            title: scholarship.title,
            text: scholarship.description,
            url: window.location.href
        }).catch(() => {
            navigator.clipboard.writeText(window.location.href);
            alert("Link copied to clipboard!");
        });
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        );
    }

    if (!scholarship) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Scholarship Not Found</h2>
                    <button onClick={() => navigate("/scholarship")} className="btn btn-primary mt-4">
                        Back to Scholarships
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="container mx-auto max-w-5xl">
                {/* Back Button */}
                <button
                    onClick={() => navigate("/scholarship")}
                    className="btn btn-ghost gap-2 mb-6"
                >
                    <FaArrowLeft /> Back to Scholarships
                </button>

                {/* Main Card */}
                <div className="bg-white rounded-lg shadow-xl overflow-hidden">
                    {/* Hero Image */}
                    <div className="relative h-64 md:h-96">
                        <img 
                            src={scholarship.image} 
                            alt={scholarship.title}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                            <div className="flex items-center gap-2 mb-2">
                                <span className="text-3xl">{scholarship.flag}</span>
                                <h1 className="text-2xl md:text-4xl font-bold">{scholarship.title}</h1>
                            </div>
                            <p className="text-sm md:text-base opacity-95">{scholarship.university}</p>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-between items-center p-6 border-b">
                        <div className="flex gap-3">
                            <button
                                onClick={handleFavorite}
                                className="btn btn-outline btn-primary gap-2"
                            >
                                {isFavorite ? <FaHeart className="text-red-500" /> : <FaRegHeart />}
                                {isFavorite ? "Saved" : "Save"}
                            </button>
                            <button
                                onClick={handleShare}
                                className="btn btn-outline btn-secondary gap-2"
                            >
                                <FaShare /> Share
                            </button>
                            <button
                                onClick={() => window.print()}
                                className="btn btn-outline gap-2"
                            >
                                <FaPrint /> Print
                            </button>
                        </div>
                        <a 
                            href={scholarship.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-primary gap-2"
                        >
                            Apply Now <FaExternalLinkAlt />
                        </a>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                        {/* Key Information Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                            <div className="bg-blue-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-blue-600 mb-2">
                                    <FaMoneyBillWave />
                                    <span className="font-semibold">Funding Type</span>
                                </div>
                                <p className="text-lg font-bold text-blue-800">{scholarship.funding}</p>
                                <p className="text-sm text-blue-600">{scholarship.coverage}</p>
                            </div>
                            <div className="bg-green-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-green-600 mb-2">
                                    <FaCalendarAlt />
                                    <span className="font-semibold">Deadline</span>
                                </div>
                                <p className="text-lg font-bold text-green-800">{scholarship.deadline}</p>
                                <p className="text-sm text-green-600">Don't miss this opportunity</p>
                            </div>
                            <div className="bg-purple-50 rounded-lg p-4">
                                <div className="flex items-center gap-2 text-purple-600 mb-2">
                                    <FaGraduationCap />
                                    <span className="font-semibold">Degree Level</span>
                                </div>
                                <p className="text-lg font-bold text-purple-800">{scholarship.degree}</p>
                            </div>
                        </div>

                        {/* Description */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-4">About this Scholarship</h2>
                            <p className="text-gray-700 leading-relaxed">{scholarship.description}</p>
                        </div>

                        {/* Requirements */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-4">Eligibility Requirements</h2>
                            <ul className="space-y-2">
                                {scholarship.requirements.map((req, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                        <span className="text-gray-700">{req}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Benefits */}
                        <div className="mb-8">
                            <h2 className="text-xl font-bold mb-4">Scholarship Benefits</h2>
                            <ul className="space-y-2">
                                {scholarship.benefits.map((benefit, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                        <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                                        <span className="text-gray-700">{benefit}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* How to Apply */}
                        <div className="bg-gray-100 rounded-lg p-6">
                            <h2 className="text-xl font-bold mb-4">How to Apply</h2>
                            <p className="text-gray-700 mb-4">
                                To apply for this scholarship, visit the official website and submit your application before the deadline.
                            </p>
                            <a 
                                href={scholarship.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn btn-primary gap-2"
                            >
                                Visit Official Website <FaExternalLinkAlt />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScholarshipDetails;