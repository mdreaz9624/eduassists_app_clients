import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  ArrowLeft, Download, FileText, GraduationCap, Users, BookOpen,
  CheckCircle, Globe, MessageCircle, Calendar as CalendarIcon,
  Award, Clock, DollarSign, Shield, Sparkles, ChevronDown, ChevronUp,
  Building, MapPin, Briefcase, Heart, ExternalLink, TrendingUp,
  Info, HelpCircle, Target, Zap
} from 'lucide-react';

const CountryDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [country, setCountry] = useState(location.state?.country || null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [expandedSections, setExpandedSections] = useState({});

  useEffect(() => {
    if (!country) {
      const fetchCountry = async () => {
        try {
          const response = await fetch('/countryDocuments.json');
          const data = await response.json();
          // Since data is an array, find the country by id
          const countryId = location.pathname.split('/').pop();
          const found = data.find(c => c.id === countryId);
          setCountry(found);
        } catch (error) {
          console.error('Error fetching country:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchCountry();
    } else {
      setLoading(false);
    }
  }, [country, location]);

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

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
          <button onClick={() => navigate('/country-documents')} className="text-indigo-600 hover:underline">
            Back to Countries
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 px-4 py-8">
      <div className="max-w-6xl mx-auto mt-24">
        
        {/* Back Button */}
        <button
          onClick={() => navigate('/country-documents')}
          className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 font-semibold mb-6 transition-colors bg-white px-4 py-2 rounded-xl shadow-sm hover:shadow"
        >
          <ArrowLeft size={18} />
          Back to Countries
        </button>

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
                  <p className="text-white/80 text-lg mt-1">{country.description}</p>
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

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mb-8">
          <div className="flex overflow-x-auto border-b border-slate-200">
            {['overview', 'requirements', 'documents', 'cost', 'steps', 'faq'].map((tab) => (
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
                {tab === 'requirements' && '📚 Requirements'}
                {tab === 'documents' && '📄 Documents'}
                {tab === 'cost' && '💰 Cost'}
                {tab === 'steps' && '👣 Steps'}
                {tab === 'faq' && '❓ FAQ'}
              </button>
            ))}
          </div>

          <div className="p-6">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                {/* Quick Facts Grid */}
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-3">Quick Facts</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {country.quickFacts?.map((fact, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
                        <span className="text-2xl">{fact.icon}</span>
                        <div>
                          <div className="text-sm font-bold text-slate-800">{fact.value}</div>
                          <div className="text-xs text-slate-500">{fact.label}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Intakes */}
                {country.meta?.intakes && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">📅 Available Intakes</h3>
                    <div className="flex flex-wrap gap-3">
                      {country.meta.intakes.map((intake, idx) => (
                        <span key={idx} className="px-4 py-2 bg-indigo-50 text-indigo-700 rounded-xl text-sm font-medium border border-indigo-100">
                          {intake}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Cities */}
                {country.meta?.popularCities && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">📍 Popular Cities</h3>
                    <div className="flex flex-wrap gap-2">
                      {country.meta.popularCities.map((city, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-slate-50 text-slate-700 rounded-xl text-sm border border-slate-200">
                          {city}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Scholarships */}
                {country.scholarships?.available && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">💰 Scholarship Information</h3>
                    <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-4 border border-yellow-200">
                      <p className="text-sm text-slate-700">{country.scholarships.notes}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">
                          Max: {country.scholarships.maxAmount}
                        </span>
                        {country.scholarships.types?.map((type, idx) => (
                          <span key={idx} className="px-3 py-1 bg-white text-slate-700 rounded-full text-xs font-medium border border-yellow-200">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                    {country.scholarships.details && (
                      <div className="mt-3 space-y-2">
                        {country.scholarships.details.map((detail, idx) => (
                          <div key={idx} className="bg-white rounded-xl p-3 border border-slate-200">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-slate-800">{detail.name}</span>
                              <span className="text-sm font-bold text-indigo-600">{detail.amount}</span>
                            </div>
                            <p className="text-xs text-slate-500 mt-1">{detail.eligibility}</p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {/* Partner Universities */}
                {country.partnerUniversities && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">🏛️ Partner Universities</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {country.partnerUniversities.slice(0, 6).map((uni, idx) => (
                        <div key={idx} className="bg-slate-50 rounded-xl p-3 border border-slate-200">
                          <div className="font-medium text-slate-800 text-sm">{uni.name}</div>
                          <div className="flex items-center gap-2 text-xs text-slate-500 mt-1">
                            <MapPin size={12} /> {uni.location}
                            <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded-full text-[10px]">
                              {uni.ranking}
                            </span>
                          </div>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {uni.popularCourses?.slice(0, 3).map((course, cidx) => (
                              <span key={cidx} className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-slate-200">
                                {course}
                              </span>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Post Visa Services */}
                {country.postVisaServices?.available && (
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 mb-3">🛫 Post-Visa Services</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                      {country.postVisaServices.services?.map((service, idx) => (
                        <div key={idx} className="flex items-center gap-2 bg-green-50 rounded-xl px-3 py-2 text-xs text-slate-700">
                          <CheckCircle size={14} className="text-green-600" />
                          {service.name}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Requirements Tab */}
            {activeTab === 'requirements' && (
              <div className="space-y-6">
                {country.admissionRequirements && (
                  <>
                    {/* Bachelor Requirements */}
                    {country.admissionRequirements.bachelor && (
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                          <GraduationCap size={20} className="text-indigo-600" />
                          Bachelor's Requirements
                        </h3>
                        <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-700">IELTS:</span>
                              <span className="text-sm text-slate-600">{country.admissionRequirements.bachelor.ielts}</span>
                            </div>
                            {country.admissionRequirements.bachelor.alternative && (
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-slate-700">Alternative:</span>
                                <span className="text-sm text-slate-600">{country.admissionRequirements.bachelor.alternative.join(', ')}</span>
                              </div>
                            )}
                            {country.admissionRequirements.bachelor.ageLimit && (
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-slate-700">Age Limit:</span>
                                <span className="text-sm text-slate-600">{country.admissionRequirements.bachelor.ageLimit}</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <span className="font-medium text-slate-700">Documents:</span>
                            <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-1">
                              {country.admissionRequirements.bachelor.documents?.map((doc, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                  <CheckCircle size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
                                  <span>{doc.name}</span>
                                  {doc.notes && <span className="text-slate-400 text-xs">({doc.notes})</span>}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Master Requirements */}
                    {country.admissionRequirements.master && (
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                          <GraduationCap size={20} className="text-indigo-600" />
                          Master's Requirements
                        </h3>
                        <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                          <div className="flex flex-wrap gap-4">
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-slate-700">IELTS:</span>
                              <span className="text-sm text-slate-600">{country.admissionRequirements.master.ielts}</span>
                            </div>
                            {country.admissionRequirements.master.alternative && (
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-slate-700">Alternative:</span>
                                <span className="text-sm text-slate-600">{country.admissionRequirements.master.alternative.join(', ')}</span>
                              </div>
                            )}
                            {country.admissionRequirements.master.gpa && (
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-slate-700">Minimum GPA:</span>
                                <span className="text-sm text-slate-600">{country.admissionRequirements.master.gpa}</span>
                              </div>
                            )}
                          </div>
                          <div>
                            <span className="font-medium text-slate-700">Documents:</span>
                            <ul className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-1">
                              {country.admissionRequirements.master.documents?.map((doc, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                                  <CheckCircle size={14} className="text-green-600 flex-shrink-0 mt-0.5" />
                                  <span>{doc.name}</span>
                                  {doc.notes && <span className="text-slate-400 text-xs">({doc.notes})</span>}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Work Opportunities */}
                    {country.workOpportunities && (
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                          <Briefcase size={20} className="text-indigo-600" />
                          Work Opportunities
                        </h3>
                        <div className="bg-slate-50 rounded-xl p-4 space-y-3">
                          {country.workOpportunities.duringStudies && (
                            <div>
                              <h4 className="font-medium text-slate-700">During Studies</h4>
                              <ul className="mt-1 space-y-1 text-sm text-slate-600">
                                <li>Part-time: {country.workOpportunities.duringStudies.partTime}</li>
                                <li>Full-time: {country.workOpportunities.duringStudies.fullTime}</li>
                                <li>Minimum Wage: {country.workOpportunities.duringStudies.minWage}</li>
                                <li>Monthly Earning: {country.workOpportunities.duringStudies.monthlyEarning}</li>
                              </ul>
                              {country.workOpportunities.duringStudies.details && (
                                <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-2">
                                  {country.workOpportunities.duringStudies.details.map((detail, idx) => (
                                    <div key={idx} className="bg-white rounded-xl p-2 border border-slate-200">
                                      <div className="text-xs font-medium text-slate-700">{detail.type}</div>
                                      <div className="text-[10px] text-slate-500">{detail.examples}</div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          )}
                          {country.workOpportunities.afterStudies && (
                            <div>
                              <h4 className="font-medium text-slate-700">After Studies</h4>
                              <ul className="mt-1 space-y-1 text-sm text-slate-600">
                                <li>Graduate Route: {country.workOpportunities.afterStudies.graduateRoute}</li>
                                <li>Work Type: {country.workOpportunities.afterStudies.workType}</li>
                                {country.workOpportunities.afterStudies.salaryRange && (
                                  <li>Salary Range: {country.workOpportunities.afterStudies.salaryRange}</li>
                                )}
                              </ul>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* Documents Tab */}
            {activeTab === 'documents' && (
              <div className="space-y-4">
                {country.documentChecklist?.categories?.map((category, idx) => (
                  <div key={idx} className="border border-slate-200 rounded-xl overflow-hidden">
                    <button
                      onClick={() => toggleSection(category.name)}
                      className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50 transition"
                    >
                      <div className="flex items-center gap-2">
                        <span>{category.icon}</span>
                        <span className="font-bold text-slate-800">{category.name}</span>
                        <span className="text-xs text-slate-400">({category.items?.length || 0} items)</span>
                      </div>
                      {expandedSections[category.name] ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                    </button>
                    {expandedSections[category.name] && (
                      <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-2">
                        {category.items?.map((item, itemIdx) => (
                          <div key={itemIdx} className="flex items-start gap-3 text-sm bg-white rounded-xl p-3 border border-slate-200">
                            <div className={`mt-0.5 w-2 h-2 rounded-full flex-shrink-0 ${
                              item.priority === 'high' ? 'bg-red-500' :
                              item.priority === 'medium' ? 'bg-yellow-500' :
                              'bg-green-500'
                            }`}></div>
                            <div>
                              <span className="font-medium text-slate-800">{item.name}</span>
                              <p className="text-slate-500 text-xs mt-0.5">{item.requirement}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Cost Tab */}
            {activeTab === 'cost' && country.costBreakdown && (
              <div className="space-y-6">
                <div className="bg-slate-50 rounded-xl p-4 flex flex-wrap items-center gap-4">
                  <p className="text-sm text-slate-600">Currency: <strong>{country.costBreakdown.currency}</strong></p>
                  <p className="text-sm text-slate-600">Exchange Rate: <strong>{country.costBreakdown.exchangeRate}</strong></p>
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

            {/* Steps Tab */}
            {activeTab === 'steps' && (
              <div className="space-y-4">
                {country.applicationSteps?.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4 p-4 bg-slate-50 rounded-xl">
                    <div className="w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                      {step.step}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-slate-800">{step.title}</h4>
                        <span className="text-xs text-slate-400">{step.icon}</span>
                      </div>
                      <p className="text-sm text-slate-600">{step.description}</p>
                      <p className="text-xs text-slate-400 mt-1">Duration: {step.duration}</p>
                    </div>
                  </div>
                ))}
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
              </div>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-8 text-center text-white shadow-xl">
          <h4 className="text-2xl font-bold mb-3">Need Personalized Guidance?</h4>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;