import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Briefcase,
  ArrowLeft,
  CheckCircle,
  Award,
  Users,
  Clock,
  Star,
  Zap,
  GraduationCap,
  FileText,
  Check,
  Sparkles,
  ChevronDown,
  ChevronUp,
  HelpCircle,
  Target,
  TrendingUp,
  BarChart,
  Compass,
  Lightbulb,
  Rocket,
  Brain,
  Shield,
  Globe,
  BookOpen,
  MessageCircle,
  Calendar,
  PlayCircle
} from 'lucide-react';

const CareerCounsellingCard = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState(null);
  const [selectedPricing, setSelectedPricing] = useState('standard');

  // Career Counselling Data
  const careerData = {
    title: "Career Counselling",
    tagline: "Align your academic choices with your professional future",
    description: "Our career counsellors help you align your academic choices with a clear picture of your professional future, combining in-depth profile assessment with real-world industry data.",
    icon: <Briefcase className="text-indigo-600" size={28} />,
    category: "career",
    path: "/career-counselling",
    color: "from-indigo-500 to-blue-600",
    bgColor: "bg-indigo-50",
    badge: "Most Popular",
    stats: [
      { label: "Career Pathways", value: "500+" },
      { label: "Industries Covered", value: "40+" },
      { label: "Satisfaction Rate", value: "95%" }
    ],
    features: [
      "Profile Assessment",
      "Career Mapping",
      "Industry Insights",
      "Personalised Roadmap"
    ],
    // Extended data for the card
    processSteps: [
      {
        step: 1,
        title: "Initial Consultation",
        description: "A 60-minute session to understand your background, goals, and any concerns. We listen before we advise.",
        icon: <MessageCircle size={24} />,
        duration: "60 Minutes"
      },
      {
        step: 2,
        title: "Profile Analysis",
        description: "We assess your academic record, extracurriculars, and aspirations against real-world career data from our research team.",
        icon: <BarChart size={24} />,
        duration: "2-3 Days"
      },
      {
        step: 3,
        title: "Career Roadmap Delivery",
        description: "You receive a personalised roadmap: recommended study fields, target countries, and a realistic timeline to your career goals.",
        icon: <Compass size={24} />,
        duration: "1 Week"
      },
      {
        step: 4,
        title: "Ongoing Support",
        description: "As your plans evolve, so does our guidance. Follow-up sessions are included at no extra charge for the first year.",
        icon: <Shield size={24} />,
        duration: "1 Year"
      }
    ],
    industries: [
      "Technology & IT",
      "Healthcare & Medicine",
      "Finance & Banking",
      "Education & Academia",
      "Engineering & Manufacturing",
      "Media & Communications",
      "Business & Management",
      "Law & Legal Services",
      "Architecture & Design",
      "Hospitality & Tourism"
    ],
    benefits: [
      {
        title: "Clarity & Direction",
        description: "Gain a clear understanding of your career path and the steps needed to achieve your goals.",
        icon: <Target size={20} />
      },
      {
        title: "Data-Driven Decisions",
        description: "Make informed choices based on real-world industry data and current market trends.",
        icon: <TrendingUp size={20} />
      },
      {
        title: "Personalised Guidance",
        description: "Receive one-on-one attention from experienced career counsellors who understand your unique situation.",
        icon: <Lightbulb size={20} />
      },
      {
        title: "Long-Term Success",
        description: "Build a sustainable career strategy that adapts to changing circumstances and opportunities.",
        icon: <Rocket size={20} />
      }
    ],
    pricing: {
      standard: "$5/month",
      premium: "$50/month",
      features: {
        standard: ["Initial Consultation", "Profile Assessment", "Basic Roadmap", "Email Support"],
        premium: ["Extended Consultation", "Detailed Analysis", "Comprehensive Roadmap", "Priority Support", "Follow-up Sessions", "Industry Networking"]
      }
    },
    faqs: [
      {
        question: "How long does the career counselling process take?",
        answer: "The entire process typically takes 2-3 weeks from initial consultation to roadmap delivery. However, we offer ongoing support for a full year after completion."
      },
      {
        question: "What industries do you cover?",
        answer: "We cover over 40 industries including Technology, Healthcare, Finance, Education, Engineering, Media, Business, Law, Architecture, and Hospitality."
      },
      {
        question: "Is this only for students?",
        answer: "No. We work with students, fresh graduates, and working professionals looking for a career change or advancement."
      },
      {
        question: "How is the career roadmap delivered?",
        answer: "You'll receive a detailed PDF roadmap with your recommended study fields, target countries, and a realistic timeline. This is followed by a 45-minute advisory call to discuss the findings."
      }
    ],
    successStories: [
      {
        name: "Sarah Ahmed",
        country: "UK",
        field: "Computer Science",
        quote: "The career counselling helped me discover my passion for AI. I'm now pursuing my Master's at Cambridge!"
      },
      {
        name: "Mohammed Rahman",
        country: "USA",
        field: "Medicine",
        quote: "My counsellor mapped out the entire path to becoming a doctor in the US. I couldn't have done it without their guidance."
      },
      {
        name: "Priya Sharma",
        country: "Canada",
        field: "Business",
        quote: "The industry insights were invaluable. I chose a program that perfectly aligned with my career goals in finance."
      }
    ]
  };

  return (
    <div className="max-w-6xl mx-auto mt-24 p-4 md:p-8 bg-gradient-to-br from-slate-50 via-white to-indigo-50/30 min-h-screen">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-6 transition-colors"
      >
        <ArrowLeft size={20} /> Back to Services
      </button>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 rounded-3xl p-8 md:p-12 mb-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
              <Sparkles size={16} />
              <span className="text-sm font-semibold">{careerData.badge}</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-3">{careerData.title}</h1>
            <p className="text-indigo-100 text-lg mb-4">{careerData.tagline}</p>
            <p className="text-white/80 max-w-2xl">{careerData.description}</p>
          </div>
          <div className="flex-shrink-0">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-white">95%</div>
              <div className="text-white/80 text-sm">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {careerData.stats.map((stat, index) => (
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
          What We Offer
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {careerData.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 bg-indigo-50 rounded-xl px-4 py-2.5">
              <Check className="text-indigo-600" size={16} />
              <span className="text-sm text-slate-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Process Steps */}
      <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Compass className="text-indigo-600" size={24} />
        How It Works
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {careerData.processSteps.map((step) => (
          <div key={step.step} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600">
                {step.icon}
              </div>
              <span className="text-xs font-bold text-indigo-600">Step {step.step}</span>
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">{step.title}</h4>
            <p className="text-sm text-slate-600 mb-3">{step.description}</p>
            <div className="flex items-center gap-1 text-xs text-slate-500">
              <Clock size={14} />
              <span>{step.duration}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Benefits Section */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Rocket className="text-indigo-600" size={24} />
          Why Choose Career Counselling?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {careerData.benefits.map((benefit, index) => (
            <div key={index} className="flex items-start gap-3 p-4 bg-indigo-50/50 rounded-xl">
              <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                {benefit.icon}
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">{benefit.title}</h4>
                <p className="text-sm text-slate-600">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Industries Covered */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Globe className="text-indigo-600" size={24} />
          Industries We Cover
        </h3>
        <div className="flex flex-wrap gap-2">
          {careerData.industries.map((industry, index) => (
            <span key={index} className="px-3 py-1.5 bg-indigo-50 text-indigo-700 rounded-full text-sm border border-indigo-100">
              {industry}
            </span>
          ))}
        </div>
      </div>

      {/* Success Stories */}
      <div className="bg-gradient-to-r from-indigo-50 to-blue-50 rounded-2xl p-6 mb-8">
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Star className="text-indigo-600" size={24} />
          Success Stories
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {careerData.successStories.map((story, index) => (
            <div key={index} className="bg-white rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 font-bold">
                  {story.name.charAt(0)}
                </div>
                <div>
                  <p className="font-bold text-slate-900 text-sm">{story.name}</p>
                  <p className="text-xs text-slate-500">{story.country} • {story.field}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 italic">"{story.quote}"</p>
            </div>
          ))}
        </div>
      </div>

      {/* FAQs Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-6 mb-8">
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <HelpCircle className="text-indigo-600" size={24} />
          Frequently Asked Questions
        </h3>
        <div className="space-y-3">
          {careerData.faqs.map((faq, index) => (
            <div key={index} className="border border-slate-200 rounded-xl overflow-hidden">
              <button 
                className="w-full p-4 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
                onClick={() => setActiveSection(activeSection === index ? null : index)}
              >
                <span className="font-bold text-slate-800 text-sm pr-4">{faq.question}</span>
                {activeSection === index ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </button>
              {activeSection === index && (
                <div className="p-4 bg-slate-50 border-t border-slate-200 text-slate-600 text-sm leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
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
                <div className="text-xl font-black text-indigo-600">{careerData.pricing.standard}</div>
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
                <div className="text-xl font-black text-indigo-600">{careerData.pricing.premium}</div>
              </div>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
          {careerData.pricing.features[selectedPricing].map((feature, index) => (
            <div key={index} className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2">
              <CheckCircle className="text-emerald-500" size={16} />
              <span className="text-sm text-slate-700">{feature}</span>
            </div>
          ))}
        </div>

        <button className="w-full bg-gradient-to-r from-indigo-600 to-blue-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95">
          <Calendar size={20} className="inline mr-2" />
          Book Your Consultation Now
        </button>
      </div>

      {/* CTA Footer */}
      <div className="mt-8 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-2xl p-6 text-center text-white">
        <h4 className="text-xl font-bold mb-2">Ready to Build Your Career?</h4>
        <p className="text-indigo-100 text-sm mb-4">Get personalized guidance from our expert career counsellors</p>
        <button className="bg-white text-indigo-600 px-8 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all shadow-lg">
          Book Free Consultation
        </button>
      </div>
    </div>
  );
};

export default CareerCounsellingCard;