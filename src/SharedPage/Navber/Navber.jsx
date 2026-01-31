

import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import SupRideLogo from "../SupRideLogo/SupRideLogo";
import useAuth from "../../hooks/useAuth";
import { 
    FaSignOutAlt, FaUser, FaCog, FaHome, 
    FaChevronDown, FaMoon, FaSun 
} from "react-icons/fa";

const Navbar = () => {
    const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
    const [scrolled, setScrolled] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    
    // Ensure loading is pulled from useAuth to prevent premature role calculation
    const { user, userData, logOut, loading } = useAuth(); 
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
        document.body.style.backgroundColor = theme === 'dark' ? '#0e3592' : '#FFFFFF';
    }, [theme]);

    const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

    const handleLogout = async () => {
        try {
            await logOut();
            setShowUserMenu(false);
            navigate("/login");
        } catch (error) { console.error("Logout error:", error); }
    };

    // --- ENHANCED ROLE LOGIC ---
    // If the auth hook is still fetching data, we should treat the role as "pending"
    const userRole = userData?.role; 

    const getProfilePath = () => {
        if (!userRole) return "/"; // Fallback if data hasn't arrived
        if (userRole === 'franchise') return "/franchise-profile";
        if (userRole === 'student') return "/student-profile";
        return "/";
    };

    const getDashboardPath = () => {
        if (userRole === 'franchise') return "/franchise-profile";
        return "/dashboard";
    };

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Gallery", path: "/gallery" },
        { name: "Services", path: "/service" },
        { name: "Edu Blog", path: "/edublog" },
        { name: "Scholarship", path: "/scholarship" },
        { name: "Contact", path: "/contract" },
    ];

    return (
        <div className={`navbar sticky top-0 z-50 transition-all duration-300 ${
            scrolled ? 'bg-base-100/95 backdrop-blur-sm shadow-lg' : 'bg-base-100 shadow-sm'
        }`}>
            <div className="navbar-start">
                <div className="dropdown lg:hidden">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 border">
                        {navLinks.map((link) => (
                            <li key={link.path}><Link to={link.path}>{link.name}</Link></li>
                        ))}
                    </ul>
                </div>
                <Link to="/" className="hover:opacity-80 transition-opacity">
                    <SupRideLogo />
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="flex items-center gap-6">
                    {navLinks.map((link) => (
                        <li key={link.path}>
                            <NavLink 
                                to={link.path}
                                className={({ isActive }) => `text-sm font-bold transition-colors ${
                                    isActive ? "text-blue-600 dark:text-blue-800" : "text-black dark:text-slate-300 hover:text-blue-500"
                                }`}
                            >
                                {link.name}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="navbar-end gap-2 md:gap-4">
                {/* Check if we are loading OR if the user exists */}
                {loading ? (
                    <span className="loading loading-spinner loading-sm text-blue-600"></span>
                ) : user ? (
                    <div className="relative user-menu flex items-center gap-3">
                        <div 
                            onClick={() => setShowUserMenu(!showUserMenu)}
                            className="flex items-center gap-2 cursor-pointer p-1 pr-3 bg-slate-100 dark:bg-white/10 rounded-full hover:bg-slate-200 dark:hover:bg-white/20 transition-all border border-transparent hover:border-blue-300"
                        >
                            <img 
                                src={userData?.photoURL || user?.photoURL || `https://ui-avatars.com/api/?name=${user?.displayName}&background=4f46e5&color=fff`} 
                                alt="avatar" 
                                className="w-8 h-8 rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-sm"
                            />
                            <div className="hidden sm:block text-left">
                                {/* Use optional chaining and default text while role is loading */}
                                <p className="text-[10px] font-black uppercase text-blue-600 dark:text-blue-400 leading-none">
                                    {userRole || 'User'}
                                </p>
                                <FaChevronDown className={`text-[8px] mt-1 transition-transform ${showUserMenu ? 'rotate-180' : ''}`} />
                            </div>
                        </div>

                        {showUserMenu && (
                            <div className="absolute right-0 top-12 w-60 bg-white dark:bg-[#6380af] rounded-2xl shadow-2xl border border-slate-100 dark:border-slate-800 py-2 animate-in fade-in slide-in-from-top-2 duration-200 overflow-hidden">
                                <div className="px-4 py-3 border-b border-slate-50 dark:border-slate-800 mb-1">
                                    <p className="text-sm font-bold truncate">{user?.displayName}</p>
                                    <p className="text-[10px] text-slate-400 truncate">{user?.email}</p>
                                </div>
                                <div className="p-1">
                                    {/* These paths will now correctly update once userData arrives */}
                                    <Link to={getDashboardPath()} className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors">
                                        <FaHome className="text-blue-500"/> Dashboard
                                    </Link>
                                    <Link to={getProfilePath()} className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors">
                                        <FaUser className="text-blue-500"/> My Profile
                                    </Link>
                                    <Link to="/settings" className="flex items-center gap-3 px-4 py-2.5 text-sm font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-xl transition-colors">
                                        <FaCog className="text-blue-500"/> Settings
                                    </Link>
                                </div>
                                <div className="p-1 mt-1 border-t border-slate-50 dark:border-slate-800">
                                    <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2.5 text-sm font-bold text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-900/20 w-full text-left rounded-xl transition-colors">
                                        <FaSignOutAlt /> Logout
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-sm px-5 bg-blue-600 hover:bg-blue-700 text-white border-none rounded-full shadow-lg shadow-blue-500/20">
                        Login
                    </Link>
                )}

                <div className="border-l border-slate-200 dark:border-slate-700 pl-2 ml-1">
                    <button 
                        onClick={toggleTheme} 
                        className="btn btn-ghost btn-circle btn-sm text-slate-500 dark:text-yellow-400 hover:bg-slate-100 dark:hover:bg-white/10"
                        aria-label="Toggle Theme"
                    >
                        {theme === "light" ? <FaMoon size={16} /> : <FaSun size={18} />}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Navbar;