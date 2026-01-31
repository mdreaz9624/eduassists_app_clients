

import React, { useState } from 'react';
// import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

import {
  FaUser,
  FaCloudUploadAlt,
  FaUniversity,
  FaCheckCircle,
  FaArrowRight,
  FaHashtag,
  FaCircle,
  FaCalculator,
  FaShareAlt
} from 'react-icons/fa';

const StudentProfile = () => {
  const { user, userData } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('info');
  // const [applyingCourse, setApplyingCourse] = useState(null);

  // ✅ Generate studentId ONLY ONCE (no useEffect)
  const [studentId] = useState(
    () => `STD-${Math.floor(100000 + Math.random() * 900000)}`
  );

  // --- Billing State ---
  const [billing, setBilling] = useState({
    openingCharge: 5000,
    vfsFee: 12000,
    visaFee: 8000,
    otherCharges: 0
  });

  // --- Auto Total ---
  const totalAmount = Object.values(billing).reduce(
    (acc, val) => acc + (Number(val) || 0),
    0
  );

  const handleBillingChange = (e) => {
    const { name, value } = e.target;
    setBilling((prev) => ({
      ...prev,
      [name]: Number(value) || 0
    }));
  };

  // ✅ Only external sync here (safe useEffect)
  // useEffect(() => {
  //   const saved = localStorage.getItem('applyingFor');
  //   if (saved && saved !== 'undefined') {
  //     try {
  //       setApplyingCourse(JSON.parse(saved));
  //     } catch (err) {
  //       console.error('Invalid course data:', err);
  //     }
  //   }
  // }, []);

  const [applyingCourse] = useState(() => {
    try {
      const saved = localStorage.getItem('applyingFor');
      return saved && saved !== 'undefined' ? JSON.parse(saved) : null;
    } catch (err) {
      console.error('Invalid course data:', err);
      return null;
    }
  });

  return (
    <div className="min-h-screen bg-[#F8FAFC] dark:bg-[#0e3592] text-slate-900 dark:text-slate-100">
      <div className="max-w-5xl mx-auto p-6 md:p-12">

        {/* ---------- HEADER ---------- */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
          <div className="flex items-center gap-5">
            <div className="w-20 h-20 rounded-full border-4 border-white shadow-lg overflow-hidden">
              <img
                src={
                  user?.photoURL ||
                  `https://ui-avatars.com/api/?name=${user?.displayName}&background=4f46e5&color=fff`
                }
                alt="User"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                {userData?.displayName || user?.displayName}
              </h1>

              <div className="flex items-center gap-3 text-sm">
                <span className="flex items-center gap-1 text-slate-500">
                  <FaHashtag className="text-blue-500 text-xs" />
                  {studentId}
                </span>

                <span className="flex items-center gap-1 text-emerald-600 font-bold text-[10px] uppercase bg-emerald-50 px-2 py-0.5 rounded-md">
                  <FaCircle className="text-[6px]" />
                  Active
                </span>
              </div>

              <button
                onClick={() => navigate('/referral')}
                className="mt-3 flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl text-sm font-bold"
              >
                <FaShareAlt />
                Refer Friends & Earn
              </button>
            </div>
          </div>

          {applyingCourse?.uniName && (
            <div className="bg-blue-50 px-6 py-3 rounded-2xl border">
              <p className="text-[10px] uppercase font-black text-blue-500">
                Target Institution
              </p>
              <p className="text-sm font-bold flex items-center gap-2 text-blue-700">
                <FaUniversity />
                {applyingCourse.uniName}
              </p>
            </div>
          )}
        </div>

        {/* ---------- TABS ---------- */}
        <div className="flex gap-8 mb-10 border-b">
          {['info', 'docs', 'payment'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-4 text-xs font-black tracking-widest ${activeTab === tab
                  ? 'text-blue-600 border-b-2 border-blue-600'
                  : 'text-slate-400'
                }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* ---------- CONTENT ---------- */}
        <div className="bg-white text-black rounded-3xl p-8 md:p-12 shadow border">

          {/* INFO */}
          {activeTab === 'info' && (
            <div className="space-y-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="text-xs font-bold text-blue-700">Full Name</label>
                  <p className="text-lg font-semibold">{user?.displayName}</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-blue-700">Email</label>
                  <p className="text-lg font-semibold">{user?.email}</p>
                </div>
              </div>

              <div className="p-6 bg-amber-100 rounded-2xl border">
                <h4 className="text-sm font-black text-blue-700 mb-4 flex items-center gap-2">
                  <FaUniversity className="text-blue-700" />
                  Admission Progress
                </h4>

                <div className="grid md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-xs text-black">University</label>
                    <p className="font-bold">{applyingCourse?.uniName || '—'}</p>
                  </div>

                  <div>
                    <label className="text-xs text-black">Tuition</label>
                    <p className="font-bold text-blue-600">
                      {applyingCourse?.tuition || '—'}
                    </p>
                  </div>

                  <div>
                    <label className="text-xs text-black">Status</label>
                    <p className="font-bold text-emerald-500 flex items-center gap-1">
                      <FaCircle className="text-[6px]" />
                      Document Review
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* DOCUMENTS */}
          {activeTab === 'docs' && (
            <div>
              <div className="grid sm:grid-cols-2 gap-4">
                {['Passport', 'Academic Records', 'Language Test', 'SOP'].map(
                  (doc) => (
                    <div
                      key={doc}
                      className="flex justify-between items-center p-4 bg-slate-50 rounded-xl border"
                    >
                      <div className="flex items-center gap-3">
                        <FaCloudUploadAlt className="text-blue-500" />
                        <span className="font-bold text-sm">{doc}</span>
                      </div>
                      <input type="file" className="text-xs" />
                    </div>
                  )
                )}
              </div>

              <button
                onClick={() => setActiveTab('payment')}
                className="mt-8 flex items-center gap-2 text-blue-600 font-bold"
              >
                Continue to Fees <FaArrowRight />
              </button>
            </div>
          )}

          {/* PAYMENT */}
          {activeTab === 'payment' && (
            <div className="max-w-xl mx-auto">
              <h3 className="text-2xl font-bold text-center mb-8">
                Payment Calculator
              </h3>

              <div className="grid md:grid-cols-2 gap-6 mb-10">
                {[
                  { label: 'File Opening', name: 'openingCharge' },
                  { label: 'VFS Fee', name: 'vfsFee' },
                  { label: 'Visa Fee', name: 'visaFee' },
                  { label: 'Other Charges', name: 'otherCharges' }
                ].map((item) => (
                  <div key={item.name}>
                    <label className="text-xs font-bold text-slate-400">
                      {item.label}
                    </label>
                    <input
                      type="number"
                      name={item.name}
                      value={billing[item.name]}
                      onChange={handleBillingChange}
                      className="w-full mt-1 p-3 border rounded-xl font-bold"
                    />
                  </div>
                ))}
              </div>

              <div className="bg-blue-600 text-white p-8 rounded-3xl text-center">
                <p className="text-xs uppercase font-black mb-2">
                  Total Payable
                </p>
                <p className="text-4xl font-black mb-6">
                  {totalAmount.toLocaleString()} BDT
                </p>

                <button className="w-full bg-white text-blue-600 py-4 rounded-xl font-bold">
                  <FaCheckCircle className="inline mr-2" />
                  Pay Now
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default StudentProfile;
