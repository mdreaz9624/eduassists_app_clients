// import { useEffect, useState } from "react";

// const WatchStory = () => {
//   const [videos, setVideos] = useState([]);
//   const [selectedVideo, setSelectedVideo] = useState(null);

//   useEffect(() => {
//     fetch("/watchStory.json")
//       .then((res) => res.json())
//       .then((data) => setVideos(data));
//   }, []);

//   return (
//     <div className="min-h-screen bg-base-100 py-10 px-4">
      
//       {/* Title */}
//       <div className="text-center mb-10">
//         <h2 className="text-3xl font-bold text-primary">Watch Our Story</h2>
//         <p className="text-base-content mt-2">
//           Edu Assists Your Global Education Partner. 
//         </p>
//       </div>

//       {/* Main Video */}
//       {selectedVideo && (
//         <div className="max-w-4xl mx-auto mb-10">
//           <div className="aspect-video">
//             <iframe
//               className="w-full h-full rounded-xl"
//               src={`https://www.youtube.com/embed/${selectedVideo}`}
//               title="YouTube video"
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>
//       )}

//       {/* Video Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
//         {videos.map((video) => (
//           <div
//             key={video.id}
//             className="card bg-base-200 shadow hover:shadow-xl transition cursor-pointer"
//             onClick={() => setSelectedVideo(video.videoId)}
//           >
//             <figure>
//               <img src={video.thumbnail} alt={video.title} />
//             </figure>

//             <div className="card-body">
//               <h3 className="font-semibold">{video.title}</h3>

//               <button className="btn btn-primary btn-sm mt-2">
//                 Watch Video
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default WatchStory;


// version 2

import { useEffect, useState } from "react";

const WatchStory = () => {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetch("/watchStory.json")
      .then((res) => res.json())
      .then((data) => {
        setVideos(data);
        // Automatically select the first video if available
        if (data.length > 0) setSelectedVideo(data[0].videoId);
      });
  }, []);

  return (
    <div className="min-h-screen bg-base-100 py-16 px-6 lg:px-12">
      {/* Header Section */}
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-primary mb-4">
          Watch Our Story
        </h2>
        <div className="h-1 w-20 bg-primary mx-auto mb-6 rounded-full"></div>
        <p className="text-lg text-base-content/70 leading-relaxed">
          Discover how Edu Assists empowers your journey as a global education partner. 
          Explore our success stories and expert insights.
        </p>
      </div>

      {/* Featured Video Player */}
      {selectedVideo && (
        <div className="max-w-5xl mx-auto mb-20">
          <div className="relative group overflow-hidden rounded-3xl shadow-2xl border border-base-300 bg-black">
            <div className="aspect-video">
              <iframe
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo}?autoplay=1&rel=0`}
                title="YouTube video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {/* Video Selection Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-2xl font-bold">More Stories</h3>
          <span className="badge badge-outline p-4">{videos.length} Videos</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video) => (
            <div
              key={video.id}
              className={`group card bg-base-200 overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl cursor-pointer border-2 ${
                selectedVideo === video.videoId ? "border-primary" : "border-transparent"
              }`}
              onClick={() => {
                setSelectedVideo(video.videoId);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            >
              <figure className="relative overflow-hidden">
                <img 
                  src={video.thumbnail} 
                  alt={video.title} 
                  className="w-full aspect-video object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-black/0 transition-colors duration-300 flex items-center justify-center">
                   <div className="w-12 h-12 bg-primary text-primary-content rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6"><path d="M8 5v14l11-7z" /></svg>
                   </div>
                </div>
              </figure>

              <div className="card-body p-6">
                <h3 className="card-title text-base leading-snug group-hover:text-primary transition-colors">
                  {video.title}
                </h3>
                <div className="card-actions justify-end mt-4">
                  <button className={`btn btn-sm btn-ghost group-hover:btn-primary transition-all`}>
                    {selectedVideo === video.videoId ? "Now Playing" : "Watch Now"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchStory;