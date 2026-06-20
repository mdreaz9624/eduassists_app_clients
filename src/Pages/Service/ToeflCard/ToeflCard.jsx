import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  BookOpen, 
  Headphones, 
  PenTool, 
  MessageSquare, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  CheckCircle2,
  Mic,
  FileAudio,
  BookMarked,
  Award,
  Users,
  Clock,
  Star,
  Zap,
  GraduationCap,
  PlayCircle,
  FileText,
  Check,
  Globe,
  ArrowLeft,
  Target,
  Sparkles
} from 'lucide-react';

const ToeflCard = () => {
  const navigate = useNavigate();
  const [activeModule, setActiveModule] = useState(null);
  const [selectedPricing, setSelectedPricing] = useState('standard');

  // TOEFL Data from your serviceData
  const toeflData = {
    title: "TOEFL iBT",
    tagline: "Comprehensive training for American university entrance",
    description: "Complete preparation for the TOEFL iBT exam with focus on all four sections: Reading, Listening, Speaking, and Writing. Our program is designed specifically for students aiming for American and Canadian universities.",
    icon: <Globe className="text-blue-600" size={28} />,
    category: "language",
    path: "/toefl",
    buttonText: "Explore TOEFL",
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-50",
    badge: "Top Rated",
    stats: [
      { label: "Success Rate", value: "88%" },
      { label: "Practice Tests", value: "40+" },
      { label: "Students Trained", value: "1,800+" }
    ],
    features: [
      "Academic Vocabulary Building",
      "Integrated Skills Practice",
      "Note-Taking Strategies",
      "Time Management Techniques",
      "Speaking Templates",
      "Writing Templates"
    ],
    modules: [
      {
        name: "Reading",
        icon: <BookMarked size={20} />,
        description: "3-4 passages, 10 questions each",
        tips: ["Academic vocabulary", "Reading comprehension", "Inference skills"],
        duration: "35 Minutes",
        questions: "3-4 passages",
        sections: "10 questions each"
      },
      {
        name: "Listening",
        icon: <FileAudio size={20} />,
        description: "3-4 lectures, 2-3 conversations",
        tips: ["Academic listening", "Lecture comprehension", "Note-taking"],
        duration: "36 Minutes",
        questions: "3-4 lectures",
        sections: "2-3 conversations"
      },
      {
        name: "Speaking",
        icon: <Mic size={20} />,
        description: "4 tasks, 4 minutes total",
        tips: ["Integrated speaking", "Templates", "Time management"],
        duration: "16 Minutes",
        questions: "4 tasks",
        sections: "1 independent, 3 integrated"
      },
      {
        name: "Writing",
        icon: <PenTool size={20} />,
        description: "2 tasks, 50 minutes total",
        tips: ["Academic writing", "Integrated writing", "Structured essays"],
        duration: "29 Minutes",
        questions: "2 tasks",
        sections: "Integrated + Discussion"
      }
    ],
    pricing: {
      standard: "$5/month",
      premium: "$50/month",
      features: {
        standard: ["10 Live Classes", "Practice Tests", "Study Materials"],
        premium: ["20 Live Classes", "Unlimited Practice Tests", "1-on-1 Coaching", "Essay Corrections"]
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-24 p-4 md:p-8 bg-gradient-to-br from-slate-50 via-white to-blue-50/30 min-h-screen">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold mb-6 transition-colors"
      >
        <ArrowLeft size={20} /> Back to Services
      </button>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 via-cyan-600 to-blue-700 rounded-3xl p-8 md:p-12 mb-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
              <Sparkles size={16} />
              <span className="text-sm font-semibold">Top Rated Course</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-3">{toeflData.title}</h1>
            <p className="text-blue-100 text-lg mb-4">{toeflData.tagline}</p>
            <p className="text-white/80 max-w-2xl">{toeflData.description}</p>
          </div>
          <div className="flex-shrink-0">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-white">120</div>
              <div className="text-white/80 text-sm">Perfect Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {toeflData.stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center hover:shadow-md transition-all">
            <div className="text-3xl font-bold text-blue-600">{stat.value}</div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Award className="text-blue-600" size={24} />
          What You'll Get
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {toeflData.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 bg-blue-50 rounded-xl px-4 py-2.5">
              <Check className="text-blue-600" size={16} />
              <span className="text-sm text-slate-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modules Section */}
      <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <GraduationCap className="text-blue-600" size={24} />
        Module Breakdown
      </h3>
      
      <div className="grid grid-cols-1 gap-4 mb-8">
        {toeflData.modules.map((module) => (
          <div key={module.name} className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden transition-all">
            <div 
              className="p-5 cursor-pointer flex items-center justify-between hover:bg-slate-50 transition-colors"
              onClick={() => setActiveModule(activeModule === module.name ? null : module.name)}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 rounded-xl text-blue-600">
                  {module.icon}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{module.name}</h4>
                  <p className="text-sm text-slate-500">{module.description}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="text-xs text-slate-500">Duration</div>
                  <div className="text-sm font-semibold text-slate-700">{module.duration}</div>
                </div>
                {activeModule === module.name ? <ChevronUp className="text-blue-600" /> : <ChevronDown className="text-blue-600" />}
              </div>
            </div>

            {activeModule === module.name && (
              <div className="p-5 bg-blue-50/30 border-t border-slate-100">
                <h5 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <HelpCircle size={16} className="text-blue-600" />
                  Pro Tips for {module.name}
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {module.tips.map((tip, index) => (
                    <div key={index} className="bg-white rounded-xl p-3 border border-slate-200">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-blue-600">{index + 1}</span>
                        </div>
                        <p className="text-sm text-slate-700">{tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {module.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText size={14} /> {module.questions}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen size={14} /> {module.sections}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Pricing Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Choose Your Plan</h3>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 bg-slate-50 rounded-xl p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="pricing"
                value="standard"
                checked={selectedPricing === 'standard'}
                onChange={() => setSelectedPricing('standard')}
                className="w-4 h-4 text-blue-600"
              />
              <div>
                <div className="font-bold text-slate-900">Standard Plan</div>
                <div className="text-xl font-black text-blue-600">{toeflData.pricing.standard}</div>
              </div>
            </label>
          </div>
          <div className="flex-1 bg-blue-50 rounded-xl p-4 border-2 border-blue-200 relative">
            <div className="absolute -top-3 right-4 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              Most Popular
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="pricing"
                value="premium"
                checked={selectedPricing === 'premium'}
                onChange={() => setSelectedPricing('premium')}
                className="w-4 h-4 text-blue-600"
              />
              <div>
                <div className="font-bold text-slate-900">Premium Plan</div>
                <div className="text-xl font-black text-blue-600">{toeflData.pricing.premium}</div>
              </div>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {toeflData.pricing.features[selectedPricing].map((feature, index) => (
            <div key={index} className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2">
              <CheckCircle2 className="text-emerald-500" size={16} />
              <span className="text-sm text-slate-700">{feature}</span>
            </div>
          ))}
        </div>

        <button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95">
          <PlayCircle size={20} className="inline mr-2" />
          Start Your TOEFL Journey Now
        </button>
      </div>

      {/* CTA Footer */}
      <div className="mt-8 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl p-6 text-center text-white">
        <h4 className="text-xl font-bold mb-2">Ready to Ace the TOEFL?</h4>
        <p className="text-blue-100 text-sm mb-4">Join 1,800+ students who achieved their dream scores</p>
        <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-all shadow-lg">
          Book Free Consultation
        </button>
      </div>
    </div>
  );
};

export default ToeflCard;