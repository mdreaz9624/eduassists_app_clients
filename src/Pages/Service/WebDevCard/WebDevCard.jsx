import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Code, 
  Layout, 
  Server, 
  Terminal, 
  ArrowLeft, 
  PlayCircle, 
  BookOpen, 
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
  Monitor,
  Database,
  Cloud,
  GitBranch,
  Layers,
  Cpu,
  ExternalLink
} from 'lucide-react';

const WebDevCard = () => {
  const navigate = useNavigate();
  const [activeTech, setActiveTech] = useState(null);
  const [selectedPricing, setSelectedPricing] = useState('standard');

  // Web Dev Data from your serviceData
  const webDevData = {
    title: "Web Development",
    tagline: "Free project-based courses covering React, Node, and more",
    description: "Learn modern web development through hands-on projects. Our free courses cover everything from frontend to backend, helping you build a strong portfolio and launch your career as a developer.",
    icon: <Code className="text-emerald-600" size={28} />,
    category: "web",
    path: "/web-dev-card",
    buttonText: "Start Learning",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
    badge: "Free Access",
    stats: [
      { label: "Projects Built", value: "50+" },
      { label: "Students", value: "3,200+" },
      { label: "Certificate", value: "Yes" }
    ],
    features: [
      "Project-Based Learning",
      "Industry-Relevant Skills",
      "Portfolio Building",
      "Career Guidance",
      "Community Support",
      "Free Certificate"
    ],
    technologies: [
      {
        name: "Frontend",
        icon: <Layout size={20} />,
        techs: ["React", "Vue.js", "Tailwind CSS", "HTML5", "CSS3", "JavaScript"]
      },
      {
        name: "Backend",
        icon: <Server size={20} />,
        techs: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Firebase"]
      },
      {
        name: "DevOps & Tools",
        icon: <Terminal size={20} />,
        techs: ["Git", "GitHub", "Vercel", "Netlify", "Docker", "AWS"]
      }
    ],
    courses: [
      {
        title: "React Complete Guide",
        level: "Intermediate",
        duration: "12 weeks",
        description: "Master React with hooks, state management, and real projects"
      },
      {
        title: "Full-Stack Development",
        level: "Advanced",
        duration: "16 weeks",
        description: "Build full-stack apps with MERN stack"
      },
      {
        title: "Frontend Fundamentals",
        level: "Beginner",
        duration: "8 weeks",
        description: "HTML, CSS, JavaScript basics"
      }
    ],
    pricing: {
      standard: "Free",
      premium: "$50/month",
      features: {
        standard: ["All Courses", "Community Access", "Basic Support"],
        premium: ["Live Sessions", "Project Reviews", "Career Support", "1-on-1 Mentoring"]
      }
    }
  };

  return (
    <div className="max-w-6xl mx-auto mt-24 p-4 md:p-8 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 min-h-screen">
      
      {/* Back Button */}
      <button 
        onClick={() => navigate(-1)} 
        className="flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold mb-6 transition-colors"
      >
        <ArrowLeft size={20} /> Back to Services
      </button>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-700 rounded-3xl p-8 md:p-12 mb-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24"></div>
        
        <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex-1 text-white">
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-1.5 rounded-full mb-4">
              <Sparkles size={16} />
              <span className="text-sm font-semibold">Free Access Course</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-3">{webDevData.title}</h1>
            <p className="text-emerald-100 text-lg mb-4">{webDevData.tagline}</p>
            <p className="text-white/80 max-w-2xl">{webDevData.description}</p>
          </div>
          <div className="flex-shrink-0">
            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6 text-center">
              <div className="text-4xl font-bold text-white">100%</div>
              <div className="text-white/80 text-sm">Free Access</div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {webDevData.stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 text-center hover:shadow-md transition-all">
            <div className="text-3xl font-bold text-emerald-600">{stat.value}</div>
            <div className="text-sm text-slate-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 mb-8">
        <h3 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
          <Award className="text-emerald-600" size={24} />
          What You'll Get
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {webDevData.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-2 bg-emerald-50 rounded-xl px-4 py-2.5">
              <Check className="text-emerald-600" size={16} />
              <span className="text-sm text-slate-700">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies Section */}
      <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <Layers className="text-emerald-600" size={24} />
        Technologies Covered
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {webDevData.technologies.map((tech) => (
          <div 
            key={tech.name}
            className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden transition-all hover:shadow-lg"
          >
            <div 
              className="p-5 cursor-pointer flex items-center justify-between hover:bg-slate-50 transition-colors"
              onClick={() => setActiveTech(activeTech === tech.name ? null : tech.name)}
            >
              <div className="flex items-center gap-3">
                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                  {tech.icon}
                </div>
                <h4 className="text-lg font-bold text-slate-900">{tech.name}</h4>
              </div>
              {activeTech === tech.name ? <ChevronUp className="text-emerald-600" /> : <ChevronDown className="text-emerald-600" />}
            </div>

            {activeTech === tech.name && (
              <div className="p-4 bg-emerald-50/30 border-t border-slate-100">
                <div className="flex flex-wrap gap-2">
                  {tech.techs.map((t, index) => (
                    <span key={index} className="text-xs bg-white text-slate-700 px-3 py-1.5 rounded-full border border-slate-200">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Courses Section */}
      <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <BookOpen className="text-emerald-600" size={24} />
        Available Courses
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {webDevData.courses.map((course, index) => (
          <div key={index} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all">
            <div className="flex items-start justify-between mb-3">
              <h4 className="text-lg font-bold text-slate-900">{course.title}</h4>
              <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                course.level === 'Beginner' ? 'bg-green-100 text-green-700' :
                course.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-700' :
                'bg-red-100 text-red-700'
              }`}>
                {course.level}
              </span>
            </div>
            <p className="text-sm text-slate-600 mb-3">{course.description}</p>
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <Clock size={16} />
              <span>{course.duration}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Pricing Section */}
      <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-6 md:p-8">
        <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">Choose Your Plan</h3>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1 bg-emerald-50 rounded-xl p-4 border-2 border-emerald-200 relative">
            <div className="absolute -top-3 right-4 bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded-full">
              Best Value
            </div>
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="pricing"
                value="standard"
                checked={selectedPricing === 'standard'}
                onChange={() => setSelectedPricing('standard')}
                className="w-4 h-4 text-emerald-600"
              />
              <div>
                <div className="font-bold text-slate-900">Standard Plan</div>
                <div className="text-xl font-black text-emerald-600">{webDevData.pricing.standard}</div>
              </div>
            </label>
          </div>
          <div className="flex-1 bg-slate-50 rounded-xl p-4">
            <label className="flex items-center gap-3 cursor-pointer">
              <input
                type="radio"
                name="pricing"
                value="premium"
                checked={selectedPricing === 'premium'}
                onChange={() => setSelectedPricing('premium')}
                className="w-4 h-4 text-emerald-600"
              />
              <div>
                <div className="font-bold text-slate-900">Premium Plan</div>
                <div className="text-xl font-black text-emerald-600">{webDevData.pricing.premium}</div>
              </div>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
          {webDevData.pricing.features[selectedPricing].map((feature, index) => (
            <div key={index} className="flex items-center gap-2 bg-slate-50 rounded-xl px-3 py-2">
              <CheckCircle className="text-emerald-500" size={16} />
              <span className="text-sm text-slate-700">{feature}</span>
            </div>
          ))}
        </div>

        <button className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-lg transition-all hover:scale-[1.02] active:scale-95">
          <PlayCircle size={20} className="inline mr-2" />
          Start Learning Now
        </button>
      </div>

      {/* CTA Footer */}
      <div className="mt-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-6 text-center text-white">
        <h4 className="text-xl font-bold mb-2">Ready to Become a Developer?</h4>
        <p className="text-emerald-100 text-sm mb-4">Join 3,200+ students who built their careers with us</p>
        <button className="bg-white text-emerald-600 px-8 py-3 rounded-xl font-bold hover:bg-emerald-50 transition-all shadow-lg">
          Join Community
        </button>
      </div>
    </div>
  );
};

export default WebDevCard;