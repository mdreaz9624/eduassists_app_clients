import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Phone, 
  MessageCircle, 
  Calendar, 
  MapPin, 
  Clock, 
  Globe, 
  ArrowLeft,
  BookOpen,
  Award,
  Users,
  Briefcase,
  Languages,
  Linkedin,
  Facebook,
  Twitter,
  ExternalLink
} from 'lucide-react';

const TeamDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const member = location.state?.member;

  // If no member data, redirect back to contact page
  if (!member) {
    navigate('/contact');
    return null;
  }

  return (
    <div className="min-h-screen mt-28 bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 pt-8">
        <Link to="/contract">
          <button className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 transition-colors mb-6">
            <ArrowLeft size={20} />
            Back to Team
          </button>
        </Link>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <img 
              src={member.image} 
              alt={member.name}
              className="w-40 h-40 rounded-2xl object-cover border-4 border-white/20 shadow-2xl"
            />
            <div className="text-center md:text-left">
              <h1 className="text-4xl md:text-5xl font-bold mb-2">{member.name}</h1>
              <p className="text-indigo-200 text-xl mb-4">{member.role}</p>
              {member.country && (
                <div className="flex items-center gap-2 justify-center md:justify-start">
                  <span className="text-2xl">{member.flag}</span>
                  <span className="text-indigo-200">Country Manager - {member.country}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Contact Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-32">
              <h3 className="text-xl font-bold text-slate-800 mb-4">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="text-indigo-600" size={20} />
                  <a href={`mailto:${member.email}`} className="text-gray-600 hover:text-indigo-600">
                    {member.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="text-indigo-600" size={20} />
                  <a href={`tel:${member.phone}`} className="text-gray-600 hover:text-indigo-600">
                    {member.phone}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MessageCircle className="text-green-600" size={20} />
                  <a href={`https://wa.me/${member.whatsapp}`} target="_blank" className="text-gray-600 hover:text-green-600">
                    WhatsApp Chat
                  </a>
                </div>
                {member.bookingLink && (
                  <div className="flex items-center gap-3">
                    <Calendar className="text-purple-600" size={20} />
                    <a href={member.bookingLink} target="_blank" className="text-gray-600 hover:text-purple-600">
                      Book Appointment
                    </a>
                  </div>
                )}
              </div>

              <hr className="my-6" />

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <Clock size={18} /> Office Hours
                  </h4>
                  <p className="text-gray-600 text-sm">{member.officeHours}</p>
                </div>
                <div>
                  <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                    <Globe size={18} /> Response Time
                  </h4>
                  <p className="text-gray-600 text-sm">{member.responseTime}</p>
                </div>
                {member.languages && (
                  <div>
                    <h4 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                      <Languages size={18} /> Languages
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {member.languages.map((lang, idx) => (
                        <span key={idx} className="px-2 py-1 bg-indigo-50 text-indigo-700 rounded-lg text-xs">
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <hr className="my-6" />

              {member.socialLinks && (
                <div>
                  <h4 className="font-semibold text-slate-800 mb-3">Connect on Social</h4>
                  <div className="flex gap-3">
                    {member.socialLinks.linkedin && (
                      <a href={member.socialLinks.linkedin} target="_blank" className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                        <Linkedin size={20} />
                      </a>
                    )}
                    {member.socialLinks.facebook && (
                      <a href={member.socialLinks.facebook} target="_blank" className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition-all">
                        <Facebook size={20} />
                      </a>
                    )}
                    {member.socialLinks.twitter && (
                      <a href={member.socialLinks.twitter} target="_blank" className="p-2 bg-sky-50 text-sky-600 rounded-lg hover:bg-sky-600 hover:text-white transition-all">
                        <Twitter size={20} />
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Main Content - Bio and Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Bio Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-4">Biography</h2>
              <p className="text-gray-700 leading-relaxed">{member.bio}</p>
            </div>

            {/* Education Section */}
            {member.education && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <BookOpen className="text-indigo-600" /> Education
                </h2>
                <div className="space-y-3">
                  {member.education.map((edu, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-indigo-600 rounded-full mt-2"></div>
                      <p className="text-gray-700">{edu}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Achievements Section */}
            {member.achievements && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Award className="text-yellow-600" /> Key Achievements
                </h2>
                <div className="space-y-3">
                  {member.achievements.map((achievement, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-yellow-600 rounded-full mt-2"></div>
                      <p className="text-gray-700">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Expertise Section */}
            {member.expertise && (
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Briefcase className="text-purple-600" /> Areas of Expertise
                </h2>
                <div className="flex flex-wrap gap-3">
                  {member.expertise.map((exp, idx) => (
                    <span key={idx} className="px-4 py-2 bg-purple-50 text-purple-700 rounded-xl text-sm font-medium">
                      {exp}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-indigo-600 to-purple-600 rounded-2xl p-8 text-center text-white">
              <h3 className="text-2xl font-bold mb-3">Ready to Start Your Journey?</h3>
              <p className="text-indigo-100 mb-6">Book a consultation with {member.name} today</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href={`https://wa.me/${member.whatsapp}`}
                  target="_blank"
                  className="px-6 py-3 bg-white text-indigo-600 rounded-xl font-semibold hover:bg-gray-100 transition-colors inline-flex items-center gap-2"
                >
                  <MessageCircle size={20} /> Chat on WhatsApp
                </a>
                {member.bookingLink && (
                  <a
                    href={member.bookingLink}
                    target="_blank"
                    className="px-6 py-3 bg-indigo-500 text-white rounded-xl font-semibold hover:bg-indigo-400 transition-colors inline-flex items-center gap-2"
                  >
                    <Calendar size={20} /> Schedule Meeting
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamDetails;