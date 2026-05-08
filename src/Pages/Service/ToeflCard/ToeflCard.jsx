import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Monitor, 
  Mic2, 
  Headphones, 
  FileText, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp, 
  ArrowLeft,
  Info
} from 'lucide-react';

const ToeflCard = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const modules = [
    {
      id: 'reading',
      title: 'Reading',
      icon: <Monitor className="text-blue-600" />,
      time: '35 Minutes',
      details: 'Read 2 passages (approx. 700 words each) and answer 20 questions.',
      focus: 'Academic transitions and vocabulary in context.'
    },
    {
      id: 'listening',
      title: 'Listening',
      icon: <Headphones className="text-indigo-600" />,
      time: '36 Minutes',
      details: 'Listen to 3 lectures and 2 conversations. Answer 28 questions.',
      focus: 'Note-taking and understanding the speaker’s attitude.'
    },
    {
      id: 'speaking',
      title: 'Speaking',
      icon: <Mic2 className="text-rose-600" />,
      time: '16 Minutes',
      details: '4 tasks: 1 independent (personal opinion) and 3 integrated (read/listen/speak).',
      focus: 'Clarity and coherence through a microphone.'
    },
    {
      id: 'writing',
      title: 'Writing',
      icon: <FileText className="text-amber-600" />,
      time: '29 Minutes',
      details: '2 tasks: Integrated writing (20 mins) and Writing for Academic Discussion (10 mins).',
      focus: 'Synthesizing info and responding to online discussions.'
    }
  ];

  const faqs = [
    {
      q: "What is the 'Writing for an Academic Discussion' task?",
      a: "This is a new TOEFL task where you participate in an online classroom forum. You must read a professor's question and other students' responses, then contribute your own opinion within 10 minutes."
    },
    {
      q: "Is the TOEFL test entirely on a computer?",
      a: "Yes. Unlike IELTS, the TOEFL iBT is 100% computer-based, including the speaking section where you record your voice into a headset rather than talking to a human examiner."
    },
    {
      q: "How is the TOEFL scored?",
      a: "Each of the 4 sections is scored from 0–30, making the total score out of 120. Most top universities require a score between 80 and 100."
    },
    {
      q: "Can I take notes during the test?",
      a: "Yes! The testing center provides scratch paper and pencils. Note-taking is essential, especially for the Integrated Speaking and Writing tasks."
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {/* Navigation & Header */}
      <div className="max-w-5xl mx-auto mb-8">
        <button 
          onClick={() => navigate(-1)} 
          className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-bold mb-6 transition-colors"
        >
          <ArrowLeft size={20} /> Back to Services
        </button>

        <div className="bg-gradient-to-r from-blue-700 to-indigo-800 rounded-3xl p-8 md:p-12 text-white shadow-xl">
          <h1 className="text-4xl font-black mb-4">TOEFL iBT Comprehensive Guide</h1>
          <p className="text-blue-100 text-lg max-w-2xl">
            The Test of English as a Foreign Language (TOEFL) is the premier English-language test for university study, work, and immigration in the USA and beyond.
          </p>
          <div className="flex flex-wrap gap-4 mt-8">
            <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-sm font-bold">Total Time: ~2 Hours</span>
            <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-sm font-bold">Score Range: 0 - 120</span>
            <span className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-sm font-bold">Delivery: Computer Based</span>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {modules.map((m) => (
          <div key={m.id} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4 mb-4">
              <div className="p-3 bg-slate-50 rounded-xl">{m.icon}</div>
              <div>
                <h3 className="text-xl font-black text-slate-900">{m.title}</h3>
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">{m.time}</span>
              </div>
            </div>
            <p className="text-slate-600 text-sm mb-4 leading-relaxed">{m.details}</p>
            <div className="flex items-start gap-2 bg-blue-50 p-3 rounded-lg border border-blue-100">
              <Info size={16} className="text-blue-600 mt-0.5" />
              <p className="text-xs font-medium text-blue-800"><strong>Key Focus:</strong> {m.focus}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Concept Clarity / FAQ Section */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <HelpCircle size={40} className="mx-auto text-indigo-500 mb-2" />
          <h2 className="text-2xl font-black text-slate-900">Concept Clarity</h2>
          <p className="text-slate-500">Quick answers to clear your doubts about the TOEFL iBT.</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
              <button 
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full p-5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors"
              >
                <span className="font-bold text-slate-800 pr-4">{faq.q}</span>
                {openFaq === index ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </button>
              {openFaq === index && (
                <div className="p-5 bg-slate-50 border-t border-slate-100 text-slate-600 text-sm leading-relaxed animate-in slide-in-from-top-1">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center bg-indigo-900 p-8 rounded-3xl text-white">
          <h3 className="text-xl font-bold mb-2">Ready to start your TOEFL journey?</h3>
          <p className="text-indigo-200 mb-6 text-sm">Join EduAssists for high-quality mock tests and feedback.</p>
          <button className="px-8 py-3 bg-white text-indigo-900 font-black rounded-xl hover:bg-blue-400 hover:text-white transition-all">
            Book a Free Trial Class
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToeflCard;