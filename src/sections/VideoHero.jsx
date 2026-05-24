import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiPlay, FiInstagram, FiMail, FiVideo, FiX, FiMaximize2, FiCamera, FiFolder, FiExternalLink } from "react-icons/fi";

import myyBoysVideo from "../assets/video/myy boys.mp4";

const VideoHero = ({ onWatchShowreelClick }) => {
  const [showShowreel, setShowShowreel] = useState(false);

  return (
    <section 
      id="showreel" 
      className="relative min-h-screen w-full bg-neutral-950 flex flex-col justify-center items-center px-6 md:px-12 py-24 overflow-hidden border-b border-neutral-900"
    >
      {/* CAMERA VIEWFINDER HUD INTERACTION BOUNDARY */}
      <div className="absolute inset-8 border border-white/5 pointer-events-none select-none z-20">
        {/* Corners */}
        <div className="absolute top-0 left-0 w-6 h-6 border-t border-l border-white/20"></div>
        <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-white/20"></div>
        <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-white/20"></div>
        <div className="absolute bottom-0 right-0 w-6 h-6 border-b border-r border-white/20"></div>

        {/* Viewfinder Center Crosshairs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center opacity-10">
          <div className="w-8 h-[1px] bg-white"></div>
          <div className="h-8 w-[1px] bg-white absolute"></div>
        </div>

        {/* Timecodes */}
        <div className="absolute top-4 left-4 flex items-center gap-2 font-mono text-[10px] tracking-widest text-red-500 font-bold uppercase">
          <span className="w-2 h-2 rounded-full bg-red-600 animate-ping"></span>
          <span>[REC 00:00:00]</span>
        </div>
        <div className="absolute top-4 right-4 font-mono text-[10px] tracking-widest text-white/40">
          <span>TC 23:59:59:12</span>
        </div>
        <div className="absolute bottom-4 left-4 font-mono text-[9px] tracking-widest text-white/30 hidden md:block">
          <span>FPS 59.94</span>
        </div>
        <div className="absolute bottom-4 right-4 font-mono text-[9px] tracking-widest text-white/30 hidden md:block">
          <span>4K DCI ULTRA</span>
        </div>
      </div>

      {/* BACKGROUND GRAPHIC OR CINEMATIC LIGHTING FLARE */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-red-950/20 rounded-full blur-[120px] pointer-events-none"></div>

      {/* HERO WRAPPER */}
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
        
        {/* TEXT DETAILS */}
        <div className="lg:col-span-6 flex flex-col items-start text-left gap-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-950/40 border border-red-500/25 backdrop-blur-md">
            <FiVideo className="text-red-500 text-sm animate-pulse" />
            <span className="text-[10px] font-mono tracking-widest text-red-400 font-black uppercase">
              Director & Cinematic Editor
            </span>
          </div>

          <h1 
            className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] text-white uppercase"
            style={{ fontFamily: "Orbitron" }}
          >
            SAGAR <br />
            <span className="bg-gradient-to-r from-red-500 via-red-600 to-red-800 bg-clip-text text-transparent filter drop-shadow-[0_0_15px_rgba(239,68,68,0.25)]">
              SINGH
            </span>
          </h1>

          <p className="text-sm md:text-base text-gray-400 leading-relaxed font-light max-w-xl">
            Creative content creator with a profound passion for video editing, cinematography, and social media management. Expert in crafting high-impact visual stories, viral edits, and dynamic content that cracks platform algorithms and engages millions.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-2">
            <button 
              onClick={() => setShowShowreel(true)}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-800 hover:from-red-500 hover:to-red-700 text-white font-bold tracking-widest text-xs uppercase flex items-center gap-2.5 shadow-[0_0_20px_rgba(239,68,68,0.35)] transition-all duration-300 transform hover:scale-105 active:scale-95 border border-red-400/20 cursor-pointer animate-[pulse_3s_infinite]"
            >
              <FiPlay className="fill-current text-sm" />
              <span>Watch Showreel</span>
            </button>
            
            <a 
              href="https://drive.google.com/drive/folders/1ZGyUhmj-dbxuUxlzSpLgrg9WnzNFfQab"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-amber-500/20 via-emerald-500/20 to-blue-500/20 border border-emerald-500/35 hover:border-emerald-400 hover:bg-neutral-900 text-white/95 hover:text-white font-bold tracking-widest text-xs uppercase transition-all duration-300 transform hover:scale-105 flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(16,185,129,0.15)] hover:shadow-[0_0_30px_rgba(16,185,129,0.4)] relative group overflow-hidden"
            >
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-amber-500/10 via-emerald-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></span>
              <FiFolder className="text-emerald-400 animate-pulse text-sm" />
              <span>Drive Vault</span>
              <FiExternalLink className="text-[10px] text-emerald-400/75 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>

            <a 
              href="#edits"
              className="px-6 py-3.5 rounded-xl bg-neutral-900 border border-white/10 hover:border-red-500/40 hover:bg-red-950/10 text-white/80 hover:text-white font-bold tracking-widest text-xs uppercase transition-all duration-300 transform hover:scale-105"
            >
              Explore Edits
            </a>
            <a 
              href="https://www.instagram.com/sagarrsingh10"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3.5 rounded-xl bg-neutral-900 border border-white/10 hover:border-red-500/40 hover:bg-red-950/10 text-white/80 hover:text-white font-bold tracking-widest text-xs uppercase transition-all duration-300 transform hover:scale-105 flex items-center gap-2 cursor-pointer"
            >
              <FiInstagram className="text-sm text-red-500 group-hover:scale-110 transition-transform" />
              <span>Instagram</span>
            </a>
            <a 
              href="#photography"
              className="px-6 py-3.5 rounded-xl bg-neutral-900 border border-white/10 hover:border-red-500/40 hover:bg-red-950/10 text-white/80 hover:text-white font-bold tracking-widest text-xs uppercase transition-all duration-300 transform hover:scale-105 flex items-center gap-2"
            >
              <FiCamera className="text-sm text-red-500 group-hover:scale-110 transition-transform" />
              <span>Photography</span>
            </a>
          </div>
        </div>

        {/* MOCK VIDEO SHOWREEL WIDESCREEN PREVIEW */}
        <div className="lg:col-span-6 w-full">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            onClick={() => setShowShowreel(true)}
            className="group relative w-full aspect-[21/9] lg:aspect-[16/9] rounded-2xl overflow-hidden border border-white/10 bg-neutral-900/60 shadow-[0_15px_50px_rgba(0,0,0,0.8)] cursor-pointer hover:border-red-500/50 transition-all duration-500"
          >
            {/* AUTOPLAY BACKGROUND SHOWREEL MP4 LOOP */}
            <video 
              autoPlay 
              loop 
              muted 
              playsInline 
              preload="metadata"
              src={myyBoysVideo}
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-85 transition-all duration-[2000ms] ease-out"
            />

            {/* Cinematic Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-neutral-950/50 pointer-events-none"></div>

            {/* Play Button HUD in center */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
              <motion.div 
                whileHover={{ scale: 1.15 }}
                className="w-14 h-14 rounded-full bg-black/85 border border-red-500 flex items-center justify-center text-red-500 text-lg shadow-[0_0_30px_rgba(239,68,68,0.4)] group-hover:bg-red-600 group-hover:text-white group-hover:shadow-[0_0_40px_rgba(239,68,68,0.7)] transition-all duration-300"
              >
                <FiPlay className="fill-current translate-x-[2px]" />
              </motion.div>
              <span className="font-mono text-[9px] tracking-[4px] uppercase text-white/50 group-hover:text-white transition-colors duration-300">
                [PLAY PREVIEW]
              </span>
            </div>

            {/* Audio wave indicator on corner */}
            <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded bg-black/60 backdrop-blur-md border border-white/5 pointer-events-none">
              <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
              <span className="font-mono text-[7px] text-white/60 tracking-wider">MYY_BOYS.MP4 [CONNECTED]</span>
            </div>
          </motion.div>
        </div>

      </div>

      {/* CINEMATIC FILMSTRIP ROW AT BOTTOM */}
      <div className="absolute bottom-0 left-0 right-0 h-4 bg-neutral-900 flex justify-between overflow-hidden opacity-25 select-none pointer-events-none border-t border-b border-white/5">
        {Array.from({ length: 50 }).map((_, i) => (
          <div key={i} className="w-6 h-full border-r border-white/35 flex-shrink-0"></div>
        ))}
      </div>

      {/* SHOWREEL MODAL */}
      <AnimatePresence>
        {showShowreel && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-screen h-screen z-[9999] bg-neutral-950/98 backdrop-blur-xl flex items-center justify-center p-4 md:p-8"
            onClick={() => setShowShowreel(false)}
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              transition={{ type: "spring", stiffness: 120, damping: 20 }}
              className="relative w-full max-w-5xl bg-neutral-900 border border-red-500/20 rounded-2xl overflow-hidden shadow-[0_0_80px_rgba(239,68,68,0.25)]"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="px-6 py-4 bg-neutral-950 flex items-center justify-between border-b border-white/5">
                <div className="flex items-center gap-2 font-mono">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
                  <span className="text-[10px] text-red-500 font-black uppercase tracking-widest">
                    CINEMATIC SHOWREEL
                  </span>
                  <span className="text-white/20">|</span>
                  <span className="text-[10px] text-gray-300 font-bold uppercase tracking-wider">
                    MYY BOYS (HIGH ENERGY SHOWREEL)
                  </span>
                </div>
                <button 
                  onClick={() => setShowShowreel(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-red-600 hover:text-white flex items-center justify-center text-gray-400 transition-all cursor-pointer"
                >
                  <FiX />
                </button>
              </div>

              {/* Video Player */}
              <div className="w-full bg-black relative aspect-[16/9] flex items-center justify-center">
                <video 
                  src={myyBoysVideo}
                  preload="auto"
                  controls 
                  autoPlay 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Details */}
              <div className="px-6 py-4 bg-neutral-950/90 border-t border-white/5 text-left">
                <h4 className="text-base font-black text-white uppercase font-mono tracking-widest flex items-center gap-2">
                  <span>My Boys - High Energy Vibe</span>
                  <span className="px-2 py-0.5 rounded bg-red-600/25 border border-red-500/30 text-[8px] text-red-400 font-bold">PORTFOLIO HIGHLIGHT</span>
                </h4>
                <p className="text-xs text-neutral-400 mt-1 font-light leading-relaxed">
                  A high-octane lifestyle showcase featuring ultra-fast pacing, seamless transitions, and beat-syncing. Engineered to capture raw human energy and lifestyle dynamics. A high-end cinematic showreel capturing absolute composition depth and advanced audio mixing.
                </p>
                <div className="mt-4 pt-3 border-t border-white/5 flex flex-wrap items-center justify-between gap-4 font-mono text-[8px] text-neutral-500">
                  <span>PROCESSED DEPTH: DCI 4K (3840x2160) @ 59.94fps</span>
                  <span>DURATION: 00:19</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoHero;
