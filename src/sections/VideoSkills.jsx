import { motion } from "framer-motion";
import { FiTrendingUp, FiCpu, FiCamera, FiEdit3, FiAward } from "react-icons/fi";

const VideoSkills = () => {
  // Software circular dial skills
  const editTools = [
    { name: "Premiere Pro", percentage: 95, color: "#9333ea", glowColor: "rgba(147,51,234,0.4)" }, // Purple
    { name: "After Effects", percentage: 88, color: "#a855f7", glowColor: "rgba(168,85,247,0.4)" }, // Light Purple
    { name: "Filmora", percentage: 90, color: "#0d9488", glowColor: "rgba(13,148,136,0.4)" }, // Teal
    { name: "Adobe Photoshop", percentage: 85, color: "#2563eb", glowColor: "rgba(37,99,235,0.4)" }, // Blue
  ];

  // Creative & Cinematography skills (sliders)
  const creativeSkills = [
    { name: "Color Grading & Audio Mixing", rating: 92 },
    { name: "Cinematography & Composition", rating: 88 },
    { name: "Snapseed & Photo Design", rating: 90 },
    { name: "Canva & Graphics Creation", rating: 94 },
  ];

  // Social Media strategist highlights (cards)
  const strategistHighlights = [
    {
      title: "Content Strategy & Scheduling",
      desc: "Comprehensive multi-platform strategy across Instagram, YouTube, X/Twitter, and LinkedIn to schedule releases for prime viewership.",
      icon: <FiTrendingUp className="text-red-500 text-xl" />
    },
    {
      title: "SEO Optimization & Trends",
      desc: "Deconstruct and hook platform algorithms using high-ranking description keywords, tags, and trend tracking markers.",
      icon: <FiCpu className="text-red-500 text-xl" />
    },
    {
      title: "Viral Hook Techniques",
      desc: "Integrating retention editing concepts (the first 3-second rule) to maintain viewers, spiking retention by 60% on average.",
      icon: <FiEdit3 className="text-red-500 text-xl" />
    }
  ];

  // Circular progress math helper
  const radius = 40;
  const circumference = 2 * Math.PI * radius;

  return (
    <section 
      id="toolkit" 
      className="relative min-h-screen w-full bg-neutral-950 px-6 md:px-12 py-24 text-white overflow-hidden border-b border-neutral-900"
    >
      {/* Background decoration grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none"></div>

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* HEADER */}
        <div className="text-left mb-16">
          <span className="font-mono text-xs tracking-[4px] uppercase text-red-500 font-bold">
            [SUITE TOOLKIT]
          </span>
          <h2 
            className="text-3xl sm:text-4xl font-black uppercase mt-2 tracking-wide"
            style={{ fontFamily: "Orbitron" }}
          >
            EDITING DECK & CORE SKILLS
          </h2>
          <div className="w-16 h-1 bg-red-600 mt-3"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* LEFT DECK PANEL: CIRCULAR SOFTWARE DIALS */}
          <div className="lg:col-span-7 bg-neutral-900/35 border border-white/5 rounded-3xl p-8 backdrop-blur-md flex flex-col justify-between">
            <div className="text-left mb-8 flex items-center gap-2">
              <FiCamera className="text-red-500 text-lg" />
              <span className="font-mono text-xs text-neutral-300 font-bold uppercase tracking-wider">
                Console Rack A: Software Suites
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 items-center">
              {editTools.map((tool, idx) => {
                const strokeDashoffset = circumference - (tool.percentage / 100) * circumference;

                return (
                  <div key={idx} className="flex flex-col items-center gap-4 group">
                    {/* Circle SVG */}
                    <div className="relative w-24 h-24 flex items-center justify-center">
                      <svg className="w-full h-full -rotate-90">
                        {/* Background track circle */}
                        <circle
                          cx="48"
                          cy="48"
                          r={radius}
                          fill="transparent"
                          stroke="rgba(255,255,255,0.04)"
                          strokeWidth="6"
                        />
                        {/* Interactive fill circle */}
                        <motion.circle
                          cx="48"
                          cy="48"
                          r={radius}
                          fill="transparent"
                          stroke={tool.color}
                          strokeWidth="6"
                          strokeDasharray={circumference}
                          initial={{ strokeDashoffset: circumference }}
                          whileInView={{ strokeDashoffset }}
                          viewport={{ once: true }}
                          transition={{ duration: 1.5, ease: "easeOut", delay: idx * 0.1 }}
                          style={{
                            filter: `drop-shadow(0 0 8px ${tool.glowColor})`,
                          }}
                          strokeLinecap="round"
                        />
                      </svg>
                      {/* Central percent readout */}
                      <span className="absolute font-mono text-sm font-black tracking-tighter text-gray-200">
                        {tool.percentage}%
                      </span>
                    </div>

                    {/* Label */}
                    <div className="text-center">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 group-hover:text-white transition-colors duration-300">
                        {tool.name}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* LOWER HALF: CREATIVE RACK SLIDERS */}
            <div className="mt-12 pt-8 border-t border-white/5 text-left">
              <span className="font-mono text-[9px] text-neutral-400 font-bold uppercase tracking-wider block mb-6">
                Console Rack B: Color & Composition Gauges
              </span>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
                {creativeSkills.map((skill, idx) => (
                  <div key={idx} className="flex flex-col gap-1.5">
                    <div className="flex items-center justify-between font-mono text-[10px] text-neutral-300">
                      <span className="font-bold uppercase tracking-wide">{skill.name}</span>
                      <span className="text-red-500 font-black">{skill.rating}%</span>
                    </div>
                    {/* Sliding track */}
                    <div className="w-full h-1.5 bg-neutral-950 border border-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.rating}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.2, ease: "easeOut", delay: idx * 0.08 }}
                        className="h-full bg-gradient-to-r from-red-600 to-red-800 shadow-[0_0_6px_rgba(239,68,68,0.5)] rounded-full"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT PANEL: SOCIAL MEDIA STRATEGIST INFO CARDS */}
          <div className="lg:col-span-5 flex flex-col gap-6 text-left">
            <div className="bg-neutral-900/35 border border-white/5 rounded-3xl p-8 backdrop-blur-md flex flex-col justify-between flex-grow">
              <div className="mb-6 flex items-center gap-2">
                <FiAward className="text-red-500 text-lg" />
                <span className="font-mono text-xs text-neutral-300 font-bold uppercase tracking-wider">
                  Rack C: Social Strategy & Reach
                </span>
              </div>

              <div className="flex flex-col gap-6">
                {strategistHighlights.map((item, idx) => (
                  <div 
                    key={idx}
                    className="flex gap-4 p-4 rounded-2xl bg-neutral-950/40 border border-white/5 hover:border-red-500/25 transition-all duration-300"
                  >
                    <div className="w-10 h-10 rounded-xl bg-red-950/30 border border-red-500/20 flex items-center justify-center flex-shrink-0 shadow-inner">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-sm uppercase tracking-wide text-white font-mono">
                        {item.title}
                      </h4>
                      <p className="text-xs text-neutral-400 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default VideoSkills;
