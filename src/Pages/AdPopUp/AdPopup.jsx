


import { useState, useEffect } from "react";
import {
    FaTimes,
    FaChevronLeft,
    FaChevronRight,
    FaClock,
    FaGift,
    FaWindowRestore,
    FaPlay,
    FaYoutube
} from "react-icons/fa";

const AdPopup = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);
    const [countdown, setCountdown] = useState(5);
    const [isHovered, setIsHovered] = useState(false);
    const [showCountdown, setShowCountdown] = useState(true);
    const [ads, setAds] = useState([]);
    const [loading, setLoading] = useState(true);
    const [settings, setSettings] = useState({});
    const [showVideo, setShowVideo] = useState(false);
    const [currentVideo, setCurrentVideo] = useState(null);

    // Fetch ads data from JSON
    useEffect(() => {
        const fetchAds = async () => {
            try {
                const response = await fetch('/adsData.json');
                const data = await response.json();
                setAds(data.ads);
                setSettings(data.settings);
                setCountdown(data.settings?.autoCloseDelay || 5);
            } catch (error) {
                console.error("Error loading ads:", error);
                setAds([
                    {
                        id: 1,
                        image: "https://i.ibb.co.com/zWNSRFbf/compus.jpg",
                        title: "🎓 Study in UK",
                        description: "Top universities with scholarship opportunities",
                        discount: "Up to 50% Scholarship",
                        cta: "Apply Now",
                        link: "/scholarship",
                        color: "from-blue-500 to-purple-600",
                        badge: "Limited Offer"
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchAds();
    }, []);

    // Show popup after delay
    useEffect(() => {
        if (loading || ads.length === 0) return;

        const timer = setTimeout(() => {
            const hasSeenPopup = sessionStorage.getItem("hasSeenAdPopup");
            const hasMinimizedPopup = sessionStorage.getItem("hasMinimizedPopup");

            if (!hasSeenPopup && !settings.showOnEveryVisit) {
                setIsOpen(true);
                setShowCountdown(true);
            } else if (hasMinimizedPopup === "true") {
                setIsMinimized(true);
                setIsOpen(false);
            }
        }, settings.popupDelay || 1000);

        return () => clearTimeout(timer);
    }, [loading, ads, settings]);

    // Auto-rotate slides
    useEffect(() => {
        if (!isOpen || isHovered || ads.length === 0 || showVideo) return;

        const interval = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % ads.length);
        }, ads[currentSlide]?.duration || 5000);

        return () => clearInterval(interval);
    }, [isOpen, isHovered, currentSlide, ads, showVideo]);

    // Countdown timer
    useEffect(() => {
        if (!showCountdown || !isOpen || showVideo) return;

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setShowCountdown(false);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [showCountdown, isOpen, showVideo]);

    const handleClose = () => {
        setIsOpen(false);
        setShowVideo(false);
        sessionStorage.setItem("hasSeenAdPopup", "true");
        sessionStorage.removeItem("hasMinimizedPopup");
    };

    const handleMinimize = () => {
        setIsOpen(false);
        setIsMinimized(true);
        setShowVideo(false);
        sessionStorage.setItem("hasMinimizedPopup", "true");
    };

    const handleRestore = () => {
        setIsMinimized(false);
        setIsOpen(true);
        sessionStorage.removeItem("hasMinimizedPopup");
    };

    const nextSlide = () => {
        if (!showVideo) {
            setCurrentSlide((prev) => (prev + 1) % ads.length);
        }
    };

    const prevSlide = () => {
        if (!showVideo) {
            setCurrentSlide((prev) => (prev - 1 + ads.length) % ads.length);
        }
    };

    const goToSlide = (index) => {
        if (!showVideo) {
            setCurrentSlide(index);
        }
    };

    const handleWatchStory = (ad) => {
        if (ad.videoUrl) {
            setCurrentVideo(ad);
            setShowVideo(true);
        }
    };

    const handleCloseVideo = () => {
        setShowVideo(false);
        setCurrentVideo(null);
    };

    // Extract YouTube Video ID
    const getYouTubeEmbedUrl = (url) => {
        if (!url) return null;
        // Handle different YouTube URL formats
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
        const match = url.match(regExp);
        if (match && match[2].length === 11) {
            return `https://www.youtube.com/embed/${match[2]}?autoplay=1&rel=0`;
        }
        return url; // Return as is if not a standard YouTube URL
    };

    if (loading) {
        return (
            <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50">
                <div className="loading loading-spinner loading-lg text-primary"></div>
            </div>
        );
    }

    // Minimized Icon View
    if (isMinimized) {
        return (
            <div className="fixed bottom-4 right-4 z-[9999] animate-bounce">
                <button
                    onClick={handleRestore}
                    className="relative group"
                >
                    <div className="absolute -top-2 -right-2 animate-pulse">
                        <span className="flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                    </div>
                    <div className="bg-gradient-to-r from-primary to-secondary rounded-full p-3 shadow-lg hover:scale-110 transition-transform duration-300">
                        <FaGift className="text-white text-2xl" />
                    </div>
                    <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                        Open Offers
                    </span>
                </button>
            </div>
        );
    }

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fadeIn">
            <div
                className="relative w-[90%] max-w-5xl mx-4 animate-slideUp"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                {/* Close Button - Top Right */}
                <div className="absolute -top-12 right-0 md:-right-24 md:top-0 z-20 flex gap-4">
                    {/* Minimize Button */}
                    <button
                        onClick={handleMinimize}
                        className="btn btn-sm btn-ghost text-white hover:bg-white/20 transition-all duration-300"
                        aria-label="Minimize"
                    >
                        <FaWindowRestore className="text-xl" />
                        <span className="hidden md:inline ml-1">Minimize</span>
                    </button>

                    {/* Close Button */}
                    <button
                        onClick={handleClose}
                        className="btn btn-circle btn-ghost text-white hover:bg-white/20 transition-all duration-300 hover:rotate-90"
                        aria-label="Close"
                    >
                        <FaTimes className="text-2xl" />
                    </button>
                </div>

                {/* Countdown Timer */}
                {showCountdown && !showVideo && (
                    <div className="absolute top-4 right-4 z-20 bg-black/50 backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-2 text-white text-sm">
                        <FaClock className="animate-pulse" />
                        <span>Auto-closes in {countdown}s</span>
                    </div>
                )}

                {/* Main Card */}
                <div className="card bg-base-100 shadow-2xl overflow-hidden">
                    <div className="relative">
                        {showVideo && currentVideo ? (
                            // Video Player View
                            <div className="relative">
                                <div className="relative h-64 md:h-[500px] bg-black">
                                    <iframe
                                        src={getYouTubeEmbedUrl(currentVideo.videoUrl)}
                                        title={currentVideo.title}
                                        className="w-full h-full"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                    <div className="absolute top-4 left-4 z-10">
                                        <div className={`badge badge-lg gap-2 bg-gradient-to-r ${currentVideo.color || 'from-primary to-secondary'} text-white border-0 shadow-lg`}>
                                            🎬 Now Playing
                                        </div>
                                    </div>
                                    <button
                                        onClick={handleCloseVideo}
                                        className="absolute top-4 right-4 z-10 btn btn-circle btn-ghost text-white bg-black/50 hover:bg-black/70 transition-all"
                                    >
                                        <FaTimes className="text-xl" />
                                    </button>
                                </div>
                                <div className="p-4 md:p-6 bg-white">
                                    <h3 className="text-xl font-bold text-slate-900">{currentVideo.title}</h3>
                                    <p className="text-slate-600 mt-1">{currentVideo.description}</p>
                                    {currentVideo.link && (
                                        <a
                                            href={currentVideo.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 mt-3 text-indigo-600  hover:text-indigo-800 rounded-full transition-colors"
                                        >
                                            Watch Full Story <FaChevronRight size={14} />
                                        </a>
                                    )}
                                </div>
                            </div>
                        ) : (
                            // Carousel View
                            <>
                                {/* Badge */}
                                <div className="absolute top-4 left-4 z-10">
                                    <div className={`badge badge-lg gap-2 bg-gradient-to-r ${ads[currentSlide]?.color || 'from-primary to-secondary'} text-white border-0 shadow-lg animate-pulse`}>
                                        🔥 {ads[currentSlide]?.badge}
                                    </div>
                                </div>

                                {/* Image */}
                                <div className="relative h-64 md:h-96 overflow-hidden">
                                    <img
                                        src={ads[currentSlide]?.image}
                                        alt={ads[currentSlide]?.title}
                                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                                </div>

                                {/* Content */}
                                <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white">
                                    <h2 className="text-2xl md:text-4xl font-bold mb-2">
                                        {ads[currentSlide]?.title}
                                    </h2>
                                    <p className="text-sm md:text-base mb-2 opacity-95">
                                        {ads[currentSlide]?.description}
                                    </p>
                                    {ads[currentSlide]?.discount && (
                                        <div className="badge badge-lg bg-yellow-500 text-black border-0 mb-3 shadow-lg">
                                            💰 {ads[currentSlide]?.discount}
                                        </div>
                                    )}
                                    <div className="flex flex-wrap items-center gap-3 mt-2">
                                        {ads[currentSlide]?.link && (
                                            <a
                                                href={ads[currentSlide]?.link}
                                                className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-sm rounded-lg shadow-lg hover:shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden group"
                                                onClick={handleClose}
                                            >
                                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                                                {ads[currentSlide]?.cta || 'Learn More'}
                                            </a>
                                        )}
                                        {ads[currentSlide]?.videoUrl && (
                                            <button
                                                onClick={() => handleWatchStory(ads[currentSlide])}
                                                className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-red-600 hover:bg-red-700 text-white font-semibold text-sm rounded-lg shadow-lg hover:shadow-red-500/25 transition-all duration-300 hover:scale-105 active:scale-95 relative overflow-hidden group"
                                            >
                                                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></span>
                                                <FaYoutube className="text-lg" />
                                                <span>Watch Story</span>
                                            </button>
                                        )}
                                        <button
                                            onClick={handleMinimize}
                                            className="flex-1 min-w-[120px] inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold text-sm rounded-lg border border-white/30 hover:border-white/50 transition-all duration-300 hover:scale-105 active:scale-95"
                                        >
                                            Remind Me Later
                                        </button>
                                    </div>
                                </div>

                                {/* Navigation Arrows */}
                                {ads.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevSlide}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost text-white bg-black/30 hover:bg-black/50 transition-all duration-300 hover:scale-110"
                                            aria-label="Previous"
                                        >
                                            <FaChevronLeft />
                                        </button>
                                        <button
                                            onClick={nextSlide}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 btn btn-circle btn-ghost text-white bg-black/30 hover:bg-black/50 transition-all duration-300 hover:scale-110"
                                            aria-label="Next"
                                        >
                                            <FaChevronRight />
                                        </button>
                                    </>
                                )}

                                {/* Dots Indicator */}
                                {ads.length > 1 && (
                                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                        {ads.map((_, index) => (
                                            <button
                                                key={index}
                                                onClick={() => goToSlide(index)}
                                                className={`transition-all duration-300 ${index === currentSlide
                                                    ? "w-8 h-2 bg-white rounded-full"
                                                    : "w-2 h-2 bg-white/50 rounded-full hover:bg-white/80"
                                                    }`}
                                                aria-label={`Go to slide ${index + 1}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdPopup;