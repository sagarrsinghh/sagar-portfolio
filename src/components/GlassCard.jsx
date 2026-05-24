import { useState, useRef } from "react";
import { motion } from "framer-motion";

const GlassCard = ({ children, className = "", delay = 0, yOffset = 80, xOffset = 0, onClick }) => {
  const cardRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      initial={{ opacity: 0, y: yOffset, x: xOffset }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay }}
      whileHover={{ y: -8 }}
      className={`group relative overflow-hidden bg-white/[0.03] backdrop-blur-xl border border-red-500/10 hover:border-red-500/30 transition-all duration-300 shadow-[0_0_40px_rgba(255,0,0,0.02)] cursor-pointer ${className}`}
    >
      {/* Background radial spotlight */}
      <div
        className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0"
        style={{
          background: `radial-gradient(350px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(239, 68, 68, 0.12), transparent 75%)`,
        }}
      />

      {/* Border radial spotlight - ReactBits Style */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          border: "1.5px solid transparent",
          background: `radial-gradient(150px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(239, 68, 68, 0.45), transparent 70%) border-box`,
          WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
        }}
      />

      {/* Card Content Wrapper */}
      <div className="relative z-20 w-full h-full">
        {children}
      </div>
    </motion.div>
  );
};

export default GlassCard;
