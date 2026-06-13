
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Clock, 
  Globe, 
  ExternalLink,
  User,
  BookOpen,
  Award,
  Linkedin,
  Facebook,
  Twitter,
  ChevronRight,
  X
} from "lucide-react";

const Contract = () => {
  const [data, setData] = useState({ teamMembers: [], offices: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        // Fetch from public folder
        const response = await fetch("/eduassistsAuthor.json");
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const json = await response.json();
        console.log("Loaded data:", json); // Debug log
        
        // Sort team members by priority
        const sortedTeam = json.teamMembers.sort((a, b) => a.priority - b.priority);
        setData({ ...json, teamMembers: sortedTeam });
        setError(null);
      } catch (err) {
        console.error("Error loading contact data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle navigation to details page
  const handleViewDetails = (member) => {
    // Navigate to details page with member id
    navigate(`/team/${member.id}`, { state: { member } });
  };

  // Group members by category
  const executives = data.teamMembers.filter(m => m.category === "Executive");
  const countryManagers = data.teamMembers.filter(m => m.category === "Country Management");
  const others = data.teamMembers.filter(m => m.category !== "Executive" && m.category !== "Country Management");

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Loading team directory...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-white to-indigo-50">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg max-w-md">
            <h3 className="font-bold mb-2">Error Loading Data</h3>
            <p>{error}</p>
            <button 
              onClick={() => window.location.reload()} 
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-28 bg-gradient-to-br from-slate-50 via-white to-indigo-50 font-sans">
      {/* Modern Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 py-24 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
        
        <div className="relative max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
            <Globe className="w-4 h-4" />
            <span className="text-sm">Global Education Network</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white to-indigo-200 bg-clip-text text-transparent">
            Connect With Our Experts
          </h1>
          <p className="text-indigo-200 text-xl max-w-3xl mx-auto">
            Start your journey to studying abroad with personalized guidance from our experienced counselors
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-16 space-y-24">
        
        {/* Executive Leadership Section */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-slate-800 mb-4">Executive Leadership</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">Visionary leaders driving educational excellence worldwide</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {executives.map((member) => (
              <ModernTeamCard 
                key={member.id} 
                member={member} 
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </section>

        {/* Country Managers Section */}
        <section className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-3xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">Study Abroad Consultation</h2>
            <p className="text-slate-600">Get expert guidance from our country specialists</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countryManagers.map((manager) => (
              <CountryManagerCard 
                key={manager.id} 
                manager={manager} 
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </section>

        {/* Other Team Members */}
        <section>
          <h2 className="text-2xl font-bold text-slate-800 mb-8 text-center">Our Dedicated Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {others.map((member) => (
              <TeamMemberCard 
                key={member.id} 
                member={member} 
                onViewDetails={handleViewDetails}
              />
            ))}
          </div>
        </section>

        {/* Office Locations */}
        <section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Offices</h2>
            <p className="text-slate-600">Visit us at any of our convenient locations</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {data.offices.map((office) => (
              <ModernOfficeCard key={office.id} office={office} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

// Modern Team Card Component
const ModernTeamCard = ({ member, onViewDetails }) => (
  <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2">
    <div className="relative">
      <img 
        src={member.image} 
        alt={member.name} 
        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500" 
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-slate-800">{member.name}</h3>
      <p className="text-indigo-600 font-semibold text-sm mb-4">{member.role}</p>
      <div className="flex gap-3">
        <a
          href={`https://wa.me/${member.whatsapp}`}
          target="_blank"
          className="flex-1 bg-green-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition-colors text-center"
        >
          WhatsApp
        </a>
        <button
          onClick={() => onViewDetails(member)}
          className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors"
        >
          View Bio
        </button>
      </div>
    </div>
  </div>
);

// Country Manager Card
const CountryManagerCard = ({ manager, onViewDetails }) => (
  <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all p-6 transform hover:-translate-y-1">
    <div className="flex items-center gap-4 mb-4">
      <span className="text-5xl">{manager.flag}</span>
      <div>
        <h4 className="font-bold text-slate-800 text-lg">{manager.name}</h4>
        <p className="text-indigo-600 text-sm">{manager.country}</p>
      </div>
    </div>
    <p className="text-gray-600 text-sm mb-4 line-clamp-2">{manager.bio}</p>
    <div className="flex gap-3">
      <a
        href={manager.bookingLink}
        target="_blank"
        className="flex-1 bg-indigo-600 text-white py-2 rounded-lg text-sm font-semibold hover:bg-indigo-700 transition-colors text-center"
      >
        Book Session
      </a>
      <button
        onClick={() => onViewDetails(manager)}
        className="px-4 py-2 border border-indigo-600 text-indigo-600 rounded-lg text-sm font-semibold hover:bg-indigo-50 transition-colors"
      >
        Details
      </button>
    </div>
  </div>
);

// Team Member Card
const TeamMemberCard = ({ member, onViewDetails }) => (
  <div className="bg-white rounded-xl shadow-md hover:shadow-lg transition-all p-5 text-center transform hover:-translate-y-1">
    <img 
      src={member.image} 
      alt={member.name} 
      className="w-24 h-24 rounded-full mx-auto mb-3 object-cover border-4 border-indigo-100" 
    />
    <h4 className="font-bold text-slate-800">{member.name}</h4>
    <p className="text-indigo-600 text-xs font-semibold mb-3">{member.role}</p>
    <div className="flex justify-center gap-2">
      <a href={`mailto:${member.email}`} className="p-2 bg-gray-100 rounded-lg hover:bg-indigo-100 transition-colors">
        <Mail size={14} />
      </a>
      <a href={`https://wa.me/${member.whatsapp}`} target="_blank" className="p-2 bg-gray-100 rounded-lg hover:bg-green-100 transition-colors">
        <MessageCircle size={14} />
      </a>
      <button onClick={() => onViewDetails(member)} className="p-2 bg-gray-100 rounded-lg hover:bg-blue-100 transition-colors">
        <User size={14} />
      </button>
    </div>
  </div>
);

// Modern Office Card
const ModernOfficeCard = ({ office }) => (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transform hover:-translate-y-1 transition-all">
    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4">
      <span className="text-white/90 text-sm uppercase tracking-wider">{office.type}</span>
      <h3 className="text-white text-2xl font-bold">{office.name}</h3>
    </div>
    <div className="p-6 space-y-4">
      <div className="flex items-start gap-3">
        <MapPin className="text-indigo-500 shrink-0 mt-1" size={20} />
        <p className="text-gray-600 text-sm">{office.address}</p>
      </div>
      <div className="flex items-center gap-3">
        <Phone className="text-indigo-500 shrink-0" size={20} />
        <div>
          <p className="text-gray-600 text-sm">{office.phone}</p>
          <p className="text-gray-500 text-xs">Available for calls</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <Clock className="text-indigo-500 shrink-0" size={20} />
        <div>
          <p className="text-gray-600 text-sm">{office.workingHours}</p>
        </div>
      </div>
      {office.facilities && (
        <div className="pt-4 border-t">
          <p className="text-sm font-semibold text-gray-700 mb-2">Facilities:</p>
          <div className="flex flex-wrap gap-2">
            {office.facilities.map((facility, idx) => (
              <span key={idx} className="text-xs bg-gray-100 px-2 py-1 rounded-full">{facility}</span>
            ))}
          </div>
        </div>
      )}
      <a 
        href={office.mapLink} 
        target="_blank" 
        className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white rounded-xl font-semibold hover:bg-black transition-all"
      >
        Get Directions <ExternalLink size={16} />
      </a>
    </div>
  </div>
);

export default Contract;