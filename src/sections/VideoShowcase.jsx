import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlay, FiMaximize2, FiX, FiVideo, FiSmartphone, FiInstagram, FiFolder, FiExternalLink } from "react-icons/fi";

// Local video asset imports
import myyBoysVideo from "../assets/video/myy boys.mp4";
import jiyaLageNaVideo from "../assets/video/jiya lage na.mp4";
import liveVideo from "../assets/video/live.mp4";
import rainVideo from "../assets/video/rain.mp4";

// Sub-component for individual video card showcase using local video elements as thumbnails
const VideoCard = ({ item, onClick, aspectClass, isVertical }) => {
  const videoRef = useRef(null);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        // Handle play promise interruptions from rapid hovers
        console.log("Hover preview play prevented: ", err);
      });
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
  };

  return (
    <div 
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group cursor-pointer bg-neutral-900/40 border border-white/5 rounded-2xl overflow-hidden hover:border-red-500/45 shadow-[0_4px_25px_rgba(0,0,0,0.5)] transition-all duration-500 flex flex-col justify-between"
    >
      <div className={`relative ${aspectClass} bg-neutral-950 overflow-hidden`}>
        {/* Hardware-accelerated scaling wrapper to completely isolate video scaling paint costs */}
        <div 
          className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out scale-100 group-hover:scale-105 z-0"
          style={{ willChange: "transform" }}
        >
          {/* Actual Video Thumbnail with Hover Playback */}
          <video
            ref={videoRef}
            src={`${item.previewUrl}#t=0.1`}
            preload="metadata"
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-75 group-hover:opacity-95 transition-opacity duration-500 ease-out pointer-events-none"
          />
        </div>

        {/* Dynamic overlay viewfinder lines for smartphone aesthetics */}
        {isVertical && (
          <div className="absolute inset-4 border border-white/5 pointer-events-none z-20 group-hover:border-red-500/20 transition-colors">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20"></div>
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-white/20"></div>
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-white/20"></div>
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20"></div>
          </div>
        )}

        {/* Category pill */}
        <span className="absolute top-3.5 left-3.5 px-3 py-1 rounded-full bg-black/75 border border-white/10 font-mono text-[8px] tracking-widest text-red-400 font-bold uppercase z-20">
          {item.category}
        </span>

        {/* Duration pill */}
        <span className="absolute bottom-3.5 right-3.5 px-2 py-0.5 rounded bg-black/85 font-mono text-[8px] text-white/60 tracking-wider z-20">
          {item.duration}
        </span>

        {/* Hover HUD Indicators */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 z-20 bg-black/30">
          <div className="w-12 h-14 rounded-full bg-red-600/90 border border-red-400 flex items-center justify-center text-white text-lg shadow-[0_0_20px_rgba(239,68,68,0.5)] transform scale-90 group-hover:scale-100 transition-all duration-500">
            {isVertical ? (
              <FiPlay className="fill-current translate-x-[1.5px] text-base" />
            ) : (
              <FiMaximize2 />
            )}
          </div>
        </div>
      </div>

      <div className={isVertical ? "p-5" : "p-6"}>
        <h3 
          className="text-base font-black uppercase text-white tracking-wider group-hover:text-red-400 transition-colors duration-300"
          style={{ fontFamily: "Orbitron" }}
        >
          {item.title}
        </h3>
        <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
          {item.desc}
        </p>
        <div className="flex items-center gap-1.5 mt-4 text-[9px] font-mono text-red-500 font-bold uppercase">
          <span>{isVertical ? "[REEL DECK]" : "[EXPLORE TIMELINE]"}</span>
          <span className="w-1 h-1 rounded-full bg-red-500 animate-pulse"></span>
        </div>
      </div>
    </div>
  );
};

const VideoShowcase = () => {
  const [activeTab, setActiveTab] = useState("landscape"); // "landscape" or "vertical"
  const [selectedVideo, setSelectedVideo] = useState(null);

  // Landscape Projects (Widescreen 16:9 / 21:9)
  const landscapeEdits = [
    {
      id: "l2",
      title: "Jiya Lage Na - Ambient Fusion",
      category: "Artistic Composition",
      duration: "00:26",
      thumbnail: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
      previewUrl: jiyaLageNaVideo,
      videoUrl: jiyaLageNaVideo,
      desc: "An exploration of professional color grading, mood composition, and smooth speed ramps set to a serene musical soundscape.",
    },
    {
      id: "l3",
      title: "My Boys - High Energy Vibe",
      category: "Music & Lifestyle",
      duration: "00:19",
      thumbnail: "https://images.unsplash.com/photo-1506157786151-b8491531f063?auto=format&fit=crop&q=80&w=800",
      previewUrl: myyBoysVideo,
      videoUrl: myyBoysVideo,
      desc: "Dynamic lifestyle vlog featuring ultra-fast pacing, seamless camera movements, and beat-syncing designed to capture electric group dynamics.",
    }
  ];

  // Vertical Projects (Shorts / Reels 9:16)
  const verticalEdits = [
    {
      id: "v1",
      title: "Live in the Moment",
      category: "Lifestyle Short",
      duration: "00:16",
      thumbnail: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&q=80&w=600",
      previewUrl: liveVideo,
      videoUrl: liveVideo,
      desc: "A snappy, beat-synchronized lifestyle reel with high-impact transitions and dynamic text overlays to lock in platform viewer counts.",
    },
    {
      id: "v3",
      title: "Rainy Day Melancholy",
      category: "Cinematic Mood",
      duration: "00:06",
      thumbnail: "https://images.unsplash.com/photo-1534274988757-a28bf1a57c17?auto=format&fit=crop&q=80&w=600",
      previewUrl: rainVideo,
      videoUrl: rainVideo,
      desc: "A highly atmospheric aesthetic short focusing on city reflections, droplets, and dark cinematic tones to paint a quiet rainy evening.",
    }
  ];

  return (
    <section 
      id="edits" 
      className="relative min-h-screen w-full bg-neutral-950 px-6 md:px-12 py-24 text-white overflow-hidden border-b border-neutral-900"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="text-left">
            <span className="font-mono text-xs tracking-[4px] uppercase text-red-500 font-bold">
              [PORTFOLIO WORKS]
            </span>
            <h2 
              className="text-3xl sm:text-4xl font-black uppercase mt-2 tracking-wide"
              style={{ fontFamily: "Orbitron" }}
            >
              SELECTED EDITS
            </h2>
            <div className="w-16 h-1 bg-red-600 mt-3"></div>
          </div>

          {/* DUAL MODE CONTROLLERS */}
          <div className="inline-flex bg-neutral-900 border border-white/5 rounded-2xl p-1.5 self-start">
            <button
              onClick={() => setActiveTab("landscape")}
              className={`px-5 py-2.5 rounded-xl font-mono text-[10px] tracking-wider uppercase font-bold flex items-center gap-2 transition-all duration-300 ${activeTab === "landscape" ? "bg-red-600 text-white shadow-lg shadow-red-500/20" : "text-neutral-400 hover:text-white"}`}
            >
              <FiVideo className="text-sm" />
              <span>Landscape (16:9)</span>
            </button>
            <button
              onClick={() => setActiveTab("vertical")}
              className={`px-5 py-2.5 rounded-xl font-mono text-[10px] tracking-wider uppercase font-bold flex items-center gap-2 transition-all duration-300 ${activeTab === "vertical" ? "bg-red-600 text-white shadow-lg shadow-red-500/20" : "text-neutral-400 hover:text-white"}`}
            >
              <FiSmartphone className="text-sm" />
              <span>Shorts / Reels (9:16)</span>
            </button>
          </div>
        </div>



        {/* LANDSCAPE GRID LIST */}
        <AnimatePresence mode="wait">
          {activeTab === "landscape" && (
            <motion.div
              key="landscape-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto"
            >
              {landscapeEdits.map((item) => (
                <VideoCard
                  key={item.id}
                  item={item}
                  onClick={() => setSelectedVideo(item)}
                  aspectClass="aspect-[16/9]"
                  isVertical={false}
                />
              ))}
            </motion.div>
          )}

          {/* VERTICAL GRID LIST */}
          {activeTab === "vertical" && (
            <motion.div
              key="vertical-view"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left max-w-4xl mx-auto"
            >
              {verticalEdits.map((item) => (
                <VideoCard
                  key={item.id}
                  item={item}
                  onClick={() => setSelectedVideo(item)}
                  aspectClass="aspect-[9/16]"
                  isVertical={true}
                />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* INTERACTIVE DRIVE ACCESS PANEL */}
        <div className="mt-20 relative bg-neutral-900/20 border border-white/5 rounded-2xl p-6 md:p-8 max-w-4xl mx-auto overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/5 rounded-full blur-[100px] pointer-events-none animate-pulse"></div>
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
            <div className="text-left md:max-w-xl">
              <span className="font-mono text-[9px] tracking-[4px] uppercase text-emerald-500 font-bold flex items-center gap-1.5 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                <span>[DIRECT STORAGE TRANSCEIVER]</span>
              </span>
              <h3 
                className="text-lg font-black uppercase tracking-wider text-white"
                style={{ fontFamily: "Orbitron" }}
              >
                UNCOMPRESSED HIGH-BITRATE ARCHIVE
              </h3>
              <p className="text-xs text-neutral-400 mt-2 leading-relaxed">
                Looking for the raw exports? Access the complete, uncompressed master catalog directly via Google Drive. Ideal for verifying dynamic range, speed ramps, and high-fidelity rendering quality.
              </p>
            </div>
            
            <a 
              href="https://drive.google.com/drive/folders/1ZGyUhmj-dbxuUxlzSpLgrg9WnzNFfQab"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 px-6 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold tracking-widest text-xs uppercase flex items-center gap-2.5 shadow-[0_0_20px_rgba(16,185,129,0.25)] transition-all duration-300 transform hover:scale-105 active:scale-95 border border-emerald-400/20 cursor-pointer text-center justify-center font-mono"
            >
              <FiFolder className="text-sm animate-bounce" />
              <span>EXPLORE ALL VIDEOS</span>
              <FiExternalLink className="text-[10px]" />
            </a>
          </div>
          
          {/* Decorative Terminal Lines */}
          <div className="mt-6 pt-4 border-t border-white/5 flex flex-wrap justify-between items-center gap-4 font-mono text-[7px] text-neutral-500 tracking-wider">
            <div className="flex gap-4">
              <span>CLOUD GATEWAY: CONNECTED</span>
              <span>BANDWIDTH: METRIC SECURE</span>
              <span>INDEXED FILES: 54 EDITS</span>
            </div>
            <span>SECURE SHARED DRIVE INTEGRATION v2.4.1</span>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* FULL SCREEN CINEMATIC PORTFOLIO PLAYER MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {selectedVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-screen h-screen z-[9990] bg-neutral-950/95 backdrop-blur-md flex items-center justify-center p-4 md:p-8 pointer-events-auto"
            onClick={() => setSelectedVideo(null)}
          >
            {/* Modal Box */}
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", stiffness: 150, damping: 18 }}
              className="relative w-full max-w-5xl bg-neutral-900 border border-white/10 rounded-2xl overflow-y-auto max-h-[95vh] lg:max-h-none lg:overflow-hidden shadow-[0_0_60px_rgba(0,0,0,0.85)]"
              onClick={(e) => e.stopPropagation()} // Stop propagation to avoid closing
            >
              {/* Top info bar */}
              <div className="px-6 py-4 bg-neutral-950 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-2 font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-pulse"></span>
                  <span className="text-[10px] text-red-500 font-black uppercase tracking-wider">
                    {selectedVideo.category} PLAYBACK
                  </span>
                  <span className="text-white/20">|</span>
                  <span className="text-[10px] text-gray-400 tracking-wider">
                    {selectedVideo.title}
                  </span>
                </div>
                <button 
                  onClick={() => setSelectedVideo(null)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-600 hover:text-white flex items-center justify-center text-gray-400 transition-all cursor-pointer"
                >
                  <FiX />
                </button>
              </div>

              {/* Video aspect frame wrapper */}
              <div className={`w-full bg-black relative flex items-center justify-center ${activeTab === "vertical" ? "aspect-[9/14] md:aspect-[9/11] max-h-[70vh] py-4" : "aspect-[16/9]"}`}>
                <video 
                  key={selectedVideo.id}
                  src={selectedVideo.videoUrl}
                  preload="auto"
                  controls 
                  autoPlay 
                  className={`h-full ${activeTab === "vertical" ? "w-auto max-h-[64vh] rounded-xl border border-white/10 shadow-2xl" : "w-full object-cover"}`}
                />
              </div>

              {/* Bottom details bar */}
              <div className="px-6 py-4 bg-neutral-950/80 backdrop-blur-md border-t border-white/5 text-left">
                <h4 className="text-base font-bold text-white uppercase font-mono tracking-wider">
                  {selectedVideo.title}
                </h4>
                <p className="text-xs text-neutral-400 mt-1 font-light">
                  {selectedVideo.desc}
                </p>
                <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 font-mono text-[8px] text-neutral-500">
                  <span>RESOLVED RESOLUTION: {activeTab === "vertical" ? "1080x1920" : "3840x2160"} @ 60.00fps</span>
                  <span>TIMECODE DEPTH: {selectedVideo.duration}</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoShowcase;
