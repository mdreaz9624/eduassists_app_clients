




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