


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