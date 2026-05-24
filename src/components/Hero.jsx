import { useState, useEffect } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";

import spidermanFace from "../assets/images/spiderman-face.jpg";
import sagarImage from "../assets/images/sagar.jpg";

const Hero = ({ onTogglePortfolio }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollY } = useScroll();

  const desktopY = useTransform(
    scrollY,
    [0, 1000],
    [0, 250]
  );

  const y = isMobile ? 0 : desktopY;

  // Motion values for hover reveal coordinates and radius
  const mouseX = useMotionValue(240);
  const mouseY = useMotionValue(300);
  const maskRadius = useMotionValue(0);

  // Beautiful springs for a realistic hydraulic/web-swinging physics feel
  const springConfig = { damping: 28, stiffness: 200, mass: 0.5 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);
  const maskRadiusSpring = useSpring(maskRadius, springConfig);

  // Create a single animated mask string updated on the GPU
  const dynamicMask = useTransform(
    [mouseXSpring, mouseYSpring, maskRadiusSpring],
    ([xVal, yVal, rVal]) =>
      `radial-gradient(circle ${rVal}px at ${xVal}px ${yVal}px, black 0%, rgba(0,0,0,0.95) 35%, rgba(0,0,0,0.4) 60%, transparent 100%)`
  );

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
  };

  const handleMouseEnter = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set(e.clientX - rect.left);
    mouseY.set(e.clientY - rect.top);
    maskRadius.set(240);
  };

  const handleMouseLeave = () => {
    maskRadius.set(0);
  };

  const handleTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(touch.clientX - rect.left);
      mouseY.set(touch.clientY - rect.top);
      maskRadius.set(160); // slightly smaller reveal bubble for mobile
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      const touch = e.touches[0];
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(touch.clientX - rect.left);
      mouseY.set(touch.clientY - rect.top);
    }
  };

  const handleTouchEnd = () => {
    maskRadius.set(0);
  };

  return (

    <section
      className="
        relative
        min-h-screen
        flex
        items-center
        justify-center
        overflow-hidden
        px-6
        pt-28
        md:pt-36
        pb-16
      "
    >

      {/* BACKGROUND LIGHT */}
      <div
        className="
          absolute
          top-[-200px]
          left-[-200px]
          w-[500px]
          h-[500px]
          bg-red-600/20
          rounded-full
          blur-[150px]
        "
      ></div>

      <div
        className="
          absolute
          bottom-[-200px]
          right-[-200px]
          w-[500px]
          h-[500px]
          bg-blue-600/20
          rounded-full
          blur-[150px]
        "
      ></div>
      {/* HERO WRAPPER */}
      <div className="
        relative
        z-10
        flex
        flex-col
        items-center
        justify-center
        gap-10
        md:flex-row
        md:gap-20
      ">
        {/* IMAGE SIDE */}
        <div className="relative flex items-center justify-center">
          {/* AMBIENT BACKDROP LIGHT FOR CINEMATIC ILLUMINATION */}
          <div className="
            absolute
            w-[350px]
            h-[350px]
            md:w-[480px]
            md:h-[480px]
            rounded-full
            bg-red-600/20
            blur-[100px]
            pointer-events-none
            z-0
          "></div>

          <motion.div
            className="
              relative
              w-[85vw]
              max-w-[320px]
              h-[112vw]
              max-h-[420px]
              sm:w-[320px]
              sm:h-[420px]
              md:w-[480px]
              md:h-[75vh]
              overflow-hidden
              z-10
              cursor-crosshair
            "
            style={{
              y,
            }}
            onMouseMove={handleMouseMove}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >

            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-full h-full"
            >

            {/* SPIDERMAN IMAGE - VIGNETTE MASK APPLIED DIRECTLY HERE FOR SEAMLESS BLENDING */}
            <img
              src={spidermanFace}
              alt="spiderman"
              className="
                absolute
                inset-0
                w-full
                h-full
                object-cover
                scale-[1.02]
              "
              style={{
                filter:
                  "drop-shadow(0 0 40px rgba(255,0,0,0.25)) saturate(1.1) contrast(1.02)",
                maskImage: "radial-gradient(circle at center, black 30%, rgba(0,0,0,0.85) 60%, transparent 95%)",
                WebkitMaskImage: "radial-gradient(circle at center, black 30%, rgba(0,0,0,0.85) 60%, transparent 95%)",
              }}
            />

            {/* REVEAL IMAGE - DYNAMIC HOVER MASK WORKS PERFECTLY HERE */}
            <motion.div
              className="
                absolute
                inset-0
              "
              style={{
                backgroundImage: `url(${sagarImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                WebkitMaskImage: dynamicMask,
                maskImage: dynamicMask,
                WebkitMaskRepeat: "no-repeat",
                maskRepeat: "no-repeat",
              }}
            />

            {/* DARK OVERLAY */}
            <div className="absolute inset-0 bg-black/10"></div>

            {/* RED GLOW */}
            <div
              className="
                absolute
                inset-0
                bg-gradient-to-t
                from-red-950/20
                via-transparent
                to-transparent
              "
            ></div>

            {/* HOVER HINT BADGE - SUBTLE FLOATING TEXT */}
            <motion.div
              className="
                absolute
                bottom-8
                left-1/2
                -translate-x-1/2
                text-xs
                md:text-sm
                text-red-300/60
                font-light
                tracking-widest
                uppercase
                pointer-events-none
                z-20
                text-center
                leading-tight
              "
              initial={{ opacity: 0.4 }}
              animate={{ opacity: [0.4, 0.8, 0.4], y: [0, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              ✦ Hover to Reveal<br />Who I Am ✦
            </motion.div>

            </motion.div>

          </motion.div>
        </div>

        {/* TEXT SIDE */}
        <div
          className="
            relative
            z-20
            text-center
            md:text-left
            max-w-[450px]
          "
        >

          {/* INTRO BADGE */}
          <div className="
            inline-flex
            items-center
            gap-2
            px-4
            py-1.5
            rounded-full
            bg-red-950/40
            border
            border-red-500/30
            backdrop-blur-md
            mb-6
            shadow-[0_0_15px_rgba(239,68,68,0.15)]
          ">
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span>
            <span className="text-xs font-semibold tracking-[4px] uppercase text-red-400">
              The Amazing Developer
            </span>
          </div>

          {/* MAIN TITLE */}
          <h1
            className="
              text-5xl
              md:text-7xl
              font-black
              leading-tight
              text-white
            "
            style={{
              fontFamily: "Orbitron",
            }}
          >
            SAGAR
            <span className="block">SINGH</span>
            <span className="block text-red-600">
              SPIDER-VERSE
            </span>
          </h1>

          {/* SUBTITLE */}
          <p
            className="
              mt-6
              text-gray-300
              text-lg
              leading-relaxed
            "
          >
            Full Stack Developer crafting cinematic frontend experiences,
            scalable backend systems, and immersive digital products.
          </p>

          <div className="mt-8 flex flex-wrap justify-center md:justify-start gap-3">

            {/* BUTTON 1 — PRIMARY CTA */}
            <motion.a
              href="#projects"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="group px-6 py-2.5 rounded-full font-semibold tracking-widest uppercase text-[10px] md:text-[11px] text-white/70 border border-white/20 hover:bg-white hover:text-black hover:border-white backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Explore Projects
            </motion.a>

            {/* BUTTON 2 — CONTACT */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="group px-6 py-2.5 rounded-full font-semibold tracking-widest uppercase text-[10px] md:text-[11px] text-white/70 border border-white/20 hover:bg-white hover:text-black hover:border-white backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Me
            </motion.a>

            {/* BUTTON 3 — RESUME */}
            <motion.a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="group px-6 py-2.5 rounded-full font-semibold tracking-widest uppercase text-[10px] md:text-[11px] text-white/70 border border-white/20 hover:bg-white hover:text-black hover:border-white backdrop-blur-sm transition-all duration-300 flex items-center gap-2"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3M3 17V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
              </svg>
              View Resume
              <svg className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </motion.a>

          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.95, duration: 0.6 }}
            onClick={onTogglePortfolio}
            className="mt-5 inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full border border-white/20 hover:border-white/40 cursor-pointer transition-all duration-300 group"
          >
            {/* Tiny pulse dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse flex-shrink-0"></span>

            {/* Text */}
            <div className="flex flex-col text-left">
              <div className="flex items-center gap-1">
                <span className="text-[9px] font-mono font-semibold text-white/75 tracking-[1.5px] uppercase group-hover:text-white transition-colors duration-300">
                  Switch Portfolio
                </span>
                <motion.span
                  animate={{ x: [0, 2, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                  className="text-[10px] text-white/60 group-hover:text-white/90"
                >
                  →
                </motion.span>
              </div>
              <span className="text-[8px] font-mono text-white/50 tracking-wide uppercase group-hover:text-white/70 transition-colors duration-300">
                Pull Spidey or click to swing
              </span>
            </div>
          </motion.div>

        </div>

      </div>

    </section>
  );
};

export default Hero;

