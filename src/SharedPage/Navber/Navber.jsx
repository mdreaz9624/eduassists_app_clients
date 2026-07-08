

import React, { useState, useEffect } from "react";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import SupRideLogo from "../SupRideLogo/SupRideLogo";
import useAuth from "../../hooks/useAuth";
import {
    FaSignOutAlt,
    FaUser,
    FaCog,
    FaHome,
    FaChevronDown,
    FaPalette,
    FaGraduationCap,
    FaGlobe,
    FaSearch,
    FaBars,
    FaTimes
} from "react-icons/fa";

const Navbar = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    const [scrolled, setScrolled] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const { user, userData, logOut, loading } = useAuth();

    const navigate = useNavigate();
    const location = useLocation();

    const availableThemes = [
        "light",
        "dark",
        "cupcake",
        "emerald",
        "corporate",
        "bumblebee"
    ];

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);

        window.addEventListener("scroll", handleScroll);

        return () =>
            window.removeEventListener(
                "scroll",
                handleScroll
            );
    }, []);

    useEffect(() => {
        document.documentElement.setAttribute(
            "data-theme",
            theme
        );

        localStorage.setItem(
            "theme",
            theme
        );

        if (theme === "dark") {
            document.body.style.backgroundColor =
                "#0e3592";
        } else if (theme === "light") {
            document.body.style.backgroundColor =
                "#FFFFFF";
        } else if (theme === "corporate") {
            document.body.style.backgroundColor =
                "#bedd0b";
        } else {
            document.body.style.backgroundColor =
                "";
        }
    }, [theme]);

    const handleLogout = async () => {
        try {
            await logOut();
            setShowUserMenu(false);
            navigate("/login");
        } catch (error) {
            console.error(
                "Logout error:",
                error
            );
        }
    };

    const userRole = userData?.role;

    const getProfilePath = () => {
        if (!userRole) return "/";

        if (userRole === "franchise")
            return "/franchise-profile";

        if (userRole === "student")
            return "/student-profile";

        return "/";
    };

    const getDashboardPath = () => {
        if (userRole === "franchise")
            return "/franchise-profile";

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

    const isHomePage =
        location.pathname === "/";

    // Close mobile menu on route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]);

    return (
        <div
            className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled || !isHomePage
                    ? "bg-base-100/98 backdrop-blur-md shadow-lg"
                    : "bg-gradient-to-b from-black/40 to-transparent"
            }`}
        >
            <div className="max-w-7xl mx-auto w-full px-4 flex items-center justify-between">
                {/* Left - Logo */}
                <div className="navbar-start">
                    <Link
                        to="/"
                        className="hover:opacity-80 transition flex items-center gap-2"
                    >
                        <SupRideLogo />
                        <span className={`text-sm font-bold tracking-wider hidden sm:block ${
                            !scrolled && isHomePage ? "text-white" : "text-base-content"
                        }`}>
                            {/* EDU ASSISTS */}
                        </span>
                    </Link>
                </div>

                {/* Center - Desktop Navigation */}
                <div className="navbar-center hidden lg:flex">
                    <ul className="flex items-center gap-1">
                        {navLinks.map((link) => (
                            <li key={link.path}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) => {
                                        let baseClass =
                                            "px-4 py-2 text-sm font-semibold tracking-wide transition-all duration-300 rounded-full";

                                        if (isActive) {
                                            return `${baseClass} text-primary bg-primary/10`;
                                        }

                                        if (!scrolled && isHomePage) {
                                            return `${baseClass} text-white/90 hover:text-white hover:bg-white/10`;
                                        }

                                        return `${baseClass} text-base-content/70 hover:text-primary hover:bg-base-200/50`;
                                    }}
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Right - Actions */}
                <div className="navbar-end gap-2">

                    {/* Search Button (Hidden on Mobile) */}
                    <button 
                        className={`btn btn-ghost btn-sm btn-circle hidden md:flex ${
                            !scrolled && isHomePage ? "text-white hover:bg-white/10" : ""
                        }`}
                    >
                        <FaSearch className="text-sm" />
                    </button>

                    {loading ? (
                        <span className="loading loading-spinner loading-sm"></span>
                    ) : user ? (
                        <div className="relative">

                            <div
                                onClick={() =>
                                    setShowUserMenu(
                                        !showUserMenu
                                    )
                                }
                                className={`flex items-center gap-2 cursor-pointer px-3 py-1.5 rounded-full transition-all duration-300 border shadow-md hover:shadow-lg ${
                                    !scrolled &&
                                    isHomePage
                                        ? "bg-white/10 border-white/20 hover:bg-white/20 text-white"
                                        : "bg-base-200 border-base-300"
                                }`}
                            >
                                <img
                                    src={
                                        userData?.photoURL ||
                                        user?.photoURL ||
                                        "https://ui-avatars.com/api/?name=User&background=random"
                                    }
                                    alt=""
                                    className="w-8 h-8 rounded-full object-cover border-2 border-primary/30"
                                />

                                <div className="hidden sm:block">
                                    <p
                                        className={`text-[10px] font-bold uppercase tracking-widest ${
                                            !scrolled &&
                                            isHomePage
                                                ? "text-white/80"
                                                : "text-primary"
                                        }`}
                                    >
                                        {userRole ||
                                            "User"}
                                    </p>
                                    <p className={`text-[10px] font-medium truncate max-w-[80px] ${
                                        !scrolled && isHomePage ? "text-white/60" : "text-base-content/60"
                                    }`}>
                                        {user?.displayName?.split(' ')[0] || user?.email?.split('@')[0] || 'Account'}
                                    </p>
                                </div>

                                <FaChevronDown
                                    className={`text-xs transition-transform ${
                                        showUserMenu
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                />
                            </div>

                            {showUserMenu && (
                                <div className="absolute right-0 top-14 w-64 bg-base-100 rounded-2xl shadow-2xl border py-2 animate-fadeIn">

                                    <div className="px-4 py-3 border-b">

                                        <p className="font-extrabold">
                                            {user?.displayName || 'User'}
                                        </p>

                                        <p className="text-xs opacity-60 truncate">
                                            {user?.email}
                                        </p>
                                        <span className="text-[10px] font-bold text-primary uppercase">
                                            {userRole || 'Student'}
                                        </span>
                                    </div>

                                    <div className="p-1">

                                        <Link
                                            to={getDashboardPath()}
                                            className="flex items-center gap-3 px-4 py-3 text-[14px] font-extrabold hover:bg-primary hover:text-white rounded-xl transition-all duration-300"
                                        >
                                            <FaHome className="text-[16px]" />
                                            Dashboard
                                        </Link>

                                        <Link
                                            to={getProfilePath()}
                                            className="flex items-center gap-3 px-4 py-3 text-[14px] font-extrabold hover:bg-primary hover:text-white rounded-xl transition-all duration-300"
                                        >
                                            <FaUser className="text-[16px]" />
                                            Profile
                                        </Link>

                                        <Link
                                            to="/settings"
                                            className="flex items-center gap-3 px-4 py-3 text-[14px] font-extrabold hover:bg-primary hover:text-white rounded-xl transition-all duration-300"
                                        >
                                            <FaCog className="text-[16px]" />
                                            Settings
                                        </Link>

                                    </div>

                                    <div className="border-t p-1">

                                        <button
                                            onClick={
                                                handleLogout
                                            }
                                            className="flex items-center gap-3 px-4 py-3 text-[14px] font-extrabold text-error hover:bg-error hover:text-white transition-all duration-300 rounded-xl w-full"
                                        >
                                            <FaSignOutAlt />
                                            Logout
                                        </button>

                                    </div>

                                </div>
                            )}
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className={`btn btn-sm rounded-full font-extrabold px-6 border-none shadow-md hover:shadow-lg transition-all duration-300 ${
                                !scrolled && isHomePage
                                    ? "bg-white text-primary hover:bg-white/90"
                                    : "bg-primary text-white hover:bg-primary/90"
                            }`}
                        >
                            Login
                        </Link>
                    )}

                    {/* Theme Toggle */}
                    <div className="dropdown dropdown-end">

                        <label
                            tabIndex={0}
                            className={`btn btn-ghost btn-sm btn-circle transition-all duration-300 ${
                                !scrolled &&
                                isHomePage
                                    ? "text-white hover:bg-white/10"
                                    : ""
                            }`}
                        >
                            <FaPalette className="text-[16px]" />
                        </label>

                        <ul className="dropdown-content z-[1] menu p-2 shadow-xl bg-base-100 rounded-box w-52 mt-4">

                            <div className="px-4 py-2 text-xs font-extrabold opacity-50">
                                SELECT THEME
                            </div>

                            {availableThemes.map(
                                (t) => (
                                    <li key={t}>
                                        <button
                                            onClick={() =>
                                                setTheme(
                                                    t
                                                )
                                            }
                                            className={`flex justify-between items-center capitalize font-extrabold text-[14px]
                                            hover:bg-primary hover:text-white rounded-lg transition-all duration-300
                                            ${
                                                theme ===
                                                t
                                                    ? "bg-primary text-white"
                                                    : ""
                                            }`}
                                        >
                                            {t}
                                            {theme === t && (
                                                <span className="text-xs">✓</span>
                                            )}
                                        </button>
                                    </li>
                                )
                            )}

                        </ul>

                    </div>

                    {/* Mobile Menu Toggle */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className={`lg:hidden btn btn-ghost btn-sm btn-circle transition-all duration-300 ${
                            !scrolled && isHomePage ? "text-white hover:bg-white/10" : ""
                        }`}
                    >
                        {mobileMenuOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                    </button>

                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div className={`lg:hidden absolute top-full left-0 right-0 bg-base-100/98 backdrop-blur-md shadow-lg border-t transition-all duration-300 overflow-hidden ${
                mobileMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}>
                <div className="p-4 space-y-1">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) => {
                                let baseClass =
                                    "block px-4 py-3 text-sm font-semibold rounded-xl transition-all duration-300";

                                if (isActive) {
                                    return `${baseClass} text-primary bg-primary/10`;
                                }

                                return `${baseClass} text-base-content/70 hover:text-primary hover:bg-base-200/50`;
                            }}
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            {link.name}
                        </NavLink>
                    ))}
                    
                    {/* Mobile Search */}
                    <div className="relative mt-2">
                        <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-base-content/40 text-sm" />
                        <input
                            type="text"
                            placeholder="Search..."
                            className="w-full pl-11 pr-4 py-2.5 bg-base-200 rounded-xl text-sm border-0 focus:ring-2 focus:ring-primary/50"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;