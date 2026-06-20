import { 
  BookOpen, 
  Globe, 
  Code, 
  Users, 
  GraduationCap, 
  Plane, 
  Home, 
  FileText, 
  CheckCircle,
  ArrowRight,
  Award,
  Briefcase,
  MapPin,
  Clock,
  Shield,
  Heart,
  MessageCircle,
  Calendar,
  Mic,
  FileAudio,
  PenTool,
  BookMarked,
  Monitor,
  Server,
  Database,
  Layout,
  Smartphone,
  Cloud,
  Terminal,
  GitBranch,
  Zap
} from 'lucide-react';

// Language Test Services
export const languageServices = [
  {
    id: 'ielts',
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
        tips: ["Practice with different accents", "Learn note-taking techniques", "Understand question types"]
      },
      {
        name: "Reading",
        icon: <BookMarked size={20} />,
        description: "3 sections, 40 questions, 60 minutes",
        tips: ["Skim & scan techniques", "Time management", "Understand passage structures"]
      },
      {
        name: "Writing",
        icon: <PenTool size={20} />,
        description: "Task 1 & Task 2 academic writing",
        tips: ["Essay structure", "Vocabulary building", "Grammar accuracy"]
      },
      {
        name: "Speaking",
        icon: <Mic size={20} />,
        description: "11-14 minute face-to-face interview",
        tips: ["Fluency practice", "Pronunciation", "Confidence building"]
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
  },
  {
    id: 'toefl',
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
        tips: ["Academic vocabulary", "Reading comprehension", "Inference skills"]
      },
      {
        name: "Listening",
        icon: <FileAudio size={20} />,
        description: "3-4 lectures, 2-3 conversations",
        tips: ["Academic listening", "Lecture comprehension", "Note-taking"]
      },
      {
        name: "Speaking",
        icon: <Mic size={20} />,
        description: "4 tasks, 4 minutes total",
        tips: ["Integrated speaking", "Templates", "Time management"]
      },
      {
        name: "Writing",
        icon: <PenTool size={20} />,
        description: "2 tasks, 50 minutes total",
        tips: ["Academic writing", "Integrated writing", "Structured essays"]
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
  }
];

// Web Development Services
export const webDevelopmentServices = [
  {
    id: 'web-dev',
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
  }
];

// Combined Premium Services from Your Documents
export const premiumServices = [
  {
    id: 'career-counselling',
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
    ]
  },
  {
    id: 'university-selection',
    title: "University Selection",
    tagline: "Find institutions that fit your profile, budget, and ambitions",
    description: "We cut through the noise using a structured matching process that combines your academic profile, personal priorities, and career goals.",
    icon: <GraduationCap className="text-blue-600" size={28} />,
    category: "admissions",
    path: "/university-selection",
    color: "from-blue-500 to-cyan-600",
    bgColor: "bg-blue-50",
    stats: [
      { label: "Universities Database", value: "2,000+" },
      { label: "Countries Covered", value: "30+" },
      { label: "Top-Choice Admission", value: "87%" }
    ],
    features: [
      "Personalised Matching",
      "Ranking Guidance",
      "Campus Insights",
      "Reach, Match & Safety Schools"
    ]
  },
  {
    id: 'application-assistance',
    title: "Application Assistance",
    tagline: "Complete support from first draft to acceptance letter",
    description: "We guide you through the entire application process - from gathering documents to pressing submit - ensuring everything you send is accurate, complete, and compelling.",
    icon: <FileText className="text-emerald-600" size={28} />,
    category: "admissions",
    path: "/application-assistance",
    color: "from-emerald-500 to-teal-600",
    bgColor: "bg-emerald-50",
    stats: [
      { label: "Application Completion", value: "98%" },
      { label: "Successful Applications", value: "3,400+" },
      { label: "Review Turnaround", value: "72hrs" }
    ],
    features: [
      "SOP Writing",
      "Form Guidance",
      "Document Review",
      "Offer Management"
    ]
  },
  {
    id: 'visa-support',
    title: "Visa Support",
    tagline: "Expert guidance for your student visa application",
    description: "Our advisors know each country's student visa requirements in detail and stay current as policies change, so you receive accurate guidance.",
    icon: <Globe className="text-purple-600" size={28} />,
    category: "visa",
    path: "/visa-support",
    color: "from-purple-500 to-pink-600",
    bgColor: "bg-purple-50",
    stats: [
      { label: "Visa Approval Rate", value: "99%" },
      { label: "Destinations Covered", value: "50+" },
      { label: "Checklist Turnaround", value: "24hrs" }
    ],
    features: [
      "Visa Consultation",
      "Document Checklist",
      "Interview Preparation",
      "Post-Visa Support"
    ]
  },
  {
    id: 'scholarship-assistance',
    title: "Scholarship Assistance",
    tagline: "Discover and win funding for your studies",
    description: "We do the hard work of discovery and application strategy so you can focus on your goals. Find and win the right scholarships for your profile.",
    icon: <Award className="text-yellow-600" size={28} />,
    category: "scholarship",
    path: "/scholarship",
    color: "from-yellow-500 to-orange-600",
    bgColor: "bg-yellow-50",
    stats: [
      { label: "Scholarships Secured", value: "£2.4M+" },
      { label: "Programmes Tracked", value: "800+" },
      { label: "Win Rate", value: "1 in 3" }
    ],
    features: [
      "Scholarship Search",
      "Application Help",
      "Grant Guidance",
      "Funding Strategy"
    ]
  },
  {
    id: 'pre-departure',
    title: "Pre-Departure Support",
    tagline: "Arrive prepared - accommodation, finances, and insurance sorted",
    description: "We make sure you have everything in order before you board: accommodation confirmed, banking arranged, insurance in place.",
    icon: <Plane className="text-cyan-600" size={28} />,
    category: "arrival",
    path: "/pre-departure",
    color: "from-cyan-500 to-sky-600",
    bgColor: "bg-cyan-50",
    stats: [
      { label: "Destinations", value: "30+" },
      { label: "Services Covered", value: "8" },
      { label: "Student Satisfaction", value: "92%" }
    ],
    features: [
      "Accommodation Help",
      "Banking Setup",
      "Health Insurance",
      "Cultural Preparation"
    ]
  },
  {
    id: 'post-arrival',
    title: "Post-Arrival Support",
    tagline: "Ongoing support through registration and orientation",
    description: "Our post-arrival team stays with you through university registration, local orientation, and the adjustment period throughout your first semester.",
    icon: <Heart className="text-rose-600" size={28} />,
    category: "arrival",
    path: "/post-arrival",
    color: "from-rose-500 to-red-600",
    bgColor: "bg-rose-50",
    stats: [
      { label: "Support Duration", value: "Full Semester" },
      { label: "Services", value: "10+" },
      { label: "Student Satisfaction", value: "94%" }
    ],
    features: [
      "University Registration",
      "Local Orientation",
      "Community Connection",
      "Wellbeing Check-ins"
    ]
  },
  {
    id: 'file-assessment',
    title: "File Assessment",
    tagline: "Honest, expert evaluation before you apply",
    description: "Get a clear-eyed view of your profile's strengths and gaps with specific, actionable recommendations - not vague encouragement.",
    icon: <CheckCircle className="text-teal-600" size={28} />,
    category: "assessment",
    path: "/file-assessment",
    color: "from-teal-500 to-green-600",
    bgColor: "bg-teal-50",
    stats: [
      { label: "Turnaround Time", value: "48hrs" },
      { label: "Factors Assessed", value: "12+" },
      { label: "Prediction Accuracy", value: "91%" }
    ],
    features: [
      "Profile Analysis",
      "Strength Assessment",
      "Gap Identification",
      "Written Report"
    ]
  },
  {
    id: 'check-eligibility',
    title: "Check Eligibility",
    tagline: "Find out which universities and courses you qualify for",
    description: "Cross-reference your academic profile against actual entry requirements for thousands of courses and universities instantly.",
    icon: <Clock className="text-violet-600" size={28} />,
    category: "assessment",
    path: "/eligibility",
    color: "from-violet-500 to-purple-600",
    bgColor: "bg-violet-50",
    stats: [
      { label: "Courses Database", value: "10,000+" },
      { label: "Results Time", value: "Under 3 mins" },
      { label: "Countries", value: "30+" }
    ],
    features: [
      "Quick Eligibility Check",
      "Match Suggestions",
      "Course Filtering",
      "Real-time Data"
    ]
  }
];

// Combine all services
export const allServices = [
  ...languageServices,
  ...webDevelopmentServices,
  ...premiumServices
];

// Service categories for filtering
export const serviceCategories = [
  { id: 'all', label: 'All Services', icon: '📋' },
  { id: 'language', label: 'Language Tests', icon: '🌐' },
  { id: 'web', label: 'Web Development', icon: '💻' },
  { id: 'career', label: 'Career & Planning', icon: '🎯' },
  { id: 'admissions', label: 'Admissions', icon: '📚' },
  { id: 'visa', label: 'Visa & Immigration', icon: '🛂' },
  { id: 'scholarship', label: 'Scholarships', icon: '💰' },
  { id: 'arrival', label: 'Arrival Support', icon: '✈️' },
  { id: 'assessment', label: 'Assessment', icon: '📊' }
];