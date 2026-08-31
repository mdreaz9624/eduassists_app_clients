import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Globe, Users, Award, TrendingUp, CheckCircle, ChevronRight,
  MapPin, Phone, Mail, Building, Target, Rocket, Sparkles,
  Shield, Star, Briefcase, Clock, Calendar, MessageCircle,
  ExternalLink, PlayCircle, BarChart, PieChart, Download
} from 'lucide-react';

const Partnership = () => {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeModel, setActiveModel] = useState('agent');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/partnershipData.json');
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error loading partnership data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Loading partnership information...</p>
        </div>
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12 mt-24">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 px-6 py-2 rounded-full mb-4">
            <Rocket size={18} className="text-indigo-600" />
            <span className="text-sm font-semibold">B2B & Franchise Partnership</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Partner with <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              EduAssists
            </span>
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Join our global network and bring world-class education consultancy to your community
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {data.metrics?.map((metric, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 text-center shadow-sm border border-slate-200 hover:shadow-md transition">
              <div className="text-3xl mb-2">{metric.icon}</div>
              <div className="text-2xl font-bold text-indigo-600">{metric.value}</div>
              <div className="text-sm text-slate-600">{metric.label}</div>
            </div>
          ))}
        </div>

        {/* Partnership Models */}
        <h2 className="text-2xl font-bold text-slate-900 mb-6 text-center">Choose Your Partnership Model</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {data.partnershipModels?.map((model) => (
            <div
              key={model.id}
              onMouseEnter={() => setActiveModel(model.id)}
              className={`bg-white rounded-2xl p-6 shadow-md border-2 transition-all duration-300 ${
                activeModel === model.id
                  ? 'border-indigo-500 shadow-lg'
                  : 'border-slate-200 hover:border-indigo-300'
              }`}
            >
              <div className="text-4xl mb-3">{model.icon}</div>
              <h3 className="text-xl font-bold text-slate-900">{model.name}</h3>
              <p className="text-sm text-slate-600 mt-2">{model.description}</p>
              
              <div className="mt-4 p-3 bg-indigo-50 rounded-xl">
                <span className="text-sm font-bold text-indigo-700">Commission: {model.commission}</span>
              </div>
              
              <ul className="mt-4 space-y-2">
                {model.features?.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-slate-600">
                    <CheckCircle size={16} className="text-green-500 flex-shrink-0 mt-0.5" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Commission Factors */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-12">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <PieChart size={20} className="text-indigo-600" />
            What Determines the Commission?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.commissionFactors?.map((factor, idx) => (
              <div key={idx} className="bg-slate-50 rounded-xl p-4">
                <div className="font-bold text-slate-800 text-sm">{factor.factor}</div>
                <div className="text-sm text-slate-600 mt-1">{factor.description}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Franchise Benefits */}
        <div className="bg-gradient-to-r from-indigo-600 to-blue-600 rounded-3xl p-8 text-white mb-12">
          <h3 className="text-2xl font-bold mb-6 text-center">Why Become a Franchise Partner?</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.franchiseBenefits?.map((benefit, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 hover:bg-white/20 transition">
                <div className="text-3xl mb-2">{benefit.icon}</div>
                <h4 className="font-bold">{benefit.title}</h4>
                <p className="text-sm text-white/80 mt-1">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Franchise Locations */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-12">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <MapPin size={20} className="text-indigo-600" />
            Our Growing Franchise Network
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.franchiseLocations?.map((location, idx) => (
              <div key={idx} className="bg-green-50 rounded-xl p-4 border border-green-200">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-800">{location.name}</span>
                  <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                    {location.status}
                  </span>
                </div>
                <p className="text-sm text-slate-600 mt-1">{location.type}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200 text-center">
            <p className="text-sm text-yellow-800 font-medium">
              🚀 We are actively seeking new franchise partners in other districts of Bangladesh
            </p>
          </div>
        </div>

        {/* Franchise Requirements */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-12">
          <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
            <Shield size={20} className="text-indigo-600" />
            What We Look For in a Partner
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {data.franchiseRequirements?.map((req, idx) => {
              const [title, ...descParts] = req.split(' - ');
              const description = descParts.join(' - ');
              return (
                <div key={idx} className="flex items-start gap-3 bg-slate-50 rounded-xl p-3">
                  <CheckCircle size={18} className="text-green-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <div className="font-medium text-slate-800 text-sm">{title}</div>
                    <div className="text-sm text-slate-600">{description}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Franchise Steps */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-12">
          <h3 className="text-lg font-bold text-slate-900 mb-6 text-center flex items-center justify-center gap-2">
            <Target size={20} className="text-indigo-600" />
            How to Become a Franchise Partner
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.franchiseSteps?.map((step) => (
              <div key={step.step} className="relative">
                <div className="bg-indigo-50 rounded-xl p-4 text-center">
                  <div className="w-10 h-10 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-2">
                    {step.step}
                  </div>
                  <h4 className="font-bold text-slate-800 text-sm">{step.title}</h4>
                  <p className="text-xs text-slate-600 mt-1">{step.description}</p>
                </div>
                {step.step < 6 && (
                  <div className="hidden md:block absolute top-1/2 -right-2 transform -translate-y-1/2">
                    <ChevronRight size={20} className="text-slate-300" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-3xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to Partner with Us?</h3>
          <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
            Submit your franchise application today and bring world-class education consultancy to your city
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Globe size={18} />
                <span className="font-semibold">Website</span>
              </div>
              <a href={`https://${data.contactInfo?.website}`} className="text-white/90 hover:text-white">
                {data.contactInfo?.website}
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Mail size={18} />
                <span className="font-semibold">Email</span>
              </div>
              <a href={`mailto:${data.contactInfo?.email}`} className="text-white/90 hover:text-white">
                {data.contactInfo?.email}
              </a>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Phone size={18} />
                <span className="font-semibold">Phone</span>
              </div>
              {data.contactInfo?.phone?.map((phone, idx) => (
                <a key={idx} href={`tel:${phone.replace(/\s/g, '')}`} className="text-white/90 hover:text-white block text-sm">
                  {phone}
                </a>
              ))}
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Building size={18} />
                <span className="font-semibold">Office</span>
              </div>
              <p className="text-sm text-white/80">{data.contactInfo?.dhakaOffice}</p>
            </div>
          </div>
          
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={() => navigate('/contact')}
              className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-semibold hover:bg-indigo-50 transition shadow-lg flex items-center gap-2"
            >
              <MessageCircle size={20} />
              Apply Now
            </button>
            <button
              onClick={() => window.open('https://eduassists.com', '_blank')}
              className="bg-white/20 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold hover:bg-white/30 transition border border-white/30 flex items-center gap-2"
            >
              <ExternalLink size={20} />
              Visit Website
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Partnership;