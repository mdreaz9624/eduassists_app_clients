// import { useState, useEffect, useMemo } from "react";

// const FilterRow = () => {
//   const [data, setData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     country: "",
//     university: "",
//     department: "",
//     subject: ""
//   });
//   const [results, setResults] = useState([]);

//   // 1. Fetch JSON from public folder
//   useEffect(() => {
//     fetch("/studyData.json")
//       .then((res) => {
//         if (!res.ok) throw new Error("Network response was not ok");
//         return res.json();
//       })
//       .then((json) => {
//         setData(json);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error loading JSON:", err);
//         setLoading(false);
//       });
//   }, []);

//   // 2. Dynamic Option Logic
//   const selectedCountryData = useMemo(() => 
//     data.find(c => c.country === filters.country), [filters.country, data]);

//   const universityOptions = selectedCountryData?.universities || [];

//   const departmentOptions = useMemo(() => {
//     if (filters.university && filters.university !== "all") {
//       return universityOptions.find(u => u.name === filters.university)?.departments || [];
//     }
//     // Collect all unique departments across all universities in the selected country
//     const allDepts = universityOptions.flatMap(u => u.departments.map(d => d.name));
//     return [...new Set(allDepts)].map(name => ({ name }));
//   }, [filters.university, universityOptions]);

//   const subjectOptions = useMemo(() => {
//     if (filters.department && filters.department !== "all") {
//       if (filters.university && filters.university !== "all") {
//         return departmentOptions.find(d => d.name === filters.department)?.subjects || [];
//       }
//       // Collect all subjects for this department across all universities
//       const allSubjects = universityOptions.flatMap(u => 
//         u.departments.filter(d => d.name === filters.department).flatMap(d => d.subjects)
//       );
//       return [...new Set(allSubjects)];
//     }
//     return [];
//   }, [filters.department, filters.university, departmentOptions, universityOptions]);

//   // 3. Search Logic
//   const handleSearch = () => {
//     let output = [];
//     if (!selectedCountryData) return;

//     universityOptions.forEach(uni => {
//       // Filter University
//       if (filters.university !== "all" && filters.university !== "" && uni.name !== filters.university) return;

//       uni.departments.forEach(dept => {
//         // Filter Department
//         if (filters.department !== "all" && filters.department !== "" && dept.name !== filters.department) return;

//         dept.subjects.forEach(sub => {
//           // Filter Subject
//           if (filters.subject !== "" && sub !== filters.subject) return;

//           output.push({
//             uniName: uni.name,
//             city: uni.city,
//             tuition: uni.tuitionRange || uni.tuition, // Handles both keys
//             deptName: dept.name,
//             subject: sub,
//             flag: selectedCountryData.flag
//           });
//         });
//       });
//     });
//     setResults(output);
//   };

//   if (loading) return <div className="p-10 text-center">Loading Study Data...</div>;

//   return (
//     <div className="max-w-7xl mx-auto p-4 space-y-8">
//       {/* Search Section */}
//       <section className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        
//         {/* Country */}
//         <div className="form-control">
//           <label className="label"><span className="label-text font-bold text-slate-600">Country</span></label>
//           <select 
//             className="select select-bordered w-full bg-slate-50 shadow-sm"
//             value={filters.country}
//             onChange={(e) => setFilters({ country: e.target.value, university: "", department: "", subject: "" })}
//           >
//             <option value="">Select Country</option>
//             {data.map(c => <option key={c.country} value={c.country}>{c.flag} {c.country}</option>)}
//           </select>
//         </div>

//         {/* University */}
//         <div className="form-control">
//           <label className="label"><span className="label-text font-bold text-slate-600">University</span></label>
//           <select 
//             className="select select-bordered w-full bg-slate-50 shadow-sm"
//             disabled={!filters.country}
//             value={filters.university}
//             onChange={(e) => setFilters({ ...filters, university: e.target.value, department: "", subject: "" })}
//           >
//             <option value="">Select University</option>
//             <option value="all">All Universities</option>
//             {universityOptions.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
//           </select>
//         </div>

//         {/* Department */}
//         <div className="form-control">
//           <label className="label"><span className="label-text font-bold text-slate-600">Department</span></label>
//           <select 
//             className="select select-bordered w-full bg-slate-50 shadow-sm"
//             disabled={!filters.university}
//             value={filters.department}
//             onChange={(e) => setFilters({ ...filters, department: e.target.value, subject: "" })}
//           >
//             <option value="">Select Department</option>
//             <option value="all">All Departments</option>
//             {departmentOptions.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
//           </select>
//         </div>

//         {/* Subject */}
//         <div className="form-control">
//           <label className="label"><span className="label-text font-bold text-slate-600">Subject</span></label>
//           <select 
//             className="select select-bordered w-full bg-slate-50 shadow-sm"
//             disabled={!filters.department}
//             value={filters.subject}
//             onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
//           >
//             <option value="">Select Subject</option>
//             {subjectOptions.map(s => <option key={s} value={s}>{s}</option>)}
//           </select>
//         </div>

//         {/* Search Button */}
//         <button 
//           onClick={handleSearch}
//           disabled={!filters.country}
//           className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 border-none text-white shadow-lg"
//         >
//           Search Results
//         </button>
//       </section>

//       {/* Results Section */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {results.map((res, i) => (
//           <div key={i} className="card bg-white border border-slate-200 hover:border-indigo-300 transition-all duration-300 shadow-sm hover:shadow-xl">
//             <div className="card-body p-6">
//               <div className="flex justify-between items-start mb-2">
//                 <span className="text-3xl">{res.flag}</span>
//                 <span className="badge badge-ghost font-medium">{res.city}</span>
//               </div>
//               <h3 className="text-xl font-bold text-slate-800 leading-tight mb-1">{res.subject}</h3>
//               <p className="text-indigo-600 font-semibold mb-4">{res.uniName}</p>
              
//               <div className="flex items-center justify-between bg-slate-50 p-3 rounded-lg">
//                 <span className="text-sm text-slate-500">Estimated Tuition</span>
//                 <span className="text-md font-bold text-emerald-600">{res.tuition}</span>
//               </div>
              
//               <div className="card-actions justify-end mt-4">
//                 <button className="btn btn-sm btn-outline btn-primary">View Details</button>
//               </div>
//             </div>
//           </div>
//         ))}
        
//         {results.length === 0 && filters.country && (
//           <div className="col-span-full py-20 text-center bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
//             <p className="text-slate-400 text-lg">Select filters and click "Search Results" to find your program.</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default FilterRow; 

// new code 

import { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const FilterRow = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    country: "",
    university: "",
    department: "",
    subject: ""
  });
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("/studyData.json")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch data");
        return res.json();
      })
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error:", err);
        setLoading(false);
      });
  }, []);

  const selectedCountryData = useMemo(() => 
    data.find(c => c.country === filters.country), [filters.country, data]);

  const universityOptions = selectedCountryData?.universities || [];

  const departmentOptions = useMemo(() => {
    if (filters.university && filters.university !== "all") {
      return universityOptions.find(u => u.name === filters.university)?.departments || [];
    }
    const allDepts = universityOptions.flatMap(u => u.departments.map(d => d.name));
    return [...new Set(allDepts)].map(name => ({ name }));
  }, [filters.university, universityOptions]);

  const subjectOptions = useMemo(() => {
    if (filters.department && filters.department !== "all") {
      if (filters.university && filters.university !== "all") {
        return departmentOptions.find(d => d.name === filters.department)?.subjects || [];
      }
      const allSubjects = universityOptions.flatMap(u => 
        u.departments.filter(d => d.name === filters.department).flatMap(d => d.subjects)
      );
      return [...new Set(allSubjects)];
    }
    return [];
  }, [filters.department, filters.university, departmentOptions, universityOptions]);

  const handleSearch = () => {
    let output = [];
    if (!selectedCountryData) return;

    universityOptions.forEach(uni => {
      if (filters.university !== "all" && filters.university !== "" && uni.name !== filters.university) return;
      uni.departments.forEach(dept => {
        if (filters.department !== "all" && filters.department !== "" && dept.name !== filters.department) return;
        dept.subjects.forEach(sub => {
          if (filters.subject !== "" && sub !== filters.subject) return;
          output.push({
            uniName: uni.name,
            city: uni.city,
            tuition: uni.tuitionRange || uni.tuition,
            deptName: dept.name,
            subject: sub,
            flag: selectedCountryData.flag,
            country: selectedCountryData.country
          });
        });
      });
    });
    setResults(output);
  };

  if (loading) return <div className="p-10 text-center animate-pulse">Loading Study Data...</div>;

  return (
    <div className="max-w-7xl mx-auto p-4 space-y-8">
      {/* Search Section */}
      <section className="bg-white p-6 rounded-2xl shadow-xl border border-slate-100 grid grid-cols-1 md:grid-cols-5 gap-4 items-end">
        <div className="form-control">
          <label className="label"><span className="label-text font-bold text-slate-600">Country</span></label>
          <select 
            className="select select-bordered w-full bg-slate-50"
            value={filters.country}
            onChange={(e) => setFilters({ country: e.target.value, university: "", department: "", subject: "" })}
          >
            <option value="">Select Country</option>
            {data.map(c => <option key={c.country} value={c.country}>{c.flag} {c.country}</option>)}
          </select>
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text font-bold text-slate-600">University</span></label>
          <select 
            className="select select-bordered w-full bg-slate-50"
            disabled={!filters.country}
            value={filters.university}
            onChange={(e) => setFilters({ ...filters, university: e.target.value, department: "", subject: "" })}
          >
            <option value="">Select University</option>
            <option value="all">All Universities</option>
            {universityOptions.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
          </select>
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text font-bold text-slate-600">Department</span></label>
          <select 
            className="select select-bordered w-full bg-slate-50"
            disabled={!filters.university}
            value={filters.department}
            onChange={(e) => setFilters({ ...filters, department: e.target.value, subject: "" })}
          >
            <option value="">Select Department</option>
            <option value="all">All Departments</option>
            {departmentOptions.map(d => <option key={d.name} value={d.name}>{d.name}</option>)}
          </select>
        </div>

        <div className="form-control">
          <label className="label"><span className="label-text font-bold text-slate-600">Subject</span></label>
          <select 
            className="select select-bordered w-full bg-slate-50"
            disabled={!filters.department}
            value={filters.subject}
            onChange={(e) => setFilters({ ...filters, subject: e.target.value })}
          >
            <option value="">Select Subject</option>
            {subjectOptions.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <button 
          onClick={handleSearch}
          disabled={!filters.country}
          className="btn btn-primary bg-indigo-600 hover:bg-indigo-700 border-none text-white"
        >
          Search Results
        </button>
      </section>

      {/* Results Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map((res, i) => (
          <div key={i} className="card bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="card-body p-6">
              <div className="flex justify-between items-start mb-2">
                <span className="text-3xl">{res.flag}</span>
                <span className="badge badge-outline">{res.city}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-800">{res.subject}</h3>
              <p className="text-indigo-600 font-medium mb-4">{res.uniName}</p>
              
              <div className="card-actions justify-end mt-4">
                <button 
                  onClick={() => navigate("/course-details", { state: { course: res } })}
                  className="btn btn-sm btn-primary"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
        {results.length === 0 && filters.country && (
          <div className="col-span-full py-10 text-center text-slate-400 border-2 border-dashed rounded-xl">
            Click "Search Results" to find your programs.
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterRow;