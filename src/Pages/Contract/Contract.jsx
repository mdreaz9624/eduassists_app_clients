

import React, { useState, useEffect } from "react";
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Clock, 
  Globe, 
  ExternalLink 
} from "lucide-react";

const Contract = () => {
  const [data, setData] = useState({ teamMembers: [], offices: [] });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Assuming the file is in your public folder
    fetch("/eduassistsAuthor.json")
      .then((res) => res.json())
      .then((json) => {
        // Sort team members by priority
        const sortedTeam = json.teamMembers.sort((a, b) => a.priority - b.priority);
        setData({ ...json, teamMembers: sortedTeam });
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error loading contact data:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="p-20 text-center animate-pulse text-blue-600 font-bold">Loading EduAssists Contact Directory...</div>;

  // Group members by category for cleaner UI
  const executives = data.teamMembers.filter(m => m.category === "Executive");
  const countryManagers = data.teamMembers.filter(m => m.category === "Country Management");
  const others = data.teamMembers.filter(m => m.category !== "Executive" && m.category !== "Country Management");

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      {/* Header Section */}
      <section className="bg-indigo-900 py-20 px-4 text-center text-white">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contact Our Global Team</h1>
        <p className="text-indigo-200 text-lg max-w-2xl mx-auto">
          Connect with our experts and start your journey towards international education excellence.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-24">
        
        {/* 1. Executive Board */}
        <section>
          <div className="flex items-center gap-3 mb-10 border-l-4 border-indigo-600 pl-4">
            <h2 className="text-3xl font-bold text-slate-800">Executive Leadership</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {executives.map((member) => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </section>

        {/* 2. Country Managers & Appointments */}
        <section className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          <div className="grid lg:grid-cols-5">
            <div className="lg:col-span-2 bg-indigo-600 p-10 text-white flex flex-col justify-center">
              <Globe className="w-16 h-16 mb-6 opacity-50" />
              <h2 className="text-3xl font-bold mb-4">Study Abroad Consultation</h2>
              <p className="text-indigo-100 mb-8">
                Want to meet a specific Country Manager? Choose a manager and book a Google Meet appointment. 
                Our Admin team will confirm your schedule.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 bg-white/10 p-3 rounded-xl">
                  <Calendar className="text-indigo-200" />
                  <span className="text-sm">Automated Google Meet links</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-3 p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-6">
              {countryManagers.map((manager) => (
                <div key={manager.id} className="border border-slate-200 rounded-2xl p-6 hover:border-indigo-400 transition-colors">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl">{manager.flag}</span>
                    <div>
                      <h4 className="font-bold text-slate-800">{manager.name}</h4>
                      <p className="text-xs text-slate-500 uppercase tracking-wider">{manager.country}</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => window.open(manager.bookingLink, "_blank")}
                    className="w-full py-3 bg-indigo-50 text-indigo-700 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-indigo-600 hover:text-white transition-all"
                  >
                    <Calendar size={16} /> Schedule Google Meet
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. Operational Team */}
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-8 pl-4 border-l-4 border-slate-400">Our Departments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {others.map((member) => (
              <div key={member.id} className="bg-white p-5 rounded-2xl shadow-sm border border-slate-100">
                <h4 className="font-bold text-slate-800 text-sm">{member.name}</h4>
                <p className="text-indigo-600 text-xs font-semibold mb-4">{member.role}</p>
                <div className="flex gap-3">
                  <a href={`mailto:${member.email}`} className="p-2 bg-slate-100 rounded-lg hover:text-indigo-600 transition-colors"><Mail size={16}/></a>
                  <a href={`https://wa.me/${member.whatsapp}`} target="_blank" className="p-2 bg-slate-100 rounded-lg hover:text-green-600 transition-colors"><MessageCircle size={16}/></a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 4. Office Locations & Map */}
        <section className="pb-20">
          <div className="flex items-center gap-3 mb-10 border-l-4 border-emerald-500 pl-4">
            <h2 className="text-3xl font-bold text-slate-800">Visit Our Offices</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {data.offices.map((office) => (
              <div key={office.id} className="bg-white rounded-3xl shadow-md border border-slate-100 overflow-hidden flex flex-col">
                <div className="p-8 flex-grow">
                  <span className="bg-emerald-100 text-emerald-700 text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4 inline-block">
                    {office.type}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-800 mb-4">{office.name}</h3>
                  <div className="space-y-4 text-slate-600">
                    <p className="flex items-start gap-3 text-sm">
                      <MapPin className="text-indigo-500 shrink-0" size={20} />
                      {office.address}
                    </p>
                    <p className="flex items-center gap-3 text-sm">
                      <Phone className="text-indigo-500 shrink-0" size={20} />
                      {office.phone}
                    </p>
                    <p className="flex items-center gap-3 text-sm">
                      <Clock className="text-indigo-500 shrink-0" size={20} />
                      {office.workingHours}
                    </p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 border-t">
                  <a 
                    href={office.mapLink} 
                    target="_blank" 
                    rel="noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-black transition-all"
                  >
                    View on Google Maps <ExternalLink size={16} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// Reusable Team Card Component
const TeamCard = ({ member }) => (
  <div className="group bg-white rounded-3xl p-6 shadow-md hover:shadow-2xl transition-all duration-300 border border-slate-100 relative overflow-hidden">
    <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-50 rounded-bl-full -mr-10 -mt-10 group-hover:scale-150 transition-transform duration-500"></div>
    <div className="relative flex flex-col items-center text-center">
      <img 
        src={member.image} 
        alt={member.name} 
        className="w-24 h-24 rounded-2xl object-cover mb-4 ring-4 ring-indigo-50 group-hover:ring-indigo-100 transition-all"
      />
      <h3 className="text-xl font-bold text-slate-800">{member.name}</h3>
      <p className="text-indigo-600 font-semibold text-sm mb-6">{member.role}</p>
      
      <div className="flex gap-3 w-full">
        <a 
          href={`mailto:${member.email}`}
          className="flex-grow flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-indigo-50 hover:text-indigo-600 transition-all text-sm font-medium"
        >
          <Mail size={16} /> Email
        </a>
        <a 
          href={`https://wa.me/${member.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          className="flex-grow flex items-center justify-center gap-2 py-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-emerald-50 hover:text-emerald-600 transition-all text-sm font-medium"
        >
          <MessageCircle size={16} /> WhatsApp
        </a>
      </div>
    </div>
  </div>
);

export default Contract;
