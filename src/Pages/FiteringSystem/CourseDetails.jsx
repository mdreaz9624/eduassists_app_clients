

// import { useLocation, useNavigate } from "react-router-dom";
// import { FaGraduationCap, FaGlobe, FaMoneyBillWave, FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";
// import useAuth from "../../hooks/useAuth";

// const CourseDetails = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const { user } = useAuth();

//   if (!state?.course) return (
//     <div className="min-h-screen flex flex-col items-center justify-center">
//       <p className="text-xl mb-4">No course selected!</p>
//       <button onClick={() => navigate("/")} className="btn btn-primary">Go Back Home</button>
//     </div>
//   );
  
//   const { course } = state;

//   const handleApply = () => {
//     if (!user) {
//       // Save course so we can return to it after login
//       localStorage.setItem('pendingCourse', JSON.stringify(course));
//       alert("Please login to start your application.");
//       navigate("/login");
//     } else {
//       // Save the specific course the user is applying for
//       localStorage.setItem('applyingFor', JSON.stringify(course));
//       navigate("/student-profile"); 
//     }
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 py-10 px-4">
//       <div className="max-w-5xl mx-auto">
//         <button 
//           onClick={() => navigate(-1)} 
//           className="flex items-center gap-2 text-indigo-600 font-semibold mb-6 hover:underline"
//         >
//           <FaArrowLeft /> Back to Search
//         </button>

//         <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
//           {/* Top Banner */}
//           <div className="bg-indigo-900 p-8 md:p-12 text-white relative">
//             <div className="absolute top-0 right-0 p-10 opacity-10 text-9xl">
//               <FaGraduationCap />
//             </div>
//             <div className="relative z-10">
//               <div className="flex items-center gap-3 mb-4">
//                 <span className="text-4xl">{course.flag}</span>
//                 <span className="uppercase tracking-widest text-indigo-300 font-bold text-sm">Course Details</span>
//               </div>
//               <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{course.subject}</h1>
//               <p className="text-xl text-indigo-100 flex items-center gap-2">
//                 <FaGlobe className="text-teal-400" /> {course.uniName} — {course.country}
//               </p>
//             </div>
//           </div>

//           <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-10">
//             <div className="md:col-span-2 space-y-8">
//               <div>
//                 <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b pb-2">Program Details</h2>
//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                   <div className="flex items-start gap-4">
//                     <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600"><FaMapMarkerAlt /></div>
//                     <div>
//                       <p className="text-xs text-slate-400 uppercase font-bold">Location</p>
//                       <p className="font-semibold">{course.city}, {course.country}</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-4">
//                     <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600"><FaMoneyBillWave /></div>
//                     <div>
//                       <p className="text-xs text-slate-400 uppercase font-bold">Estimated Tuition</p>
//                       <p className="font-semibold text-emerald-700">{course.tuition}</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               <div>
//                 <h2 className="text-2xl font-bold text-slate-800 mb-4">Admission Overview</h2>
//                 <p className="text-slate-600 leading-relaxed italic">
//                   Apply for {course.subject} through EduAssists. Our consultants will help you with the 
//                   Statement of Purpose (SOP), document verification for the {course.deptName} department, 
//                   and the visa application process for {course.country}.
//                 </p>
//               </div>
//             </div>

//             <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 h-fit sticky top-4">
//               <h3 className="text-xl font-bold text-slate-800 mb-2">Ready to Apply?</h3>
//               <p className="text-sm text-slate-500 mb-6">Start your journey at {course.uniName}.</p>
              
//               <ul className="text-xs space-y-3 mb-8 text-slate-600">
//                 <li className="flex gap-2">✅ Document Review</li>
//                 <li className="flex gap-2">✅ Interview Preparation</li>
//                 <li className="flex gap-2">✅ Visa Guidance</li>
//               </ul>

//               <button 
//                 onClick={handleApply}
//                 className="btn btn-primary w-full bg-indigo-600 hover:bg-indigo-700 border-none text-white shadow-lg py-4 h-auto"
//               >
//                 Apply for Admission
//               </button>
              
//               <p className="text-[10px] text-center mt-4 text-slate-400 italic">
//                 *Must be a registered student to submit documents.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CourseDetails;


//new code 

import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, DollarSign, Calendar, CheckCircle, GraduationCap } from 'lucide-react';

const CourseDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const uni = state?.university;

  if (!uni) return <div className="p-10 text-center">No data found</div>;

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Top Navigation */}
      <div className="p-4 max-w-7xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Search
        </button>
      </div>

      {/* Hero Header Section */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-indigo-700 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
          <GraduationCap className="absolute right-[-20px] bottom-[-20px] text-white/10 w-64 h-64 rotate-12" />
          <div className="relative z-10">
            <span className="text-indigo-200 font-bold uppercase tracking-widest text-sm flex items-center gap-2">
              {uni.country} <span className="h-1 w-1 bg-indigo-300 rounded-full"></span> COURSE DETAILS
            </span>
            <h1 className="text-4xl md:text-6xl font-black mt-4 mb-6">{uni.top_departments[0]}</h1>
            <p className="text-xl md:text-2xl font-medium flex items-center gap-2 text-indigo-100">
              <Globe size={24} /> {uni.name} — {uni.city}, {uni.country}
            </p>
          </div>
        </div>

        {/* Program Details Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 mb-20">
          
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4">Program Details</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600"><MapPin size={24}/></div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase">Location</p>
                    <p className="text-slate-700 font-bold">{uni.city}, {uni.country}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-50 rounded-xl text-green-600"><DollarSign size={24}/></div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase">Estimated Tuition</p>
                    <p className="text-green-700 font-bold text-lg">{uni.tuition_annual} / Year</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-50 rounded-xl text-orange-600"><Calendar size={24}/></div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase">Intakes</p>
                    <p className="text-slate-700 font-bold">{uni.intakes.join(', ')}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-50 rounded-xl text-purple-600"><CheckCircle size={24}/></div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase">Min. Academic Score</p>
                    <p className="text-slate-700 font-bold">{uni.eligibility.academic_min}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Language Proficiency</h2>
              <div className="flex flex-wrap gap-4">
                <span className="px-6 py-3 bg-slate-100 rounded-full font-bold text-slate-700">IELTS: {uni.eligibility.ielts.overall}</span>
                <span className="px-6 py-3 bg-slate-100 rounded-full font-bold text-slate-700">PTE: {uni.eligibility.pte.overall}</span>
                <span className="px-6 py-3 bg-slate-100 rounded-full font-bold text-slate-700">TOEFL: {uni.eligibility.toefl.overall}</span>
              </div>
            </div>
          </div>

          {/* Right Column - CTA */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-indigo-50 p-8 sticky top-8">
              <h3 className="text-2xl font-black text-slate-800 mb-4 leading-tight">Ready to Apply?</h3>
              <p className="text-slate-500 mb-8 text-sm leading-relaxed">
                Start your journey with us today. Our experts are ready to guide you through every step of the process.
              </p>
              <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all uppercase tracking-wider mb-4">
                Apply for Course
              </button>
              <button className="w-full bg-white border-2 border-slate-200 text-slate-700 font-bold py-4 rounded-xl hover:bg-slate-50 transition-all">
                Contact Counselor
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CourseDetails;