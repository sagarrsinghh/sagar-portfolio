import { motion, AnimatePresence } from "framer-motion";

const WebCurtain = ({ isTransitioning, activePortfolio }) => {
  return (
    <AnimatePresence>
      {isTransitioning && (
        <motion.div
          initial={{ y: "-100%" }}
          animate={{ y: "0%" }}
          exit={{ y: "100%" }}
          transition={{
            duration: 0.85,
            ease: [0.76, 0, 0.24, 1], // Custom cinematic cubic bezier
          }}
          className="fixed inset-0 w-screen h-screen z-[9999] bg-neutral-950 flex flex-col items-center justify-center overflow-hidden pointer-events-auto"
        >
          {/* Film Strip Left Border */}
          <div className="absolute left-4 top-0 bottom-0 w-8 flex flex-col justify-between py-4 border-r border-white/10 opacity-30 select-none pointer-events-none hidden md:flex">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="w-5 h-5 border border-white/40 rounded-[2px] bg-transparent mx-auto flex items-center justify-center text-[7px] text-white/20 font-mono">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Film Strip Right Border */}
          <div className="absolute right-4 top-0 bottom-0 w-8 flex flex-col justify-between py-4 border-l border-white/10 opacity-30 select-none pointer-events-none hidden md:flex">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="w-5 h-5 border border-white/40 rounded-[2px] bg-transparent mx-auto flex items-center justify-center text-[7px] text-white/20 font-mono">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Central Camera Focus Reticle HUD */}
          <div className="relative w-80 h-80 max-w-full flex flex-col items-center justify-center border border-white/5 rounded-full p-8">
            {/* Viewfinder Corners */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-500"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-red-500"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-red-500"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-red-500"></div>

            {/* Glowing inner red lens ring */}
            <motion.div 
              animate={{ scale: [0.95, 1.05, 0.95] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="w-56 h-56 rounded-full border border-red-500/25 flex items-center justify-center shadow-[0_0_40px_rgba(239,68,68,0.15)]"
            >
              {/* Core shutter crosshair */}
              <div className="text-red-500 text-3xl font-light font-mono select-none">+</div>
            </motion.div>
          </div>

          {/* HUD Overlay Details */}
          <div className="mt-8 font-mono tracking-widest text-center z-10 px-6">
            <div className="flex items-center justify-center gap-2.5 text-xs text-red-500 uppercase font-black tracking-[4px]">
              <span className="w-2.5 h-2.5 rounded-full bg-red-600 animate-ping"></span>
              <span>[REC] TRANSMUTING PORTFOLIO</span>
            </div>
            
            <h2 className="text-2xl font-black text-white mt-3 uppercase tracking-[6px]" style={{ fontFamily: "Orbitron" }}>
              Entering {activePortfolio === "tech" ? "Edit-Verse" : "Tech-Verse"}
            </h2>
            
            <div className="text-[10px] text-neutral-500 mt-2.5 uppercase max-w-md mx-auto leading-relaxed">
              Applying aesthetic coordinates: {activePortfolio === "tech" ? "Cinematic dark room, director tools, film-strips & camera overlays" : "Cyberpunk web grids, binary networks, tech stacks & interactive crawlers"}
            </div>
          </div>

          {/* Sweeping scanline bar */}
          <motion.div
            animate={{ y: ["-10vh", "110vh"] }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="absolute left-0 right-0 h-[3px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_rgba(239,68,68,0.8)] pointer-events-none opacity-40"
          />

          {/* Camera aperture shutter panels (visual aesthetic) */}
          <div className="absolute inset-0 border-[24px] border-neutral-900/40 pointer-events-none"></div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WebCurtain;
