import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileText, ChevronRight, Search, Globe, GraduationCap, BookOpen,
  Users, Award, Sparkles, CheckCircle, Calendar, DollarSign, Clock,
  TrendingUp, MapPin, Building, Briefcase
} from 'lucide-react';

const CountryDocuments = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/countryDocuments.json');
        const data = await response.json();
        // Since data is now an array, use it directly
        setCountries(data);
      } catch (error) {
        console.error('Error loading country data:', error);
        // Fallback data
        setCountries([
          {
            id: 'uk',
            name: 'United Kingdom',
            flag: '🇬🇧',
            flagCode: 'gb',
            description: 'UK Student Visa & Admission Guide',
            quickFacts: [
              { label: 'Universities', value: '150+', icon: '🏛️' },
              { label: 'PSW Duration', value: '2 Years', icon: '⏰' }
            ],
            meta: {
              intakes: ['September', 'January', 'May']
            }
          }
        ]);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getFlagColor = (flagCode) => {
    const colors = {
      gb: 'from-blue-600 to-blue-800',
      cn: 'from-red-600 to-red-800',
      dk: 'from-red-500 to-red-700',
      us: 'from-blue-700 to-blue-900',
      ca: 'from-red-600 to-red-800',
      au: 'from-blue-600 to-blue-800',
      de: 'from-yellow-600 to-black'
    };
    return colors[flagCode] || 'from-indigo-600 to-blue-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Loading country documents...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 mt-24">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 px-6 py-2 rounded-full mb-4">
            <Globe size={18} className="text-indigo-600" />
            <span className="text-sm font-semibold">Study Abroad Documentation</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Country Documents & <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Visa Guides
            </span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Access comprehensive documentation and visa guides for your dream study destination
          </p>
        </div>

        {/* Search */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search by country name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm text-slate-800"
            />
          </div>
        </div>

        {/* Countries Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCountries.map((country) => (
            <div
              key={country.id}
              onClick={() => navigate(`/country-documents/${country.id}`, { state: { country } })}
              className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-500 overflow-hidden cursor-pointer border border-slate-200 hover:border-indigo-200 transform hover:-translate-y-2"
            >
              {/* Header */}
              <div className={`p-5 bg-gradient-to-r ${getFlagColor(country.flagCode)} relative overflow-hidden min-h-[120px]`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-5xl">{country.flag}</span>
                      <div>
                        <h3 className="text-xl font-bold text-white">{country.name}</h3>
                        <span className="text-white/70 text-sm font-medium">{country.flagCode?.toUpperCase()}</span>
                      </div>
                    </div>
                    <ChevronRight className="text-white/50 group-hover:text-white transition-all duration-300 group-hover:translate-x-1" size={24} />
                  </div>
                  <p className="text-white/90 text-sm mt-2 line-clamp-2">{country.description}</p>
                </div>
              </div>

              {/* Quick Facts */}
              <div className="p-4 border-b border-slate-100">
                <div className="grid grid-cols-2 gap-2">
                  {country.quickFacts?.slice(0, 2).map((fact, idx) => (
                    <div key={idx} className="flex items-center gap-1.5 text-xs">
                      <span>{fact.icon}</span>
                      <span className="text-slate-700 font-medium">{fact.value}</span>
                      <span className="text-slate-400 text-[10px]">{fact.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Intakes */}
              <div className="px-4 pt-3">
                <div className="flex flex-wrap gap-1.5">
                  {country.meta?.intakes?.slice(0, 3).map((intake, idx) => (
                    <span key={idx} className="text-[10px] bg-indigo-50 text-indigo-700 px-2 py-1 rounded-full font-medium">
                      {intake}
                    </span>
                  ))}
                </div>
              </div>

              {/* View Button */}
              <div className="p-4">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/country-documents/${country.id}`, { state: { country } });
                  }}
                  className="w-full py-2.5 bg-slate-900 hover:bg-indigo-600 text-white font-semibold rounded-xl transition-all duration-300 text-sm flex items-center justify-center gap-2 group"
                >
                  View Details
                  <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredCountries.length === 0 && (
          <div className="text-center py-12">
            <Globe size={48} className="mx-auto text-slate-300 mb-4" />
            <h3 className="text-xl font-bold text-slate-800 mb-2">No Countries Found</h3>
            <p className="text-slate-500">Try adjusting your search term</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryDocuments;