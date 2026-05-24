import { useState, useEffect } from "react";
import { useScroll, useSpring, useTransform, useVelocity, motion, useMotionValue, animate } from "framer-motion";

const WebScrollProgress = ({ activePortfolio = "tech", onTogglePortfolio }) => {
  const { scrollYProgress } = useScroll();
  
  // Snaapier spring for page scroll tracking so Spidey reacts instantly to scrolling
  const smoothedProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
  });

  // Calculate scroll velocity to drive swinging dynamics
  const scrollVelocity = useVelocity(scrollYProgress);
  
  // Transform scroll velocity to swinging rotation (e.g. quick scroll down sways left/right)
  const swingRotation = useTransform(scrollVelocity, [-0.015, 0.015], [-22, 22]);
  
  // Smooth the rotation so Spidey sways back and forth like a real pendulum
  const smoothedRotation = useSpring(swingRotation, {
    stiffness: 70,
    damping: 15,
  });

  // Window height tracker to calculate precise pixel-based positions
  const [windowHeight, setWindowHeight] = useState(typeof window !== "undefined" ? window.innerHeight : 800);
  const [isAtTop, setIsAtTop] = useState(true);
  const [pullProgress, setPullProgress] = useState(0);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    setIsTouchDevice(
      window.matchMedia("(pointer: coarse)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0
    );
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
    };
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 8);
    };
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Drag interaction state (horizontal offset)
  const dragX = useMotionValue(0);
  const dragXSpring = useSpring(dragX, { stiffness: 120, damping: 18 });

  // Vertical drag/scroll motion value
  const dragY = useMotionValue(60);
  const dragYSpring = useSpring(dragY, { stiffness: 130, damping: 20 });

  // Rotate Spidey based on horizontal drag offset
  const dragRotation = useTransform(dragXSpring, [-100, 100], [-35, 35]);

  // Combine scroll swing and drag sway for ultimate physical responsiveness
  const combinedRotation = useTransform(
    [smoothedRotation, dragRotation],
    ([scrollRot, dragRot]) => scrollRot + dragRot
  );

  // HUD Floating badge transforms - declared at top-level to respect React rules of hooks
  const hudOpacity = useTransform(dragYSpring, [60, 95], [0, 1]);
  const hudScale = useTransform(dragYSpring, [60, 180], [0.85, 1.05]);
  const hudX = useTransform(dragYSpring, [60, 180], [30, 0]);

  // Introductory helper badge transforms (visible initially, fades out when drag begins)
  const introOpacity = useTransform(dragYSpring, [60, 85], [1, 0]);
  const introScale = useTransform(dragYSpring, [60, 85], [1, 0.9]);

  // Dynamic y position in pixels from scrolling
  const yPx = useTransform(smoothedProgress, [0, 1], [60, windowHeight - 140]);

  // Unified Y position tracking to ensure the SVG web stretches correctly in all states
  const activeY = useMotionValue(60);
  useEffect(() => {
    const target = isAtTop ? dragYSpring : yPx;
    const unsubscribe = target.on("change", (latest) => {
      activeY.set(latest);
    });
    activeY.set(target.get());
    return () => unsubscribe();
  }, [isAtTop, dragYSpring, yPx]);

  // Drive dragY based on scroll progress when not at the top of the viewport
  useEffect(() => {
    if (!isAtTop) {
      const unsubscribe = yPx.on("change", (latest) => {
        dragY.set(latest);
      });
      return () => unsubscribe();
    } else {
      dragY.set(60);
    }
  }, [isAtTop, yPx]);

  // Track the pull down progress to scale and animate the badge
  useEffect(() => {
    const unsubscribe = dragY.on("change", (latest) => {
      if (isAtTop) {
        // dragY ranges from 60 to 260. Threshold is at 180 (displacement of 120px)
        const prog = Math.min(Math.max((latest - 60) / 120, 0), 1);
        setPullProgress(prog);
      } else {
        setPullProgress(0);
      }
    });
    return () => unsubscribe();
  }, [isAtTop]);

  // State to track Spidey's 3D backflip angle
  const [flipAngle, setFlipAngle] = useState(0);

  // Play synthesized "thwip" web sound effect using native Web Audio API
  const playThwipSound = () => {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      const ctx = new AudioContextClass();
      
      // 1. Filtered noise burst for high-pressure air/web release
      const bufferSize = ctx.sampleRate * 0.12; // 120ms sound
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.setValueAtTime(1800, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(700, ctx.currentTime + 0.12);
      filter.Q.setValueAtTime(4, ctx.currentTime);
      
      const noiseGain = ctx.createGain();
      noiseGain.gain.setValueAtTime(0.2, ctx.currentTime);
      noiseGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      
      noise.connect(filter);
      filter.connect(noiseGain);
      noiseGain.connect(ctx.destination);
      
      // 2. Oscillator frequency sweep for the physical web projectile thwip
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      
      osc.type = "triangle";
      osc.frequency.setValueAtTime(950, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(160, ctx.currentTime + 0.12);
      
      oscGain.gain.setValueAtTime(0.3, ctx.currentTime);
      oscGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.12);
      
      osc.connect(oscGain);
      oscGain.connect(ctx.destination);
      
      // Trigger execution
      noise.start();
      osc.start();
      noise.stop(ctx.currentTime + 0.14);
      osc.stop(ctx.currentTime + 0.14);
    } catch (e) {
      console.warn("Web Audio API was blocked or is not supported", e);
    }
  };

  const handleDragStart = () => {
    playThwipSound();
  };

  const handleDragEnd = () => {
    if (isAtTop) {
      const currentY = dragY.get();
      if (currentY >= 180) {
        // Trigger portfolio switch!
        if (onTogglePortfolio) {
          onTogglePortfolio();
        }
        setFlipAngle((prev) => prev + 720);
        playThwipSound();
      }
      // Bounce Spidey back to original resting position
      animate(dragY, 60, {
        type: "spring",
        stiffness: 150,
        damping: 12,
      });
    } else {
      animate(dragX, 0, {
        type: "spring",
        stiffness: 140,
        damping: 10,
      });
    }
  };

  const handleSpideyClick = (e) => {
    e.stopPropagation(); // Avoid triggering any container clicks
    setFlipAngle((prev) => prev + 360);
    playThwipSound();
  };

  // Generate dynamic SVG path for the web thread (creates a subtle organic bend when dragged)
  const pathD = useTransform([dragXSpring, activeY], ([x, y]) => {
    const startX = 96; // Center of the 192px wide SVG
    const startY = 0;
    const endX = 96 + x;
    const endY = y;
    // Control point for a quadratic Bezier curve to bend the web slightly during swing/drag
    const controlX = 96 + x * 0.4;
    const controlY = y * 0.5;
    return `M ${startX} ${startY} Q ${controlX} ${controlY} ${endX} ${endY}`;
  });

  return (
    <div 
      className="fixed top-0 bottom-0 right-6 md:right-10 w-8 z-[9970] pointer-events-none"
      style={{ perspective: "1000px" }}
    >
      {/* FLOATING INTRO HELPER BADGE (Pulsing notifier, visible by default, clickable fallback) */}
      {isAtTop && (
        <motion.div
          style={{
            opacity: introOpacity,
            scale: introScale,
          }}
          animate={{
            y: [0, -6, 0]
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 3,
              ease: "easeInOut"
            }
          }}
          onClick={onTogglePortfolio}
          className="absolute right-14 top-8 pointer-events-auto cursor-pointer hidden md:flex flex-col items-end z-50 group select-none"
        >
          <div className="bg-black/95 backdrop-blur-md border border-red-500/40 rounded-xl p-3.5 shadow-[0_0_25px_rgba(239,68,68,0.25)] hover:shadow-[0_0_35px_rgba(239,68,68,0.5)] hover:border-red-500/80 transition-all duration-300 flex flex-col items-end gap-2 font-mono tracking-wider min-w-[210px] border-r-4 border-r-red-500">

            {/* REC label */}
            <div className="flex items-center gap-1.5 text-[9px] font-black text-red-400 uppercase tracking-widest animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>
              <span>[REC] {activePortfolio === "tech" ? "SWING TO CREATIVE" : "SWING TO TECH"}</span>
            </div>

            {/* Main action label */}
            <div className="text-[12px] font-black text-white group-hover:text-red-400 transition-colors duration-300 text-right flex items-center gap-1.5 leading-tight">
              <span>{activePortfolio === "tech" ? "EXPLORE FILM & PHOTO" : "EXPLORE DEV PORTFOLIO"}</span>
              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: "easeInOut" }}
                className="flex-shrink-0"
              >
                →
              </motion.span>
            </div>

            {/* Description */}
            <div className="text-[9px] text-neutral-300 text-right leading-relaxed font-normal mt-0.5">
              {activePortfolio === "tech" ? (
                <>Pull Spidey down to swing into the <span className="text-red-400 font-semibold">Creative Verse</span></>
              ) : (
                <>Pull Spidey down to swing back to the <span className="text-red-400 font-semibold">Tech Verse</span></>
              )}
            </div>

            <div className="w-full h-px bg-white/8 my-0.5"></div>

            {/* Footer hint */}
            <div className="text-[8px] text-neutral-400 text-right uppercase font-medium tracking-wider">
              ⚡ Or click this bubble directly
            </div>
          </div>
          
          <svg className="w-12 h-6 overflow-visible -mt-1 mr-4 opacity-55">
            <path 
              d="M 48 0 C 30 8, 10 10, 0 14" 
              fill="none" 
              stroke="rgba(239,68,68,0.4)" 
              strokeWidth="1.2" 
              strokeDasharray="2 2"
            />
          </svg>
        </motion.div>
      )}

      {/* FLOATING INSTRUCTIONS HUD */}
      {isAtTop && (
        <motion.div
          style={{
            opacity: hudOpacity,
            scale: hudScale,
            x: hudX,
          }}
          className="absolute right-14 top-8 pointer-events-none select-none hidden md:flex flex-col items-end z-50"
        >
          <div className="bg-black/90 backdrop-blur-md border border-red-500/40 rounded-xl p-3.5 shadow-[0_0_25px_rgba(239,68,68,0.25)] flex flex-col items-end gap-1.5 font-mono tracking-wider min-w-[210px]">
            <div className="flex items-center gap-1.5 text-[9px] font-black text-red-500 uppercase animate-pulse">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              <span>[REC] {activePortfolio === "tech" ? "EDIT-VERSE" : "TECH-VERSE"}</span>
            </div>
            <div className="text-[11px] font-bold text-gray-200 text-right">
              {pullProgress < 0.95 ? (
                <>
                  Pull Spidey to <span className="text-red-500 font-black animate-pulse">TRANSMUTE</span>
                </>
              ) : (
                <span className="text-green-400 font-black animate-bounce block">RELEASE TO SWING!</span>
              )}
            </div>
            
            {/* Visual meter bar */}
            <div className="w-full h-1 bg-gray-900 rounded-full mt-1 overflow-hidden border border-white/5">
              <div 
                className={`h-full transition-all duration-75 ${pullProgress >= 0.95 ? "bg-green-500 shadow-[0_0_6px_#22c55e]" : "bg-red-500 shadow-[0_0_6px_#ef4444]"}`}
                style={{ width: `${pullProgress * 100}%` }}
              ></div>
            </div>
            <div className="text-[7.5px] text-gray-500 uppercase">
              Vibe: {activePortfolio === "tech" ? "Tech ➔ Director" : "Director ➔ Tech"}
            </div>
          </div>
          
          <svg className="w-12 h-6 overflow-visible -mt-1 mr-4">
            <path 
              d="M 48 0 C 30 8, 10 10, 0 14" 
              fill="none" 
              stroke="rgba(239,68,68,0.4)" 
              strokeWidth="1.2" 
              strokeDasharray="2 2"
            />
          </svg>
        </motion.div>
      )}

      {/* DYNAMIC WEB THREAD SVG */}
      <div className="absolute inset-0 flex justify-center">
        <svg className="w-48 h-full overflow-visible pointer-events-none">
          <motion.path
            d={pathD}
            fill="none"
            stroke="rgba(255, 255, 255, 0.75)"
            strokeWidth="1.8"
            style={{
              filter: "drop-shadow(0 0 5px rgba(255, 255, 255, 0.55))",
            }}
          />
        </svg>
      </div>

      {/* SWINGING SPIDER-MAN CONTAINER */}
      <motion.div
        drag={isTouchDevice ? false : (isAtTop ? "y" : "x")}
        dragConstraints={isAtTop ? { top: 60, bottom: 260 } : { left: -90, right: 90 }}
        dragElastic={isAtTop ? 0.15 : 0.35}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        style={{
          y: isAtTop ? dragY : yPx,
          x: dragX,
          left: "calc(50% - 24px)", // Center the 48px wide Spidey container
        }}
        className="absolute w-12 h-20 flex flex-col items-center origin-top pointer-events-auto cursor-grab active:cursor-grabbing"
      >
        {/* Upside Down Spidey hanging string */}
        <div className="w-[1.5px] h-6 bg-white/90 shadow-[0_0_5px_white]"></div>

        {/* SPIDER-MAN BODY (SVG) */}
        <motion.div
          onClick={handleSpideyClick}
          animate={{ rotateX: flipAngle }}
          transition={{
            type: "spring",
            stiffness: 80,
            damping: 10,
            mass: 0.8
          }}
          style={{
            rotate: combinedRotation,
            transformOrigin: "top center",
          }}
          className="w-12 h-14 select-none cursor-pointer"
        >
          <svg
            viewBox="0 0 100 120"
            className="w-full h-full drop-shadow-[0_4px_10px_rgba(255,0,0,0.6)] hover:brightness-110 active:brightness-95 transition-all"
          >
            {/* Web String attachment hook */}
            <circle cx="50" cy="5" r="4" fill="#ef4444" stroke="white" strokeWidth="1" />
            
            {/* Legs going upwards (since upside down) */}
            <path
              d="M 35 45 L 20 5 C 15 15, 25 35, 45 42"
              fill="none"
              stroke="#2563eb" // Blue
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            <path
              d="M 65 45 L 80 5 C 85 15, 75 35, 55 42"
              fill="none"
              stroke="#2563eb" // Blue
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            
            {/* Red Boots on legs */}
            <path
              d="M 22 8 L 20 5 C 18 10, 20 18, 25 22"
              fill="none"
              stroke="#ef4444" // Red
              strokeWidth="5.5"
              strokeLinecap="round"
            />
            <path
              d="M 78 8 L 80 5 C 82 10, 80 18, 75 22"
              fill="none"
              stroke="#ef4444" // Red
              strokeWidth="5.5"
              strokeLinecap="round"
            />

            {/* Torso (Red and Blue Suit) */}
            <path
              d="M 35 40 C 35 40, 50 25, 65 40 C 65 65, 35 65, 35 40"
              fill="#ef4444" // Red torso center
              stroke="#2563eb" // Blue side accents
              strokeWidth="4"
              strokeLinejoin="round"
            />

            {/* Black Spider Emblem on Chest (Hanging upside down, so pointing up) */}
            <path
              d="M 50 48 L 47 43 L 53 43 Z M 50 48 L 50 56 M 47 43 Q 40 40 45 48 M 53 43 Q 60 40 55 48 M 48 45 Q 40 50 45 54 M 52 45 Q 60 50 55 54"
              stroke="black"
              strokeWidth="1.2"
              fill="black"
              strokeLinecap="round"
            />

            {/* Arms holding the web above (hanging) */}
            <path
              d="M 35 48 C 25 55, 30 75, 50 5"
              fill="none"
              stroke="#ef4444"
              strokeWidth="4.5"
              strokeLinecap="round"
            />
            <path
              d="M 65 48 C 75 55, 70 75, 50 5"
              fill="none"
              stroke="#ef4444"
              strokeWidth="4.5"
              strokeLinecap="round"
            />

            {/* Head (Upside Down at the bottom) */}
            {/* Neck */}
            <path d="M 42 55 L 58 55 L 50 65 Z" fill="#ef4444" />
            
            {/* Skull */}
            <ellipse cx="50" cy="74" rx="18" ry="20" fill="#ef4444" stroke="#b91c1c" strokeWidth="1" />
            
            {/* Spider-Web pattern on Mask */}
            <path d="M 50 54 L 50 94 M 32 74 L 68 74 M 37 60 L 63 88 M 37 88 L 63 60" stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" />
            <path d="M 50 74 Q 45 68 38 68 Q 45 74 50 82 Q 55 74 62 68 Q 55 68 50 74 Z" fill="none" stroke="rgba(0,0,0,0.3)" strokeWidth="0.8" />

            {/* Large White Spider Eyes with Thick Black Borders */}
            {/* Left Eye */}
            <path
              d="M 36 66 C 34 72, 38 82, 47 78 C 45 74, 42 70, 36 66 Z"
              fill="white"
              stroke="black"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
            {/* Right Eye */}
            <path
              d="M 64 66 C 66 72, 62 82, 53 78 C 55 74, 58 70, 64 66 Z"
              fill="white"
              stroke="black"
              strokeWidth="3.2"
              strokeLinejoin="round"
            />
          </svg>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default WebScrollProgress;
