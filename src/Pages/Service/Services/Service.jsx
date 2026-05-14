// import React from 'react';
// import IeltsCard from '../IeltsCard/IeltsCard';

import { useNavigate } from 'react-router-dom';
import { BookOpen, Globe, Code, ArrowRight } from 'lucide-react';

const Service = () => {
  const navigate = useNavigate();

  const serviceData = [
    {
      title: "IELTS Preparation",
      description: "Master the 4 modules with expert guidance and mock tests.",
      icon: <BookOpen className="text-indigo-600" size={24} />,
      path: "/ieltsCard", // Matches your route
      buttonText: "View IELTS Course",
      color: "border-indigo-100 hover:border-indigo-500",
      bgColor: "bg-indigo-50"
    },
    {
      title: "TOEFL iBT",
      description: "Comprehensive training for American university entrance exams.",
      icon: <Globe className="text-blue-600" size={24} />,
      path: "/toefl", 
      buttonText: "Explore TOEFL",
      color: "border-blue-100 hover:border-blue-500",
      bgColor: "bg-blue-50"
    },
    {
      title: "Web Development",
      description: "Free project-based courses covering React, Node, and more.",
      icon: <Code className="text-emerald-600" size={24} />,
      path: "/web-dev-card",
      buttonText: "Start Learning",
      color: "border-emerald-100 hover:border-emerald-500",
      bgColor: "bg-emerald-50"
    }
  ];

  return (
    <section className="py-16 bg-slate-50 mt-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-black text-slate-900 mb-2">Our Specialized Services</h2>
          <p className="text-slate-500">Choose a path to accelerate your career and education.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {serviceData.map((service, index) => (
            <div 
              key={index}
              className={`bg-white p-8 rounded-3xl border-2 ${service.color} transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col justify-between`}
            >
              <div>
                <div className={`w-12 h-12 ${service.bgColor} rounded-2xl flex items-center justify-center mb-6`}>
                  {service.icon}
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-6">
                  {service.description}
                </p>
              </div>

              {/* Navigation Button */}
              <button 
                onClick={() => navigate(service.path)}
                className="w-full group flex items-center justify-center gap-2 py-3 px-4 bg-slate-900 text-white font-bold rounded-xl hover:bg-indigo-600 transition-all active:scale-95"
              >
                {service.buttonText}
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Service;