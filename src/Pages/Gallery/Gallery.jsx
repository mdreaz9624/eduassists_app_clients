// import React from 'react';
// import AdPopup from '../AdPopUp/AdPopup';

// const Gallery = () => {
//     return (
//         <div className='mt-28'>
//             <h1 className='text-center text-red-800 font-extrabold'>Comming Soon..............</h1>
            
            
//         </div>
//     );
// };

// export default Gallery;

//another version of gallery page with ad pop up


import { useState, useEffect } from "react";
import { 
  FaSearch, 
  FaFilter, 
  FaTimes, 
  FaChevronLeft, 
  FaChevronRight,
  FaHeart,
  FaRegHeart,
  FaShare,
  FaDownload,
  FaExpand,
  FaCamera,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaEye,
  FaTh,
  FaList
} from "react-icons/fa";

const Gallery = () => {
    const [galleryItems, setGalleryItems] = useState([]);
    const [filteredItems, setFilteredItems] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [selectedImage, setSelectedImage] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [viewMode, setViewMode] = useState("grid");
    const [likedItems, setLikedItems] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(9);
    const [showFilters, setShowFilters] = useState(false);
    const [sortBy, setSortBy] = useState("latest");

    // Fetch gallery data
    useEffect(() => {
        const fetchGallery = async () => {
            try {
                const response = await fetch('/galleryData.json');
                const data = await response.json();
                setGalleryItems(data.gallery);
                setFilteredItems(data.gallery);
                setCategories(data.categories);
                setItemsPerPage(data.settings.itemsPerPage);
                
                // Load liked items from localStorage
                const savedLikes = localStorage.getItem("likedGalleryItems");
                if (savedLikes) {
                    setLikedItems(JSON.parse(savedLikes));
                }
            } catch (error) {
                console.error("Error loading gallery:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchGallery();
    }, []);

    // Filter and sort items
    useEffect(() => {
        let filtered = [...galleryItems];

        // Search filter
        if (searchTerm) {
            filtered = filtered.filter(item =>
                item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            );
        }

        // Category filter
        if (selectedCategory !== "all") {
            filtered = filtered.filter(item => item.category === selectedCategory);
        }

        // Sorting
        switch(sortBy) {
            case "latest":
                filtered.sort((a, b) => new Date(b.date) - new Date(a.date));
                break;
            case "oldest":
                filtered.sort((a, b) => new Date(a.date) - new Date(b.date));
                break;
            case "popular":
                filtered.sort((a, b) => b.likes - a.likes);
                break;
            case "most-viewed":
                filtered.sort((a, b) => b.views - a.views);
                break;
            default:
                break;
        }

        setFilteredItems(filtered);
        setCurrentPage(1);
    }, [searchTerm, selectedCategory, galleryItems, sortBy]);

    const handleLike = (itemId) => {
        let newLikedItems;
        if (likedItems.includes(itemId)) {
            newLikedItems = likedItems.filter(id => id !== itemId);
            // Decrease like count
            setGalleryItems(prev => prev.map(item => 
                item.id === itemId ? { ...item, likes: item.likes - 1 } : item
            ));
        } else {
            newLikedItems = [...likedItems, itemId];
            // Increase like count
            setGalleryItems(prev => prev.map(item => 
                item.id === itemId ? { ...item, likes: item.likes + 1 } : item
            ));
        }
        setLikedItems(newLikedItems);
        localStorage.setItem("likedGalleryItems", JSON.stringify(newLikedItems));
    };

    const handleShare = async (item) => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: item.title,
                    text: item.description,
                    url: window.location.href
                });
            } catch (err) {
                console.log("Share cancelled");
            }
        } else {
            // Fallback
            navigator.clipboard.writeText(`${item.title} - ${item.description}`);
            alert("Description copied to clipboard!");
        }
    };

    const handleDownload = async (imageUrl, title) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `${title.toLowerCase().replace(/ /g, '-')}.jpg`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error("Download failed:", error);
        }
    };

    // Pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <span className="loading loading-spinner loading-lg text-primary"></span>
                    <p className="mt-4 text-gray-600">Loading gallery...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen mt-24 bg-gray-50 py-8 px-4">
            <div className="container mx-auto max-w-7xl">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        Campus Gallery
                    </h1>
                    <p className="text-gray-600 mt-3 text-lg">
                        Explore our beautiful campuses and vibrant student life
                    </p>
                </div>

                {/* Search and Filter Bar */}
                <div className="bg-white rounded-lg shadow-md p-4 mb-8">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search photos by title, location, or tags..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                            />
                        </div>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className="btn btn-outline btn-primary gap-2"
                            >
                                <FaFilter />
                                {showFilters ? "Hide Filters" : "Show Filters"}
                            </button>
                            <div className="btn-group">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={`btn ${viewMode === "grid" ? "btn-primary" : "btn-outline"}`}
                                >
                                    <FaTh />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={`btn ${viewMode === "list" ? "btn-primary" : "btn-outline"}`}
                                >
                                    <FaList />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Advanced Filters */}
                    {showFilters && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Sort By
                                    </label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value="latest">Latest First</option>
                                        <option value="oldest">Oldest First</option>
                                        <option value="popular">Most Popular</option>
                                        <option value="most-viewed">Most Viewed</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Items Per Page
                                    </label>
                                    <select
                                        value={itemsPerPage}
                                        onChange={(e) => setItemsPerPage(Number(e.target.value))}
                                        className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                                    >
                                        <option value={6}>6 items</option>
                                        <option value={9}>9 items</option>
                                        <option value={12}>12 items</option>
                                        <option value={18}>18 items</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Category Tabs */}
                <div className="flex flex-wrap gap-3 mb-8">
                    {categories.map((category) => (
                        <button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                                selectedCategory === category.id
                                    ? "bg-primary text-white shadow-lg"
                                    : "bg-white text-gray-700 hover:bg-gray-100"
                            }`}
                        >
                            {category.name}
                            <span className="ml-2 text-xs opacity-75">({category.count})</span>
                        </button>
                    ))}
                </div>

                {/* Gallery Grid/List View */}
                {currentItems.length === 0 ? (
                    <div className="text-center py-12 bg-white rounded-lg">
                        <p className="text-gray-500">No photos found matching your criteria</p>
                    </div>
                ) : (
                    <div className={`grid gap-6 ${
                        viewMode === "grid" 
                            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" 
                            : "grid-cols-1"
                    }`}>
                        {currentItems.map((item) => (
                            <div
                                key={item.id}
                                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 group"
                            >
                                {/* Image Container */}
                                <div className="relative overflow-hidden cursor-pointer">
                                    <img
                                        src={item.thumbnail}
                                        alt={item.title}
                                        onClick={() => setSelectedImage(item)}
                                        className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                        <button
                                            onClick={() => setSelectedImage(item)}
                                            className="btn btn-circle btn-primary"
                                        >
                                            <FaExpand />
                                        </button>
                                        <button
                                            onClick={() => handleShare(item)}
                                            className="btn btn-circle btn-secondary"
                                        >
                                            <FaShare />
                                        </button>
                                        <button
                                            onClick={() => handleDownload(item.image, item.title)}
                                            className="btn btn-circle btn-accent"
                                        >
                                            <FaDownload />
                                        </button>
                                    </div>
                                    
                                    {/* Category Badge */}
                                    <div className="absolute top-4 left-4">
                                        <div className="badge badge-primary">
                                            {categories.find(c => c.id === item.category)?.name || item.category}
                                        </div>
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="p-4">
                                    <h3 className="font-bold text-lg mb-2 line-clamp-1">{item.title}</h3>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">{item.description}</p>
                                    
                                    <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                                        <div className="flex items-center gap-2">
                                            <FaMapMarkerAlt className="text-primary" />
                                            <span>{item.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <FaCalendarAlt className="text-primary" />
                                            <span>{new Date(item.date).toLocaleDateString()}</span>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 mb-3">
                                        {item.tags.slice(0, 3).map((tag, idx) => (
                                            <span key={idx} className="badge badge-sm badge-ghost">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                                        <div className="flex items-center gap-4">
                                            <button
                                                onClick={() => handleLike(item.id)}
                                                className="flex items-center gap-1 text-gray-600 hover:text-red-500 transition-colors"
                                            >
                                                {likedItems.includes(item.id) ? (
                                                    <FaHeart className="text-red-500" />
                                                ) : (
                                                    <FaRegHeart />
                                                )}
                                                <span>{item.likes}</span>
                                            </button>
                                            <div className="flex items-center gap-1 text-gray-600">
                                                <FaEye />
                                                <span>{item.views}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-gray-500 text-xs">
                                            <FaCamera />
                                            <span>{item.photographer}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className="flex justify-center mt-8 gap-2">
                        <button
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                            className="btn btn-outline btn-sm"
                        >
                            <FaChevronLeft />
                        </button>
                        {[...Array(totalPages)].map((_, index) => (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={`btn btn-sm ${
                                    currentPage === index + 1 ? "btn-primary" : "btn-outline"
                                }`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === totalPages}
                            className="btn btn-outline btn-sm"
                        >
                            <FaChevronRight />
                        </button>
                    </div>
                )}

                {/* Lightbox Modal */}
                {selectedImage && (
                    <div className="fixed inset-0 z-[10000] bg-black/95 flex items-center justify-center p-4 animate-fadeIn">
                        <button
                            onClick={() => setSelectedImage(null)}
                            className="absolute top-4 right-4 btn btn-circle btn-ghost text-white"
                        >
                            <FaTimes className="text-2xl" />
                        </button>
                        
                        <div className="relative max-w-5xl w-full">
                            <img
                                src={selectedImage.image}
                                alt={selectedImage.title}
                                className="w-full rounded-lg"
                            />
                            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg">
                                <h3 className="text-white text-2xl font-bold mb-2">{selectedImage.title}</h3>
                                <p className="text-white/90 mb-3">{selectedImage.description}</p>
                                <div className="flex flex-wrap gap-4 text-sm text-white/80">
                                    <div className="flex items-center gap-2">
                                        <FaMapMarkerAlt />
                                        <span>{selectedImage.location}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaCalendarAlt />
                                        <span>{new Date(selectedImage.date).toLocaleDateString()}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <FaCamera />
                                        <span>{selectedImage.photographer}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Gallery;