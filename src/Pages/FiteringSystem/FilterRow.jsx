

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, MapPin, Globe, BookOpen, GraduationCap,
  ChevronDown, Filter, X,
  AlertCircle, ExternalLink, ChevronUp, Settings2
} from 'lucide-react';


import useAxiosSecure from '../../hooks/useAxiosSecure';

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

const axiosSecure = useAxiosSecure();

const FilterRow = () => {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [filteredResults, setFilteredResults] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

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

  const [availableUniversities, setAvailableUniversities] = useState([]);
  const [availableDepartments, setAvailableDepartments] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);

  // Load data
  // useEffect(() => {
  //   fetch('/studyData.json')
  //     .then((res) => res.json())
  //     .then((json) => setData(json))
  //     .catch((err) => console.error('Error loading data:', err));
  // }, []);


  useEffect(() => {
    axiosSecure.get('/studyData')
      .then(res => {
        setData(res.data);
      })
      .catch(err => {
        console.error(err);
      });
  }, [axiosSecure]);

  // Update universities
  useEffect(() => {
    if (filters.country) {
      const filtered = data.filter(
        (uni) => uni.country === filters.country
      );
      setAvailableUniversities(filtered);
    } else {
      setAvailableUniversities([]);
    }
  }, [filters.country, data]);

  // Update departments
  useEffect(() => {
    if (filters.country && filters.programLevel) {
      const departments = new Set();

      availableUniversities.forEach((uni) => {
        uni.popular_programs?.forEach((program) => {
          if (
            program.level?.toLowerCase() ===
            filters.programLevel.toLowerCase()
          ) {
            program.departments?.forEach((dept) => {
              departments.add(dept.name);
            });
          }
        });
      });

      setAvailableDepartments(Array.from(departments).sort());
    } else {
      setAvailableDepartments([]);
    }
  }, [filters.country, filters.programLevel, availableUniversities]);

  // Update subjects
  useEffect(() => {
    if (
      filters.country &&
      filters.programLevel &&
      filters.department
    ) {
      const subjects = new Set();

      availableUniversities.forEach((uni) => {
        uni.popular_programs?.forEach((program) => {
          if (
            program.level?.toLowerCase() ===
            filters.programLevel.toLowerCase()
          ) {
            program.departments?.forEach((dept) => {
              if (dept.name === filters.department) {
                dept.subjects?.forEach((subject) => {
                  subjects.add(subject);
                });
              }
            });
          }
        });
      });

      setAvailableSubjects(Array.from(subjects).sort());
    } else {
      setAvailableSubjects([]);
    }
  }, [
    filters.country,
    filters.programLevel,
    filters.department,
    availableUniversities
  ]);

  // Reset department & subject
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      department: '',
      subject: ''
    }));
  }, [filters.country, filters.programLevel]);

  // Reset subject
  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      subject: ''
    }));
  }, [filters.department]);

  const isSearchReady =
    filters.country &&
    filters.programLevel &&
    filters.department &&
    filters.subject;

  const handleSearch = () => {
    setLoading(true);
    setShowResults(false);

    setTimeout(() => {
      const results = data.filter((uni) => {
        if (
          filters.country &&
          uni.country !== filters.country
        )
          return false;

        const hasMatchingProgram =
          uni.popular_programs?.some((program) => {
            const levelMatch =
              program.level?.toLowerCase() ===
              filters.programLevel.toLowerCase();

            if (!levelMatch) return false;

            const hasMatchingDeptAndSubject =
              program.departments?.some(
                (dept) =>
                  dept.name === filters.department &&
                  dept.subjects?.includes(filters.subject)
              );

            return hasMatchingDeptAndSubject;
          });

        if (!hasMatchingProgram) return false;

        // English Filter
        if (
          filters.englishTest &&
          filters.englishScore
        ) {
          const score = parseFloat(filters.englishScore);

          const matchingProgram =
            uni.popular_programs?.find(
              (program) =>
                program.level?.toLowerCase() ===
                filters.programLevel.toLowerCase()
            );

          if (matchingProgram) {
            let uniTestScore;

            if (filters.programLevel === 'Bachelor') {
              uniTestScore =
                matchingProgram
                  .bachelor_english_requirements?.[
                  filters.englishTest
                ]?.overall;
            } else if (
              filters.programLevel === 'Master'
            ) {
              uniTestScore =
                matchingProgram
                  .masters_english_requirements?.[
                  filters.englishTest
                ]?.overall;
            } else if (
              filters.programLevel === 'Doctoral'
            ) {
              uniTestScore =
                matchingProgram
                  .doctoral_english_requirements?.[
                  filters.englishTest
                ]?.overall;
            }

            if (
              uniTestScore &&
              uniTestScore > score
            )
              return false;
          }
        }

        // Tuition Filter
        if (filters.tuitionFee) {
          const feeLimit = parseFloat(
            filters.tuitionFee
          );

          const matchingProgram =
            uni.popular_programs?.find(
              (program) =>
                program.level?.toLowerCase() ===
                filters.programLevel.toLowerCase()
            );

          if (matchingProgram) {
            const tuitionStr =
              matchingProgram.tuition_annual ||
              uni.tuition_annual;

            const numericValue = parseFloat(
              tuitionStr.replace(
                /[^0-9.-]+/g,
                ''
              ) || '0'
            );

            if (numericValue > feeLimit)
              return false;
          }
        }

        return true;
      });

      setFilteredResults(results);
      setShowResults(true);
      setLoading(false);
    }, 500);
  };

  const clearAllFilters = () => {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50/30">

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-indigo-700 via-indigo-600 to-purple-700 text-white py-16 px-4 shadow-xl">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-white/20 p-2 rounded-xl backdrop-blur-sm">
              <GraduationCap className="w-8 h-8" />
            </div>

            <h1 className="text-4xl md:text-5xl font-bold">
              Eligibility Checker
            </h1>
          </div>

          <p className="text-indigo-100 text-lg max-w-2xl">
            Complete the 4 steps below to find universities
            matching your academic profile
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="max-w-7xl mx-auto px-4 -mt-8 pb-20">
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-slate-200">

          {/* Form Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

            {/* Country */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
                <Globe size={16} />
                1. Country
                <span className="text-red-500">*</span>
              </label>

              <select
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                value={filters.country}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    country: e.target.value
                  })
                }
              >
                <option value="">Select Country</option>

                {[...new Set(data.map((uni) => uni.country))]
                  .sort()
                  .map((country) => (
                    <option
                      key={country}
                      value={country}
                    >
                      {countryFlags[country] || '🏳️'}{' '}
                      {country}
                    </option>
                  ))}
              </select>
            </div>

            {/* Program Level */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
                <GraduationCap size={16} />
                2. Program Level
                <span className="text-red-500">*</span>
              </label>

              <select
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                value={filters.programLevel}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    programLevel: e.target.value
                  })
                }
              >
                <option value="">Select Level</option>
                <option value="Bachelor">
                  Bachelor
                </option>
                <option value="Master">Master</option>
                <option value="Doctoral">
                  Doctoral
                </option>
              </select>
            </div>

            {/* Department */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
                <BookOpen size={16} />
                3. Department
                <span className="text-red-500">*</span>
              </label>

              <select
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                value={filters.department}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    department: e.target.value
                  })
                }
              >
                <option value="">
                  Select Department
                </option>

                {availableDepartments.map((dept) => (
                  <option key={dept} value={dept}>
                    {dept}
                  </option>
                ))}
              </select>
            </div>

            {/* Subject */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-1">
                <Settings2 size={16} />
                4. Subject
                <span className="text-red-500">*</span>
              </label>

              <select
                className="w-full p-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none"
                value={filters.subject}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    subject: e.target.value
                  })
                }
              >
                <option value="">
                  Select Subject
                </option>

                {availableSubjects.map((sub) => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Advanced Options */}
          <div className="mt-6">
            <button
              onClick={() =>
                setShowAdvanced(!showAdvanced)
              }
              className="text-indigo-600 font-semibold flex items-center gap-1 hover:text-indigo-800"
            >
              <Filter size={18} />

              {showAdvanced
                ? 'Hide Advanced Options'
                : 'Show Advanced Options'}

              {showAdvanced ? (
                <ChevronUp size={18} />
              ) : (
                <ChevronDown size={18} />
              )}
            </button>
          </div>

          {showAdvanced && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 p-6 bg-slate-50 rounded-xl border border-slate-200">

              {/* English Test */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  English Test
                </label>

                <select
                  className="w-full p-3 border border-slate-300 rounded-xl"
                  value={filters.englishTest}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      englishTest: e.target.value
                    })
                  }
                >
                  <option value="">
                    Select Test
                  </option>
                  <option value="ielts">
                    IELTS
                  </option>
                  <option value="pte">PTE</option>
                  <option value="toefl">
                    TOEFL
                  </option>
                </select>
              </div>

              {/* Score */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Minimum Score
                </label>

                <input
                  type="number"
                  step="0.5"
                  placeholder="Enter minimum score"
                  className="w-full p-3 border border-slate-300 rounded-xl"
                  value={filters.englishScore}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      englishScore: e.target.value
                    })
                  }
                />
              </div>

              {/* Budget */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">
                  Max Budget
                </label>

                <input
                  type="number"
                  placeholder="e.g. 20000"
                  className="w-full p-3 border border-slate-300 rounded-xl"
                  value={filters.tuitionFee}
                  onChange={(e) =>
                    setFilters({
                      ...filters,
                      tuitionFee: e.target.value
                    })
                  }
                />
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-between items-center">

            <button
              onClick={clearAllFilters}
              className="px-6 py-3 text-slate-600 font-semibold hover:bg-slate-100 rounded-xl flex items-center gap-2"
            >
              <X size={18} />
              Clear All
            </button>

            {isSearchReady && (
              <button
                onClick={handleSearch}
                className="bg-indigo-600 text-white px-10 py-4 rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition-all flex items-center gap-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Searching...
                  </>
                ) : (
                  <>
                    <Search size={20} />
                    Search Universities
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Results */}
      {showResults && (
        <div className="max-w-7xl mx-auto px-4 py-12">

          <div className="flex items-center justify-between mb-8 flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="h-10 w-2 bg-indigo-600 rounded-full"></div>

              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800">
                {filteredResults.length}{' '}
                Universities Found
              </h2>
            </div>

            <button
              onClick={() => setShowResults(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X size={24} />
            </button>
          </div>

          {filteredResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">

              {filteredResults.map((uni) => (
                <div
                  key={uni.id}
                  className="bg-white rounded-3xl shadow-lg border border-slate-100 overflow-hidden hover:shadow-2xl transition-all hover:-translate-y-1"
                >

                  {/* UNIVERSITY IMAGE ADDED */}
                  <div className="h-52 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={uni.university_image}
                      alt={uni.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-6">

                    <div className="flex justify-between items-start mb-4">
                      <span className="text-3xl">
                        {countryFlags[uni.country] || '🏳️'}
                      </span>

                      <span className="bg-indigo-50 text-indigo-700 text-xs font-black px-3 py-1 rounded-full uppercase">
                        {filters.programLevel}
                      </span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900 leading-tight mb-2">
                      {uni.name}
                    </h3>

                    <div className="flex items-center gap-1 text-slate-500 font-medium text-sm mb-4">
                      <MapPin
                        size={14}
                        className="text-indigo-500"
                      />
                      {uni.city}
                    </div>

                    <div className="space-y-3 pt-4 border-t border-slate-100">

                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">
                          Tuition
                        </span>

                        <span className="font-bold text-slate-800">
                          {uni.tuition_annual}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">
                          Main Intake
                        </span>

                        <span className="font-bold text-indigo-600">
                          {uni.intakes?.[0] || 'Fall'}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">
                          Application Fee
                        </span>

                        <span className="font-bold text-slate-800">
                          {uni.application_fee || 'Free'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() =>
                      navigate(`/course-details/${uni.id}`, {
                        state: {
                          university: uni,
                          selectedProgram:
                            filters.programLevel,
                          selectedDepartment:
                            filters.department,
                          selectedSubject:
                            filters.subject
                        }
                      })
                    }
                    className="w-full bg-slate-900 text-white py-4 font-bold hover:bg-indigo-600 transition-colors flex items-center justify-center gap-2"
                  >
                    View Admission Details
                    <ExternalLink size={18} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
              <AlertCircle
                size={48}
                className="mx-auto text-slate-300 mb-4"
              />

              <h3 className="text-xl font-bold text-slate-700 mb-2">
                No Universities Found
              </h3>

              <p className="text-slate-500">
                Try adjusting your filters
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterRow;

