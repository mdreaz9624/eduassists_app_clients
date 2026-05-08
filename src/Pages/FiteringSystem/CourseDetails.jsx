


import React from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, DollarSign, Calendar, CheckCircle, GraduationCap, Globe, BookOpen, Award, Clock } from 'lucide-react';
import useAuth from '../../hooks/useAuth'; // Import your auth hook

const CourseDetails = () => {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth(); // Get user from auth hook
  const { university, selectedProgram, selectedDepartment, selectedSubject } = state || {};

  if (!university) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center p-10">
          <h2 className="text-2xl font-bold text-slate-700 mb-4">No University Data Found</h2>
          <p className="text-slate-500 mb-6">Course ID: {id}</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-indigo-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-colors"
          >
            Back to Search
          </button>
        </div>
      </div>
    );
  }

  // Find the specific program based on selected level
  const programDetails = university.popular_programs?.find(
    program => program.level === selectedProgram
  );

  // Find the specific department details
  const departmentDetails = programDetails?.departments?.find(
    dept => dept.name === selectedDepartment
  );

  // Get English requirements based on program level
  const getEnglishRequirements = () => {
    if (!programDetails) return null;
    
    if (selectedProgram === 'Bachelor') {
      return programDetails.bachelor_english_requirements;
    } else if (selectedProgram === 'Master') {
      return programDetails.masters_english_requirements;
    } else if (selectedProgram === 'Doctoral') {
      return programDetails.doctoral_english_requirements;
    }
    return null;
  };

  const englishReqs = getEnglishRequirements();

  // Handle Apply Now button click
  const handleApplyNow = () => {
    // Save course data to localStorage for the StudentProfile to access
    const courseData = {
      uniName: university.name,
      uniId: university.id,
      programLevel: selectedProgram,
      department: selectedDepartment,
      subject: selectedSubject,
      tuition: programDetails?.tuition_annual || university.tuition_annual,
      intake: university.intakes?.[0] || 'Fall',
      applicationFee: university.application_fee || 'Free'
    };
    
    localStorage.setItem('applyingFor', JSON.stringify(courseData));
    
    // Check if user is logged in
    if (user) {
      // User is logged in, navigate to student profile
      navigate('/student-profile');
    } else {
      // User is not logged in, navigate to login page with return URL
      navigate('/login', { 
        state: { 
          from: '/course-details/' + id,
          courseData: courseData,
          message: 'Please log in to apply for this course'
        } 
      });
    }
  };

  return (
    <div className="bg-slate-50 min-h-screen">
      {/* Top Navigation */}
      <div className="p-4 max-w-7xl mx-auto">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-indigo-600 font-bold hover:text-indigo-800 transition-colors group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" /> 
          Back to Search Results
        </button>
      </div>

      {/* Hero Header Section */}
      <div className="max-w-5xl mx-auto px-4">
        <div className="bg-gradient-to-r from-indigo-700 to-indigo-800 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
          <GraduationCap className="absolute right-[-20px] bottom-[-20px] text-white/10 w-64 h-64 rotate-12" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 text-indigo-200 font-bold uppercase tracking-widest text-sm mb-4">
              <span>{university.country}</span>
              <span className="h-1 w-1 bg-indigo-300 rounded-full"></span>
              <span>{selectedProgram} PROGRAM</span>
            </div>
            
            <h1 className="text-3xl md:text-5xl font-black mb-4 leading-tight">
              {selectedSubject}
            </h1>
            
            <p className="text-xl md:text-2xl font-medium flex items-center gap-2 text-indigo-100 mb-2">
              <BookOpen size={24} /> {selectedDepartment}
            </p>
            
            <p className="text-lg flex items-center gap-2 text-indigo-100">
              <Globe size={20} /> {university.name} — {university.city}, {university.country}
            </p>
          </div>
        </div>

        {/* Program Details Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12 mb-20">
          
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-8">
            {/* Key Information Cards */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 border-b pb-4 flex items-center gap-2">
                <Award className="text-indigo-600" size={24} />
                Program Overview
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-indigo-50 rounded-xl text-indigo-600">
                    <MapPin size={24}/>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase">Location</p>
                    <p className="text-slate-700 font-bold">{university.city}, {university.country}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-green-50 rounded-xl text-green-600">
                    <DollarSign size={24}/>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase">Tuition (Annual)</p>
                    <p className="text-green-700 font-bold text-lg">
                      {programDetails?.tuition_annual || university.tuition_annual}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-orange-50 rounded-xl text-orange-600">
                    <Calendar size={24}/>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase">Intakes</p>
                    <p className="text-slate-700 font-bold">{university.intakes?.join(' • ') || 'Fall, Spring'}</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="p-3 bg-purple-50 rounded-xl text-purple-600">
                    <Clock size={24}/>
                  </div>
                  <div>
                    <p className="text-slate-400 text-xs font-bold uppercase">Duration</p>
                    <p className="text-slate-700 font-bold">{programDetails?.duration || 'Varies by program'}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* English Language Requirements */}
            {englishReqs && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                  <CheckCircle className="text-indigo-600" size={24} />
                  English Language Proficiency
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {englishReqs.ielts && (
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <p className="text-slate-400 text-xs font-bold mb-1">IELTS</p>
                      <p className="text-2xl font-black text-slate-800">{englishReqs.ielts.overall}</p>
                      {englishReqs.ielts.min_band && (
                        <p className="text-xs text-slate-500 mt-1">Min. Band: {englishReqs.ielts.min_band}</p>
                      )}
                    </div>
                  )}
                  
                  {englishReqs.pte && (
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <p className="text-slate-400 text-xs font-bold mb-1">PTE</p>
                      <p className="text-2xl font-black text-slate-800">{englishReqs.pte.overall}</p>
                      {englishReqs.pte.min_score && (
                        <p className="text-xs text-slate-500 mt-1">Min. Score: {englishReqs.pte.min_score}</p>
                      )}
                    </div>
                  )}
                  
                  {englishReqs.toefl && (
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
                      <p className="text-slate-400 text-xs font-bold mb-1">TOEFL</p>
                      <p className="text-2xl font-black text-slate-800">{englishReqs.toefl.overall}</p>
                      {englishReqs.toefl.min_score && (
                        <p className="text-xs text-slate-500 mt-1">Min. Score: {englishReqs.toefl.min_score}</p>
                      )}
                    </div>
                  )}
                </div>

                {englishReqs.MOI && (
                  <div className="mt-4 p-4 bg-indigo-50 rounded-xl">
                    <p className="text-sm text-indigo-700">
                      <span className="font-bold">MOI Acceptance:</span>{' '}
                      {englishReqs.MOI.accepted ? 'Accepted' : 'Not Accepted'}
                      {englishReqs.MOI.notes && <span className="block mt-1 text-indigo-600">Note: {englishReqs.MOI.notes}</span>}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Available Subjects in this Department */}
            {departmentDetails && departmentDetails.subjects && (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Available Subjects in {selectedDepartment}</h2>
                <div className="flex flex-wrap gap-2">
                  {departmentDetails.subjects.map((subject, index) => (
                    <span 
                      key={index}
                      className={`px-4 py-2 rounded-full font-medium text-sm ${
                        subject === selectedSubject 
                          ? 'bg-indigo-600 text-white' 
                          : 'bg-slate-100 text-slate-600'
                      }`}
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Column - CTA and Quick Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-indigo-50 p-8 sticky top-8">
              <h3 className="text-2xl font-black text-slate-800 mb-2 leading-tight">Ready to Apply?</h3>
              <p className="text-slate-500 mb-6 text-sm leading-relaxed">
                Take the next step in your academic journey with {university.name}
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-1 h-1 bg-indigo-600 rounded-full"></div>
                  <span className="text-slate-600">Application Fee: {university.application_fee || 'Free'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-1 h-1 bg-indigo-600 rounded-full"></div>
                  <span className="text-slate-600">Next Intake: {university.intakes?.[0] || 'Fall'}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <div className="w-1 h-1 bg-indigo-600 rounded-full"></div>
                  <span className="text-slate-600">Program Level: {selectedProgram}</span>
                </div>
              </div>

              {/* Dynamic Apply Now Button */}
              <button 
                onClick={handleApplyNow}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-black py-4 rounded-xl shadow-lg shadow-indigo-200 transition-all uppercase tracking-wider mb-3"
              >
                {user ? 'Apply Now' : 'Login to Apply'}
              </button>
              
              <button className="w-full bg-white border-2 border-slate-200 text-slate-700 font-bold py-4 rounded-xl hover:bg-slate-50 transition-all">
                Download Brochure
              </button>

              <p className="text-xs text-center text-slate-400 mt-4">
                {user ? 'Ready to start your application?' : 'Have an account? '}
                {!user && (
                  <button 
                    onClick={() => navigate('/login', { 
                      state: { 
                        from: '/course-details/' + id,
                        message: 'Please log in to apply for this course'
                      } 
                    })}
                    className="text-indigo-600 font-bold hover:underline"
                  >
                    Log in here
                  </button>
                )}
                {user && (
                  <button 
                    onClick={() => navigate('/student-profile')}
                    className="text-indigo-600 font-bold hover:underline"
                  >
                    Go to your profile
                  </button>
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;