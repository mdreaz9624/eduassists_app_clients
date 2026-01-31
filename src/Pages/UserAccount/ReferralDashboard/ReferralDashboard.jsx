import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import {
  FaUserFriends,
  FaWhatsapp,
  FaEnvelope,
  FaCopy,
  FaChartLine,
  FaMoneyBillWave,
  FaShareAlt,
  FaUsers,
  FaCheckCircle,
  FaRegCopy,
  FaQrcode,
  FaCalendarAlt,
  FaStar,
  FaArrowRight,
  FaGift,
  FaPercent,
  FaMedal,
  FaDownload,
  FaClock
} from 'react-icons/fa';
import { MdContentCopy, MdPeople, MdAttachMoney } from 'react-icons/md';
import { toast } from 'react-hot-toast';




const ReferralDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [referralCode, setReferralCode] = useState('');
  const [copied, setCopied] = useState(false);
  const [stats, setStats] = useState({
    totalReferred: 12,
    activeStudents: 8,
    pendingApplications: 4,
    totalRevenue: 24000,
    commissionRate: 15,
    earnedCommission: 3600,
    recentReferrals: []
  });

  // Generate referral code from user ID or email
  useEffect(() => {
    if (user) {
      const baseCode = user.uid ? user.uid.substring(0, 8).toUpperCase() : 'EDUASSIST';
      const code = `${baseCode}${Math.floor(10 + Math.random() * 90)}`;
      setReferralCode(`REF-${code}`);
      
      // Load referral stats from localStorage
      const savedStats = localStorage.getItem(`referral_${user.uid}`);
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
    }
  }, [user]);

  

  const copyToClipboard = () => {
    const referralLink = `${window.location.origin}/register?ref=${referralCode}`;
    navigator.clipboard.writeText(referralLink)
      .then(() => {
        setCopied(true);
        toast.success('Referral link copied to clipboard!');
        setTimeout(() => setCopied(false), 2000);
      })
      .catch(err => {
        toast.error('Failed to copy link');
        console.error(err);
      });
  };

  const shareViaWhatsApp = () => {
    const message = `🎓 Join EduAssists Global Network! 
    
Use my referral code: ${referralCode}
Get 10% discount on your application fees!

I've had a great experience with their services. Apply now through this link:
${window.location.origin}/register?ref=${referralCode}

Best regards,
${user?.displayName || 'EduAssists Student'}`;
    
    window.open(`https://wa.me/?text=${encodeURIComponent(message)}`, '_blank');
  };

  const shareViaEmail = () => {
    const subject = '🎓 Join EduAssists - Get 10% Discount!';
    const body = `Hi there!

I'm using EduAssists for my study abroad journey and wanted to share this amazing platform with you.

🌟 My Referral Code: ${referralCode}
🎁 You Get: 10% discount on your application fees
💰 I Get: 15% commission when you join

EduAssists has helped me with:
✓ University selection
✓ Document preparation
✓ Visa processing
✓ Scholarship guidance

Ready to start your journey? Register here:
${window.location.origin}/register?ref=${referralCode}

Best regards,
${user?.displayName || 'EduAssists Student'}`;
    
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const generateQRCode = () => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${window.location.origin}/register?ref=${referralCode}&bgcolor=F8FAFC&color=4f46e5&margin=15`;
    window.open(qrUrl, '_blank', 'noopener,noreferrer');
  };

  const referralHistory = [
    { id: 1, name: "Ayesha Rahman", date: "2024-03-15", status: "Admitted", commission: 500 },
    { id: 2, name: "Rahim Khan", date: "2024-03-10", status: "Processing", commission: 0 },
    { id: 3, name: "Fatima Jahan", date: "2024-03-05", status: "Document Review", commission: 0 },
    { id: 4, name: "Tahmid Hasan", date: "2024-03-01", status: "Admitted", commission: 500 },
    { id: 5, name: "Sadia Islam", date: "2024-02-28", status: "Visa Approved", commission: 1000 },
  ];

  // Handle back to profile
  const handleBackToProfile = () => {
    navigate('/student-profile');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 dark:from-slate-900 dark:via-slate-800 dark:to-blue-900/20 text-slate-800 dark:text-slate-100">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        
        {/* Header with Back Button */}
        <div className="mb-8">
          <button 
            onClick={handleBackToProfile}
            className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mb-4"
          >
            <FaArrowRight className="rotate-180" /> Back to Profile
          </button>
          
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-3 flex items-center justify-center gap-3">
              <FaUserFriends className="text-blue-600 dark:text-blue-400 text-4xl" />
              <span className="bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                Refer & Earn Program
              </span>
            </h1>
            <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
              Invite friends to join EduAssists, help them achieve their study abroad dreams, 
              and earn up to 15% commission on every successful referral!
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-xl">
                <MdPeople className="text-2xl text-blue-600 dark:text-blue-400" />
              </div>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
                <FaArrowRight className="mr-1" /> 12%
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.totalReferred}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Total Referred</p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-emerald-100 dark:bg-emerald-900/30 rounded-xl">
                <FaCheckCircle className="text-2xl text-emerald-600 dark:text-emerald-400" />
              </div>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Active</span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.activeStudents}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Active Students</p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-amber-100 dark:bg-amber-900/30 rounded-xl">
                <FaChartLine className="text-2xl text-amber-600 dark:text-amber-400" />
              </div>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400 flex items-center">
                <FaPercent className="mr-1" /> {stats.commissionRate}%
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1">{stats.commissionRate}%</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Commission Rate</p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-xl">
                <MdAttachMoney className="text-2xl text-purple-600 dark:text-purple-400" />
              </div>
              <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">
                ৳{stats.earnedCommission.toLocaleString()}
              </span>
            </div>
            <h3 className="text-3xl font-bold mb-1">৳{stats.totalRevenue.toLocaleString()}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400">Total Revenue Generated</p>
          </div>
        </div>

        {/* Referral Code Section */}
        <div className="mb-12">
          <div className="bg-gradient-to-r from-blue-600 via-indigo-600 to-emerald-500 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -translate-y-32 translate-x-32"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full translate-y-48 -translate-x-48"></div>
            </div>
            
            <div className="relative z-10">
              <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-4">
                    <FaGift className="text-2xl" />
                    <h2 className="text-2xl font-bold">Your Personal Referral Code</h2>
                  </div>
                  <p className="opacity-90 mb-6 max-w-2xl">
                    Share this unique code with friends and classmates. When they sign up using your code, 
                    they get <span className="font-bold">10% discount</span> and you earn <span className="font-bold">15% commission</span> on their payments!
                  </p>
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
                    <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 flex-1">
                      <div className="flex items-center justify-between">
                        <code className="text-3xl font-black tracking-wider">{referralCode}</code>
                        <button
                          onClick={copyToClipboard}
                          className="flex items-center gap-2 bg-white/30 hover:bg-white/40 px-4 py-2 rounded-lg transition-colors"
                        >
                          {copied ? <FaCheckCircle /> : <FaCopy />}
                          {copied ? 'Copied!' : 'Copy'}
                        </button>
                      </div>
                      <p className="text-sm opacity-80 mt-2">
                        {window.location.origin}/register?ref={referralCode}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={shareViaWhatsApp}
                      className="flex items-center gap-2 bg-green-500 hover:bg-green-600 px-5 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95"
                    >
                      <FaWhatsapp className="text-lg" /> Share on WhatsApp
                    </button>
                    <button
                      onClick={shareViaEmail}
                      className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 px-5 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95"
                    >
                      <FaEnvelope className="text-lg" /> Share via Email
                    </button>
                    <button
                      onClick={generateQRCode}
                      className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 px-5 py-3 rounded-xl font-bold transition-all hover:scale-105 active:scale-95"
                    >
                      <FaQrcode className="text-lg" /> Generate QR Code
                    </button>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-white/20 max-w-md">
                  <h3 className="font-bold mb-4 flex items-center gap-2 text-lg">
                    <FaStar className="text-yellow-300" /> How It Works
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold">1</span>
                      </div>
                      <span>Friend signs up using your referral code</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold">2</span>
                      </div>
                      <span>They complete their first payment (application fee)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold">3</span>
                      </div>
                      <span>You get 15% commission credited to your account</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-sm font-bold">4</span>
                      </div>
                      <span>Withdraw anytime to your bank or use for your own fees</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Referral History */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-lg border border-slate-100 dark:border-slate-700 mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-xl font-bold flex items-center gap-2">
                <FaCalendarAlt className="text-blue-500" /> Your Referral History
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Track all your referrals and commissions</p>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
              <FaDownload /> Export Report
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
            <table className="w-full">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50">
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 dark:text-slate-300">Referred Student</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 dark:text-slate-300">Date Joined</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 dark:text-slate-300">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-slate-700 dark:text-slate-300">Commission Earned</th>
                </tr>
              </thead>
              <tbody>
                {referralHistory.map((referral) => (
                  <tr key={referral.id} className="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-emerald-400 flex items-center justify-center text-white font-bold">
                          {referral.name.charAt(0)}
                        </div>
                        <div>
                          <span className="font-medium block">{referral.name}</span>
                          <span className="text-xs text-slate-500">Student ID: STD-{100000 + referral.id}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-medium">{referral.date}</div>
                      <div className="text-xs text-slate-500">30 days ago</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className={`px-3 py-1.5 rounded-full text-xs font-bold inline-flex items-center gap-1 ${
                        referral.status === 'Admitted' ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' :
                        referral.status === 'Visa Approved' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                        'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                      }`}>
                        {referral.status === 'Admitted' && <FaCheckCircle className="text-xs" />}
                        {referral.status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      {referral.commission > 0 ? (
                        <div className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
                          <MdAttachMoney className="text-lg" />
                          ৳{referral.commission.toLocaleString()}
                          <span className="text-xs font-normal text-slate-500">(Paid)</span>
                        </div>
                      ) : (
                        <span className="text-slate-400 flex items-center gap-1">
                          <FaClock className="text-xs" /> Pending
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-gradient-to-br from-emerald-50 to-blue-50 dark:from-emerald-900/20 dark:to-blue-900/20 rounded-2xl p-6 border border-emerald-100 dark:border-emerald-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-emerald-100 dark:bg-emerald-900/50 rounded-lg">
                <FaMoneyBillWave className="text-xl text-emerald-600 dark:text-emerald-400" />
              </div>
              <h3 className="font-bold text-emerald-700 dark:text-emerald-400">Payout Schedule</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              Commissions are paid within 7 days after your referral's payment clears.
            </p>
            <div className="text-xs text-slate-500">Next payout: March 30, 2024</div>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-2xl p-6 border border-blue-100 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                <FaShareAlt className="text-xl text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="font-bold text-blue-700 dark:text-blue-400">Sharing Tips</h3>
            </div>
            <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-1">
              <li>• Share on Facebook student groups</li>
              <li>• WhatsApp university groups</li>
              <li>• LinkedIn connections</li>
              <li>• College notice boards</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-100 dark:border-purple-800">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-purple-100 dark:bg-purple-900/50 rounded-lg">
                <FaMedal className="text-xl text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="font-bold text-purple-700 dark:text-purple-400">Leaderboard Rewards</h3>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-2">
              Top 3 referrers each month win additional bonuses:
            </p>
            <div className="flex gap-2">
              <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">🥇 $500</span>
              <span className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">🥈 $300</span>
              <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded">🥉 $200</span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-slate-500 dark:text-slate-400 text-sm border-t border-slate-200 dark:border-slate-700 pt-6">
          <p className="mb-2">💡 <strong>Pro Tip:</strong> The more active students you refer, the higher your chances to win monthly rewards!</p>
          <p>Referral commissions are subject to terms and conditions. Fraudulent activity will result in termination of referral privileges.</p>
        </div>
      </div>
    </div>
  );
};

export default ReferralDashboard;


