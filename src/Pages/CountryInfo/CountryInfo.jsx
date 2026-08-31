import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Globe, GraduationCap, Clock, DollarSign, Users,
  ChevronRight, MapPin, BookOpen, Award, TrendingUp,
  Calendar, Briefcase, CheckCircle, Filter, X
} from 'lucide-react';

const CountryInfo = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/partnerData.json');
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error('Error loading country data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const categories = [
    { id: 'all', label: 'All Countries' },
    { id: 'europe', label: 'Europe' },
    { id: 'north_america', label: 'North America' },
    { id: 'oceania', label: 'Oceania' },
    { id: 'asia', label: 'Asia' }
  ];

  const educationLevels = [
    { id: 'all', label: 'All Levels' },
    { id: 'bachelor', label: 'Bachelor' },
    { id: 'master', label: 'Master' }
  ];

  const filteredCountries = countries.filter(country => {
    const matchesSearch = country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.bestFit.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || country.category === selectedCategory;
    const matchesLevel = selectedLevel === 'all' || country.educationLevels?.includes(selectedLevel);
    return matchesSearch && matchesCategory && matchesLevel;
  });

  const getFlagColor = (flagCode) => {
    const colors = {
      gb: 'from-blue-600 to-blue-800',
      ie: 'from-green-600 to-green-800',
      us: 'from-blue-700 to-blue-900',
      ca: 'from-red-600 to-red-800',
      au: 'from-blue-600 to-blue-800',
      nz: 'from-red-500 to-blue-700',
      dk: 'from-red-500 to-red-700',
      cn: 'from-red-600 to-red-800'
    };
    return colors[flagCode] || 'from-indigo-600 to-blue-600';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Loading country information...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-10 mt-24">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 px-6 py-2 rounded-full mb-4">
            <Globe size={18} className="text-indigo-600" />
            <span className="text-sm font-semibold">Study Abroad Destinations</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Country Information <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Quick Reference Guide
            </span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Essential information for our B2B partners and franchise network
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="Search by country or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            {/* Category Filter */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                    selectedCategory === cat.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
            
            {/* Level Filter */}
            <div className="flex gap-2">
              {educationLevels.map((level) => (
                <button
                  key={level.id}
                  onClick={() => setSelectedLevel(level.id)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                    selectedLevel === level.id
                      ? 'bg-indigo-600 text-white shadow-md'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {level.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Country Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredCountries.map((country) => (
            <div
              key={country.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 hover:border-indigo-200"
            >
              {/* Header */}
              <div className={`p-5 bg-gradient-to-r ${getFlagColor(country.flagCode)} text-white`}>
                <div className="flex items-center gap-4">
                  <span className="text-5xl">{country.flag}</span>
                  <div>
                    <h3 className="text-2xl font-bold">{country.name}</h3>
                    <p className="text-white/80 text-sm">{country.bestFit}</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 space-y-4">
                {/* Quick Stats */}
                <div className="flex flex-wrap gap-3">
                  {country.visaSuccessRate && (
                    <span className="px-3 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-200">
                      ✅ Visa: {country.visaSuccessRate}
                    </span>
                  )}
                  {country.universities && (
                    <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs font-medium border border-blue-200">
                      🏛️ {country.universities}
                    </span>
                  )}
                </div>

                {/* Bachelor Info */}
                {country.bachelor && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                      <GraduationCap size={16} className="text-indigo-600" />
                      Bachelor's
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1 text-slate-600">
                        <Clock size={14} /> {country.bachelor.duration}
                      </div>
                      <div className="flex items-center gap-1 text-slate-600">
                        <DollarSign size={14} /> {country.bachelor.tuitionRange}
                      </div>
                      <div className="flex items-center gap-1 text-slate-600">
                        <Calendar size={14} /> {country.bachelor.intakes}
                      </div>
                      <div className="flex items-center gap-1 text-slate-600">
                        <Briefcase size={14} /> {country.bachelor.workRights}
                      </div>
                    </div>
                  </div>
                )}

                {/* Master Info */}
                {country.master && (
                  <div>
                    <h4 className="text-sm font-bold text-slate-800 mb-2 flex items-center gap-2">
                      <Award size={16} className="text-purple-600" />
                      Master's
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                      <div className="flex items-center gap-1 text-slate-600">
                        <Clock size={14} /> {country.master.duration}
                      </div>
                      <div className="flex items-center gap-1 text-slate-600">
                        <DollarSign size={14} /> {country.master.tuitionRange}
                      </div>
                      <div className="flex items-center gap-1 text-slate-600">
                        <Calendar size={14} /> {country.master.intakes}
                      </div>
                      <div className="flex items-center gap-1 text-slate-600">
                        <Briefcase size={14} /> {country.master.workRights}
                      </div>
                    </div>
                  </div>
                )}

                {/* Entry Requirements */}
                <div className="bg-slate-50 rounded-xl p-3">
                  <div className="text-xs">
                    <span className="font-medium text-slate-700">Entry Requirements:</span>
                    <span className="text-slate-600 ml-1">
                      {country.bachelor?.entryRequirement || country.master?.entryRequirement}
                    </span>
                  </div>
                  <div className="text-xs mt-1">
                    <span className="font-medium text-slate-700">English:</span>
                    <span className="text-slate-600 ml-1">
                      {country.bachelor?.englishRequirement || country.master?.englishRequirement}
                    </span>
                  </div>
                </div>

                {/* View Details Button */}
                <button
                  onClick={() => navigate(`/country-details/${country.id}`, { state: { country } })}
                  className="w-full py-2.5 bg-slate-900 hover:bg-indigo-600 text-white font-semibold rounded-xl transition-all duration-300 text-sm flex items-center justify-center gap-2 group"
                >
                  View Full Details
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
            <p className="text-slate-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CountryInfo;