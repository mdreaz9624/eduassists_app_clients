

// import { useState, useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";

// const FilterRow = () => {
//   const navigate = useNavigate();
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     country: "",
//     university: "",
//     department: "",
//     subject: ""
//   });
//   const [results, setResults] = useState([]);

//   useEffect(() => {
//     fetch("/studyData.json")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch data");
//         return res.json();
//       })
//       .then((json) => {
//         setData(json);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error:", err);
//         setLoading(false);
//       });
//   }, []);

//   const selectedCountryData = useMemo(() => 
//     data.find(c => c.country === filters.country), [filters.country, data]);

//   const universityOptions = selectedCountryData?.universities || [];

//   const departmentOptions = useMemo(() => {
//     if (filters.university && filters.university !== "all") {
//       return universityOptions.find(u => u.name === filters.university)?.departments || [];
//     }
//     const allDepts = universityOptions.flatMap(u => u.departments.map(d => d.name));
//     return [...new Set(allDepts)].map(name => ({ name }));
//   }, [filters.university, universityOptions]);

//   const subjectOptions = useMemo(() => {
//     if (filters.department && filters.department !== "all") {
//       if (filters.university && filters.university !== "all") {
//         return departmentOptions.find(d => d.name === filters.department)?.subjects || [];
//       }
//       const allSubjects = universityOptions.flatMap(u => 
//         u.departments.filter(d => d.name === filters.department).flatMap(d => d.subjects)
//       );
//       return [...new Set(allSubjects)];
//     }
//     return [];
//   }, [filters.department, filters.university, departmentOptions, universityOptions]);

//   const handleSearch = () => {
//     let output = [];
//     if (!selectedCountryData) return;

//     universityOptions.forEach(uni => {
//       if (filters.university !== "all" && filters.university !== "" && uni.name !== filters.university) return;
//       uni.departments.forEach(dept => {
//         if (filters.department !== "all" && filters.department !== "" && dept.name !== filters.department) return;
//         dept.subjects.forEach(sub => {
//           if (filters.subject !== "" && sub !== filters.subject) return;
//           output.push({
//             uniName: uni.name,
//             city: uni.city,
//             tuition: uni.tuitionRange || uni.tuition,
//             deptName: dept.name,
//             subject: sub,
//             flag: selectedCountryData.flag,
//             country: selectedCountryData.country
//           });
//         });
//       });
//     });
//     setResults(output);
//   };

//   if (loading) return <div className="p-10 text-center animate-pulse">Loading Study Data...</div>;

//   return (
//     <div className="max-w-7xl mx-auto p-4 space-y-8">
//       {/* Search Section */}
//       <section className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
//         <div className="form-control">
//           <label className="label"><span className="label-text font-bold text-slate-900">Country</span></label>
//           <select 
//             className="select select-bordered w-full bg-blue-950 text-white"
//             value={filters.country}
//             onChange={(e) => setFilters({ country: e.target.value, university: "", department: "", subject: "" })}
//           >
//             <option value="">Select Country</option>
//             {data.map(c => <option key={c.country} value={c.country}>{c.flag} {c.country}</option>)}
//           </select>
//         </div>

//         <div className="form-control">
//           <label className="label"><span className="label-text font-bold text-slate-900">University</span></label>
//           <select 
//             className="select select-bordered w-full bg-blue-950 text-white"
//             disabled={!filters.country}
//             value={filters.university}
//             onChange={(e) => setFilters({ ...filters, university: e.target.value, department: "", subject: "" })}
//           >
//             <option value="">Select University</option>
//             <option value="all">All Universities</option>
//             {universityOptions.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
//           </select>
//         </div>

//         <div className="form-control">
//           <label className="label"><span className="label-text font-bold text-slate-900">Department</span></label>
//           <select 
//             className="select select-bordered w-full bg-blue-950 text-white"
//             disabled={!filters.university}
//             value={filters.department}
//             onChange={(e) => setFilters({ ...filters, department: e.target.value, subject: "" })}
//           >
//             <option value="">Select Department</option>
//             <option value="all">All Departments</option>
//             {departmentOptions.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
//           </select>
//         </div>

//         <div className="form-control">
//           <label className="label"><span className="label-text font-bold text-slate-900">Subject</span></label>
//           <select 
//             className="select select-bordered w-full bg-blue-950 text-white"
//             disabled={!filters.department}
//             value={filters.subject}
//             onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
//           >
//             <option value="">Select Subject</option>
//             {subjectOptions.map(s => <option key={s} value={s}>{s}</option>)}
//           </select>
//         </div>

//         <button 
//           onClick={handleSearch}
//           disabled={!filters.country}
//           className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 border-none text-white"
//         >
//           Search Results
//         </button>
//       </section>

//       {/* Results Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {results.map((res, i) => (
//           <div key={i} className="card bg-white border border-slate-600 shadow-sm hover:shadow-md transition-all">
//             <div className="card-body p-6">
//               <div className="flex justify-between items-start mb-2">
//                 <span className="text-3xl text-black">{res.flag}</span>
//                 <span className="badge badge-outline text-blue-900 text-xl">{res.city}</span>
//               </div>
//               <h3 className="text-xl font-bold text-slate-800">{res.subject}</h3>
//               <p className="text-indigo-600 font-medium mb-4">{res.uniName}</p>
              
//               <div className="card-actions justify-end mt-4">
//                 <button 
//                   onClick={() => navigate("/course-details", { state: { course: res } })}
//                   className="btn btn-sm btn-primary text-shadow-white  bg-indigo-600 hover:bg-indigo-700"
//                 >
//                   View Details
//                 </button>
//               </div>
//             </div>
//           </div>
//         ))}
//         {results.length === 0 && filters.country && (
//           <div className="col-span-full py-10 text-center text-slate-400 border-2 border-dashed rounded-xl">
//             Click "Search Results" to find your programs.
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FilterRow;



//new code version 2

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Search, MapPin, Globe, BookOpen, GraduationCap, 
  ChevronDown, DollarSign, Award, Filter, X,
  CheckCircle, AlertCircle, ExternalLink
} from 'lucide-react';

// Country flags mapping
const countryFlags = {
  'USA': '🇺🇸',
  'United Kingdom': '🇬🇧',
  'Canada': '🇨🇦',
  'Australia': '🇦🇺',
  'Germany': '🇩🇪',
  'Switzerland': '🇨🇭',
  'Netherlands': '🇳🇱',
  'Denmark': '🇩🇰',
  'Sweden': '🇸🇪',
  'Singapore': '🇸🇬',
  'Japan': '🇯🇵',
  'China': '🇨🇳',
  'India': '🇮🇳',
  'France': '🇫🇷',
  'Italy': '🇮🇹',
  'Spain': '🇪🇸',
  'Ireland': '🇮🇪',
  'New Zealand': '🇳🇿'
};

const FilterRow = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // Filter states
  const [filters, setFilters] = useState({
    country: '',
    university: '',
    programLevel: '',
    department: '',
    subject: '',
    englishTest: '',
    englishScore: '',
    tuitionFee: '',
    currency: 'USD'
  });

  // Dynamic options based on selections
  const [availableUniversities, setAvailableUniversities] = useState([]);
  const [availablePrograms, setAvailablePrograms] = useState([]);
  const [availableDepartments, setAvailableDepartments] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [filteredUniversities, setFilteredUniversities] = useState([]);

  useEffect(() => {
    fetch('/studyData.json')
      .then(res => res.json())
      .then(json => {
        setData(json);
        setFilteredUniversities(json);
      })
      .catch(err => console.error('Error loading data:', err));
  }, []);

  // Update available universities when country changes
  useEffect(() => {
    if (filters.country) {
      const filtered = data.filter(uni => uni.country === filters.country);
      setAvailableUniversities(filtered);
      // Reset university when country changes
      setFilters(prev => ({ ...prev, university: '', department: '', subject: '' }));
      setAvailableDepartments([]);
      setAvailableSubjects([]);
    } else {
      setAvailableUniversities(data);
    }
  }, [filters.country, data]);

  // Update available programs when university changes
  useEffect(() => {
    if (filters.university) {
      const uni = data.find(u => u.name === filters.university);
      if (uni && uni.popular_programs) {
        setAvailablePrograms(uni.popular_programs.map(p => p.level));
      }
      setFilters(prev => ({ ...prev, programLevel: '', department: '', subject: '' }));
      setAvailableDepartments([]);
      setAvailableSubjects([]);
    }
  }, [filters.university, data]);

  // Update available departments when program level changes
  useEffect(() => {
    if (filters.university && filters.programLevel) {
      const uni = data.find(u => u.name === filters.university);
      const program = uni?.popular_programs?.find(p => p.level === filters.programLevel);
      if (program && program.departments) {
        setAvailableDepartments(program.departments.map(d => d.name));
      }
      setFilters(prev => ({ ...prev, department: '', subject: '' }));
      setAvailableSubjects([]);
    }
  }, [filters.university, filters.programLevel, data]);

  // Update available subjects when department changes
  useEffect(() => {
    if (filters.university && filters.programLevel && filters.department) {
      const uni = data.find(u => u.name === filters.university);
      const program = uni?.popular_programs?.find(p => p.level === filters.programLevel);
      const dept = program?.departments?.find(d => d.name === filters.department);
      if (dept && dept.subjects) {
        setAvailableSubjects(dept.subjects);
      }
      setFilters(prev => ({ ...prev, subject: '' }));
    }
  }, [filters.university, filters.programLevel, filters.department, data]);

  const handleSearch = () => {
    setLoading(true);
    setShowResults(false);
    
    // Simulate loading
    setTimeout(() => {
      const results = data.filter(uni => {
        // Country filter
        if (filters.country && uni.country !== filters.country) return false;
        
        // University filter
        if (filters.university && uni.name !== filters.university) return false;
        
        // Program level filter
        if (filters.programLevel) {
          const programExists = uni.popular_programs?.some(p => 
            p.level.toLowerCase() === filters.programLevel.toLowerCase()
          );
          if (!programExists) return false;
        }
        
        // Department filter
        if (filters.department) {
          let deptExists = false;
          uni.popular_programs?.forEach(program => {
            if (program.departments?.some(d => d.name === filters.department)) {
              deptExists = true;
            }
          });
          if (!deptExists) return false;
        }
        
        // Subject filter
        if (filters.subject) {
          let subjectExists = false;
          uni.popular_programs?.forEach(program => {
            program.departments?.forEach(dept => {
              if (dept.subjects?.includes(filters.subject)) {
                subjectExists = true;
              }
            });
          });
          if (!subjectExists) return false;
        }
        
        // English requirements filter
        if (filters.englishTest && filters.englishScore) {
          const score = parseFloat(filters.englishScore);
          if (filters.englishTest === 'moi') {
            // MOI acceptance check - assuming all universities might have different policies
            // This would need to be implemented based on your data structure
            return true;
          } else {
            // Check English requirements at program level or university level
            let meetsRequirement = false;
            uni.popular_programs?.forEach(program => {
              const reqs = program[`${filters.programLevel?.toLowerCase()}_english_requirements`];
              if (reqs && reqs[filters.englishTest]?.overall <= score) {
                meetsRequirement = true;
              }
            });
            if (!meetsRequirement) return false;
          }
        }
        
        // Tuition fee filter
        if (filters.tuitionFee) {
          const feeLimit = parseFloat(filters.tuitionFee);
          const uniFee = parseFloat(uni.tuition_annual?.replace(/[^0-9.-]+/g, '') || '0');
          if (uniFee > feeLimit) return false;
        }
        
        return true;
      });
      
      setFilteredResults(results);
      setShowResults(true);
      setLoading(false);
    }, 500);
  };

  const clearFilters = () => {
    setFilters({
      country: '',
      university: '',
      programLevel: '',
      department: '',
      subject: '',
      englishTest: '',
      englishScore: '',
      tuitionFee: '',
      currency: 'USD'
    });
    setShowResults(false);
  };

  const getCountryFlag = (countryName) => {
    return countryFlags[countryName] || '🏳️';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Header */}
      <div className="bg-indigo-600 text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">University Eligibility Checker</h1>
          <p className="text-indigo-100 text-lg">Find universities matching your profile across the globe</p>
        </div>
      </div>

      {/* Filter Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            
            {/* Country Select with Flag */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <Globe size={16} /> Country <span className="text-red-500">*</span>
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                value={filters.country}
                onChange={(e) => setFilters({...filters, country: e.target.value})}
              >
                <option value="">Select Country</option>
                {[...new Set(data.map(uni => uni.country))].sort().map(country => (
                  <option key={country} value={country}>
                    {getCountryFlag(country)} {country}
                  </option>
                ))}
              </select>
            </div>

            {/* University Select - Depends on Country */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <BookOpen size={16} /> University
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white disabled:bg-gray-100"
                value={filters.university}
                onChange={(e) => setFilters({...filters, university: e.target.value})}
                disabled={!filters.country}
              >
                <option value="">{filters.country ? 'Select University' : 'Select country first'}</option>
                <option value="all">All Universities</option>
                {availableUniversities.map(uni => (
                  <option key={uni.id} value={uni.name}>{uni.name}</option>
                ))}
              </select>
            </div>

            {/* Program Level */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <GraduationCap size={16} /> Program Level
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                value={filters.programLevel}
                onChange={(e) => setFilters({...filters, programLevel: e.target.value})}
              >
                <option value="">Select Program</option>
                <option value="Bachelor">🎓 Bachelor</option>
                <option value="Master">📚 Master</option>
                <option value="Doctoral">🔬 Doctoral/PhD</option>
                <option value="Diploma">📜 Diploma</option>
                <option value="Certificate">📋 Certificate</option>
              </select>
            </div>

            {/* Department - Depends on Program & University */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Department</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white disabled:bg-gray-100"
                value={filters.department}
                onChange={(e) => setFilters({...filters, department: e.target.value})}
                disabled={!filters.university || !filters.programLevel}
              >
                <option value="">
                  {!filters.university || !filters.programLevel 
                    ? 'Select university & program first' 
                    : 'Select Department'}
                </option>
                {availableDepartments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Subject - Depends on Department */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">Subject</label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white disabled:bg-gray-100"
                value={filters.subject}
                onChange={(e) => setFilters({...filters, subject: e.target.value})}
                disabled={!filters.department}
              >
                <option value="">
                  {!filters.department ? 'Select department first' : 'Select Subject'}
                </option>
                {availableSubjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
            </div>

            {/* English Test Type */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <Award size={16} /> English Test
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white"
                value={filters.englishTest}
                onChange={(e) => setFilters({...filters, englishTest: e.target.value, englishScore: ''})}
              >
                <option value="">Select Test</option>
                <option value="ielts">📘 IELTS</option>
                <option value="pte">📗 PTE</option>
                <option value="toefl">📙 TOEFL</option>
                <option value="duolingo">🦉 Duolingo</option>
                <option value="moi">📄 MOI (Medium of Instruction)</option>
              </select>
            </div>

            {/* English Score - Conditional */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                {filters.englishTest === 'moi' ? 'MOI Certificate' : 'Your Score'}
              </label>
              {filters.englishTest === 'moi' ? (
                <div className="relative">
                  <input
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  />
                  <p className="text-xs text-gray-500 mt-1">Upload MOI certificate (PDF/Image)</p>
                </div>
              ) : (
                <input
                  type="number"
                  step="0.5"
                  min="0"
                  max="9"
                  placeholder={filters.englishTest === 'ielts' ? 'e.g., 6.5' : 
                             filters.englishTest === 'pte' ? 'e.g., 60' :
                             filters.englishTest === 'toefl' ? 'e.g., 90' :
                             filters.englishTest === 'duolingo' ? 'e.g., 110' : 'Enter score'}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={filters.englishScore}
                  onChange={(e) => setFilters({...filters, englishScore: e.target.value})}
                  disabled={!filters.englishTest}
                />
              )}
            </div>

            {/* Tuition Fee */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700 flex items-center gap-1">
                <DollarSign size={16} /> Max Tuition (Annual)
              </label>
              <div className="flex gap-2">
                <select
                  className="w-1/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 bg-white"
                  value={filters.currency}
                  onChange={(e) => setFilters({...filters, currency: e.target.value})}
                >
                  <option value="USD">USD $</option>
                  <option value="GBP">GBP £</option>
                  <option value="EUR">EUR €</option>
                  <option value="CAD">CAD $</option>
                  <option value="AUD">AUD $</option>
                  <option value="CHF">CHF</option>
                  <option value="SEK">SEK</option>
                  <option value="JPY">JPY ¥</option>
                </select>
                <input
                  type="number"
                  placeholder="Amount"
                  className="w-2/3 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={filters.tuitionFee}
                  onChange={(e) => setFilters({...filters, tuitionFee: e.target.value})}
                />
              </div>
            </div>

            {/* Search Button */}
            <div className="col-span-1 md:col-span-2 lg:col-span-1 flex items-end">
              <button
                onClick={handleSearch}
                disabled={loading}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2 disabled:bg-indigo-400 disabled:cursor-not-allowed shadow-lg"
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search size={20} /> Check Eligibility
                  </>
                )}
              </button>
            </div>

            {/* Clear Filters */}
            <div className="col-span-1 flex items-end">
              <button
                onClick={clearFilters}
                className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-3 px-6 rounded-lg transition-all flex items-center justify-center gap-2"
              >
                <X size={20} /> Clear All
              </button>
            </div>
          </div>

          {/* Active Filters Display */}
          {(filters.country || filters.university || filters.programLevel || filters.department || 
            filters.subject || filters.englishTest || filters.tuitionFee) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-gray-600">Active Filters:</span>
                {filters.country && (
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm flex items-center gap-1">
                    {getCountryFlag(filters.country)} {filters.country}
                  </span>
                )}
                {filters.university && filters.university !== 'all' && (
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                    {filters.university}
                  </span>
                )}
                {filters.programLevel && (
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                    {filters.programLevel}
                  </span>
                )}
                {filters.department && (
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                    {filters.department}
                  </span>
                )}
                {filters.subject && (
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                    {filters.subject}
                  </span>
                )}
                {filters.englishTest && filters.englishScore && (
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                    {filters.englishTest.toUpperCase()}: {filters.englishScore}
                  </span>
                )}
                {filters.tuitionFee && (
                  <span className="bg-indigo-100 text-indigo-800 px-3 py-1 rounded-full text-sm">
                    Max Fee: {filters.currency} {filters.tuitionFee}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results Section - Only visible after search */}
      {showResults && (
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">
              {filteredResults.length} Universities Found
            </h2>
            <button
              onClick={() => setShowResults(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>

          {filteredResults.length === 0 ? (
            <div className="bg-white rounded-xl shadow-lg p-12 text-center">
              <AlertCircle size={48} className="mx-auto text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No Universities Found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more results.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResults.map((uni) => (
                <div key={uni.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all border-2 border-transparent hover:border-indigo-500">
                  {/* University Header */}
                  <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 p-4 text-white">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-indigo-200 text-sm flex items-center gap-1">
                          <MapPin size={14} /> {uni.city}, {uni.country}
                        </span>
                        <h3 className="text-xl font-bold mt-1">{uni.name}</h3>
                      </div>
                      <span className="text-3xl">{getCountryFlag(uni.country)}</span>
                    </div>
                  </div>

                  {/* University Details */}
                  <div className="p-5">
                    {/* Eligibility Match Indicator */}
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <div className="flex items-center gap-2 text-green-700">
                        <CheckCircle size={18} />
                        <span className="font-semibold">Eligibility Match Found</span>
                      </div>
                    </div>

                    {/* Quick Info */}
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Annual Tuition:</span>
                        <span className="font-bold text-indigo-600">{uni.tuition_annual}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Application Fee:</span>
                        <span className="font-semibold">{uni.application_fee}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-600">Intakes:</span>
                        <span className="text-sm">{uni.intakes?.join(', ')}</span>
                      </div>
                    </div>

                    {/* Top Departments */}
                    <div className="mb-4">
                      <h4 className="text-sm font-semibold text-gray-700 mb-2">Top Departments:</h4>
                      <div className="flex flex-wrap gap-2">
                        {uni.top_departments?.slice(0, 3).map((dept, idx) => (
                          <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                            {dept}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* English Requirements */}
                    {uni.eligibility && (
                      <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">English Requirements:</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          {uni.eligibility.ielts && (
                            <div>
                              <span className="text-gray-600">IELTS:</span>
                              <span className="ml-1 font-medium">{uni.eligibility.ielts.overall}</span>
                            </div>
                          )}
                          {uni.eligibility.pte && (
                            <div>
                              <span className="text-gray-600">PTE:</span>
                              <span className="ml-1 font-medium">{uni.eligibility.pte.overall}</span>
                            </div>
                          )}
                          {uni.eligibility.toefl && (
                            <div>
                              <span className="text-gray-600">TOEFL:</span>
                              <span className="ml-1 font-medium">{uni.eligibility.toefl.overall}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}

                    {/* View Details Button */}
                    <button
                      onClick={() => navigate(`/course-details/${uni.id}`, { state: { university: uni } })}
                      className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                    >
                      View Full Details <ExternalLink size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterRow;