import React, { useState } from 'react';
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
  X
} from 'lucide-react';

const IeltsCard = () => {
  const [activeModule, setActiveModule] = useState(null);
  const [selectedPricing, setSelectedPricing] = useState('standard');

  // IELTS Data from your serviceData
  const ieltsData = {
    title: "IELTS Preparation",
    tagline: "Master the 4 modules with expert guidance",
    description: "Comprehensive IELTS training program designed to help you achieve your target band score. Our expert instructors provide personalized coaching for all four modules: Listening, Reading, Writing, and Speaking.",
    icon: <BookOpen className="text-indigo-600" size={28} />,
    category: "language",
    path: "/ieltsCard",
    buttonText: "View IELTS Course",
    color: "from-indigo-500 to-blue-600",
    bgColor: "bg-indigo-50",
    badge: "Most Popular",
    stats: [
      { label: "Success Rate", value: "92%" },
      { label: "Practice Tests", value: "50+" },
      { label: "Students Trained", value: "2,500+" }
    ],
    features: [
      "Expert-Led Live Classes",
      "Full-Length Mock Tests",
      "Personalized Feedback",
      "Study Materials & Resources",
      "Speaking Practice Sessions",
      "Writing Task Evaluation"
    ],
    modules: [
      {
        name: "Listening",
        icon: <FileAudio size={20} />,
        description: "Master 4 sections with 40 questions",
        tips: ["Practice with different accents", "Learn note-taking techniques", "Understand question types"],
        duration: "30 Minutes",
        questions: 40,
        sections: 4
      },
      {
        name: "Reading",
        icon: <BookMarked size={20} />,
        description: "3 sections, 40 questions, 60 minutes",
        tips: ["Skim & scan techniques", "Time management", "Understand passage structures"],
        duration: "60 Minutes",
        questions: 40,
        sections: 3
      },
      {
        name: "Writing",
        icon: <PenTool size={20} />,
        description: "Task 1 & Task 2 academic writing",
        tips: ["Essay structure", "Vocabulary building", "Grammar accuracy"],
        duration: "60 Minutes",
        questions: 2,
        sections: 2
      },
      {
        name: "Speaking",
        icon: <Mic size={20} />,
        description: "11-14 minute face-to-face interview",
        tips: ["Fluency practice", "Pronunciation", "Confidence building"],
        duration: "11-14 Minutes",
        questions: 3,
        sections: 3
      }
    ],
    pricing: {
      standard: "$5/month",
      premium: "$50/month",
      features: {
        standard: ["12 Live Classes", "Practice Tests", "Study Materials"],
        premium: ["24 Live Classes", "Unlimited Practice Tests", "1-on-1 Coaching", "Priority Support"]
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-24 p-4 md:p-8 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 min-h-screen">
      
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 mb-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
              <Zap size={16} />
              <span className="text-sm font-semibold">Most Popular Course</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-3">{ieltsData.title}</h1>
            <p className="text-indigo-100 text-lg mb-4">{ieltsData.tagline}</p>
            <p className="text-white/80 max-w-2xl">{ieltsData.description}</p>
          </div>
          <div className="flex-shrink-0">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-white">Band 9.0</div>
              <div className="text-white/80 text-sm">Target Score</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {ieltsData.stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center hover:shadow-md transition-all">
            <div className="text-3xl font-bold text-indigo-600">{stat.value}</div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Award className="text-indigo-600" size={24} />
          What You'll Get
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {ieltsData.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 bg-indigo-50 rounded-xl px-4 py-2.5">
              <Check className="text-indigo-600" size={16} />
              <span className="text-sm text-slate-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Modules Section */}
      <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <GraduationCap className="text-indigo-600" size={24} />
        Module Breakdown
      </h3>
      
      <div className="grid grid-cols-1 gap-4 mb-8">
        {ieltsData.modules.map((module) => (
          <div key={module.name} className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden transition-all">
            <div 
              className="p-5 cursor-pointer flex items-center justify-between hover:bg-slate-50 transition-colors"
              onClick={() => setActiveModule(activeModule === module.name ? null : module.name)}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
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
                {activeModule === module.name ? <ChevronUp className="text-indigo-600" /> : <ChevronDown className="text-indigo-600" />}
              </div>
            </div>

            {activeModule === module.name && (
              <div className="p-5 bg-indigo-50/30 border-t border-slate-100">
                <h5 className="text-sm font-bold text-slate-800 mb-3 flex items-center gap-2">
                  <HelpCircle size={16} className="text-indigo-600" />
                  Pro Tips for {module.name}
                </h5>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {module.tips.map((tip, index) => (
                    <div key={index} className="bg-white rounded-xl p-3 border border-slate-200">
                      <div className="flex items-start gap-2">
                        <div className="w-5 h-5 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-indigo-600">{index + 1}</span>
                        </div>
                        <p className="text-sm text-slate-700">{tip}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-3 flex gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <Clock size={14} /> {module.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <FileText size={14} /> {module.questions} Questions
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen size={14} /> {module.sections} Sections
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
                className="w-4 h-4 text-indigo-600"
              />
              <div>
                <div className="font-bold text-slate-900">Standard Plan</div>
                <div className="text-xl font-black text-indigo-600">{ieltsData.pricing.standard}</div>
              </div>
            </label>
          </div>
          <div className="flex-1 bg-indigo-50 rounded-xl p-4 border-2 border-indigo-200 relative">
            <div className="absolute -top-3 right-4 bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              Most Popular
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="pricing"
                value="premium"
                checked={selectedPricing === 'premium'}
                onChange={() => setSelectedPricing('premium')}
                className="w-4 h-4 text-indigo-600"
              />
              <div>
                <div className="font-bold text-slate-900">Premium Plan</div>
                <div className="text-xl font-black text-indigo-600">{ieltsData.pricing.premium}</div>
              </div>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {ieltsData.pricing.features[selectedPricing].map((feature, index) => (
            <div key={index} className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2">
              <CheckCircle2 className="text-emerald-500" size={16} />
              <span className="text-sm text-slate-700">{feature}</span>
            </div>
          ))}
        </div>

        <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95">
          <PlayCircle size={20} className="inline mr-2" />
          Start Your IELTS Journey Now
        </button>
      </div>

      {/* CTA Footer */}
      <div className="mt-8 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 text-center text-white">
        <h4 className="text-xl font-bold mb-2">Ready to Achieve Your Dream Score?</h4>
        <p className="text-indigo-100 text-sm mb-4">Join 2,500+ students who achieved their target band score</p>
        <button className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all shadow-lg">
          Book Free Consultation
        </button>
      </div>
    </div>
  );
};

export default IeltsCard;