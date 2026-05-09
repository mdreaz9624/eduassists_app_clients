

import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import logo from '../../assets/EduAssistLogo.jpeg';
import { Link } from "react-router-dom";
import SupRideLogo from '../SupRideLogo/SupRideLogo';

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <button onClick={() => onNavigate('/')} className="flex items-center gap-2.5 mb-4 group">
              <div className=" rounded-lg mr-10 flex items-center justify-center">
                {/* <GraduationCap className="w-5 h-5 text-white" /> */}
                <SupRideLogo />
                
              </div>
              {/* <span className="text-xl font-bold text-white">Edu<span className="text-blue-400">Assists</span></span> */}
              
            
            
            </button>
            <p className="text-sm text-gray-400 leading-relaxed mb-5">
              Your trusted partner for international education. We guide students from application to arrival.
            </p>
            <div className="flex items-center gap-3">
              {[Facebook, Twitter, Linkedin, Instagram].map((Icon, i) => (
                <a 
                  key={i} 
                  href="#" 
                  className="w-9 h-9 bg-gray-800 hover:bg-blue-600 rounded-lg flex items-center justify-center transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {[
                { label: 'Home', href: '/' },
                { label: 'Our Services', href: '/services' },
                { label: 'Universities', href: '/universities' },
                { label: 'Blog', href: '/blog' },
                { label: 'Become a Partner', href: '/become-partner' },
              ].map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => onNavigate(link.href)}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2.5">
              {[
                'University Admissions',
                'Visa Assistance',
                'Scholarship Guidance',
                'Eligibility Checker',
                'Free Consultation',
                'Application Support',
              ].map((service) => (
                <li key={service}>
                  <span className="text-sm text-gray-400">{service}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">152/1/H, 9th Floor, Sabamoon Tower, Green Road <br /> Panthapath, Dhaka 1205</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="tel:+8801842134687" className="text-sm text-gray-400 hover:text-white transition-colors">
                  +8801842134687
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-blue-400 shrink-0" />
                <a href="mailto:eduassists.com@gmail.com" className="text-sm text-gray-400 hover:text-white transition-colors">
                  eduassists.com@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <hr className="border-gray-800 mt-12 mb-8" />

        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-500">
          <p>&copy; {new Date().getFullYear()} EduAssists IT Team & <Link
                                    to="/developer-profile"
                                    className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
                                >
                                    AhsanReaz
                                </Link>. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}