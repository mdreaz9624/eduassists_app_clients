import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, TrendingUp, DollarSign, ArrowRight } from 'lucide-react';
import universitiesData from '../../../public/universities.json';

const FeaturedUniversities = () => {
  const navigate = useNavigate();
  const [universities, setUniversities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading delay for better UX
    setTimeout(() => {
      // Filter featured universities from JSON data
      const featuredUnis = universitiesData.universities.filter(uni => uni.featured === true);
      setUniversities(featuredUnis);
      setLoading(false);
    }, 500);
  }, []);

  const handleViewAll = () => {
    navigate('/universities');
  };

  const handleUniversityClick = (uniId) => {
    navigate(`/university-details/${uniId}`);
  };

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-wider">
              Top Institutions
            </span>
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-2">
              Featured Universities
            </h2>
            <div className="w-20 h-1 bg-blue-600 mt-4 rounded-full"></div>
          </div>
          <button
            onClick={handleViewAll}
            className="inline-flex items-center gap-2 text-blue-600 font-semibold hover:gap-3 transition-all duration-300 text-sm group"
          >
            View all universities 
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden animate-pulse shadow-sm">
                <div className="h-48 bg-gray-200" />
                <div className="p-6 space-y-3">
                  <div className="h-5 bg-gray-200 rounded w-3/4" />
                  <div className="h-4 bg-gray-100 rounded w-1/2" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-2/3" />
                  <div className="flex gap-4 pt-4">
                    <div className="h-4 bg-gray-100 rounded w-1/3" />
                    <div className="h-4 bg-gray-100 rounded w-1/3" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Universities Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {universities.map((uni) => (
              <div
                key={uni.id}
                className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 hover:-translate-y-2"
                onClick={() => handleUniversityClick(uni.id)}
              >
                {/* Image Section */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={uni.image_url}
                    alt={uni.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  {/* Country Flag Overlay */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-white/95 backdrop-blur-sm text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full shadow-sm">
                      #{uni.ranking} World Ranking
                    </span>
                  </div>
                  {/* Country Badge */}
                  <div className="absolute bottom-3 right-3">
                    <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full">
                      {uni.country}
                    </span>
                  </div>
                </div>

                {/* Content Section */}
                <div className="p-6">
                  <h3 className="font-bold text-gray-900 text-lg mb-1 group-hover:text-blue-600 transition-colors duration-300">
                    {uni.name}
                  </h3>
                  
                  <div className="flex items-center gap-1 text-gray-500 text-sm mb-3">
                    <MapPin className="w-3.5 h-3.5" />
                    {uni.city}, {uni.country}
                  </div>
                  
                  <p className="text-sm text-gray-500 line-clamp-2 mb-4">
                    {uni.description}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-4 border-t border-gray-100">
                    <span className="flex items-center gap-1">
                      <TrendingUp className="w-3.5 h-3.5 text-green-500" />
                      <span className="font-semibold text-gray-700">{uni.acceptance_rate}%</span>
                      <span className="text-gray-400">acceptance</span>
                    </span>
                    <span className="flex items-center gap-1">
                      <DollarSign className="w-3.5 h-3.5 text-blue-500" />
                      <span className="font-semibold text-gray-700">
                        ${(uni.tuition_min / 1000).toFixed(0)}k
                      </span>
                      <span className="text-gray-400">–</span>
                      <span className="font-semibold text-gray-700">
                        ${(uni.tuition_max / 1000).toFixed(0)}k
                      </span>
                      <span className="text-gray-400">/yr</span>
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Bottom Call to Action */}
        {!loading && universities.length > 0 && (
          <div className="text-center mt-12">
            <button
              onClick={handleViewAll}
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-all duration-300 shadow-md hover:shadow-lg group"
            >
              Explore All Universities
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedUniversities;