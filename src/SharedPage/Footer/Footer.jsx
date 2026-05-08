// import SupRideLogo from "../SupRideLogo/SupRideLogo";
// import { Link } from "react-router-dom";
// const Footer = () => {
//     return (
//         <div>
//             <footer className="footer footer-horizontal footer-center rounded-2xl mt-2 bg-slate-300 text-black p-10">
//                 <aside>
//                     <SupRideLogo></SupRideLogo>
//                     <p className="font-bold">
//                         EduAssists Your Global Education Partner.
//                         <br />
//                         Students Consultency Firm  Since 2025
//                     </p>
//                     <p>Copyright © {new Date().getFullYear()} - All right reserved
//                         <aside>
//                             <p>
//                                 Copyright © {new Date().getFullYear()} - All right reserved{' '}
//                                 <Link
//                                     to="/developer-profile"
//                                     className="font-bold text-indigo-600 hover:text-indigo-800 transition-colors"
//                                 >
//                                     AhsanReaz
//                                 </Link>
//                             </p>
//                         </aside>
//                     </p>
//                 </aside>
//                 <nav>
//                     <div className="grid grid-flow-col gap-4">
//                         <a>
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width="24"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                                 className="fill-current">
//                                 <path
//                                     d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
//                             </svg>
//                         </a>
//                         <a>
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width="24"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                                 className="fill-current">
//                                 <path
//                                     d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
//                             </svg>
//                         </a>
//                         <a>
//                             <svg
//                                 xmlns="http://www.w3.org/2000/svg"
//                                 width="24"
//                                 height="24"
//                                 viewBox="0 0 24 24"
//                                 className="fill-current">
//                                 <path
//                                     d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
//                             </svg>
//                         </a>
//                     </div>
//                 </nav>
//             </footer>

//         </div>
//     );
// };

// export default Footer;



import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import logo from '../../assets/EduAssistLogo.jpeg';
import { Link } from "react-router-dom";

export default function Footer({ onNavigate }) {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <button onClick={() => onNavigate('/')} className="flex items-center gap-2.5 mb-4 group">
              <div className="w-9 h-9 bg-blue-600 rounded-lg flex items-center justify-center">
                {/* <GraduationCap className="w-5 h-5 text-white" /> */}
                <img src={logo} alt="EduAssists Logo" className="w-9 h-9 object-contain" />
              </div>
              <span className="text-xl font-bold text-white">Edu<span className="text-blue-400">Assists</span></span>
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