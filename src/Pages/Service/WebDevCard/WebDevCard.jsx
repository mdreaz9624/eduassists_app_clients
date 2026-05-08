
import { useNavigate } from 'react-router-dom';
import { 
  Code2, 
  Layers, 
  Cpu, 
  ExternalLink, 
  ArrowLeft, 
  PlayCircle, 
  BookOpen, 
  Terminal,
  CheckCircle
} from 'lucide-react';

const WebDevCard = () => {
  const navigate = useNavigate();

  const roadmap = [
    {
      level: "Basic (The Foundation)",
      icon: <Code2 className="text-orange-500" />,
      topics: ["HTML5 Semantic Tags", "CSS3 Flexbox & Grid", "Basic JavaScript (DOM, Events)", "Responsive Design"],
      resources: [
        { name: "SuperSimpleDev (YouTube)", link: "https://www.youtube.com/@SuperSimpleDev", platform: "YouTube" },
        { name: "Web Design for Everybody", link: "https://www.coursera.org/specializations/web-design", platform: "Coursera" }
      ]
    },
    {
      level: "Intermediate (The Logic)",
      icon: <Terminal className="text-blue-400" />,
      topics: ["ES6+ JavaScript", "React.js Basics", "Tailwind CSS", "Git & GitHub", "Fetching APIs"],
      resources: [
        { name: "Programming with Mosh", link: "https://www.youtube.com/@programmingwithmosh", platform: "YouTube" },
        { name: "Meta Front-End Developer", link: "https://www.coursera.org/professional-certificates/meta-front-end-developer", platform: "Coursera" }
      ]
    },
    {
      level: "Advanced (The Full Stack)",
      icon: <Cpu className="text-purple-500" />,
      topics: ["Node.js & Express", "MongoDB/SQL", "Next.js 14", "Authentication (NextAuth/JWT)", "Deployment"],
      resources: [
        { name: "JavaScript Mastery", link: "https://www.youtube.com/@javascriptmastery", platform: "YouTube" },
        { name: "Full Stack Open", link: "https://fullstackopen.com/en/", platform: "University of Helsinki" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 p-4 md:p-10 font-sans">
      <div className="max-w-6xl mx-auto">
        {/* Navigation */}
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-400 hover:text-white font-bold mb-8 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> Back to EduAssists
        </button>

        {/* Hero Section */}
        <div className="relative overflow-hidden bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-16 mb-12">
          <div className="relative z-10">
            <span className="bg-indigo-600 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider mb-4 inline-block">
              Free Learning Path
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-white mb-6">
              Web Development <br /> <span className="text-indigo-500">Mastery Roadmap</span>
            </h1>
            <p className="text-slate-400 text-lg max-w-2xl leading-relaxed">
              At EduAssists, we believe in accessible education. This roadmap takes you from writing your first line of HTML to deploying full-scale production applications.
            </p>
          </div>
          <div className="absolute -right-20 -bottom-20 opacity-10">
            <Code2 size={400} />
          </div>
        </div>

        {/* Roadmap Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {roadmap.map((stage, index) => (
            <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-3xl p-8 flex flex-col justify-between hover:bg-slate-900 transition-colors">
              <div>
                <div className="w-14 h-14 bg-slate-800 rounded-2xl flex items-center justify-center mb-6">
                  {stage.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{stage.level}</h3>
                <ul className="space-y-3 mb-8">
                  {stage.topics.map((topic, i) => (
                    <li key={i} className="flex items-center gap-2 text-slate-400 text-sm">
                      <CheckCircle size={16} className="text-indigo-500" /> {topic}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="space-y-3">
                <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Recommended Resources</p>
                {stage.resources.map((res, i) => (
                  <a 
                    key={i}
                    href={res.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 bg-slate-800/50 rounded-xl hover:bg-indigo-600 transition-all text-sm group"
                  >
                    <span className="flex items-center gap-2">
                      <PlayCircle size={16} /> {res.name}
                    </span>
                    <ExternalLink size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="bg-indigo-600 rounded-3xl p-8 md:p-12 text-center shadow-2xl shadow-indigo-500/20">
          <h2 className="text-3xl font-black text-white mb-4">Need Personalized Mentorship?</h2>
          <p className="text-indigo-100 mb-8 max-w-xl mx-auto">
            While self-learning is great, having a mentor can save you months of struggle. Join our community for live doubt-solving sessions.
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <button className="px-8 py-4 bg-white text-indigo-600 font-black rounded-2xl hover:bg-slate-100 transition-all">
              Join Discord Community
            </button>
            <button className="px-8 py-4 bg-indigo-500 text-white font-black rounded-2xl border border-indigo-400 hover:bg-indigo-400 transition-all">
              Book a Consultation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebDevCard;