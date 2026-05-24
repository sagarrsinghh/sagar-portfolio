import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  FiCamera, 
  FiFilm, 
  FiChevronLeft, 
  FiChevronRight, 
  FiX, 
  FiMaximize2, 
  FiFeather, 
  FiEye,
  FiSliders,
  FiGrid,
  FiActivity
} from "react-icons/fi";
import GlassCard from "../components/GlassCard";
import { photographyData, photographyCategories } from "../data/photography";

const VideoStory = () => {
  const [activePhoto, setActivePhoto] = useState(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Interactive Viewfinder Telemetry States
  const [iso, setIso] = useState(400); 
  const [aperture, setAperture] = useState(2.8);
  const [shutterSpeed, setShutterSpeed] = useState("1/250s");
  const [showGrid, setShowGrid] = useState(true);
  const [noiseFilter, setNoiseFilter] = useState(true);
  const [shutterFlash, setShutterFlash] = useState(false);
  const [focalLength, setFocalLength] = useState("50mm");
  
  // Audio feedback synthesis using Web Audio API for a sleek camera shutter sound
  const playShutterSound = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      
      // Shutter click parts
      const now = ctx.currentTime;
      
      // High frequency click (metal shutter blade mechanical release)
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = "sine";
      osc.frequency.setValueAtTime(8000, now);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.08);
      
      gainNode.gain.setValueAtTime(0.08, now);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start(now);
      osc.stop(now + 0.09);

      // Low frequency mechanical thud
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = "triangle";
      osc2.frequency.setValueAtTime(150, now);
      osc2.frequency.exponentialRampToValueAtTime(40, now + 0.12);
      
      gain2.gain.setValueAtTime(0.12, now);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      
      osc2.connect(gain2);
      gain2.connect(ctx.destination);
      
      osc2.start(now);
      osc2.stop(now + 0.13);
    } catch (e) {
      console.warn("Audio Context blocked or not supported: ", e);
    }
  };

  const filteredPhotos = selectedCategory === "All"
    ? photographyData
    : photographyData.filter(photo => photo.category === selectedCategory);

  const handleOpenLightbox = (index) => {
    const photo = filteredPhotos[index];
    setActivePhotoIndex(index);
    setActivePhoto(photo);
    
    // Parse EXIF metadata from photo info dynamically
    try {
      const metaParts = photo.meta.split("•");
      const focalPart = metaParts[0]?.trim() || "50mm";
      const fStopPart = metaParts[1]?.trim() || "f/2.8";
      const isoPart = metaParts[2]?.trim() || "ISO 400";
      const shutterPart = metaParts[3]?.trim() || "1/250s";
      
      setFocalLength(focalPart);
      const parsedAperture = parseFloat(fStopPart.replace("f/", ""));
      const parsedIso = parseInt(isoPart.replace("ISO ", ""));
      
      setAperture(isNaN(parsedAperture) ? 2.8 : parsedAperture);
      setIso(isNaN(parsedIso) ? 400 : parsedIso);
      setShutterSpeed(shutterPart);
    } catch (err) {
      setFocalLength("50mm");
      setAperture(2.8);
      setIso(400);
      setShutterSpeed("1/250s");
    }
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    const newIndex = activePhotoIndex === 0 ? filteredPhotos.length - 1 : activePhotoIndex - 1;
    handleOpenLightbox(newIndex);
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    const newIndex = activePhotoIndex === filteredPhotos.length - 1 ? 0 : activePhotoIndex + 1;
    handleOpenLightbox(newIndex);
  };

  // Trigger tactile shutter capture animation and sound
  const handleShutterCapture = () => {
    setShutterFlash(true);
    playShutterSound();
    setTimeout(() => {
      setShutterFlash(false);
    }, 150);
  };

  // Keyboard navigation inside Lightbox Viewfinder
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!activePhoto) return;
      if (e.key === "Escape") setActivePhoto(null);
      if (e.key === "ArrowLeft") handlePrevPhoto(e);
      if (e.key === "ArrowRight") handleNextPhoto(e);
      if (e.key === " ") {
        e.preventDefault();
        handleShutterCapture();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activePhoto, activePhotoIndex, filteredPhotos]);

  // Derived styles based on interactive telemetry adjustments
  // 1. ISO Film Grain opacity
  const grainOpacity = noiseFilter ? Math.min(0.28, (iso / 6400) * 0.25) : 0;

  // 2. Aperture radial border depth-of-field blur
  const fieldBlur = Math.max(0, (4.0 - aperture) * 2.5); // lower f-stops create shallow depth blurs

  // 3. Shutter Speed motion blur simulation
  const motionBlurStyle = shutterSpeed === "1/15s" 
    ? "blur(1.5px)" 
    : shutterSpeed === "1/30s" 
      ? "blur(0.8px)" 
      : "none";

  return (
    <section 
      id="story" 
      className="relative min-h-screen w-full bg-neutral-950 px-6 md:px-12 py-24 text-white overflow-hidden border-b border-neutral-900"
    >
      {/* Dynamic Background Glow Elements */}
      <div className="absolute top-[10%] right-[5%] w-[450px] h-[450px] bg-red-900/5 rounded-full blur-[140px] pointer-events-none"></div>
      <div className="absolute bottom-[20%] left-[5%] w-[450px] h-[450px] bg-neutral-900/30 rounded-full blur-[160px] pointer-events-none"></div>

      {/* Styled Film Grain Layer */}
      <style>{`
        .film-grain-overlay {
          pointer-events: none;
          position: absolute;
          inset: -200%;
          z-index: 15;
          opacity: ${grainOpacity};
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.95' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
          animation: grainMove 0.8s steps(4) infinite;
          will-change: transform;
        }
        @keyframes grainMove {
          0%, 100% { transform:translate(0, 0) }
          10% { transform:translate(-1%, -2%) }
          20% { transform:translate(-3%, 1%) }
          30% { transform:translate(2%, -1%) }
          40% { transform:translate(-1%, 3%) }
          55% { transform:translate(-2%, -1%) }
          70% { transform:translate(3%, 1%) }
          85% { transform:translate(-1%, 2%) }
        }
      `}</style>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* ========================================================================= */}
        {/* NARRATIVE SECTION HEADER */}
        {/* ========================================================================= */}
        <div className="flex flex-col items-start gap-3 mb-16 text-left">
          <span className="font-mono text-xs tracking-[4px] uppercase text-red-500 font-bold">
            [SCENARIO / TREATMENT / VISION]
          </span>
          <h2 
            className="text-3xl sm:text-4xl font-black uppercase mt-2 tracking-wide text-white"
            style={{ fontFamily: "Orbitron" }}
          >
            THE DIRECTOR'S JOURNAL
          </h2>
          <div className="w-16 h-1 bg-red-600 mt-2"></div>
        </div>

        {/* ========================================================================= */}
        {/* NARRATIVE STORY CARDS (The Director's Treatment Journey) */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-24 text-left">
          
          {/* ACT I */}
          <GlassCard className="p-8 rounded-2xl flex flex-col justify-between min-h-[360px]" delay={0.1}>
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] text-red-500 font-black tracking-widest uppercase">
                  ACT I: THE EYE
                </span>
                <FiCamera className="text-red-500 text-lg" />
              </div>
              <h3 
                className="text-xl font-bold uppercase tracking-wider text-white" 
                style={{ fontFamily: "Orbitron" }}
              >
                Photography & Still Composition
              </h3>
              <p className="text-sm text-neutral-400 mt-4 leading-relaxed font-light">
                Every story starts with a single frame. Through my camera lens, I learned how to observe the world — to catch raw human emotions, map geometric parallel lines, and study how golden hour light bends around shadows to craft a silent narrative.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 font-mono text-[9px] text-neutral-500">
              [FOCUS POINT: CAPTURING TRANSIENT TRUTH]
            </div>
          </GlassCard>

          {/* ACT II */}
          <GlassCard className="p-8 rounded-2xl flex flex-col justify-between min-h-[360px]" delay={0.25}>
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] text-red-500 font-black tracking-widest uppercase">
                  ACT II: THE RHYTHM
                </span>
                <FiFilm className="text-red-500 text-lg" />
              </div>
              <h3 
                className="text-xl font-bold uppercase tracking-wider text-white" 
                style={{ fontFamily: "Orbitron" }}
              >
                Cinematography & Cadence
              </h3>
              <p className="text-sm text-neutral-400 mt-4 leading-relaxed font-light">
                Moving frames bring time to life. As a cinematographer and editor, I discovered the pulse of visual rhythm. Perfect speed ramps, synchronized ambient soundscapes, and expressive color grades are my instruments for engineering true cinematic empathy.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 font-mono text-[9px] text-neutral-500">
              [FOCUS POINT: COLOR SCAPING & FLOW]
            </div>
          </GlassCard>

          {/* ACT III */}
          <GlassCard className="p-8 rounded-2xl flex flex-col justify-between min-h-[360px]" delay={0.4}>
            <div>
              <div className="flex items-center justify-between mb-6">
                <span className="font-mono text-[10px] text-red-500 font-black tracking-widest uppercase">
                  ACT III: THE VISION
                </span>
                <FiFeather className="text-red-500 text-lg" />
              </div>
              <h3 
                className="text-xl font-bold uppercase tracking-wider text-white" 
                style={{ fontFamily: "Orbitron" }}
              >
                Writing & Directing
              </h3>
              <p className="text-sm text-neutral-400 mt-4 leading-relaxed font-light">
                My ultimate star. I am working towards the director's chair — preparing to write and direct complete original films. To construct entire cinematic universes, direct actors to deliver intense honesty, and script stories that are fully mine from draft to screen.
              </p>
            </div>
            <div className="mt-8 pt-4 border-t border-white/5 font-mono text-[9px] text-red-500 font-bold">
              [FOCUS POINT: ORIGINAL FILMS • DIRECTED BY SAGAR]
            </div>
          </GlassCard>

        </div>

        {/* ========================================================================= */}
        {/* PHOTOGRAPHY EXPOSURE GALLERY */}
        {/* ========================================================================= */}
        <div id="photography" className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 text-left border-b border-neutral-900 pb-8">
          <div>
            <span className="font-mono text-xs tracking-[4px] uppercase text-red-500 font-bold">
              [EXPOSURE DECK]
            </span>
            <h3 
              className="text-2xl sm:text-3xl font-black uppercase mt-1 tracking-wider text-white"
              style={{ fontFamily: "Orbitron" }}
            >
              PHOTOGRAPHY CHRONICLES
            </h3>
            <p className="text-xs text-neutral-400 mt-2 max-w-xl font-light">
              A premium exhibition of curated snapshots. Explore geometric architectural frames, cinematic street encounters, portraits, and cyberpunk twilight landscapes.
            </p>
          </div>

          {/* Dynamic Filter HUD Controls */}
          <div className="flex flex-wrap gap-2 md:justify-end">
            {photographyCategories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-3 py-1.5 rounded-md font-mono text-[10px] uppercase tracking-wider cursor-pointer border transition-all duration-300
                  ${selectedCategory === category 
                    ? "bg-red-600/90 text-white border-red-500 shadow-[0_0_12px_rgba(239,68,68,0.4)]"
                    : "bg-black/40 text-neutral-400 border-white/5 hover:text-red-400 hover:border-red-500/20 hover:bg-neutral-900/60"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Staggered Masonry Layout Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 [column-fill:_balance] w-full">
          <AnimatePresence mode="popLayout">
            {filteredPhotos.map((item, index) => {
              // Find real index inside the master list for lightbox matching
              const masterIndex = photographyData.findIndex(p => p.id === item.id);
              
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, scale: 0.95, y: 30 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 15 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  onClick={() => handleOpenLightbox(masterIndex)}
                  className="break-inside-avoid group cursor-pointer bg-neutral-900/30 border border-white/5 rounded-2xl overflow-hidden hover:border-red-500/40 shadow-[0_4px_25px_rgba(0,0,0,0.5)] transition-all duration-500 hover:shadow-[0_4px_30px_rgba(239,68,68,0.06)]"
                >
                  <div className="relative overflow-hidden bg-neutral-950">
                    {/* Simulated Focal Camera HUD overlay */}
                    <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-all duration-500 z-10 m-3 pointer-events-none">
                      <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t border-l border-white/20 group-hover:border-red-500/60 transition-colors duration-500"></div>
                      <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t border-r border-white/20 group-hover:border-red-500/60 transition-colors duration-500"></div>
                      <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b border-l border-white/20 group-hover:border-red-500/60 transition-colors duration-500"></div>
                      <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b border-r border-white/20 group-hover:border-red-500/60 transition-colors duration-500"></div>
                      
                      {/* Reticle Focus Square */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                        <div className="w-6 h-6 border border-red-500/35 flex items-center justify-center relative scale-125 group-hover:scale-100 transition-transform duration-500">
                          <div className="w-1.5 h-1.5 bg-red-600 rounded-full animate-ping"></div>
                        </div>
                      </div>
                    </div>

                    <img 
                      src={item.src} 
                      alt={item.title} 
                      loading="lazy"
                      className="w-full h-auto object-cover opacity-70 group-hover:opacity-90 transition-all duration-700 ease-out scale-100 group-hover:scale-[1.03]"
                      style={{ willChange: "transform" }}
                    />

                    {/* Category Tag */}
                    <span className="absolute top-4 left-4 px-2.5 py-0.5 rounded bg-black/85 border border-white/10 font-mono text-[7px] tracking-widest text-red-400 font-bold uppercase z-20 shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
                      {item.category}
                    </span>

                    {/* Technical details reveal on hover */}
                    <div className="absolute inset-0 flex items-end justify-between p-4 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20 text-left">
                      <div className="font-mono text-[8px] tracking-wider text-white/70">
                        <div className="text-[7px] text-neutral-400 uppercase tracking-widest font-semibold">{item.location}</div>
                        <div className="text-[7px] text-red-500 font-bold mt-1">{item.meta}</div>
                      </div>
                      <div className="w-8 h-8 rounded-full bg-red-600 border border-red-400/30 flex items-center justify-center text-white text-xs shadow-lg transform scale-90 group-hover:scale-100 transition-all duration-300">
                        <FiMaximize2 />
                      </div>
                    </div>
                  </div>

                  {/* Title and Short Narrative block */}
                  <div className="p-5 text-left border-t border-white/5 bg-neutral-900/10">
                    <h4 
                      className="text-xs font-bold uppercase text-white tracking-widest group-hover:text-red-400 transition-colors duration-300"
                      style={{ fontFamily: "Orbitron" }}
                    >
                      {item.title}
                    </h4>
                    <p className="text-[10px] text-neutral-400 mt-2 font-light leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* FULL SCREEN DUAL-PORTFOLIO CAMERA LIGHTBOX */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {activePhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 w-screen h-screen z-[9990] bg-neutral-950/98 backdrop-blur-md flex items-center justify-center p-4 md:p-8 pointer-events-auto overflow-y-auto"
            onClick={() => setActivePhoto(null)}
          >
            {/* Viewfinder white shutter flash pulse */}
            <AnimatePresence>
              {shutterFlash && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.12 }}
                  className="fixed inset-0 bg-white z-[9999] pointer-events-none"
                />
              )}
            </AnimatePresence>

            {/* DSLR Interface Panel Box */}
            <motion.div
              initial={{ scale: 0.94, y: 25 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.94, y: 25 }}
              transition={{ type: "spring", stiffness: 150, damping: 19 }}
              className="relative w-full max-w-5xl bg-neutral-900 border border-white/10 rounded-2xl overflow-hidden shadow-[0_0_90px_rgba(255,0,0,0.08)] text-left flex flex-col lg:flex-row justify-between min-h-[500px]"
              onClick={(e) => e.stopPropagation()}
            >
              
              {/* Left Column: Massive Live Viewfinder Frame */}
              <div className="relative flex-1 bg-black flex items-center justify-center overflow-hidden aspect-[4/3] lg:aspect-auto lg:min-h-[550px]">
                
                {/* Simulated Film Grain noise animation */}
                <div className="film-grain-overlay" />

                {/* Aperture depth of field blur overlay around edges */}
                <div 
                  className="absolute inset-0 pointer-events-none z-10 transition-all duration-300"
                  style={{
                    boxShadow: aperture < 4.0 ? `inset 0 0 ${fieldBlur * 7}px rgba(0,0,0,0.9)` : "none",
                    filter: `backdrop-filter blur(${fieldBlur * 0.4}px)`
                  }}
                />

                {/* Shutter speed simulation styles applied to target image */}
                <img 
                  src={activePhoto.src} 
                  alt={activePhoto.title}
                  className="w-full h-full object-contain transition-all duration-300 select-none z-0"
                  style={{
                    filter: motionBlurStyle
                  }}
                />

                {/* RULE OF THIRDS VIEW FINDER GRID LINES */}
                {showGrid && (
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 pointer-events-none z-20 opacity-30 transition-all">
                    <div className="border-r border-b border-white/20"></div>
                    <div className="border-r border-b border-white/20"></div>
                    <div className="border-b border-white/20"></div>
                    <div className="border-r border-b border-white/20"></div>
                    <div className="border-r border-b border-white/20"></div>
                    <div className="border-b border-white/20"></div>
                    <div className="border-r border-white/20"></div>
                    <div className="border-r border-white/20"></div>
                    <div className="relative">
                      {/* Grid crosshair detail */}
                      <div className="absolute bottom-2 right-2 w-1.5 h-1.5 border-r border-b border-white/40"></div>
                    </div>
                  </div>
                )}

                {/* Viewfinder crosshairs telemetry box */}
                <div className="absolute inset-4 border border-white/10 pointer-events-none z-20 m-3">
                  {/* Outer corner notches */}
                  <div className="absolute top-0 left-0 w-3 h-3 border-t border-l border-white/40"></div>
                  <div className="absolute top-0 right-0 w-3 h-3 border-t border-r border-white/40"></div>
                  <div className="absolute bottom-0 left-0 w-3 h-3 border-b border-l border-white/40"></div>
                  <div className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-white/40"></div>
                  
                  {/* Center telemetry crosshairs */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-10 h-10 border border-white/10 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 border border-red-500/40 rounded-full"></div>
                    </div>
                  </div>
                </div>

                {/* HUD Live-Telemetry Overlays */}
                <div className="absolute top-4 left-4 z-20 font-mono text-[8px] tracking-widest text-red-500 bg-black/75 px-2 py-1 rounded border border-white/5 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-600 animate-ping"></span>
                  <span>REC LIVE</span>
                </div>

                <div className="absolute top-4 right-4 z-20 font-mono text-[8px] tracking-widest text-neutral-400 bg-black/75 px-2 py-1 rounded border border-white/5 flex items-center gap-1">
                  <span>BATT 98%</span>
                  <div className="w-4 h-2 border border-neutral-400 rounded-sm p-0.5 flex items-center">
                    <div className="h-full w-3 bg-red-500"></div>
                  </div>
                </div>

                {/* Left navigation arrow */}
                <button 
                  onClick={handlePrevPhoto}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-red-600 hover:text-white border border-white/10 hover:border-red-400 flex items-center justify-center text-white/80 transition-all cursor-pointer z-35"
                >
                  <FiChevronLeft className="text-lg" />
                </button>

                {/* Right navigation arrow */}
                <button 
                  onClick={handleNextPhoto}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/70 hover:bg-red-600 hover:text-white border border-white/10 hover:border-red-400 flex items-center justify-center text-white/80 transition-all cursor-pointer z-35"
                >
                  <FiChevronRight className="text-lg" />
                </button>
              </div>

              {/* Right Column: DSLR Interactive Control Board */}
              <div className="w-full lg:w-[350px] bg-neutral-950 p-6 flex flex-col justify-between border-t lg:border-t-0 lg:border-l border-white/5 relative z-30">
                
                {/* Header HUD panel info */}
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-white/5">
                    <div className="flex items-center gap-2.5 font-mono">
                      <FiCamera className="text-red-500 text-sm" />
                      <span className="text-[10px] text-red-500 font-bold uppercase tracking-widest">
                        EXPOSURE ANALYTICS
                      </span>
                    </div>
                    <button 
                      onClick={() => setActivePhoto(null)}
                      className="w-7 h-7 rounded-full bg-white/5 hover:bg-red-600 hover:text-white flex items-center justify-center text-gray-400 transition-all cursor-pointer border border-white/5"
                    >
                      <FiX />
                    </button>
                  </div>

                  {/* Photo Title and Metadata Info */}
                  <div className="mt-5 text-left">
                    <h4 
                      className="text-sm font-black text-white uppercase tracking-wider"
                      style={{ fontFamily: "Orbitron" }}
                    >
                      {activePhoto.title}
                    </h4>
                    <span className="font-mono text-[8px] uppercase tracking-widest text-neutral-400 block mt-1">
                      LOCATION: {activePhoto.location} • {activePhoto.category}
                    </span>
                    <p className="text-[10px] text-neutral-400 mt-2 font-light leading-relaxed">
                      {activePhoto.desc}
                    </p>
                  </div>

                  {/* Curated EXIF readouts */}
                  <div className="grid grid-cols-2 gap-3 mt-6 bg-neutral-900/40 border border-white/5 p-4 rounded-xl font-mono text-[9px] text-neutral-400">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[8px] text-neutral-500">LENS</span>
                      <span className="text-white font-bold">{focalLength} prime</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[8px] text-neutral-500">SHUTTER</span>
                      <span className="text-white font-bold">{shutterSpeed}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[8px] text-neutral-500">APERTURE</span>
                      <span className="text-red-500 font-bold">f/{aperture}</span>
                    </div>
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[8px] text-neutral-500">SENSITIVITY</span>
                      <span className="text-red-500 font-bold">ISO {iso}</span>
                    </div>
                  </div>

                  {/* DSLR VIEWPORT ADJUSTMENTS SLIDERS */}
                  <div className="mt-6 pt-4 border-t border-white/5">
                    <h5 className="font-mono text-[9px] text-red-400 font-bold tracking-widest uppercase flex items-center gap-1.5 mb-4">
                      <FiSliders className="text-[10px]" />
                      <span>TELEMETRY MANIPULATION</span>
                    </h5>

                    {/* Aperture Slider */}
                    <div className="mb-4">
                      <div className="flex justify-between font-mono text-[9px] mb-1.5 text-neutral-400">
                        <span>APERTURE (f-stop depth)</span>
                        <span className="text-white font-bold">f/{aperture}</span>
                      </div>
                      <input 
                        type="range" 
                        min="1.4" 
                        max="16" 
                        step="0.1"
                        value={aperture}
                        onChange={(e) => setAperture(parseFloat(e.target.value))}
                        className="w-full h-1 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-red-600"
                      />
                      <span className="font-mono text-[7px] text-neutral-500 mt-1 block">
                        Lower f-stop yields shallow field blur. High f-stop gives deep focus grid.
                      </span>
                    </div>

                    {/* ISO / Grain Sensitivity Slider */}
                    <div className="mb-4">
                      <div className="flex justify-between font-mono text-[9px] mb-1.5 text-neutral-400">
                        <span>SENSITIVITY (ISO grain)</span>
                        <span className="text-white font-bold">ISO {iso}</span>
                      </div>
                      <input 
                        type="range" 
                        min="100" 
                        max="6400" 
                        step="100"
                        value={iso}
                        onChange={(e) => setIso(parseInt(e.target.value))}
                        className="w-full h-1 bg-neutral-900 rounded-lg appearance-none cursor-pointer accent-red-600"
                      />
                      <span className="font-mono text-[7px] text-neutral-500 mt-1 block">
                        High ISO increases sensor grain. Low ISO yields pristine digital pixel data.
                      </span>
                    </div>

                    {/* Shutter Speed Controller Selector */}
                    <div className="mb-4">
                      <div className="flex justify-between font-mono text-[9px] mb-1.5 text-neutral-400">
                        <span>SHUTTER SPEED (exposure motion)</span>
                        <span className="text-white font-bold">{shutterSpeed}</span>
                      </div>
                      <div className="flex gap-1.5 mt-1.5">
                        {["1/1000s", "1/250s", "1/30s", "1/15s"].map((speed) => (
                          <button
                            key={speed}
                            onClick={() => setShutterSpeed(speed)}
                            className={`flex-1 py-1 rounded font-mono text-[8px] border transition-colors cursor-pointer
                              ${shutterSpeed === speed 
                                ? "bg-red-600/20 text-red-500 border-red-500" 
                                : "bg-neutral-900/60 text-neutral-400 border-white/5 hover:bg-neutral-900"
                              }
                            `}
                          >
                            {speed.replace("s", "")}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Viewfinder Telemetry Toggle buttons */}
                    <div className="flex gap-3 mt-6">
                      <button 
                        onClick={() => setShowGrid(!showGrid)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border font-mono text-[8px] uppercase tracking-wider transition-all cursor-pointer
                          ${showGrid 
                            ? "bg-red-600/20 text-red-400 border-red-500/50" 
                            : "bg-neutral-900 text-neutral-400 border-white/5 hover:border-neutral-800"
                          }
                        `}
                      >
                        <FiGrid className="text-xs" />
                        <span>Rule of Thirds</span>
                      </button>

                      <button 
                        onClick={() => setNoiseFilter(!noiseFilter)}
                        className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg border font-mono text-[8px] uppercase tracking-wider transition-all cursor-pointer
                          ${noiseFilter 
                            ? "bg-red-600/20 text-red-400 border-red-500/50" 
                            : "bg-neutral-900 text-neutral-400 border-white/5 hover:border-neutral-800"
                          }
                        `}
                      >
                        <FiActivity className="text-xs" />
                        <span>Noise Filter</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Tactile Capture Shutter Trigger button at the bottom */}
                <div className="mt-8 pt-4 border-t border-white/5 flex flex-col gap-3">
                  <button
                    onClick={handleShutterCapture}
                    className="w-full bg-red-600 hover:bg-red-500 active:scale-[0.98] transition-all py-3 rounded-xl font-mono text-[10px] font-bold tracking-widest uppercase text-white shadow-[0_4px_20px_rgba(239,68,68,0.35)] hover:shadow-[0_4px_25px_rgba(239,68,68,0.5)] flex items-center justify-center gap-2 cursor-pointer border border-red-400/30"
                  >
                    <FiCamera className="text-xs animate-bounce" />
                    <span>CAPTURE SHUTTER</span>
                  </button>
                  <span className="font-mono text-[7px] text-neutral-500 text-center uppercase tracking-wider">
                    Press [SPACE] in active viewfinder frame to trigger sensor capture
                  </span>
                </div>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default VideoStory;
