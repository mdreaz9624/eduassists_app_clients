
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
    FaPalette
} from "react-icons/fa";

const Navbar = () => {
    const [theme, setTheme] = useState(
        localStorage.getItem("theme") || "light"
    );

    const [scrolled, setScrolled] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);

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

    return (
        <div
            className={`navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                scrolled || !isHomePage
                    ? "bg-base-100/95 backdrop-blur-md shadow-lg"
                    : "bg-transparent"
            }`}
        >
            {/* Left */}
            <div className="navbar-start">

                {/* Mobile Menu */}
                <div className="dropdown lg:hidden">

                    <label
                        tabIndex={0}
                        className={`btn btn-sm btn-circle shadow-md border border-base-300 bg-base-100/30 backdrop-blur-md hover:bg-primary hover:text-white transition-all duration-300 ${
                            !scrolled &&
                            isHomePage
                                ? "text-white border-white/30"
                                : ""
                        }`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </label>

                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow-xl bg-base-100 rounded-xl w-56 border"
                    >
                        {navLinks.map(
                            (link) => (
                                <li
                                    key={
                                        link.path
                                    }
                                >
                                    <Link
                                        to={
                                            link.path
                                        }
                                        className="font-extrabold text-[15px] hover:bg-primary hover:text-white rounded-lg transition-all duration-300"
                                    >
                                        {
                                            link.name
                                        }
                                    </Link>
                                </li>
                            )
                        )}
                    </ul>
                </div>

                <Link
                    to="/"
                    className="hover:opacity-80 transition"
                >
                    <SupRideLogo />
                </Link>
            </div>

            {/* Center */}
            <div className="navbar-center hidden lg:flex">

                <ul className="flex items-center gap-8">

                    {navLinks.map(
                        (link) => (
                            <li
                                key={
                                    link.path
                                }
                            >
                                <NavLink
                                    to={
                                        link.path
                                    }
                                    className={({
                                        isActive
                                    }) => {
                                        let baseClass =
                                            "text-[15px] font-extrabold tracking-wide transition-all duration-300";

                                        if (
                                            isActive
                                        ) {
                                            return `${baseClass} text-primary`;
                                        }

                                        if (
                                            !scrolled &&
                                            isHomePage
                                        ) {
                                            return `${baseClass} text-white hover:text-blue-300`;
                                        }

                                        return `${baseClass} text-base-content/70 hover:text-primary`;
                                    }}
                                >
                                    {
                                        link.name
                                    }
                                </NavLink>
                            </li>
                        )
                    )}
                </ul>

            </div>

            {/* Right */}
            <div className="navbar-end gap-3">

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
                            className={`flex items-center gap-3 cursor-pointer px-2 py-1.5 rounded-full transition-all duration-300 border shadow-md hover:shadow-lg ${
                                !scrolled &&
                                isHomePage
                                    ? "bg-white/10 border-white/20 hover:bg-white/20"
                                    : "bg-base-200"
                            }`}
                        >
                            <img
                                src={
                                    userData?.photoURL ||
                                    user?.photoURL
                                }
                                alt=""
                                className="w-9 h-9 rounded-full object-cover border-2"
                            />

                            <div className="hidden sm:block">

                                <p
                                    className={`text-[11px] font-extrabold uppercase tracking-widest ${
                                        !scrolled &&
                                        isHomePage
                                            ? "text-blue-300"
                                            : "text-primary"
                                    }`}
                                >
                                    {userRole ||
                                        "User"}
                                </p>

                                <FaChevronDown
                                    className={`text-xs mt-1 transition-transform ${
                                        showUserMenu
                                            ? "rotate-180"
                                            : ""
                                    }`}
                                />
                            </div>

                        </div>

                        {showUserMenu && (
                            <div className="absolute right-0 top-14 w-64 bg-base-100 rounded-2xl shadow-2xl border py-2">

                                <div className="px-4 py-3 border-b">

                                    <p className="font-extrabold">
                                        {
                                            user?.displayName
                                        }
                                    </p>

                                    <p className="text-xs opacity-60">
                                        {
                                            user?.email
                                        }
                                    </p>

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
                        className="btn btn-sm rounded-full font-extrabold px-6 bg-primary hover:scale-105 text-white border-none"
                    >
                        Login
                    </Link>
                )}

                {/* Theme */}

                <div className="dropdown dropdown-end">

                    <label
                        tabIndex={0}
                        className={`btn btn-circle btn-sm shadow-md border hover:bg-primary hover:text-white transition-all duration-300 ${
                            !scrolled &&
                            isHomePage
                                ? "text-white bg-white/10 border-white/30"
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
                                    </button>
                                </li>
                            )
                        )}

                    </ul>

                </div>

            </div>
        </div>
    );
};

export default Navbar;