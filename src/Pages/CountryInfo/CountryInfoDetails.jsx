import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Download,
  FileText,
  GraduationCap,
  Users,
  BookOpen,
  CheckCircle,
  Globe,
  MessageCircle,
  Calendar as CalendarIcon,
  Award,
  Clock,
  DollarSign,
  Shield,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Building,
  MapPin,
  Briefcase,
  Heart,
  ExternalLink,
  TrendingUp,
  Info,
  HelpCircle,
  Target,
  Zap,
  Mail,
  Phone,
  Star,
  BarChart,
  PieChart,
  Copy,
  Share2,
  Printer
} from 'lucide-react';

const CountryInfoDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();
  const [country, setCountry] = useState(location.state?.country || null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState({});
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!country) {
      const fetchCountry = async () => {
        try {
          // Try to fetch from partnerData.json first
          let response = await fetch('/partnerData.json');
          if (!response.ok) {
            throw new Error('Failed to fetch partner data');
          }
          const data = await response.json();
          const found = data.find(c => c.id === id);
          
          if (found) {
            setCountry(found);
          } else {
            // Fallback to countryDocuments.json
            const docResponse = await fetch('/countryDocuments.json');
            const docData = await docResponse.json();
            const docFound = docData.find(c => c.id === id);
            if (docFound) {
              setCountry(docFound);
            }
          }
        } catch (error) {
          console.error('Error fetching country:', error);
          // Use fallback data
          setCountry(getFallbackCountry(id));
        } finally {
          setLoading(false);
        }
      };
      fetchCountry();
    } else {
      setLoading(false);
    }
  }, [country, id]);

  const getFallbackCountry = (countryId) => {
    const fallbackCountries = {
      'uk': {
        id: 'uk',
        name: 'United Kingdom',
        flag: '🇬🇧',
        flagCode: 'gb',
        description: 'UK Student Visa & Admission Guide',
        bestFit: 'Students wanting a broad university choice, prestigious degrees and the 2-year Graduate Route.',
        meta: {
          currency: 'GBP',
          currencySymbol: '£',
          language: 'English',
          intakes: ['September', 'January', 'May'],
          popularCities: ['London', 'Manchester', 'Birmingham', 'Glasgow', 'Bristol']
        },
        quickFacts: [
          { label: 'Universities', value: '170+', icon: '🏛️' },
          { label: 'PSW Duration', value: '2 Years', icon: '⏰' },
          { label: 'Work Permit', value: '20 hrs/week', icon: '💼' },
          { label: 'Visa Success', value: '95%', icon: '✅' }
        ],
        bachelor: {
          duration: '3-4 years',
          entryRequirement: 'HSC/12th: 55-70%+; A-Levels/IB accepted',
          englishRequirement: 'IELTS 6.0-6.5 (5.5 min each) | PTE | Duolingo',
          tuitionRange: '£12,000 - £25,000 / year',
          intakes: 'September (primary), January (limited), May',
          workRights: '20 hrs/week in term; full-time in holidays'
        },
        master: {
          duration: '1-Year Master\'s programs',
          entryRequirement: 'Entry from CGPA 2.5+ / IELTS 6.0',
          englishRequirement: 'IELTS 6.0-6.5 | PTE | Duolingo | TOEFL',
          tuitionRange: 'From £14,000/year',
          intakes: 'January, May & September',
          workRights: '2-Year Post-Study Work Permit'
        }
      },
      'china': {
        id: 'china',
        name: 'China',
        flag: '🇨🇳',
        flagCode: 'cn',
        description: 'Bachelor programs with scholarship opportunities',
        bestFit: 'Students interested in Asian markets, Mandarin, and highly affordable, scholarship-backed study.',
        meta: {
          currency: 'CNY',
          currencySymbol: '¥',
          language: 'Chinese/English',
          intakes: ['September', 'February'],
          popularCities: ['Beijing', 'Shanghai', 'Nanjing', 'Guangzhou']
        },
        quickFacts: [
          { label: 'Universities', value: '35+', icon: '🏛️' },
          { label: 'Scholarships', value: '100% Available', icon: '💰' },
          { label: 'Work Permit', value: 'Part-time allowed', icon: '💼' },
          { label: 'Visa Success', value: '80%', icon: '✅' }
        ],
        bachelor: {
          duration: '4 years',
          entryRequirement: 'HSC/12th: 60%+; HSK 4+ for Chinese-taught',
          englishRequirement: 'IELTS 5.5-6.0 (English-taught) | HSK 4 (Chinese)',
          tuitionRange: 'RMB 20,000 - RMB 40,000 / year (~$3,000-6,000)',
          intakes: 'September (primary), February (secondary)',
          workRights: 'On-campus work; internships with approval'
        }
      }
    };
    return fallbackCountries[countryId] || fallbackCountries['uk'];
  };

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${country.name} - Study Abroad Guide`,
        text: `Check out study opportunities in ${country.name}`,
        url: window.location.href
      });
    }
  };

  const handlePrint = () => {
    window.print();
  };

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
          <p className="text-gray-600">Loading country details...</p>
        </div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center mt-24">
        <div className="text-center">
          <Globe size={48} className="mx-auto text-slate-300 mb-4" />
          <h3 className="text-xl font-bold text-slate-800 mb-2">Country Not Found</h3>
          <p className="text-slate-500 mb-4">The country you're looking for doesn't exist or has been removed.</p>
          <button onClick={() => navigate('/country-info')} className="text-indigo-600 hover:underline font-semibold">
            Back to Countries
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 px-4 py-8">
      <div className="max-w-6xl mx-auto mt-24">
        
        {/* Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <button
            onClick={() => navigate('/country-info')}
            className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-semibold transition-colors bg-white px-4 py-2 rounded-xl shadow-sm hover:shadow"
          >
            <ArrowLeft size={18} />
            Back to Countries
          </button>
          
          <div className="flex items-center gap-2">
            <button
              onClick={handleShare}
              className="p-2 bg-white rounded-xl shadow-sm hover:shadow text-slate-600 hover:text-indigo-600 transition"
              title="Share"
            >
              <Share2 size={18} />
            </button>
            <button
              onClick={handlePrint}
              className="p-2 bg-white rounded-xl shadow-sm hover:shadow text-slate-600 hover:text-indigo-600 transition"
              title="Print"
            >
              <Printer size={18} />
            </button>
            <button
              onClick={() => handleCopy(window.location.href)}
              className="p-2 bg-white rounded-xl shadow-sm hover:shadow text-slate-600 hover:text-indigo-600 transition relative"
              title="Copy Link"
            >
              <Copy size={18} />
              {copied && (
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded">
                  Copied!
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Country Header */}
        <div className={`bg-gradient-to-r ${getFlagColor(country.flagCode)} rounded-3xl p-8 md:p-10 text-white relative overflow-hidden shadow-xl mb-8`}>
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="flex items-center gap-4">
                <span className="text-7xl md:text-8xl">{country.flag}</span>
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold">{country.name}</h1>
                  <p className="text-white/80 text-lg mt-1">{country.description || country.bestFit}</p>
                </div>
              </div>
              <div className="md:ml-auto flex flex-wrap gap-3">
                {country.quickFacts?.slice(0, 2).map((fact, idx) => (
                  <span key={idx} className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold flex items-center gap-1">
                    {fact.icon} {fact.value}
                  </span>
                ))}
                <span className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold">
                  🌍 {country.flagCode?.toUpperCase()}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {country.quickFacts?.map((fact, idx) => (
            <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 text-center hover:shadow-md transition">
              <div className="text-2xl mb-1">{fact.icon}</div>
              <div className="text-lg font-bold text-slate-800">{fact.value}</div>
              <div className="text-xs text-slate-500">{fact.label}</div>
            </div>
          ))}
          {country.meta?.intakes && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 text-center hover:shadow-md transition">
              <CalendarIcon size={24} className="mx-auto text-indigo-600 mb-1" />
              <div className="text-lg font-bold text-slate-800">{country.meta.intakes.length}</div>
              <div className="text-xs text-slate-500">Intakes</div>
            </div>
          )}
          {country.scholarships?.available && (
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4 text-center hover:shadow-md transition">
              <Award size={24} className="mx-auto text-indigo-600 mb-1" />
              <div className="text-lg font-bold text-slate-800">✓</div>
              <div className="text-xs text-slate-500">Scholarships</div>
            </div>
          )}
        </div>

        {/* Best Fit Section */}
        {country.bestFit && (
          <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-4 mb-8 border border-indigo-100">
            <div className="flex items-start gap-3">
              <Target size={20} className="text-indigo-600 flex-shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-indigo-800 text-sm">Best Fit:</span>
                <span className="text-slate-700 text-sm ml-2">{country.bestFit}</span>
              </div>
            </div>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="flex overflow-x-auto border-b border-slate-200">
            {['overview', 'bachelor', 'master', 'requirements', 'cost', 'faq'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-semibold capitalize whitespace-nowrap transition-all ${
                  activeTab === tab
                    ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/50'
                    : 'text-slate-500 hover:text-indigo-600 hover:bg-slate-50'
                }`}
              >
                {tab === 'overview' && '📋 Overview'}
                {tab === 'bachelor' && '🎓 Bachelor'}
                {tab === 'master' && '🎓 Master'}
                {tab === 'requirements' && '📚 Requirements'}
                {tab === 'cost' && '💰 Cost'}
                {tab === 'faq' && '❓ FAQ'}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Popular Cities */}
                {country.meta?.popularCities && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <MapPin size={20} className="text-indigo-600" />
                      Popular Cities
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {country.meta.popularCities.map((city, idx) => (
                        <span key={idx} className="px-4 py-2 bg-slate-50 text-slate-700 rounded-xl text-sm border border-slate-200">
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Intakes */}
                {country.meta?.intakes && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <CalendarIcon size={20} className="text-indigo-600" />
                      Available Intakes
                    </h3>
                    <div className="flex flex-wrap gap-3">
                      {country.meta.intakes.map((intake, idx) => (
                        <span key={idx} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-medium border border-indigo-100">
                          {intake}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Information */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Info size={20} className="text-indigo-600" />
                    Key Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {country.meta?.currency && (
                      <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-3">
                        <DollarSign size={18} className="text-indigo-600" />
                        <div>
                          <div className="text-xs text-slate-500">Currency</div>
                          <div className="font-medium text-slate-800">{country.meta.currency} ({country.meta.currencySymbol})</div>
                        </div>
                      </div>
                    )}
                    {country.meta?.language && (
                      <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-3">
                        <Globe size={18} className="text-indigo-600" />
                        <div>
                          <div className="text-xs text-slate-500">Language</div>
                          <div className="font-medium text-slate-800">{country.meta.language}</div>
                        </div>
                      </div>
                    )}
                    {country.visaSuccessRate && (
                      <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-3">
                        <Shield size={18} className="text-indigo-600" />
                        <div>
                          <div className="text-xs text-slate-500">Visa Success Rate</div>
                          <div className="font-medium text-slate-800">{country.visaSuccessRate}</div>
                        </div>
                      </div>
                    )}
                    {country.studentsPlaced && (
                      <div className="bg-slate-50 rounded-xl p-3 flex items-center gap-3">
                        <Users size={18} className="text-indigo-600" />
                        <div>
                          <div className="text-xs text-slate-500">Students Placed</div>
                          <div className="font-medium text-slate-800">{country.studentsPlaced}+</div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Universities */}
                {country.universities && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <Building size={20} className="text-indigo-600" />
                      Universities
                    </h3>
                    <div className="bg-slate-50 rounded-xl p-4">
                      <p className="text-slate-700">{country.universities}</p>
                    </div>
                  </div>
                )}

                {/* Partner Universities */}
                {country.partnerUniversities && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <Star size={20} className="text-indigo-600" />
                      Partner Universities
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {country.partnerUniversities.slice(0, 6).map((uni, idx) => (
                        <div key={idx} className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                          <div className="font-medium text-slate-800 text-sm">{uni.name}</div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                            <MapPin size={12} /> {uni.location}
                            {uni.ranking && (
                              <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px]">
                                {uni.ranking}
                              </span>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Bachelor Tab */}
            {activeTab === 'bachelor' && country.bachelor && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100 mb-4">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <GraduationCap size={20} className="text-indigo-600" />
                    Bachelor's Program Information
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="text-xs text-slate-500">Duration</div>
                    <div className="font-bold text-slate-800">{country.bachelor.duration}</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="text-xs text-slate-500">Entry Requirement</div>
                    <div className="font-bold text-slate-800 text-sm">{country.bachelor.entryRequirement}</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="text-xs text-slate-500">English Requirement</div>
                    <div className="font-bold text-slate-800 text-sm">{country.bachelor.englishRequirement}</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="text-xs text-slate-500">Tuition Range</div>
                    <div className="font-bold text-slate-800">{country.bachelor.tuitionRange}</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="text-xs text-slate-500">Intakes</div>
                    <div className="font-bold text-slate-800 text-sm">{country.bachelor.intakes}</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="text-xs text-slate-500">Work Rights</div>
                    <div className="font-bold text-slate-800 text-sm">{country.bachelor.workRights}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Master Tab */}
            {activeTab === 'master' && country.master && (
              <div className="space-y-4">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100 mb-4">
                  <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                    <Award size={20} className="text-purple-600" />
                    Master's Program Information
                  </h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="text-xs text-slate-500">Duration</div>
                    <div className="font-bold text-slate-800">{country.master.duration}</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="text-xs text-slate-500">Entry Requirement</div>
                    <div className="font-bold text-slate-800 text-sm">{country.master.entryRequirement}</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="text-xs text-slate-500">English Requirement</div>
                    <div className="font-bold text-slate-800 text-sm">{country.master.englishRequirement}</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="text-xs text-slate-500">Tuition Range</div>
                    <div className="font-bold text-slate-800">{country.master.tuitionRange}</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="text-xs text-slate-500">Intakes</div>
                    <div className="font-bold text-slate-800 text-sm">{country.master.intakes}</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 border border-slate-200">
                    <div className="text-xs text-slate-500">Work Rights</div>
                    <div className="font-bold text-slate-800 text-sm">{country.master.workRights}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Requirements Tab */}
            {activeTab === 'requirements' && (
              <div className="space-y-6">
                {/* General Requirements */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Target size={20} className="text-indigo-600" />
                    General Entry Requirements
                  </h3>
                  <div className="bg-slate-50 rounded-xl p-4 space-y-2">
                    <div className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-slate-700">Academic:</span>
                        <span className="text-slate-600 ml-1">
                          {country.bachelor?.entryRequirement || country.master?.entryRequirement || 'Varies by program'}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-medium text-slate-700">English:</span>
                        <span className="text-slate-600 ml-1">
                          {country.bachelor?.englishRequirement || country.master?.englishRequirement || 'IELTS/TOEFL required'}
                        </span>
                      </div>
                    </div>
                    {country.bachelor?.ageLimit && (
                      <div className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-slate-700">Age Limit:</span>
                          <span className="text-slate-600 ml-1">{country.bachelor.ageLimit}</span>
                        </div>
                      </div>
                    )}
                    {country.master?.gpa && (
                      <div className="flex items-start gap-3">
                        <CheckCircle size={18} className="text-green-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-medium text-slate-700">Minimum GPA:</span>
                          <span className="text-slate-600 ml-1">{country.master.gpa}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Documents Checklist */}
                {country.documentChecklist?.categories && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                      <FileText size={20} className="text-indigo-600" />
                      Document Checklist
                    </h3>
                    <div className="space-y-3">
                      {country.documentChecklist.categories.map((category, idx) => (
                        <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                          <button
                            onClick={() => toggleSection(category.name)}
                            className="w-full p-3 text-left flex items-center justify-between hover:bg-slate-50 transition"
                          >
                            <div className="flex items-center gap-2">
                              <span>{category.icon}</span>
                              <span className="font-medium text-slate-800">{category.name}</span>
                              <span className="text-xs text-slate-400">({category.items?.length || 0})</span>
                            </div>
                            {expandedSections[category.name] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                          </button>
                          {expandedSections[category.name] && (
                            <div className="p-3 bg-slate-50 border-t border-slate-200 space-y-2">
                              {category.items?.map((item, itemIdx) => (
                                <div key={itemIdx} className="flex items-start gap-3 text-sm bg-white rounded-lg p-2">
                                  <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${
                                    item.priority === 'high' ? 'bg-red-500' :
                                    item.priority === 'medium' ? 'bg-yellow-500' :
                                    'bg-green-500'
                                  }`}></div>
                                  <div>
                                    <span className="font-medium text-slate-800">{item.name}</span>
                                    <p className="text-slate-500 text-xs">{item.requirement}</p>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Cost Tab */}
            {activeTab === 'cost' && country.costBreakdown && (
              <div className="space-y-6">
                <div className="bg-slate-50 rounded-xl p-4 flex flex-wrap items-center gap-4">
                  <p className="text-sm text-slate-600">Currency: <strong>{country.costBreakdown.currency}</strong></p>
                  {country.costBreakdown.exchangeRate && (
                    <p className="text-sm text-slate-600">Exchange Rate: <strong>{country.costBreakdown.exchangeRate}</strong></p>
                  )}
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-slate-100">
                        <th className="p-3 text-left font-semibold text-slate-700">Category</th>
                        <th className="p-3 text-left font-semibold text-slate-700">Amount</th>
                        <th className="p-3 text-left font-semibold text-slate-700">Notes</th>
                        <th className="p-3 text-left font-semibold text-slate-700">Timing</th>
                      </tr>
                    </thead>
                    <tbody>
                      {country.costBreakdown.items?.map((item, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                          <td className="p-3 text-slate-700 font-medium">{item.category}</td>
                          <td className="p-3 text-slate-800 font-bold">{item.amount}</td>
                          <td className="p-3 text-slate-500 text-xs">{item.notes}</td>
                          <td className="p-3 text-slate-500 text-xs">{item.timing}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {country.costBreakdown.livingCost && (
                  <div className="bg-indigo-50 rounded-xl p-4 border border-indigo-100">
                    <h4 className="font-bold text-indigo-800 mb-2">💡 Living Cost</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-indigo-700">Monthly: {country.costBreakdown.livingCost.monthly}</p>
                        <p className="text-sm text-indigo-700">Annual: {country.costBreakdown.livingCost.annual}</p>
                        <p className="text-xs text-indigo-600 mt-1">{country.costBreakdown.livingCost.notes}</p>
                      </div>
                      {country.costBreakdown.livingCost.breakdown && (
                        <div>
                          <p className="text-xs font-medium text-indigo-700 mb-1">Breakdown:</p>
                          {country.costBreakdown.livingCost.breakdown.map((item, idx) => (
                            <div key={idx} className="flex justify-between text-xs text-indigo-600">
                              <span>{item.item}</span>
                              <span>{item.amount}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* FAQ Tab */}
            {activeTab === 'faq' && (
              <div className="space-y-4">
                {country.faqs?.map((faq, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleSection(`faq-${idx}`)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50 transition"
                    >
                      <div className="flex items-start gap-2">
                        <HelpCircle size={18} className="text-indigo-600 flex-shrink-0 mt-0.5" />
                        <span className="font-medium text-slate-800">{faq.question}</span>
                      </div>
                      {expandedSections[`faq-${idx}`] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    {expandedSections[`faq-${idx}`] && (
                      <div className="p-4 bg-slate-50 border-t border-slate-200 text-sm text-slate-600">
                        {faq.answer}
                        {faq.category && (
                          <span className="inline-block mt-2 px-2 py-0.5 bg-indigo-100 text-indigo-700 rounded-full text-xs">
                            {faq.category}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                ))}
                {(!country.faqs || country.faqs.length === 0) && (
                  <div className="text-center py-8">
                    <HelpCircle size={48} className="mx-auto text-slate-300 mb-3" />
                    <p className="text-slate-500">No FAQs available for this country yet.</p>
                    <p className="text-sm text-slate-400">Contact our team for specific questions.</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Post-Visa Services */}
        {country.postVisaServices?.available && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Shield size={20} className="text-indigo-600" />
              Post-Visa Services
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {country.postVisaServices.services?.map((service, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-green-50 rounded-xl px-3 py-2 text-sm text-slate-700">
                  <CheckCircle size={14} className="text-green-600 flex-shrink-0" />
                  <span>{service.name}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Work Opportunities */}
        {country.workOpportunities && (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-8">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Briefcase size={20} className="text-indigo-600" />
              Work Opportunities
            </h3>
            
            {country.workOpportunities.duringStudies && (
              <div className="mb-4">
                <h4 className="font-medium text-slate-700 mb-2">During Studies</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="bg-slate-50 rounded-xl p-3">
                    <div className="text-xs text-slate-500">Part-time</div>
                    <div className="font-medium text-slate-800 text-sm">{country.workOpportunities.duringStudies.partTime}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3">
                    <div className="text-xs text-slate-500">Full-time</div>
                    <div className="font-medium text-slate-800 text-sm">{country.workOpportunities.duringStudies.fullTime}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3">
                    <div className="text-xs text-slate-500">Minimum Wage</div>
                    <div className="font-medium text-slate-800 text-sm">{country.workOpportunities.duringStudies.minWage}</div>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3">
                    <div className="text-xs text-slate-500">Monthly Earning</div>
                    <div className="font-medium text-slate-800 text-sm">{country.workOpportunities.duringStudies.monthlyEarning}</div>
                  </div>
                </div>
              </div>
            )}
            
            {country.workOpportunities.afterStudies && (
              <div>
                <h4 className="font-medium text-slate-700 mb-2">After Studies</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="bg-purple-50 rounded-xl p-3 border border-purple-100">
                    <div className="text-xs text-slate-500">Graduate Route</div>
                    <div className="font-medium text-slate-800 text-sm">{country.workOpportunities.afterStudies.graduateRoute}</div>
                  </div>
                  <div className="bg-purple-50 rounded-xl p-3 border border-purple-100">
                    <div className="text-xs text-slate-500">Work Type</div>
                    <div className="font-medium text-slate-800 text-sm">{country.workOpportunities.afterStudies.workType}</div>
                  </div>
                  {country.workOpportunities.afterStudies.salaryRange && (
                    <div className="bg-purple-50 rounded-xl p-3 border border-purple-100">
                      <div className="text-xs text-slate-500">Salary Range</div>
                      <div className="font-medium text-slate-800 text-sm">{country.workOpportunities.afterStudies.salaryRange}</div>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-center text-white shadow-xl">
          <h4 className="text-2xl font-bold mb-3">Ready to Study in {country.name}?</h4>
          <p className="text-indigo-100 text-lg max-w-2xl mx-auto mb-6">
            Our expert counsellors can help you with university selection, application process, and visa guidance
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button 
              onClick={() => navigate('/contact')}
              className="bg-white text-indigo-600 px-8 py-3.5 rounded-xl font-semibold hover:bg-indigo-50 transition shadow-lg flex items-center gap-2"
            >
              <CalendarIcon size={20} />
              Book a Consultation
            </button>
            <button 
              onClick={() => navigate('/contact')}
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/30 transition border border-white/30 flex items-center gap-2"
            >
              <MessageCircle size={20} />
              Chat with Expert
            </button>
            <button
              onClick={() => window.open(`https://eduassists.com/country/${country.id}`, '_blank')}
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-3.5 rounded-xl font-semibold hover:bg-white/30 transition border border-white/30 flex items-center gap-2"
            >
              <ExternalLink size={20} />
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryInfoDetails;