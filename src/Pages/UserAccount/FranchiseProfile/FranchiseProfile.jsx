import React, { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { 
  FaUser, 
  FaBuilding, 
  FaMapMarkerAlt, 
  FaPhone, 
  FaEnvelope, 
  FaIdCard, 
  FaFileUpload,
  FaUsers,
  FaChartLine,
  FaMoneyBillWave,
  FaFileInvoiceDollar,
  FaPercent,
  FaGift,
  FaCalendarAlt,
  FaCheckCircle,
  FaUpload,
  FaFileAlt,
  FaChartBar,
  FaWallet,
  FaCreditCard,
  FaShieldAlt,
  FaStar,
  FaArrowRight,
  FaDownload,
  FaEye,
  FaEyeSlash,
  FaPlusCircle
} from 'react-icons/fa';
import { Bar, Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
import { toast } from 'react-hot-toast';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const FranchiseProfile = () => {
  const { user, userData } = useAuth();
  const navigate = useNavigate();
  
  // Profile States
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showPaymentDetails, setShowPaymentDetails] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
  
  // Franchise Data
  const [franchiseData, setFranchiseData] = useState({
    franchiseName: '',
    franchiseId: '',
    registrationDate: '',
    district: '',
    area: '',
    commissionRate: 25,
    status: 'Active',
    documents: {
      tradeLicense: null,
      nid: null,
      tinCertificate: null,
      bankStatement: null
    }
  });

  // Student Management
  const [students, setStudents] = useState([]);
  const [newStudent, setNewStudent] = useState({
    name: '',
    email: '',
    phone: '',
    targetUniversity: '',
    targetCountry: '',
    documents: {}
  });

  // Payment System
  const [paymentDetails, setPaymentDetails] = useState({
    studentId: '',
    fileOpeningCharge: 5000,
    vfsFee: 12000,
    visaFee: 8000,
    otherCharges: 0,
    discount: 0,
    paymentMethod: 'bank',
    transactionId: ''
  });

  // Stats
  const [stats, setStats] = useState({
    totalStudents: 0,
    activeApplications: 0,
    completedApplications: 0,
    totalRevenue: 0,
    pendingCommission: 0,
    earnedCommission: 0,
    monthlyTarget: 50000,
    currentMonthEarnings: 0
  });

  // Offers from EduAssists
  const [offers, setOffers] = useState([
    { id: 1, title: "New Year Bonus", description: "Get 5% extra commission on first 10 students", validUntil: "2024-04-30", status: "active" },
    { id: 2, title: "Student Referral Bonus", description: "Earn ৳2000 for each referred student", validUntil: "2024-12-31", status: "active" },
    { id: 3, title: "Quarterly Target Reward", description: "Achieve ৳100,000 quarterly for 3% bonus", validUntil: "2024-06-30", status: "active" },
    { id: 4, title: "Early Payment Discount", description: "5% discount for students paying full amount upfront", validUntil: "2024-05-15", status: "expired" }
  ]);

  // Calculate total amount
  const calculateTotal = () => {
    const { fileOpeningCharge, vfsFee, visaFee, otherCharges, discount } = paymentDetails;
    return fileOpeningCharge + vfsFee + visaFee + otherCharges - discount;
  };

  // Charts Data
  const revenueChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Revenue (৳)',
        data: [45000, 52000, 48000, 61000, 55000, 73000],
        backgroundColor: 'rgba(79, 70, 229, 0.7)',
        borderColor: 'rgba(79, 70, 229, 1)',
        borderWidth: 2,
        borderRadius: 8
      }
    ]
  };

  const studentChartData = {
    labels: ['Processing', 'Admitted', 'Visa Approved', 'Rejected'],
    datasets: [
      {
        data: [12, 8, 15, 3],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(139, 92, 246, 0.7)',
          'rgba(239, 68, 68, 0.7)'
        ],
        borderWidth: 2
      }
    ]
  };

  // Initialize franchise data
  useEffect(() => {
    if (userData) {
      // Generate franchise ID
      const franchiseId = `FR-${Math.floor(10000 + Math.random() * 90000)}`;
      
      setFranchiseData({
        franchiseName: userData.displayName || `${userData.district || 'New'} Franchise`,
        franchiseId,
        registrationDate: new Date().toISOString().split('T')[0],
        district: userData.district || 'Not specified',
        area: userData.area || 'Not specified',
        commissionRate: 25,
        status: 'Active',
        documents: {
          tradeLicense: null,
          nid: null,
          tinCertificate: null,
          bankStatement: null
        }
      });

      // Load demo students
      const demoStudents = [
        { id: 1, name: "Ayesha Rahman", email: "ayesha@example.com", phone: "01712345678", university: "University of Melbourne", country: "Australia", status: "Processing", payment: "৳25,000", date: "2024-03-15" },
        { id: 2, name: "Rahim Khan", email: "rahim@example.com", phone: "01787654321", university: "University of Toronto", country: "Canada", status: "Admitted", payment: "৳37,000", date: "2024-03-10" },
        { id: 3, name: "Fatima Jahan", email: "fatima@example.com", phone: "01811223344", university: "University of Manchester", country: "UK", status: "Visa Approved", payment: "৳45,000", date: "2024-03-05" },
        { id: 4, name: "Tahmid Hasan", email: "tahmid@example.com", phone: "01955667788", university: "Monash University", country: "Australia", status: "Processing", payment: "৳22,000", date: "2024-03-01" },
      ];

      setStudents(demoStudents);
      
      // Calculate stats
      setStats({
        totalStudents: demoStudents.length,
        activeApplications: demoStudents.filter(s => s.status === 'Processing').length,
        completedApplications: demoStudents.filter(s => s.status === 'Visa Approved').length,
        totalRevenue: demoStudents.reduce((sum, s) => sum + parseInt(s.payment.replace(/[^0-9]/g, '')), 0),
        pendingCommission: 12500,
        earnedCommission: 37500,
        monthlyTarget: 50000,
        currentMonthEarnings: 42000
      });
    }
  }, [userData]);

  // Handle document upload
  const handleDocumentUpload = (documentType, file) => {
    setFranchiseData(prev => ({
      ...prev,
      documents: {
        ...prev.documents,
        [documentType]: file
      }
    }));
    toast.success(`${documentType.replace(/([A-Z])/g, ' $1')} uploaded successfully!`);
  };

  // Handle add new student
  const handleAddStudent = () => {
    if (!newStudent.name || !newStudent.email || !newStudent.phone) {
      toast.error('Please fill required fields');
      return;
    }

    const student = {
      id: students.length + 1,
      ...newStudent,
      status: 'Processing',
      payment: '৳0',
      date: new Date().toISOString().split('T')[0]
    };

    setStudents([...students, student]);
    setNewStudent({
      name: '',
      email: '',
      phone: '',
      targetUniversity: '',
      targetCountry: '',
      documents: {}
    });
    
    toast.success('Student added successfully!');
    setActiveTab('students');
  };

  // Handle payment submission
  const handlePaymentSubmit = () => {
    if (!paymentDetails.studentId) {
      toast.error('Please select a student');
      return;
    }

    const total = calculateTotal();
    const commission = (total * franchiseData.commissionRate) / 100;
    
    toast.success(`Payment of ৳${total.toLocaleString()} recorded! Commission: ৳${commission.toLocaleString()}`);
    
    // Update stats
    setStats(prev => ({
      ...prev,
      totalRevenue: prev.totalRevenue + total,
      pendingCommission: prev.pendingCommission + commission,
      currentMonthEarnings: prev.currentMonthEarnings + total
    }));

    // Reset form
    setPaymentDetails({
      studentId: '',
      fileOpeningCharge: 5000,
      vfsFee: 12000,
      visaFee: 8000,
      otherCharges: 0,
      discount: 0,
      paymentMethod: 'bank',
      transactionId: ''
    });
    setShowPaymentDetails(false);
  };

  // Handle file upload for student
  const handleStudentDocumentUpload = (studentId, documentType, file) => {
    setStudents(prev => 
      prev.map(student => 
        student.id === studentId 
          ? { 
              ...student, 
              documents: { 
                ...student.documents, 
                [documentType]: file 
              } 
            } 
          : student
      )
    );
    toast.success(`Document uploaded for ${students.find(s => s.id === studentId)?.name}`);
  };

  // Handle withdraw commission
  const handleWithdrawCommission = () => {
    if (stats.pendingCommission === 0) {
      toast.error('No commission available for withdrawal');
      return;
    }

    setStats(prev => ({
      ...prev,
      earnedCommission: prev.earnedCommission + prev.pendingCommission,
      pendingCommission: 0
    }));
    
    toast.success(`৳${stats.pendingCommission.toLocaleString()} commission withdrawn successfully!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 mt-24 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100">
      <div className="max-w-7xl mx-auto p-4 md:p-8">
        
        {/* Header */}
        <div className="mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-8">
            <div className="flex items-center gap-4">
              <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl">
                <FaBuilding className="text-3xl text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold">{franchiseData.franchiseName}</h1>
                <div className="flex items-center gap-3 mt-2">
                  <span className="flex items-center gap-1 text-sm font-medium text-blue-600 dark:text-blue-400">
                    <FaIdCard /> {franchiseData.franchiseId}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    franchiseData.status === 'Active' 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                  }`}>
                    {franchiseData.status}
                  </span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={() => navigate('/student-profile')}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl hover:shadow-lg transition-shadow font-bold"
            >
              <FaArrowRight className="rotate-180" /> Switch to Student View
            </button>
          </div>

          {/* Tab Navigation */}
          <div className="flex flex-wrap gap-4 mb-8 border-b border-gray-200 dark:border-gray-700 pb-4">
            {['dashboard', 'profile', 'students', 'payments', 'documents', 'offers'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl font-bold transition-all ${
                  activeTab === tab 
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' 
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-6 md:p-8">
          
          {/* DASHBOARD TAB */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Stats Overview */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 p-6 rounded-2xl border border-blue-100 dark:border-blue-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-xl">
                      <FaUsers className="text-2xl text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-bold text-green-600 dark:text-green-400">+12%</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-1">{stats.totalStudents}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Students</p>
                </div>

                <div className="bg-gradient-to-br from-emerald-50 to-emerald-100 dark:from-emerald-900/20 dark:to-emerald-800/20 p-6 rounded-2xl border border-emerald-100 dark:border-emerald-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-emerald-100 dark:bg-emerald-900/50 rounded-xl">
                      <FaMoneyBillWave className="text-2xl text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-sm font-bold text-green-600 dark:text-green-400">৳{stats.currentMonthEarnings.toLocaleString()}</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-1">৳{stats.totalRevenue.toLocaleString()}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-purple-100 dark:from-purple-900/20 dark:to-purple-800/20 p-6 rounded-2xl border border-purple-100 dark:border-purple-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-xl">
                      <FaPercent className="text-2xl text-purple-600 dark:text-purple-400" />
                    </div>
                    <span className="text-sm font-bold text-green-600 dark:text-green-400">{franchiseData.commissionRate}%</span>
                  </div>
                  <h3 className="text-3xl font-bold mb-1">৳{stats.earnedCommission.toLocaleString()}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Earned Commission</p>
                </div>

                <div className="bg-gradient-to-br from-amber-50 to-amber-100 dark:from-amber-900/20 dark:to-amber-800/20 p-6 rounded-2xl border border-amber-100 dark:border-amber-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-3 bg-amber-100 dark:bg-amber-900/50 rounded-xl">
                      <FaWallet className="text-2xl text-amber-600 dark:text-amber-400" />
                    </div>
                    <button 
                      onClick={handleWithdrawCommission}
                      className="text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Withdraw
                    </button>
                  </div>
                  <h3 className="text-3xl font-bold mb-1">৳{stats.pendingCommission.toLocaleString()}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Pending Commission</p>
                </div>
              </div>

              {/* Charts Row */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <FaChartLine className="text-blue-500" /> Monthly Revenue
                  </h3>
                  <div className="h-64">
                    <Bar 
                      data={revenueChartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: { display: false },
                          tooltip: {
                            callbacks: {
                              label: (context) => `৳${context.raw.toLocaleString()}`
                            }
                          }
                        }
                      }}
                    />
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <FaChartBar className="text-purple-500" /> Student Status Distribution
                  </h3>
                  <div className="h-64">
                    <Pie 
                      data={studentChartData}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: { position: 'bottom' }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Recent Students */}
              <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <FaUsers className="text-emerald-500" /> Recent Students
                  </h3>
                  <button 
                    onClick={() => setActiveTab('students')}
                    className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    View All
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-semibold">Student</th>
                        <th className="text-left py-3 px-4 font-semibold">Target University</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 font-semibold">Payment</th>
                        <th className="text-left py-3 px-4 font-semibold">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.slice(0, 4).map((student) => (
                        <tr key={student.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/50">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold">
                                {student.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium">{student.name}</div>
                                <div className="text-sm text-gray-500">{student.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-medium">{student.university}</div>
                            <div className="text-sm text-gray-500">{student.country}</div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              student.status === 'Visa Approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                              student.status === 'Admitted' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                              'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                            }`}>
                              {student.status}
                            </span>
                          </td>
                          <td className="py-4 px-4 font-bold">{student.payment}</td>
                          <td className="py-4 px-4 text-gray-500">{student.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Franchise Information */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <FaUser className="text-blue-500" /> Franchise Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Franchise Name</label>
                      <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                        {franchiseData.franchiseName}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">District</label>
                        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center gap-2">
                          <FaMapMarkerAlt className="text-blue-500" /> {franchiseData.district}
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Area</label>
                        <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700">
                          {franchiseData.area}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Commission Rate</label>
                      <div className="p-3 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex items-center justify-between">
                          <span className="text-2xl font-bold text-green-600 dark:text-green-400">{franchiseData.commissionRate}%</span>
                          <FaStar className="text-yellow-500" />
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Highest tier commission rate</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Information */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <FaPhone className="text-purple-500" /> Contact Information
                  </h3>
                  
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Email Address</label>
                      <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center gap-2">
                        <FaEnvelope className="text-purple-500" /> {user?.email}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Phone Number</label>
                      <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center gap-2">
                        <FaPhone className="text-green-500" /> {userData?.phone || 'Not provided'}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Franchise ID</label>
                      <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center gap-2">
                        <FaIdCard className="text-amber-500" /> {franchiseData.franchiseId}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">Registration Date</label>
                      <div className="p-3 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center gap-2">
                        <FaCalendarAlt className="text-blue-500" /> {franchiseData.registrationDate}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STUDENTS TAB */}
          {activeTab === 'students' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Add New Student Form */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 p-6 rounded-2xl border border-blue-200 dark:border-blue-800">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <FaPlusCircle className="text-green-500" /> Add New Student
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="Student Name *"
                    value={newStudent.name}
                    onChange={(e) => setNewStudent({...newStudent, name: e.target.value})}
                    className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    value={newStudent.email}
                    onChange={(e) => setNewStudent({...newStudent, email: e.target.value})}
                    className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number *"
                    value={newStudent.phone}
                    onChange={(e) => setNewStudent({...newStudent, phone: e.target.value})}
                    className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Target University"
                    value={newStudent.targetUniversity}
                    onChange={(e) => setNewStudent({...newStudent, targetUniversity: e.target.value})}
                    className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Target Country"
                    value={newStudent.targetCountry}
                    onChange={(e) => setNewStudent({...newStudent, targetCountry: e.target.value})}
                    className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                  <button
                    onClick={handleAddStudent}
                    className="p-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg font-bold hover:shadow-lg transition-shadow"
                  >
                    Add Student
                  </button>
                </div>
              </div>

              {/* Students Table */}
              <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <FaUsers className="text-blue-500" /> Manage Students ({students.length})
                  </h3>
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <FaDownload /> Export
                  </button>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-semibold">Student</th>
                        <th className="text-left py-3 px-4 font-semibold">Contact</th>
                        <th className="text-left py-3 px-4 font-semibold">Target</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                        <th className="text-left py-3 px-4 font-semibold">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student) => (
                        <tr key={student.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/50">
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold">
                                {student.name.charAt(0)}
                              </div>
                              <div>
                                <div className="font-medium">{student.name}</div>
                                <div className="text-sm text-gray-500">ID: STD-{1000 + student.id}</div>
                              </div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="space-y-1">
                              <div className="text-sm">{student.email}</div>
                              <div className="text-sm text-gray-500">{student.phone}</div>
                            </div>
                          </td>
                          <td className="py-4 px-4">
                            <div className="font-medium">{student.university}</div>
                            <div className="text-sm text-gray-500">{student.country}</div>
                          </td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              student.status === 'Visa Approved' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                              student.status === 'Admitted' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400' :
                              'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                            }`}>
                              {student.status}
                            </span>
                          </td>
                          <td className="py-4 px-4">
                            <div className="flex gap-2">
                              <button 
                                onClick={() => handleStudentDocumentUpload(student.id, 'passport', null)}
                                className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/50"
                              >
                                <FaUpload />
                              </button>
                              <button 
                                onClick={() => {
                                  setPaymentDetails({...paymentDetails, studentId: student.id});
                                  setShowPaymentDetails(true);
                                }}
                                className="p-2 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-lg hover:bg-green-200 dark:hover:bg-green-800/50"
                              >
                                <FaMoneyBillWave />
                              </button>
                              <button className="p-2 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-200 dark:hover:bg-purple-800/50">
                                <FaEye />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* PAYMENTS TAB */}
          {activeTab === 'payments' && (
            <div className="space-y-8 animate-fadeIn">
              {/* Payment Calculator */}
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-3xl text-white">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-2xl font-bold">Payment Calculator</h3>
                  <button 
                    onClick={() => setShowPaymentDetails(!showPaymentDetails)}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                  >
                    {showPaymentDetails ? 'Hide Details' : 'Show Details'}
                  </button>
                </div>
                
                {showPaymentDetails && (
                  <div className="mb-8 bg-white/10 p-6 rounded-2xl backdrop-blur-sm">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-medium mb-2">Select Student</label>
                        <select
                          value={paymentDetails.studentId}
                          onChange={(e) => setPaymentDetails({...paymentDetails, studentId: e.target.value})}
                          className="w-full p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                        >
                          <option value="">Choose student...</option>
                          {students.map(student => (
                            <option key={student.id} value={student.id}>
                              {student.name} (STD-{1000 + student.id})
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">File Opening Charge</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2">৳</span>
                          <input
                            type="number"
                            value={paymentDetails.fileOpeningCharge}
                            onChange={(e) => setPaymentDetails({...paymentDetails, fileOpeningCharge: parseInt(e.target.value) || 0})}
                            className="w-full pl-8 p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">VFS Service Fee</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2">৳</span>
                          <input
                            type="number"
                            value={paymentDetails.vfsFee}
                            onChange={(e) => setPaymentDetails({...paymentDetails, vfsFee: parseInt(e.target.value) || 0})}
                            className="w-full pl-8 p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">After Visa Fee</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2">৳</span>
                          <input
                            type="number"
                            value={paymentDetails.visaFee}
                            onChange={(e) => setPaymentDetails({...paymentDetails, visaFee: parseInt(e.target.value) || 0})}
                            className="w-full pl-8 p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Other Charges</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2">৳</span>
                          <input
                            type="number"
                            value={paymentDetails.otherCharges}
                            onChange={(e) => setPaymentDetails({...paymentDetails, otherCharges: parseInt(e.target.value) || 0})}
                            className="w-full pl-8 p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium mb-2">Discount</label>
                        <div className="relative">
                          <span className="absolute left-3 top-1/2 -translate-y-1/2">৳</span>
                          <input
                            type="number"
                            value={paymentDetails.discount}
                            onChange={(e) => setPaymentDetails({...paymentDetails, discount: parseInt(e.target.value) || 0})}
                            className="w-full pl-8 p-3 rounded-lg bg-white/10 border border-white/20 text-white"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="text-center">
                  <div className="text-5xl font-black mb-6">
                    ৳{calculateTotal().toLocaleString()}
                  </div>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={handlePaymentSubmit}
                      className="px-8 py-4 bg-white text-blue-600 rounded-xl font-bold text-lg hover:bg-gray-100 transition-colors"
                    >
                      <FaCreditCard className="inline mr-2" /> Record Payment
                    </button>
                    <button className="px-8 py-4 bg-white/20 hover:bg-white/30 rounded-xl font-bold text-lg transition-colors">
                      <FaFileInvoiceDollar className="inline mr-2" /> Generate Invoice
                    </button>
                  </div>
                </div>
              </div>

              {/* Payment History */}
              <div className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-2xl border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <FaCalendarAlt className="text-purple-500" /> Payment History
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-semibold">Transaction ID</th>
                        <th className="text-left py-3 px-4 font-semibold">Student</th>
                        <th className="text-left py-3 px-4 font-semibold">Amount</th>
                        <th className="text-left py-3 px-4 font-semibold">Commission</th>
                        <th className="text-left py-3 px-4 font-semibold">Date</th>
                        <th className="text-left py-3 px-4 font-semibold">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { id: 'TXN-2024-001', student: 'Ayesha Rahman', amount: 25000, commission: 6250, date: '2024-03-15', status: 'Completed' },
                        { id: 'TXN-2024-002', student: 'Rahim Khan', amount: 37000, commission: 9250, date: '2024-03-10', status: 'Completed' },
                        { id: 'TXN-2024-003', student: 'Fatima Jahan', amount: 45000, commission: 11250, date: '2024-03-05', status: 'Completed' },
                        { id: 'TXN-2024-004', student: 'Tahmid Hasan', amount: 22000, commission: 5500, date: '2024-03-01', status: 'Pending' },
                      ].map((payment) => (
                        <tr key={payment.id} className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-100 dark:hover:bg-gray-800/50">
                          <td className="py-4 px-4 font-mono">{payment.id}</td>
                          <td className="py-4 px-4">{payment.student}</td>
                          <td className="py-4 px-4 font-bold">৳{payment.amount.toLocaleString()}</td>
                          <td className="py-4 px-4">
                            <span className="text-green-600 dark:text-green-400 font-bold">
                              ৳{payment.commission.toLocaleString()}
                            </span>
                          </td>
                          <td className="py-4 px-4">{payment.date}</td>
                          <td className="py-4 px-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                              payment.status === 'Completed' 
                              ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                              : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400'
                            }`}>
                              {payment.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* DOCUMENTS TAB */}
          {activeTab === 'documents' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Franchise Documents */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <FaFileAlt className="text-blue-500" /> Franchise Documents
                  </h3>
                  
                  {[
                    { name: 'Trade License', type: 'tradeLicense', icon: FaBuilding },
                    { name: 'NID Copy', type: 'nid', icon: FaIdCard },
                    { name: 'TIN Certificate', type: 'tinCertificate', icon: FaFileInvoiceDollar },
                    { name: 'Bank Statement', type: 'bankStatement', icon: FaWallet }
                  ].map((doc) => (
                    <div key={doc.type} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                            <doc.icon className="text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <div className="font-medium">{doc.name}</div>
                            <div className="text-sm text-gray-500">
                              {franchiseData.documents[doc.type] ? 'Uploaded' : 'Not uploaded'}
                            </div>
                          </div>
                        </div>
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => handleDocumentUpload(doc.type, e.target.files[0])}
                          />
                          <div className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                            {franchiseData.documents[doc.type] ? 'Replace' : 'Upload'}
                          </div>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Student Documents Section */}
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold flex items-center gap-2">
                    <FaFileUpload className="text-purple-500" /> Student Document Templates
                  </h3>
                  
                  {[
                    { name: 'Passport Copy', description: 'First 4 pages with photo', icon: FaIdCard },
                    { name: 'Academic Transcripts', description: 'All previous transcripts', icon: FaFileAlt },
                    { name: 'IELTS/TOEFL Score', description: 'English test results', icon: FaChartLine },
                    { name: 'Statement of Purpose', description: 'Motivation letter', icon: FaFileAlt },
                    { name: 'Recommendation Letters', description: '2-3 reference letters', icon: FaUser },
                    { name: 'Financial Documents', description: 'Bank statements & sponsor letter', icon: FaMoneyBillWave }
                  ].map((template, index) => (
                    <div key={index} className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                          <template.icon className="text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{template.name}</div>
                          <div className="text-sm text-gray-500">{template.description}</div>
                        </div>
                        <button className="p-2 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-800/50">
                          <FaDownload />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* OFFERS TAB */}
          {activeTab === 'offers' && (
            <div className="space-y-8 animate-fadeIn">
              <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 p-8 rounded-3xl border border-amber-200 dark:border-amber-800">
                <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                  <FaGift className="text-amber-600 dark:text-amber-400" /> Special Offers & Bonuses
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Exclusive offers from EduAssists to boost your earnings and grow your franchise
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {offers.map((offer) => (
                    <div 
                      key={offer.id} 
                      className={`p-6 rounded-2xl border ${
                        offer.status === 'active'
                        ? 'bg-white dark:bg-gray-800 border-green-200 dark:border-green-800'
                        : 'bg-gray-50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-700 opacity-75'
                      }`}
                    >
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="text-xl font-bold">{offer.title}</h4>
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                          offer.status === 'active'
                          ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                          : 'bg-gray-100 text-gray-700 dark:bg-gray-900/30 dark:text-gray-400'
                        }`}>
                          {offer.status === 'active' ? 'Active' : 'Expired'}
                        </span>
                      </div>
                      
                      <p className="text-gray-600 dark:text-gray-400 mb-4">{offer.description}</p>
                      
                      <div className="flex justify-between items-center">
                        <div className="text-sm text-gray-500">
                          Valid until: {offer.validUntil}
                        </div>
                        <button className={`px-4 py-2 rounded-lg font-medium ${
                          offer.status === 'active'
                          ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white hover:shadow-lg'
                          : 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                        }`}>
                          {offer.status === 'active' ? 'Apply Now' : 'Expired'}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Commission Structure */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-8 rounded-3xl border border-blue-200 dark:border-blue-800">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <FaPercent className="text-blue-600 dark:text-blue-400" /> Commission Structure
                </h3>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-blue-200 dark:border-blue-800">
                        <th className="text-left py-3 px-4 font-semibold">Tier</th>
                        <th className="text-left py-3 px-4 font-semibold">Monthly Revenue</th>
                        <th className="text-left py-3 px-4 font-semibold">Commission Rate</th>
                        <th className="text-left py-3 px-4 font-semibold">Bonus</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { tier: 'Bronze', revenue: 'Up to ৳50,000', rate: '20%', bonus: '৳0' },
                        { tier: 'Silver', revenue: '৳50,001 - ৳100,000', rate: '22%', bonus: '৳2,000' },
                        { tier: 'Gold', revenue: '৳100,001 - ৳200,000', rate: '25%', bonus: '৳5,000' },
                        { tier: 'Platinum', revenue: 'Above ৳200,000', rate: '28%', bonus: '৳10,000' }
                      ].map((tier, index) => (
                        <tr 
                          key={index} 
                          className={`border-b border-blue-100 dark:border-blue-900/50 ${
                            franchiseData.commissionRate === parseInt(tier.rate) 
                            ? 'bg-blue-50 dark:bg-blue-900/30' 
                            : ''
                          }`}
                        >
                          <td className="py-4 px-4">
                            <div className="flex items-center gap-2">
                              {tier.tier === 'Bronze' && <FaStar className="text-amber-700" />}
                              {tier.tier === 'Silver' && <FaStar className="text-gray-400" />}
                              {tier.tier === 'Gold' && <FaStar className="text-yellow-500" />}
                              {tier.tier === 'Platinum' && <FaStar className="text-purple-500" />}
                              <span className="font-bold">{tier.tier}</span>
                            </div>
                          </td>
                          <td className="py-4 px-4">{tier.revenue}</td>
                          <td className="py-4 px-4">
                            <span className="font-bold text-green-600 dark:text-green-400">{tier.rate}</span>
                          </td>
                          <td className="py-4 px-4">
                            <span className="font-bold text-amber-600 dark:text-amber-400">{tier.bonus}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-xl border border-green-200 dark:border-green-800">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-bold">Your Current Tier: Gold</div>
                      <div className="text-sm text-gray-500">Next milestone: ৳{stats.monthlyTarget - stats.currentMonthEarnings} to reach Platinum</div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600 dark:text-green-400">{franchiseData.commissionRate}%</div>
                      <div className="text-sm text-gray-500">Current commission rate</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FranchiseProfile;