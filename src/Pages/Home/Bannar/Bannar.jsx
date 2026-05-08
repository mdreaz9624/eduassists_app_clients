import { ArrowRight, Play, Star, Users, BookOpen, Award, FileText, MessageCircle } from 'lucide-react';
import Button from '../Bannar/common/Button'; // Adjust path as needed
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

// Asset Imports
import ban11 from "../../../assets/rsz_appsLaunching.jpg";
import sampleVideo from "../../../assets/eduAssistsAppsPromo.mp4";

const stats = [
  { icon: Users, value: '15,000+', label: 'Students Placed' },
  { icon: BookOpen, value: '500+', label: 'Partner Universities' },
  { icon: Award, value: '98%', label: 'Visa Success Rate' },
  { icon: Star, value: '4.9/5', label: 'Student Rating' },
];

const Banner = ({ onNavigate }) => {
  // Google Form URL
  const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSdTA918B7Aous1gZRWR8aFvgZmieicvMBs9L7WuuU1iHaaLHw/viewform?pli=1";

  // WhatsApp URL with phone number
  const whatsappNumber = "+8801842134687";
  const whatsappUrl = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}`;

  const handleGoogleForm = () => {
    window.open(googleFormUrl, '_blank', 'noopener,noreferrer');
  };

  const handleWhatsApp = () => {
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <div className="relative w-full h-full">
          <img
            src={ban11}
            alt="Campus"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 via-gray-900/70 to-gray-900/30" />
        </div>
      </div>

      {/* Floating Action Buttons - Right Side */}
      {/* FIX: Each button is wrapped independently — no shared parent with absolute overlay */}
      <div className="fixed right-4 md:right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-4">

        {/* Google Form Button — Blue */}
        <div className="relative">
          <button
            onClick={handleGoogleForm}
            className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-blue-600 border border-blue-400/50 rounded-full hover:bg-blue-500 hover:scale-110 transition-all duration-300 shadow-lg shadow-blue-900/40"
            aria-label="Fill Google Form"
          >
            <FileText className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:rotate-12 transition-transform duration-300" />

            {/* Tooltip */}
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-xs md:text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
              Apply Now
              <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900"></span>
            </span>
          </button>
          {/* Pulse ring — pointer-events-none so it never blocks clicks */}
          <div className="absolute inset-0 bg-blue-500 rounded-full animate-ping opacity-20 pointer-events-none"></div>
        </div>

        {/* WhatsApp Button — Green */}
        <div className="relative">
          <button
            onClick={handleWhatsApp}
            className="group relative flex items-center justify-center w-12 h-12 md:w-14 md:h-14 bg-green-500 border border-green-400/50 rounded-full hover:bg-green-400 hover:scale-110 transition-all duration-300 shadow-lg shadow-green-900/40"
            aria-label="Contact on WhatsApp"
          >
            <MessageCircle className="w-5 h-5 md:w-6 md:h-6 text-white group-hover:rotate-12 transition-transform duration-300" />

            {/* Tooltip */}
            <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-xs md:text-sm font-medium rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-lg">
              DHAKA OFFICE
              <span className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rotate-45 w-2 h-2 bg-gray-900"></span>
            </span>
          </button>
          {/* Pulse ring — pointer-events-none so it never blocks clicks */}
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20 pointer-events-none"></div>
        </div>

      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-20">
        <div className="max-w-2xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-600/20 border border-blue-500/30 text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium mb-6 backdrop-blur-sm">
            <Star className="w-3.5 h-3.5 fill-current" />
            #1 International Education Consultant
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
            Your Dream
            <span className="block text-blue-400">University</span>
            Awaits You
          </h1>

          <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-lg">
            Expert guidance for international university admissions, visa support, and scholarships. Start your global education journey today.
          </p>

          <div className="flex flex-wrap gap-4 mb-12">

            <Button
              size="lg"
              onClick={() => {
                if (onNavigate) {
                  onNavigate('/eligibility');
                } else {
                  console.error('onNavigate prop is not defined');
                  window.location.href = '/eligibility'; // Fallback
                }
              }}
            >
              Check Eligibility
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <button>
              <Link to="/watch-story"
              className="flex items-center gap-3 px-6 py-3.5 text-white border border-white/30 rounded-lg hover:bg-white/10 transition-colors backdrop-blur-sm"
            >
              <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center">
                <Play className="w-4 h-4 fill-white" />
              </div>
              <span className="text-sm font-medium">Watch Our Story</span>
            </Link>
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, value, label }) => (
            <div key={label} className="bg-white/10 backdrop-blur-sm border border-white/10 rounded-xl p-4">
              <Icon className="w-5 h-5 text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-white">{value}</div>
              <div className="text-xs text-gray-400 mt-0.5">{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>

      {/* Scroll indicator */ }
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
    <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1">
      <div className="w-1 h-2.5 bg-white/50 rounded-full" />
    </div>
  </div>

  {/* Optional: Video Modal */ }
  {
    false && (
      <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
        <video controls autoPlay className="max-w-3xl w-full rounded-xl">
          <source src={sampleVideo} type="video/mp4" />
        </video>
      </div>
    )
  }
    </section >
  );
};

export default Banner;


