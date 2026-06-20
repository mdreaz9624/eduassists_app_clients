

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  MessageCircle,
  CheckCircle,
  Star,
  Clock,
  TrendingUp,
  Award,
  Zap,
  Users,        // Added this import
  Globe,        // Added this import
  BookOpen,     // Added this import
  Code,         // Added this import
  Briefcase,    // Added this import
  GraduationCap,// Added this import
  FileText,     // Added this import
  Plane,        // Added this import
  Heart,        // Added this import
  Calendar,
  Mic,
  FileAudio,
  PenTool,
  BookMarked,
  Layout,
  Server,
  Terminal
} from 'lucide-react';
import { allServices, serviceCategories } from './serviceData';

const Service = () => {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [viewMode, setViewMode] = useState('grid');

  // Filter services based on category
  const filteredServices = activeCategory === 'all' 
    ? allServices 
    : allServices.filter(service => service.category === activeCategory);

  // Get category label for display
  const getCategoryLabel = (categoryId) => {
    const cat = serviceCategories.find(c => c.id === categoryId);
    return cat ? cat.label : categoryId;
  };

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 mt-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-100 to-blue-100 text-indigo-700 px-6 py-2 rounded-full mb-4">
            <Zap size={18} className="text-indigo-600" />
            <span className="text-sm font-semibold">Premium Educational Services</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Your Complete Guide to <br />
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              Study Abroad Success
            </span>
          </h2>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            From language preparation to post-arrival support — we're with you every step of the way
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {serviceCategories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2.5 rounded-full font-medium transition-all text-sm flex items-center gap-2 ${
                activeCategory === category.id
                  ? 'bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-lg shadow-indigo-200'
                  : 'bg-white text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 shadow-sm'
              }`}
            >
              <span>{category.icon}</span>
              {category.label}
            </button>
          ))}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredServices.map((service) => (
            <div 
              key={service.id}
              className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100 hover:border-transparent transform hover:-translate-y-2"
            >
              {/* Card Header with Gradient */}
              <div className={`p-6 bg-gradient-to-r ${service.color} relative overflow-hidden`}>
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
                
                <div className="relative flex items-start justify-between">
                  <div className="flex-1">
                    <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white mb-3">
                      {service.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{service.title}</h3>
                    <p className="text-white/80 text-sm line-clamp-1">{service.tagline || service.description?.slice(0, 60) + '...'}</p>
                  </div>
                  {service.badge && (
                    <span className="bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-3 py-1 rounded-full">
                      {service.badge}
                    </span>
                  )}
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6">
                {/* Stats */}
                {service.stats && (
                  <div className="grid grid-cols-3 gap-2 mb-4 p-3 bg-slate-50 rounded-xl">
                    {service.stats.slice(0, 3).map((stat, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-base font-bold text-slate-800">{stat.value}</div>
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider">{stat.label}</div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Features List */}
                {service.features && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {service.features.slice(0, 3).map((feature, idx) => (
                      <span key={idx} className="text-xs bg-slate-100 text-slate-600 px-2.5 py-1 rounded-full">
                        {feature}
                      </span>
                    ))}
                    {service.features.length > 3 && (
                      <span className="text-xs bg-indigo-100 text-indigo-600 px-2.5 py-1 rounded-full">
                        +{service.features.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Display modules or technologies for language/web services */}
                {service.modules && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {service.modules.slice(0, 3).map((module, idx) => (
                      <span key={idx} className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full flex items-center gap-1">
                        {module.icon}
                        {module.name}
                      </span>
                    ))}
                    {service.modules.length > 3 && (
                      <span className="text-xs bg-indigo-100 text-indigo-600 px-2.5 py-1 rounded-full">
                        +{service.modules.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {service.technologies && (
                  <div className="flex flex-wrap gap-1 mb-4">
                    {service.technologies.slice(0, 3).map((tech, idx) => (
                      <span key={idx} className="text-xs bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full flex items-center gap-1">
                        {tech.icon}
                        {tech.name}
                      </span>
                    ))}
                    {service.technologies.length > 3 && (
                      <span className="text-xs bg-emerald-100 text-emerald-600 px-2.5 py-1 rounded-full">
                        +{service.technologies.length - 3}
                      </span>
                    )}
                  </div>
                )}

                {/* Pricing Display */}
                {service.pricing && (
                  <div className="flex items-center gap-2 mb-4 text-sm">
                    <span className="font-bold text-slate-800">{service.pricing.standard}</span>
                    {service.pricing.premium && (
                      <>
                        <span className="text-slate-400">-</span>
                        <span className="font-bold text-slate-800">{service.pricing.premium}</span>
                      </>
                    )}
                  </div>
                )}

                {/* CTA Button */}
                <button 
                  onClick={() => navigate(service.path)}
                  className="w-full group flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 text-white font-semibold rounded-xl hover:bg-indigo-600 transition-all active:scale-95"
                >
                  {service.buttonText || 'Learn More'}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-16 bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
          
          <div className="relative">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Study Abroad Journey?
            </h3>
            <p className="text-indigo-100 mb-6 max-w-2xl mx-auto">
              Book a free consultation with our expert counsellors and get personalized guidance for your study abroad dreams.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button 
                onClick={() => navigate('/contact')}
                className="px-8 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-indigo-50 transition-all shadow-lg flex items-center gap-2"
              >
                Book Free Consultation
                <ArrowRight size={18} />
              </button>
              <button 
                onClick={() => navigate('/contact')}
                className="px-8 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-all border border-white/30 flex items-center gap-2"
              >
                <MessageCircle size={18} />
                Chat with Expert
              </button>
            </div>
          </div>
        </div>

        {/* Trust Indicators */}
        <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <div className="flex items-center justify-center gap-2 text-3xl font-bold text-indigo-600">
              99% <CheckCircle size={20} className="text-emerald-500" />
            </div>
            <div className="text-sm text-slate-600">Visa Success Rate</div>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <div className="flex items-center justify-center gap-2 text-3xl font-bold text-indigo-600">
              2,000+ <Users size={20} className="text-blue-500" />
            </div>
            <div className="text-sm text-slate-600">University Partners</div>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <div className="flex items-center justify-center gap-2 text-3xl font-bold text-indigo-600">
              30+ <Globe size={20} className="text-cyan-500" />
            </div>
            <div className="text-sm text-slate-600">Countries Covered</div>
          </div>
          <div className="text-center p-4 bg-white rounded-2xl shadow-sm">
            <div className="flex items-center justify-center gap-2 text-3xl font-bold text-indigo-600">
              95% <Star size={20} className="text-yellow-500" />
            </div>
            <div className="text-sm text-slate-600">Student Satisfaction</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Service;