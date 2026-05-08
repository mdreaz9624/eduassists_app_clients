import React from 'react';
// ADDED Sparkles TO THE IMPORT LIST BELOW
import { 
  Github, Mail, Phone, MapPin, GraduationCap, 
  Briefcase, Code, BookOpen, Microscope, 
  User, Award, Sparkles, ExternalLink 
} from 'lucide-react';
import { motion } from 'framer-motion';

const DeveloperProfile = () => {
  const skills = ["React", "Node.js", "MongoDB", "Express", "Tailwind CSS", "Firebase"];
  
  const experiences = [
    { 
      title: "Admin & IT", 
      company: "EduAssists", 
      date: "Nov 2025 - Present", 
      desc: "Head of Data Collection Team. Managing IT operations for international education consultancy." 
    },
    { 
      title: "Lecturer", 
      company: "Eminence College", 
      date: "April 2023 - Dec 2025", 
      desc: "Teaching Image Processing, Software Engineering, and Artificial Intelligence." 
    },
    { 
      title: "ICT Course Co-ordinator", 
      company: "Marit Care Academy", 
      date: "July 2022 - Dec 2023", 
      desc: "Managed ICT curriculum and student development." 
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 font-roboto pb-20">
      {/* Hero Section */}
      <header className="bg-indigo-900 text-white pt-20 pb-32 px-6 relative overflow-hidden">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-48 h-48 rounded-2xl border-4 border-white/20 overflow-hidden bg-slate-200 shadow-2xl"
          >
            <img 
              src="https://github.com/ahsan-reaz-96.png" 
              alt="Ahsan Majumder Reaz" 
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="text-center md:text-left space-y-3">
            <h1 className="text-4xl md:text-5xl font-black">Ahsan Majumder Reaz (Reaz)</h1>
            <p className="text-indigo-200 text-xl font-medium">Full Stack Developer & CSE Educator</p>
            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
              <a href="mailto:reaz.edu.assists@gmail.com" className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all border border-white/10">
                <Mail size={16} /> reaz.edu.assists@gmail.com
              </a>
              <a href="https://github.com/ahsan-reaz-96" target="_blank" rel="noreferrer" className="flex items-center gap-2 text-sm bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all border border-white/10">
                <Github size={16} /> GitHub Profile
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 -mt-16 relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Sidebar */}
          <div className="space-y-6">
            <section className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <User className="text-indigo-600" /> Personal Details
              </h2>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-400">Blood Group</span>
                  <span className="font-bold text-red-600 text-lg">A+</span>
                </div>
                <div className="flex justify-between border-b pb-2">
                  <span className="text-slate-400">WhatsApp</span>
                  <span className="font-bold text-slate-700">+8801314883093</span>
                </div>
                <div className="pt-2">
                  <p className="text-xs text-slate-400">Parents</p>
                  <p className="text-slate-700 font-medium italic">Hafezz Ruhul Amin & Nasima Begum</p>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                <Code className="text-indigo-600" /> Tech Skills
              </h2>
              <div className="flex flex-wrap gap-2">
                {skills.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs font-bold border border-indigo-100">
                    {skill}
                  </span>
                ))}
              </div>
            </section>
          </div>

          {/* Experience & Education */}
          <div className="lg:col-span-2 space-y-6">
            <section className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-800 mb-8 flex items-center gap-2">
                <Briefcase className="text-indigo-600" /> Professional Experience
              </h2>
              <div className="space-y-8">
                {experiences.map((exp, i) => (
                  <div key={i} className="relative pl-8 border-l-2 border-slate-100 group">
                    <div className="absolute w-4 h-4 bg-indigo-600 rounded-full -left-[9px] top-1 group-hover:scale-125 transition-transform"></div>
                    <p className="text-xs font-bold text-indigo-600 uppercase">{exp.date}</p>
                    <h3 className="text-lg font-bold text-slate-800">{exp.title}</h3>
                    <p className="text-slate-500 font-medium">{exp.company}</p>
                    <p className="text-sm text-slate-400 mt-2">{exp.desc}</p>
                  </div>
                ))}
              </div>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <section className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <Microscope className="text-indigo-600" /> Research
                </h2>
                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                  <h4 className="font-bold text-slate-700 text-sm italic">"Combined Convolutional Edge Detection"</h4>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                    Research-based image processing project focusing on optimized edge detection algorithms.
                  </p>
                </div>
              </section>

              <section className="bg-white rounded-3xl p-8 shadow-xl border border-slate-100">
                <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <GraduationCap className="text-indigo-600" /> Education
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-indigo-600">BSc in CSE (2017-2022)</p>
                    <p className="text-sm font-bold text-slate-700">CGPA: 3.75 / 4.00</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-indigo-600">HSC (Science)</p>
                    <p className="text-sm font-bold text-slate-700">GPA: 4.75 / 5.00</p>
                  </div>
                </div>
              </section>
            </div>

            {/* Sparkles icon used here */}
            <section className="bg-indigo-600 rounded-3xl p-8 text-white shadow-xl shadow-indigo-200">
               <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <Sparkles size={20}/> Key Projects
               </h2>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-indigo-900">
                  <div className="bg-white p-4 rounded-xl">
                    <h4 className="font-bold">eduassists-apps.web.app</h4>
                    <p className="text-xs mt-1">Full stack development using React & Firebase.</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl">
                    <h4 className="font-bold">Testing & Data</h4>
                    <p className="text-xs mt-1">Lead testing and data collection operations.</p>
                  </div>
               </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DeveloperProfile;