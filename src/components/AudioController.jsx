import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaMusic, FaPause } from "react-icons/fa";
import sunflowerAudio from "../assets/sounds/sunflower.mp3";

const AudioController = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  
  const audioRef = useRef(null);

  useEffect(() => {
    // Instantiate audio object with Sunflower
    audioRef.current = new Audio(sunflowerAudio);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.35; // optimal default volume

    // Dismiss initial play suggestion after 5s
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      clearTimeout(timer);
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().catch((err) => {
        console.warn("Audio playback delayed until user interaction:", err);
      });
      setIsPlaying(true);
      setShowTooltip(false);
    }
  };

  return (
    <div className="fixed bottom-8 left-8 z-[9975] flex flex-col items-start gap-2 pointer-events-auto">
      {/* Dynamic Compact Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="
              px-3
              py-1.5
              rounded-xl
              bg-black/90
              backdrop-blur-md
              border
              border-red-500/30
              shadow-[0_0_10px_rgba(255,0,0,0.25)]
              text-[10px]
              text-red-300
              font-semibold
              tracking-wide
              text-center
              whitespace-nowrap
            "
          >
            🎵 Play "Sunflower"
          </motion.div>
        )}
      </AnimatePresence>

      {/* COMPACT FLOATING AUDIO BUTTON */}
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="
          flex
          items-center
          justify-center
          h-11
          px-4
          rounded-full
          bg-black/60
          backdrop-blur-xl
          border
          border-red-500/25
          shadow-[0_0_20px_rgba(255,0,0,0.2)]
          hover:border-red-500/50
          transition-all
          duration-300
          text-white
          cursor-pointer
        "
        style={{
          boxShadow: isPlaying 
            ? "0 0 25px rgba(239, 68, 68, 0.45)" 
            : "0 0 15px rgba(255, 0, 0, 0.15)"
        }}
      >
        {/* Animated Rotating Note Icon */}
        <motion.div
          animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
          transition={isPlaying ? { duration: 4, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
          className={`text-red-500 ${isPlaying ? "scale-110" : ""}`}
        >
          {isPlaying ? <FaPause size={12} className="text-white" /> : <FaMusic size={12} />}
        </motion.div>

        {/* Dynamic Micro-Equalizer and Label */}
        <AnimatePresence initial={false}>
          {isPlaying && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: "auto", opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="flex items-center overflow-hidden"
            >
              {/* Micro-Equalizer Waves */}
              <div className="flex items-end gap-[2px] h-3.5 ml-3">
                {[...Array(4)].map((_, i) => {
                  const duration = [0.6, 0.9, 0.5, 0.8][i];
                  const delay = [0.0, 0.2, 0.1, 0.3][i];
                  
                  return (
                    <div
                      key={i}
                      className="w-[2px] rounded-t-sm bg-linear-to-t from-red-600 to-amber-500 h-full origin-bottom"
                      style={{
                        animation: "equalizerPulse 1s infinite ease-in-out",
                        animationDuration: `${duration}s`,
                        animationDelay: `${delay}s`,
                      }}
                    />
                  );
                })}
              </div>
              <span 
                className="text-[9px] font-black uppercase tracking-[1.5px] text-red-500 ml-2.5 whitespace-nowrap"
                style={{ fontFamily: "Orbitron" }}
              >
                Sunflower
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default AudioController;
