import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Helper to synthesize a Spider-Man "thwip" web shooter sound via Web Audio API
const playThwipSound = () => {
  try {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    
    // Create nodes
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const gainNode = ctx.createGain();

    osc.type = "triangle";
    
    // Frequency sweep (rapid down sweep)
    const now = ctx.currentTime;
    osc.frequency.setValueAtTime(950, now);
    osc.frequency.exponentialRampToValueAtTime(120, now + 0.14);

    // Bandpass filter sweep for that "air thwip" noise texture
    filter.type = "bandpass";
    filter.Q.setValueAtTime(3.5, now);
    filter.frequency.setValueAtTime(1800, now);
    filter.frequency.exponentialRampToValueAtTime(450, now + 0.12);

    // Gain envelope (instant rise, rapid fall)
    gainNode.gain.setValueAtTime(0.01, now);
    gainNode.gain.linearRampToValueAtTime(0.24, now + 0.01);
    gainNode.gain.exponentialRampToValueAtTime(0.01, now + 0.16);

    // Connect
    osc.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Play
    osc.start(now);
    osc.stop(now + 0.18);
  } catch (error) {
    console.warn("Audio Context playback blocked or unsupported:", error);
  }
};

const WebShooter = () => {
  const [webs, setWebs] = useState([]);

  useEffect(() => {
    const handleGlobalClick = (e) => {
      // Don't trigger if clicked on an interactive control that does not want webs (optional)

      const id = Date.now() + Math.random();
      const x = e.clientX;
      const y = e.clientY;

      // Select 5 boundary anchors at random locations around screen edges
      const w = window.innerWidth;
      const h = window.innerHeight;
      const targets = [
        { x: 0, y: Math.random() * h }, // Left
        { x: Math.random() * w, y: 0 }, // Top
        { x: w, y: Math.random() * h }, // Right
        { x: Math.random() * w, y: h }, // Bottom
        { x: Math.random() > 0.5 ? 0 : w, y: Math.random() * h } // Extra random corner/edge
      ];

      // Create smaller intermediate ring paths for concentric web effects
      const concentricRings = [0.25, 0.5, 0.75].map((scale) => {
        return targets.map((t) => ({
          x: x + (t.x - x) * scale,
          y: y + (t.y - y) * scale,
        }));
      });

      // Sparks particles expanding from center
      const particles = [...Array(12)].map((_, i) => {
        const angle = (i * 2 * Math.PI) / 12 + (Math.random() - 0.5) * 0.2;
        const speed = Math.random() * 80 + 60;
        return {
          id: i,
          dx: Math.cos(angle) * speed,
          dy: Math.sin(angle) * speed,
          size: Math.random() * 4 + 2,
        };
      });

      const newWeb = {
        id,
        x,
        y,
        targets,
        concentricRings,
        particles,
      };

      setWebs((prev) => [...prev, newWeb]);

      // Remove web after animation completes
      setTimeout(() => {
        setWebs((prev) => prev.filter((w) => w.id !== id));
      }, 650);
    };

    window.addEventListener("mousedown", handleGlobalClick);
    return () => {
      window.removeEventListener("mousedown", handleGlobalClick);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9990] pointer-events-none overflow-hidden">
      <AnimatePresence>
        {webs.map((web) => (
          <div key={web.id} className="absolute inset-0">
            {/* SVG WEB STRANDS */}
            <svg className="absolute w-full h-full">
              {/* Radial Strands */}
              {web.targets.map((target, idx) => (
                <motion.line
                  key={`radial-${idx}`}
                  x1={web.x}
                  y1={web.y}
                  x2={target.x}
                  y2={target.y}
                  stroke="rgba(255, 255, 255, 0.85)"
                  strokeWidth="1.8"
                  initial={{ strokeDasharray: "100%", strokeDashoffset: "100%" }}
                  animate={{ strokeDashoffset: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  style={{
                    filter: "drop-shadow(0 0 4px rgba(255,0,0,0.5)) drop-shadow(0 0 1px white)",
                  }}
                />
              ))}

              {/* Concentric webbing rings */}
              {web.concentricRings.map((ringPoints, ringIdx) => {
                // Build a closed SVG path connecting the interpolated points
                const pathString = ringPoints
                  .map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x} ${p.y}`)
                  .join(" ") + " Z";

                return (
                  <motion.path
                    key={`ring-${ringIdx}`}
                    d={pathString}
                    fill="none"
                    stroke="rgba(255, 255, 255, 0.45)"
                    strokeWidth="1"
                    initial={{ opacity: 0, scale: 0.3 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.25, ease: "easeOut", delay: 0.05 }}
                    style={{
                      filter: "drop-shadow(0 0 3px rgba(255,0,0,0.3))",
                    }}
                  />
                );
              })}
            </svg>

            {/* PARTICLE BLAST EFFECT */}
            {web.particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full bg-linear-to-r from-white to-red-500"
                style={{
                  left: web.x,
                  top: web.y,
                  width: p.size,
                  height: p.size,
                  boxShadow: "0 0 8px rgba(255,0,0,0.8)",
                }}
                animate={{
                  x: p.dx,
                  y: p.dy,
                  opacity: [1, 0],
                  scale: [1, 0.2],
                }}
                transition={{ duration: 0.45, ease: "easeOut" }}
              />
            ))}

            {/* IMPACT CORE FLASH */}
            <motion.div
              className="absolute rounded-full bg-white blur-xs"
              style={{
                left: web.x - 12,
                top: web.y - 12,
                width: 24,
                height: 24,
                boxShadow: "0 0 25px rgba(255,255,255,1), 0 0 50px rgba(255,0,0,0.8)",
              }}
              animate={{ scale: [0.5, 2], opacity: [1, 0] }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            />
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default WebShooter;
