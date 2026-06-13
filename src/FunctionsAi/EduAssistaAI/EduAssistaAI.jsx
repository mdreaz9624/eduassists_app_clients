


import React, { useState, useRef, useEffect } from "react";
import { 
  FaTimes, 
  FaRobot, 
  FaPaperPlane, 
  FaUser, 
  FaSpinner,
  FaMinus,
  FaExpand,
  FaCompress
} from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const EduassistsAI = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: "assistant",
      content: "Hello! I'm EduAssists AI Assistant 🤖\n\nI can help you with:\n• 📚 University admissions guidance\n• 💰 Scholarship information\n• ✈️ Visa requirements\n• 🎓 Course recommendations\n• 🌍 Country selection\n\nWhat would you like to know about studying abroad?",
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const axiosSecure = useAxiosSecure();

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && !isMinimized) {
      inputRef.current?.focus();
    }
  }, [isOpen, isMinimized]);

  const sendMessage = async () => {
    if (!inputMessage.trim() || isTyping) return;

    const userMessage = {
      id: Date.now(),
      role: "user",
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setChatHistory(prev => [...prev, { role: "user", content: inputMessage }]);
    setInputMessage("");
    setIsTyping(true);

    try {
      // Call your backend Gemini API
      const response = await axiosSecure.post("/gemini/chat", {
        message: inputMessage,
        history: chatHistory
      });

      if (response.data.success) {
        const botMessage = {
          id: Date.now() + 1,
          role: "assistant",
          content: response.data.reply,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setChatHistory(prev => [...prev, { role: "assistant", content: response.data.reply }]);
      } else {
        throw new Error(response.data.error || "Failed to get response");
      }
    } catch (error) {
      console.error("Chat error:", error);
      const errorMessage = {
        id: Date.now() + 1,
        role: "assistant",
        content: "I'm having trouble connecting right now. Please try again or contact our support team:\n\n📧 eduassists.com@gmail.com\n💬 WhatsApp: +8801842134687",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    setMessages([
      {
        id: Date.now(),
        role: "assistant",
        content: "Chat cleared! How can I help you with your study abroad journey today? 🌍",
        timestamp: new Date()
      }
    ]);
    setChatHistory([]);
  };

  const suggestedQuestions = [
    "What are the requirements to study in the UK?",
    "Find scholarships for international students",
    "Compare universities in Australia",
    "Visa process for Canada",
    "Best courses for Computer Science",
    "How much does it cost to study in USA?"
  ];

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-full shadow-2xl hover:shadow-xl transition-all group animate-bounce"
      >
        <FaRobot className="w-6 h-6 group-hover:scale-110 transition-transform" />
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
      </button>
    );
  }

  return (
    <div className={`fixed bottom-6 right-6 z-50 bg-white rounded-2xl shadow-2xl transition-all duration-300 ${
      isMinimized ? "w-80 h-14" : "w-[95vw] md:w-[450px] h-[600px]"
    }`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-t-2xl flex justify-between items-center cursor-pointer"
           onClick={() => !isMinimized && setIsMinimized(true)}>
        <div className="flex items-center gap-2">
          <FaRobot className="w-5 h-5" />
          <div>
            <h3 className="font-semibold">EduAssists AI</h3>
            <p className="text-xs text-blue-200">Online • Study Abroad Advisor</p>
          </div>
        </div>
        <div className="flex gap-2" onClick={e => e.stopPropagation()}>
          <button
            onClick={() => setIsMinimized(!isMinimized)}
            className="hover:bg-white/20 p-1 rounded transition"
          >
            {isMinimized ? <FaExpand size={14} /> : <FaCompress size={14} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:bg-white/20 p-1 rounded transition"
          >
            <FaTimes size={14} />
          </button>
        </div>
      </div>

      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="h-[calc(100%-120px)] overflow-y-auto p-4 bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`mb-4 flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl p-3 ${
                    message.role === "user"
                      ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white"
                      : "bg-white text-gray-800 shadow-sm border border-gray-200"
                  }`}
                >
                  {message.role === "assistant" && (
                    <div className="flex items-center gap-1 mb-1">
                      <FaRobot size={12} className="text-blue-600" />
                      <span className="text-xs font-semibold text-blue-600">EduAssists AI</span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap text-sm leading-relaxed">
                    {message.content}
                  </div>
                  <div className="text-xs mt-1 opacity-70">
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start mb-4">
                <div className="bg-white rounded-2xl p-3 shadow-sm">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions (show only when few messages) */}
          {messages.length < 3 && (
            <div className="p-3 border-t border-gray-200 bg-white">
              <p className="text-xs text-gray-500 mb-2">Suggested questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInputMessage(question);
                      setTimeout(() => sendMessage(), 100);
                    }}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-3 border-t border-gray-200 bg-white rounded-b-2xl">
            <div className="flex gap-2">
              <textarea
                ref={inputRef}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything about studying abroad..."
                className="flex-1 border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                rows="1"
                disabled={isTyping}
              />
              <button
                onClick={sendMessage}
                disabled={!inputMessage.trim() || isTyping}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTyping ? <FaSpinner className="animate-spin" /> : <FaPaperPlane />}
              </button>
            </div>
            <button
              onClick={clearChat}
              className="text-xs text-gray-400 hover:text-gray-600 mt-2 text-center w-full"
            >
              Clear Chat
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default EduassistsAI;