

import React, { useState } from 'react';
import { BookOpen, Headphones, PenTool, MessageSquare, HelpCircle, ChevronDown, ChevronUp, CheckCircle2 } from 'lucide-react';

const IeltsCard = () => {
  const [activeModule, setActiveModule] = useState(null);

  const modules = [
    {
      id: 'listening',
      title: 'Listening',
      icon: <Headphones className="text-blue-500" />,
      duration: '30 Minutes',
      description: '40 questions across 4 recordings of native speakers.',
      questions: [
        "How many sections are in the Listening test?",
        "Do I get extra time to transfer answers to the sheet?",
        "What happens if I misspell a word?"
      ],
      answers: [
        "There are 4 sections (10 questions each).",
        "Yes, in the Paper-based test, you get 10 minutes to transfer answers.",
        "The answer will be marked as incorrect. Spelling matters!"
      ]
    },
    {
      id: 'reading',
      title: 'Reading',
      icon: <BookOpen className="text-emerald-500" />,
      duration: '60 Minutes',
      description: '3 long texts ranging from descriptive to analytical.',
      questions: [
        "Are the texts different for Academic and General Training?",
        "Is there extra time for transferring answers?",
        "Can I write 'T' instead of 'True'?"
      ],
      answers: [
        "Yes, Academic texts are more scholarly; General texts focus on daily life/work.",
        "No. You must write answers directly on the sheet within 60 minutes.",
        "Yes, usually 'T' is accepted, but always check instructions."
      ]
    },
    {
      id: 'writing',
      title: 'Writing',
      icon: <PenTool className="text-amber-500" />,
      duration: '60 Minutes',
      description: 'Task 1 (Report/Letter) and Task 2 (Essay).',
      questions: [
        "What is the word count for Task 1 and Task 2?",
        "Which task carries more weight for the band score?",
        "Will I lose marks for bad handwriting?"
      ],
      answers: [
        "Task 1: 150 words; Task 2: 250 words.",
        "Task 2 carries twice as much weight as Task 1.",
        "As long as it is legible, you won't lose marks, but clarity helps."
      ]
    },
    {
      id: 'speaking',
      title: 'Speaking',
      icon: <MessageSquare className="text-rose-500" />,
      duration: '11–14 Minutes',
      description: 'A face-to-face interview in 3 parts.',
      questions: [
        "What are the three parts of the speaking test?",
        "What should I do if I don't understand the question?",
        "Does my accent affect my score?"
      ],
      answers: [
        "Part 1: Introduction; Part 2: Cue Card; Part 3: Discussion.",
        "You can politely ask the examiner to repeat or clarify once.",
        "No. Pronunciation matters, but a native-like accent is not required."
      ]
    }
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-8 bg-slate-50 min-h-screen">
      {/* Header & Basic Instructions */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-200 mb-8">
        <h2 className="text-3xl font-black text-slate-900 mb-4 flex items-center gap-3">
          <CheckCircle2 className="text-indigo-600" size={32} />
          IELTS Master Guide
        </h2>
        <p className="text-slate-600 leading-relaxed mb-6">
          The International English Language Testing System (IELTS) measures your ability to communicate in English for work, study, or migration. Total test time is <strong>2 hours and 45 minutes</strong>.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
            <p className="text-xs font-bold text-indigo-600 uppercase">Total Score</p>
            <p className="text-xl font-black text-slate-800">Band 1.0 - 9.0</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
            <p className="text-xs font-bold text-indigo-600 uppercase">Validity</p>
            <p className="text-xl font-black text-slate-800">2 Years</p>
          </div>
          <div className="bg-indigo-50 p-4 rounded-2xl border border-indigo-100">
            <p className="text-xs font-bold text-indigo-600 uppercase">Attempts</p>
            <p className="text-xl font-black text-slate-800">Unlimited</p>
          </div>
        </div>
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 gap-6">
        {modules.map((module) => (
          <div key={module.id} className="bg-white rounded-2xl shadow-md border border-slate-100 overflow-hidden transition-all">
            <div 
              className="p-6 cursor-pointer flex items-center justify-between hover:bg-slate-50"
              onClick={() => setActiveModule(activeModule === module.id ? null : module.id)}
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-100 rounded-xl">
                  {module.icon}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">{module.title}</h3>
                  <p className="text-sm font-medium text-slate-400">{module.duration}</p>
                </div>
              </div>
              {activeModule === module.id ? <ChevronUp /> : <ChevronDown />}
            </div>

            {/* Expanded FAQ/Questions Section */}
            {activeModule === module.id && (
              <div className="p-6 bg-slate-50 border-t border-slate-100 animate-in slide-in-from-top-2 duration-300">
                <p className="text-slate-700 mb-6 font-medium italic">"{module.description}"</p>
                <h4 className="text-sm font-bold text-slate-900 uppercase mb-4 flex items-center gap-2">
                  <HelpCircle size={16} className="text-indigo-600" /> Common Module Questions
                </h4>
                <div className="space-y-4">
                  {module.questions.map((q, index) => (
                    <div key={index} className="bg-white p-4 rounded-xl border border-slate-200">
                      <p className="font-bold text-slate-800 text-sm mb-1">Q: {q}</p>
                      <p className="text-slate-600 text-sm">A: {module.answers[index]}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IeltsCard;