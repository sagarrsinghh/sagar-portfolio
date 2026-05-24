import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import introVideo from "../assets/video/intro.mp4";

const Loader = ({ onComplete }) => {
  const [videoStarted, setVideoStarted] = useState(false);
  const [fadingOut, setFadingOut] = useState(false);
  const videoRef = useRef(null);

  // Play video on mount
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay prevented or video load failed", err);
      });
    }
  }, []);

  const handleDone = () => {
    if (fadingOut) return;
    setFadingOut(true);
    // Short fade-out, then complete
    setTimeout(() => {
      if (onComplete) onComplete();
    }, 800);
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: fadingOut ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
      className="fixed inset-0 z-[99999] flex items-center justify-center bg-black overflow-hidden select-none"
    >
      <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black">
        <video
          ref={videoRef}
          src={introVideo}
          autoPlay
          muted
          playsInline
          onPlay={() => setVideoStarted(true)}
          onEnded={handleDone}
          className="w-full h-full object-cover pointer-events-none"
        />

        {/* Subtle premium SKIP INTRO button */}
        <motion.button
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: videoStarted ? 0.7 : 0.3 }}
          whileHover={{ opacity: 1, scale: 1.05, backgroundColor: "rgba(239, 68, 68, 0.2)" }}
          onClick={handleDone}
          className="absolute bottom-8 right-8 z-[100000] px-5 py-2.5 rounded-full border border-white/20 bg-black/40 backdrop-blur-md text-white text-xs font-bold uppercase tracking-[3px] transition-all duration-300 shadow-[0_0_15px_rgba(255,0,0,0.2)] hover:border-red-500/50"
        >
          Skip Intro
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Loader;