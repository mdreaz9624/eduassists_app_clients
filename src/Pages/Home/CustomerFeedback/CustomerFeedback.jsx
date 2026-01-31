// import { useEffect, useState } from "react";
// import feedbackIcon from "../../../assets/feedback.png";

// const CustomerFeedback = () => {
//   const [feedbackList, setFeedbackList] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Load JSON data from public folder
//   useEffect(() => {
//     fetch("/feedback.json")
//       .then((res) => {
//         if (!res.ok) throw new Error('Failed to fetch feedback');
//         return res.json();
//       })
//       .then((data) => setFeedbackList(data))
//       .catch((error) => console.error('Error loading feedback:', error));
//   }, []);

//   // Navigation functions
//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === feedbackList.length - 1 ? 0 : prevIndex + 1
//     );
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) => 
//       prevIndex === 0 ? feedbackList.length - 1 : prevIndex - 1
//     );
//   };

//   const goToSlide = (index) => {
//     setCurrentIndex(index);
//   };

//   // Auto slide every 5 seconds
//   useEffect(() => {
//     if (feedbackList.length === 0) return;
    
//     const interval = setInterval(() => {
//       nextSlide();
//     }, 5000);

//     return () => clearInterval(interval);
//   }, [feedbackList.length, currentIndex]);

//   if (feedbackList.length === 0) {
//     return (
//       <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
//         <div className="text-center">
//           <div className="flex items-center justify-center gap-3 mb-4">
//             <div className="p-3 bg-blue-100 rounded-2xl shadow-sm">
//               <img src={feedbackIcon} className="h-8 w-8" alt="Feedback Icon" />
//             </div>
//             <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//               Customer Feedback
//             </h2>
//           </div>
//           <p className="text-gray-600">Loading feedback...</p>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-16 bg-gradient-to-br from-slate-50 to-blue-50">
//       {/* Title */}
//       <div className="text-center mb-12">
//         <div className="flex items-center justify-center gap-3 mb-4">
//           <div className="p-3 bg-blue-100 rounded-2xl shadow-sm">
//             <img src={feedbackIcon} className="h-8 w-8" alt="Feedback Icon" />
//           </div>
//           <h2 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
//             Customer Feedback
//           </h2>
//         </div>
//         <p className="text-gray-600 text-lg max-w-2xl mx-auto leading-relaxed">
//           Discover what our valued Students & Franchise are saying about their experience with our service.
//         </p>
//       </div>

//       {/* Carousel Container */}
//       <div className="max-w-4xl mx-auto px-4">
//         <div className="relative">
//           {/* Navigation Arrows */}
//           <button
//             onClick={prevSlide}
//             className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white hover:bg-blue-50 text-blue-600 w-10 h-10 rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:scale-110 transition-all duration-300"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//             </svg>
//           </button>

//           <button
//             onClick={nextSlide}
//             className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white hover:bg-blue-50 text-blue-600 w-10 h-10 rounded-full shadow-lg border border-gray-200 flex items-center justify-center hover:scale-110 transition-all duration-300"
//           >
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//             </svg>
//           </button>

//           {/* Carousel Content */}
//           <div className="overflow-hidden">
//             <div 
//               className="flex transition-transform duration-500 ease-in-out"
//               style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//             >
//               {feedbackList.map((item, index) => (
//                 <div
//                   key={index}
//                   className="w-full flex-shrink-0 px-4"
//                 >
//                   <div className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl border border-gray-100 hover:border-blue-200 transition-all duration-500 cursor-pointer overflow-hidden p-8">
//                     {/* Hover Background Effect */}
//                     <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
//                     {/* Content */}
//                     <div className="relative z-10">
//                       {/* Header with Avatar */}
//                       <div className="flex items-center gap-4 mb-6">
//                         <div className="relative">
//                           <img
//                             src={item.avatar}
//                             alt={item.name}
//                             className="w-16 h-16 rounded-full border-2 border-white shadow-md group-hover:border-blue-300 group-hover:scale-110 transition-all duration-300"
//                           />
//                           <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-2 border-white flex items-center justify-center">
//                             <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                               <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
//                             </svg>
//                           </div>
//                         </div>
//                         <div>
//                           <h3 className="font-bold text-xl text-gray-800 group-hover:text-blue-700 transition-colors duration-300">
//                             {item.name}
//                           </h3>
//                           <div className="flex text-amber-400 text-lg">
//                             {"★".repeat(5)}
//                           </div>
//                         </div>
//                       </div>

//                       {/* Feedback Text */}
//                       <div className="relative">
//                         <span className="text-4xl text-blue-200 group-hover:text-blue-300 absolute -top-4 -left-2 transition-colors duration-300">
//                           "
//                         </span>
//                         <p className="text-gray-600 group-hover:text-gray-800 leading-relaxed text-lg transition-colors duration-300 pl-4">
//                           {item.feedback}
//                         </p>
//                         <span className="text-4xl text-blue-200 group-hover:text-blue-300 absolute -bottom-6 -right-2 transition-colors duration-300">
//                           "
//                         </span>
//                       </div>
//                     </div>

//                     {/* Gradient Overlay on Hover */}
//                     <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 rounded-2xl transition-opacity duration-500" />
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Dots Indicator */}
//         <div className="flex justify-center gap-3 mt-8">
//           {feedbackList.map((_, index) => (
//             <button
//               key={index}
//               onClick={() => goToSlide(index)}
//               className={`w-3 h-3 rounded-full transition-all duration-300 ${
//                 index === currentIndex 
//                   ? 'bg-gradient-to-r from-blue-500 to-purple-500 scale-125' 
//                   : 'bg-gray-300 hover:bg-blue-400'
//               }`}
//             />
//           ))}
//         </div>

//         {/* Slide Counter */}
//         <div className="text-center mt-4 text-gray-500 text-sm">
//           {currentIndex + 1} / {feedbackList.length}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default CustomerFeedback;




import { useEffect, useState } from "react";
import feedbackIcon from "../../../assets/feedback.png";

const CustomerFeedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch("/feedback.json")
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch feedback');
        return res.json();
      })
      .then((data) => setFeedbackList(data))
      .catch((error) => console.error('Error loading feedback:', error));
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === feedbackList.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? feedbackList.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    if (feedbackList.length === 0) return;
    const interval = setInterval(() => { nextSlide(); }, 5000);
    return () => clearInterval(interval);
  }, [feedbackList.length, currentIndex]);

  if (feedbackList.length === 0) return null;

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-indigo-50 overflow-hidden">
      {/* Title Section */}
      <div className="text-center mb-12 px-4">
        <div className="flex items-center justify-center gap-3 mb-4">
          <div className="p-3 bg-indigo-100 rounded-2xl shadow-sm transform -rotate-12">
            <img src={feedbackIcon} className="h-8 w-8" alt="Feedback Icon" />
          </div>
          <h2 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-700 to-teal-600 bg-clip-text text-transparent">
            Student Success Stories
          </h2>
        </div>
        <p className="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Hear from our global students who achieved their dreams through EduAssists expert guidance.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 relative">
        {/* Navigation Arrows */}
        <button onClick={prevSlide} className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm text-indigo-600 w-12 h-12 rounded-full shadow-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300 -ml-2 md:-ml-6">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
        </button>

        <button onClick={nextSlide} className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 backdrop-blur-sm text-indigo-600 w-12 h-12 rounded-full shadow-xl flex items-center justify-center hover:bg-indigo-600 hover:text-white transition-all duration-300 -mr-2 md:-mr-6">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
        </button>

        <div className="overflow-hidden rounded-3xl">
          <div 
            className="flex transition-transform duration-700 ease-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {feedbackList.map((item, index) => (
              <div key={index} className="w-full flex-shrink-0 px-2">
                <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-indigo-50 relative">
                  {/* Decorative Quote Mark */}
                  <span className="absolute top-6 right-10 text-8xl text-indigo-100 font-serif pointer-events-none">“</span>
                  
                  <div className="flex flex-col md:flex-row gap-8 items-center relative z-10">
                    {/* Student Info Card */}
                    <div className="text-center md:text-left flex-shrink-0">
                      <div className="relative inline-block mb-4">
                        <img
                          src={item.avatar}
                          alt={item.name}
                          className="w-24 h-24 md:w-32 md:h-32 rounded-2xl object-cover border-4 border-white shadow-lg rotate-3"
                        />
                        <div className="absolute -bottom-2 -right-2 bg-teal-500 text-white px-3 py-1 rounded-lg text-xs font-bold shadow-md -rotate-3">
                          {item.country}
                        </div>
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800">{item.name}</h3>
                      <div className="flex justify-center md:justify-start text-amber-400 my-1">
                        {[...Array(5)].map((_, i) => (
                          <span key={i} className={i < item.rating ? "text-amber-400" : "text-slate-200"}>★</span>
                        ))}
                      </div>
                    </div>

                    {/* Feedback Content */}
                    <div className="flex-grow">
                      <div className="inline-block px-4 py-1 rounded-full bg-indigo-50 text-indigo-700 text-sm font-semibold mb-4">
                         {item.university}
                      </div>
                      <p className="text-slate-600 text-xl italic leading-relaxed mb-6">
                        "{item.feedback}"
                      </p>
                      <div className="h-1 w-20 bg-gradient-to-r from-indigo-500 to-teal-500 rounded-full" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Pagination */}
        <div className="flex justify-center gap-2 mt-10">
          {feedbackList.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 rounded-full transition-all duration-500 ${
                index === currentIndex ? 'w-10 bg-indigo-600' : 'w-2 bg-indigo-200 hover:bg-indigo-400'
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CustomerFeedback;