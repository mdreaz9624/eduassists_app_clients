
// import { useLocation, useNavigate } from "react-router-dom";
// import { FaGraduationCap, FaGlobe, FaMoneyBillWave, FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";
// import useAuth from "../../hooks/useAuth";


// const CourseDetails = () => {
//   const { state } = useLocation();
//   const navigate = useNavigate();

  
//   // LOGIC: Check if user is logged in
//   // For now, we simulate this. In a real app, use your AuthContext or LocalStorage.



//   const user = JSON.parse(localStorage.getItem("user") || "null");
//   const isLoggedIn = !!user; 

//   if (!state?.course) return (
//     <div className="min-h-screen flex flex-col items-center justify-center">
//       <p className="text-xl mb-4">No course selected!</p>
//       <button onClick={() => navigate("/")} className="btn btn-primary">Go Back Home</button>
//     </div>
//   );
  
//   const { course } = state;

//   const { user } = useAuth();

//   const handleApply = () => {
   
//     if (!user) {
//     // If not logged in, save the intent and go to login
//     localStorage.setItem('pendingCourse', JSON.stringify(course));
//     alert("Please login to start your application.");
//     navigate("/login");
//   } else {
//     // If logged in, save the course and go to profile to upload docs
//     localStorage.setItem('applyingFor', JSON.stringify(course));
//     navigate("/profile"); 
//   }
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
//             {/* Main Content */}
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

//             {/* Application Card */}
//             <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 h-fit sticky top-4">
//               <h3 className="text-xl font-bold text-slate-800 mb-2">Ready to Apply?</h3>
//               <p className="text-sm text-slate-500 mb-6">
//                 Start your journey at {course.uniName}.
//               </p>
              
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


// new code////22222

import { useLocation, useNavigate } from "react-router-dom";
import { FaGraduationCap, FaGlobe, FaMoneyBillWave, FaMapMarkerAlt, FaArrowLeft } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const CourseDetails = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();

  if (!state?.course) return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <p className="text-xl mb-4">No course selected!</p>
      <button onClick={() => navigate("/")} className="btn btn-primary">Go Back Home</button>
    </div>
  );
  
  const { course } = state;

  const handleApply = () => {
    if (!user) {
      // Save course so we can return to it after login
      localStorage.setItem('pendingCourse', JSON.stringify(course));
      alert("Please login to start your application.");
      navigate("/login");
    } else {
      // Save the specific course the user is applying for
      localStorage.setItem('applyingFor', JSON.stringify(course));
      navigate("/profile"); 
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-indigo-600 font-semibold mb-6 hover:underline"
        >
          <FaArrowLeft /> Back to Search
        </button>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
          {/* Top Banner */}
          <div className="bg-indigo-900 p-8 md:p-12 text-white relative">
            <div className="absolute top-0 right-0 p-10 opacity-10 text-9xl">
              <FaGraduationCap />
            </div>
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-4xl">{course.flag}</span>
                <span className="uppercase tracking-widest text-indigo-300 font-bold text-sm">Course Details</span>
              </div>
              <h1 className="text-3xl md:text-5xl font-extrabold mb-4">{course.subject}</h1>
              <p className="text-xl text-indigo-100 flex items-center gap-2">
                <FaGlobe className="text-teal-400" /> {course.uniName} — {course.country}
              </p>
            </div>
          </div>

          <div className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-4 border-b pb-2">Program Details</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-indigo-50 rounded-lg text-indigo-600"><FaMapMarkerAlt /></div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-bold">Location</p>
                      <p className="font-semibold">{course.city}, {course.country}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600"><FaMoneyBillWave /></div>
                    <div>
                      <p className="text-xs text-slate-400 uppercase font-bold">Estimated Tuition</p>
                      <p className="font-semibold text-emerald-700">{course.tuition}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Admission Overview</h2>
                <p className="text-slate-600 leading-relaxed italic">
                  Apply for {course.subject} through EduAssists. Our consultants will help you with the 
                  Statement of Purpose (SOP), document verification for the {course.deptName} department, 
                  and the visa application process for {course.country}.
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-3xl p-8 border border-slate-200 h-fit sticky top-4">
              <h3 className="text-xl font-bold text-slate-800 mb-2">Ready to Apply?</h3>
              <p className="text-sm text-slate-500 mb-6">Start your journey at {course.uniName}.</p>
              
              <ul className="text-xs space-y-3 mb-8 text-slate-600">
                <li className="flex gap-2">✅ Document Review</li>
                <li className="flex gap-2">✅ Interview Preparation</li>
                <li className="flex gap-2">✅ Visa Guidance</li>
              </ul>

              <button 
                onClick={handleApply}
                className="btn btn-primary w-full bg-indigo-600 hover:bg-indigo-700 border-none text-white shadow-lg py-4 h-auto"
              >
                Apply for Admission
              </button>
              
              <p className="text-[10px] text-center mt-4 text-slate-400 italic">
                *Must be a registered student to submit documents.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;