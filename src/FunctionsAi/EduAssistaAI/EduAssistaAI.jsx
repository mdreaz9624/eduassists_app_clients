


// import React, { useState, useEffect, useRef } from 'react';
// import { FaRobot, FaPaperPlane, FaTimes, FaUniversity, FaSearch, FaFilter } from 'react-icons/fa';

// // Import your studyData (make sure the path is correct)
// import studyData from './../../../public/studyData.json';

// const EduAsistaAI = () => {
//   // Define all states at the top
//   const [isOpen, setIsOpen] = useState(true);
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [showFilters, setShowFilters] = useState(false);
//   const [filters, setFilters] = useState({
//     country: '',
//     maxTuition: '',
//     course: ''
//   });
  
//   const messagesEndRef = useRef(null);

//   // ✅ FIXED: Set initial message only once on mount
//   useEffect(() => {
//     const totalUnis = studyData.reduce((acc, country) => acc + country.universities.length, 0);
    
//     setMessages([{
//       role: 'ai',
//       text: `👋 **Welcome to Eduasista!**\n\nI can search ${totalUnis} universities in our database.\n\n**Try asking:**\n• "Computer Science in UK"\n• "Universities under $30,000"\n• "Study in Germany"\n• "Medical programs"`,
//       timestamp: new Date()
//     }]);
//   }, []); // ✅ Empty dependency array = runs only once

//   // Auto-scroll effect
//   useEffect(() => {
//     if (messagesEndRef.current) {
//       messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
//     }
//   }, [messages]);

//   // University search function
//   const searchUniversities = (query, filters = {}) => {
//     const results = [];
//     const searchTerms = query.toLowerCase().split(' ');
    
//     studyData.forEach(country => {
//       // Apply country filter
//       if (filters.country && country.country !== filters.country) return;
      
//       country.universities.forEach(university => {
//         // Apply tuition filter
//         if (filters.maxTuition) {
//           const tuitionNumbers = university.tuition.match(/\d+/g);
//           if (tuitionNumbers) {
//             const maxTuition = Math.max(...tuitionNumbers.map(num => parseInt(num)));
//             if (maxTuition > parseInt(filters.maxTuition)) {
//               return;
//             }
//           }
//         }
        
//         let matchScore = 0;
//         let matchesCourse = !filters.course;
        
//         searchTerms.forEach(term => {
//           if (university.name.toLowerCase().includes(term)) matchScore += 5;
//           if (university.city.toLowerCase().includes(term)) matchScore += 3;
//           if (country.country.toLowerCase().includes(term)) matchScore += 3;
          
//           university.departments.forEach(department => {
//             if (department.name.toLowerCase().includes(term)) matchScore += 4;
//             department.subjects.forEach(subject => {
//               if (subject.toLowerCase().includes(term)) {
//                 matchScore += 4;
//                 if (filters.course && subject.toLowerCase().includes(filters.course.toLowerCase())) {
//                   matchesCourse = true;
//                 }
//               }
//             });
//           });
//         });
        
//         if (!matchesCourse) return;
        
//         if (matchScore > 0) {
//           results.push({
//             score: matchScore,
//             country: country.country,
//             flag: country.flag,
//             name: university.name,
//             city: university.city,
//             tuition: university.tuition,
//             departments: university.departments
//           });
//         }
//       });
//     });
    
//     return results.sort((a, b) => b.score - a.score);
//   };

//   // Generate response
//   const generateResponse = (query, searchResults) => {
//     if (searchResults.length === 0) {
//       return `🔍 **No exact matches found**\n\nTry:\n• Being more specific\n• Using different keywords\n• Checking the filters\n\nOr ask about study abroad in general!`;
//     }
    
//     let response = `🎓 **Found ${searchResults.length} universities**\n\n`;
    
//     searchResults.slice(0, 5).forEach((uni, idx) => {
//       response += `**${idx + 1}. ${uni.name}** ${uni.flag}\n`;
//       response += `📍 ${uni.city}, ${uni.country}\n`;
//       response += `💰 ${uni.tuition}\n`;
      
//       const topDepts = uni.departments.slice(0, 2);
//       response += `📚 ${topDepts.map(d => d.name).join(', ')}`;
//       if (uni.departments.length > 2) response += `, +${uni.departments.length - 2} more`;
//       response += `\n\n`;
//     });
    
//     if (searchResults.length > 5) {
//       response += `*... and ${searchResults.length - 5} more universities*\n\n`;
//     }
    
//     response += `💡 **Next steps:**\n• Ask about a specific university\n• Filter by country/budget\n• Compare universities`;
    
//     return response;
//   };

//   const handleSend = (e) => {
//     e.preventDefault();
//     if (!input.trim() || isTyping) return;

//     // Add user message
//     const userMsg = { 
//       role: 'user', 
//       text: input,
//       timestamp: new Date()
//     };
    
//     setMessages(prev => [...prev, userMsg]);
//     setInput('');
//     setIsTyping(true);

//     // Simulate AI thinking
//     setTimeout(() => {
//       // Search universities
//       const results = searchUniversities(input, filters);
      
//       // Generate response
//       const response = generateResponse(input, results);
      
//       // Add AI response
//       setMessages(prev => [...prev, {
//         role: 'ai',
//         text: response,
//         resultsCount: results.length,
//         timestamp: new Date()
//       }]);
      
//       setIsTyping(false);
//     }, 800);
//   };

//   // Quick actions
//   const quickActions = [
//     { emoji: '🇬🇧', label: 'UK', query: 'Universities in United Kingdom' },
//     { emoji: '🇺🇸', label: 'USA', query: 'Study in USA' },
//     { emoji: '💻', label: 'CS', query: 'Computer Science programs' },
//     { emoji: '💰', label: 'Budget', query: 'Affordable universities' },
//     { emoji: '🏥', label: 'Medical', query: 'Medical universities' },
//     { emoji: '🎓', label: 'MBA', query: 'MBA programs' }
//   ];

//   // Get unique countries
//   const countries = [...new Set(studyData.map(c => c.country))];

//   return (
//     <div className="fixed bottom-4 right-4 z-50">
//       {/* Chat Window */}
//       {isOpen && (
//         <div className="mb-3 w-96 bg-white rounded-xl shadow-2xl border border-gray-200">
//           {/* Header */}
//           <div className="bg-gradient-to-r from-blue-600 to-indigo-700 p-3 text-white rounded-t-xl">
//             <div className="flex justify-between items-center">
//               <div className="flex items-center gap-2">
//                 <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
//                   <FaRobot className="text-blue-600" />
//                 </div>
//                 <div>
//                   <h2 className="font-bold text-lg">Eduasista AI</h2>
//                   <p className="text-xs">Local University Search</p>
//                 </div>
//               </div>
//               <div className="flex gap-2">
//                 <button
//                   onClick={() => setShowFilters(!showFilters)}
//                   className="p-1 hover:bg-white/20 rounded"
//                   title="Filters"
//                 >
//                   <FaFilter />
//                 </button>
//                 <button
//                   onClick={() => setIsOpen(false)}
//                   className="p-1 hover:bg-white/20 rounded"
//                 >
//                   <FaTimes />
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* Filters */}
//           {showFilters && (
//             <div className="p-3 bg-gray-50 border-b">
//               <div className="grid grid-cols-2 gap-2">
//                 <div>
//                   <label className="text-xs font-medium text-gray-600">Country</label>
//                   <select
//                     className="w-full text-sm border rounded p-1"
//                     value={filters.country}
//                     onChange={(e) => setFilters({...filters, country: e.target.value})}
//                   >
//                     <option value="">All Countries</option>
//                     {countries.map(country => (
//                       <option key={country} value={country}>{country}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="text-xs font-medium text-gray-600">Max Tuition</label>
//                   <input
//                     type="number"
//                     placeholder="e.g., 30000"
//                     className="w-full text-sm border rounded p-1"
//                     value={filters.maxTuition}
//                     onChange={(e) => setFilters({...filters, maxTuition: e.target.value})}
//                   />
//                 </div>
//                 <div className="col-span-2">
//                   <label className="text-xs font-medium text-gray-600">Course/Subject</label>
//                   <input
//                     type="text"
//                     placeholder="e.g., Computer Science"
//                     className="w-full text-sm border rounded p-1"
//                     value={filters.course}
//                     onChange={(e) => setFilters({...filters, course: e.target.value})}
//                   />
//                 </div>
//               </div>
//               <div className="flex justify-between mt-2">
//                 <button
//                   onClick={() => setFilters({ country: '', maxTuition: '', course: '' })}
//                   className="text-xs text-blue-600 hover:text-blue-800"
//                 >
//                   Clear Filters
//                 </button>
//                 <button
//                   onClick={() => setShowFilters(false)}
//                   className="text-xs bg-gray-200 px-2 py-1 rounded"
//                 >
//                   Apply
//                 </button>
//               </div>
//             </div>
//           )}

//           {/* Quick Actions */}
//           <div className="p-3 border-b">
//             <div className="flex flex-wrap gap-2">
//               {quickActions.map((action, i) => (
//                 <button
//                   key={i}
//                   onClick={() => setInput(action.query)}
//                   className="flex items-center gap-1 text-sm bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-full"
//                 >
//                   <span>{action.emoji}</span>
//                   <span>{action.label}</span>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Messages */}
//           <div className="h-64 overflow-y-auto p-3">
//             {messages.map((msg, index) => (
//               <div key={index} className={`mb-3 ${msg.role === 'user' ? 'text-right' : ''}`}>
//                 <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
//                   msg.role === 'user' 
//                     ? 'bg-blue-100 text-blue-900' 
//                     : 'bg-gray-100 text-gray-800'
//                 }`}>
//                   <div className="whitespace-pre-wrap text-sm">
//                     {msg.text}
//                   </div>
//                   {msg.resultsCount > 0 && (
//                     <div className="text-xs text-green-600 mt-1 flex items-center gap-1">
//                       <FaUniversity /> Found {msg.resultsCount} universities
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}
            
//             {isTyping && (
//               <div className="flex items-center gap-2 text-gray-500">
//                 <div className="flex gap-1">
//                   <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
//                   <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
//                   <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
//                 </div>
//                 <span className="text-sm">Searching database...</span>
//               </div>
//             )}
            
//             <div ref={messagesEndRef} />
//           </div>

//           {/* Input */}
//           <div className="p-3 border-t">
//             <form onSubmit={handleSend} className="flex gap-2">
//               <input
//                 type="text"
//                 value={input}
//                 onChange={(e) => setInput(e.target.value)}
//                 placeholder="Search universities..."
//                 className="flex-1 border rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-500"
//                 disabled={isTyping}
//               />
//               <button
//                 type="submit"
//                 disabled={!input.trim() || isTyping}
//                 className="bg-blue-600 text-white w-10 h-10 rounded-full flex items-center justify-center hover:bg-blue-700 disabled:opacity-50"
//               >
//                 <FaPaperPlane />
//               </button>
//             </form>
//             <div className="text-xs text-gray-500 text-center mt-2 flex justify-between">
//               <span>{studyData.length} countries</span>
//               <span>•</span>
//               <span>{studyData.reduce((acc, country) => acc + country.universities.length, 0)} universities</span>
//               <span>•</span>
//               <span>100% Local</span>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Floating Button */}
//       <button
//         onClick={() => setIsOpen(!isOpen)}
//         className="w-14 h-14 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-xl flex items-center justify-center hover:shadow-2xl hover:scale-105 transition-all"
//       >
//         {isOpen ? <FaTimes /> : <FaRobot className="text-xl" />}
//       </button>
//     </div>
//   );
// };

// export default EduAsistaAI;


// new code 


import React, { useState, useEffect, useRef } from 'react';
import { FaRobot, FaPaperPlane, FaTimes, FaUniversity, FaFilter } from 'react-icons/fa';

// Ensure the path is correct relative to this file
import studyData from './../../../public/studyData.json';

const EduAssistaAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  // const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({ country: '', maxTuition: '', course: '' });
  //  setFilters
  const messagesEndRef = useRef(null);

  // SAFE DATA ACCESS: Calculate totals only if studyData exists
  const safeData = Array.isArray(studyData) ? studyData : [];
  const totalUnis = safeData.reduce((acc, country) => acc + (country.universities?.length || 0), 0);

  useEffect(() => {
    setMessages([{
      role: 'ai',
      text: `👋 **Welcome to Eduasista!**\n\nI can search ${totalUnis} universities in our database.\n\n**Try asking:**\n• "Computer Science in UK"\n• "Universities under $30,000"\n• "Study in Canada"`,
      timestamp: new Date()
    }]);
  }, [totalUnis]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const searchUniversities = (query, filters = {}) => {
    const results = [];
    const searchTerms = query.toLowerCase().split(' ');
    
    safeData.forEach(country => {
      if (filters.country && country.country !== filters.country) return;
      
      country.universities?.forEach(uni => {
        // Tuition Filter Logic
        if (filters.maxTuition) {
          const cost = parseInt(uni.tuition_annual?.replace(/[^0-9]/g, '') || "0");
          if (cost > parseInt(filters.maxTuition)) return;
        }
        
        let matchScore = 0;
        searchTerms.forEach(term => {
          if (uni.name.toLowerCase().includes(term)) matchScore += 5;
          if (uni.city.toLowerCase().includes(term)) matchScore += 3;
          if (country.country.toLowerCase().includes(term)) matchScore += 3;
          
          uni.top_departments?.forEach(dept => {
            if (dept.toLowerCase().includes(term)) matchScore += 4;
          });
        });

        if (matchScore > 0) {
          results.push({
            score: matchScore,
            country: country.country,
            flag: country.flag,
            name: uni.name,
            city: uni.city,
            tuition: uni.tuition_annual,
            departments: uni.top_departments || []
          });
        }
      });
    });
    return results.sort((a, b) => b.score - a.score);
  };

  const generateResponse = (searchResults) => {
    if (searchResults.length === 0) return `🔍 **No exact matches found.** Try a different keyword or check your filters.`;
    
    let response = `🎓 **Found ${searchResults.length} universities**\n\n`;
    searchResults.slice(0, 3).forEach((uni, idx) => {
      response += `**${idx + 1}. ${uni.name}** ${uni.flag}\n`;
      response += `📍 ${uni.city}, ${uni.country} | 💰 ${uni.tuition}\n\n`;
    });
    
    if (searchResults.length > 3) response += `*...and ${searchResults.length - 3} more.*`;
    return response;
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    setMessages(prev => [...prev, { role: 'user', text: input }]);
    const currentInput = input;
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const results = searchUniversities(currentInput, filters);
      setMessages(prev => [...prev, {
        role: 'ai',
        text: generateResponse(results),
        resultsCount: results.length
      }]);
      setIsTyping(false);
    }, 600);
  };

  return (
    <div className="fixed bottom-4 right-4 z-50 font-roboto">
      {isOpen && (
        <div className="mb-3 w-80 md:w-96 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          <div className="bg-indigo-600 p-4 text-white flex justify-between items-center">
            <div className="flex items-center gap-2">
              <FaRobot />
              <span className="font-bold">Eduasista AI</span>
            </div>
            <button onClick={() => setIsOpen(false)}><FaTimes /></button>
          </div>

          <div className="h-96 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, i) => (
              <div key={i} className={`chat ${msg.role === 'ai' ? 'chat-start' : 'chat-end'}`}>
                <div className={`chat-bubble text-sm ${msg.role === 'ai' ? 'bg-white text-slate-800' : 'bg-indigo-600 text-white'}`}>
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>
              </div>
            ))}
            {isTyping && <div className="chat chat-start"><div className="chat-bubble loading loading-dots loading-xs"></div></div>}
            <div ref={messagesEndRef} />
          </div>

          <form onSubmit={handleSend} className="p-3 border-t flex gap-2">
            <input 
              type="text" value={input} 
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="input input-sm input-bordered flex-1"
            />
            <button type="submit" className="btn btn-sm btn-primary"><FaPaperPlane /></button>
          </form>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="btn btn-primary btn-circle btn-lg shadow-lg">
        {isOpen ? <FaTimes /> : <FaRobot size={24} />}
      </button>
    </div>
  );
};

export default EduAssistaAI;