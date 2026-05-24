import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FiX, FiExternalLink } from "react-icons/fi";
import GlassCard from "../components/GlassCard";

const experiences = [
  {
    role: "Project Intern",
    company: "DOIT&C – Bhamashah State Data Centre",
    duration: "Mar 2026 – Present",
    description:
      "Building the Smart Data Center Monitoring Platform — a full-stack enterprise system for infrastructure analytics, Excel/PPT report ingestion, dashboards, metrics visualization, alerts, and predictive intelligence.",
    fullDescription:
      "As a Project Intern at DOIT&C, I'm developing a comprehensive Smart Data Center Monitoring Platform that serves as the backbone for enterprise infrastructure management. This platform processes real-time data from multiple data centers, implements sophisticated analytics algorithms, and provides actionable insights through interactive dashboards. I'm responsible for designing and implementing the full architecture, from React frontend components to NestJS backend services, MySQL database optimization, and predictive analytics engine.",
    achievements: [
      "Architected full-stack monitoring system handling 10,000+ data points daily",
      "Implemented predictive intelligence algorithms for anomaly detection",
      "Designed RESTful APIs with JWT authentication for secure data access",
      "Created real-time dashboards with React and WebSockets",
      "Optimized MySQL queries resulting in 40% performance improvement",
    ],
    tech: [
      "React",
      "NestJS",
      "MySQL",
      "TypeORM",
      "JWT",
      "Analytics",
    ],
    impact: "Enterprise-grade monitoring for state data centre operations",
  },
  {
    role: "Jr. Software Engineer Intern",
    company: "ZUCOL Solution",
    duration: "Jan 2026 – Feb 2026",
    description:
      "Worked on live backend systems using NestJS & Node.js, integrated MySQL databases, implemented authentication systems, and contributed to REST API development for billing software platforms.",
    fullDescription:
      "During my internship at ZUCOL Solution, I contributed to the development of a comprehensive billing software platform serving multiple enterprise clients. I worked directly with production systems, implementing critical backend features including payment gateway integrations, invoice generation, and customer management modules. My focus was on writing clean, scalable code and ensuring robust API performance.",
    achievements: [
      "Developed 15+ REST API endpoints for billing operations",
      "Implemented JWT-based authentication system",
      "Optimized MySQL queries for invoice generation reports",
      "Integrated multiple payment gateways (Razorpay, Stripe)",
      "Created comprehensive API documentation",
    ],
    tech: [
      "NestJS",
      "NodeJS",
      "MySQL",
      "JWT",
      "REST APIs",
    ],
    impact: "Billing platform serving 50+ enterprise customers",
  },
];

// ── Experience Modal ──
function ExperienceModal({ experience, isOpen, onClose }) {
  if (!experience) return null;

  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKey);
      return () => {
        document.body.style.overflow = "unset";
        window.removeEventListener("keydown", handleKey);
      };
    }
    return undefined;
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[9990]"
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            className="
              fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-[90%] max-w-3xl
              max-h-[90vh]
              overflow-hidden
              z-[9995]
              rounded-[40px]
              bg-gradient-to-br from-white/[0.08] to-white/[0.03] backdrop-blur-3xl
              border border-white/20
              shadow-2xl
              p-8
              md:p-10
              flex
              flex-col
            "
          >
            {/* Close button - Fixed absolute in the top-right corner, won't scroll */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute top-6 right-6 p-2.5 hover:bg-white/10 rounded-full transition-all duration-300 z-[60] cursor-pointer pointer-events-auto"
              style={{ pointerEvents: "auto" }}
              aria-label="Close modal"
            >
              <FiX className="w-6 h-6 text-white" />
            </button>

            {/* Scrollable container for modal contents */}
            <div 
              className="overflow-y-auto pr-2 max-h-[calc(90vh-80px)] mt-4 overscroll-contain"
              style={{ overscrollBehavior: "contain" }}
            >

            {/* Header */}
            <div className="mb-8">
              <p className="text-red-400 uppercase tracking-widest text-sm font-bold mb-2">
                {experience.duration}
              </p>
              <h2 className="text-5xl font-black text-white mb-3">
                {experience.role}
              </h2>
              <p className="text-2xl text-red-500 font-bold">
                {experience.company}
              </p>
            </div>

            {/* Full Description */}
            <div className="mb-8">
              <h3 className="text-red-400 uppercase tracking-widest text-sm font-bold mb-4">
                About This Role
              </h3>
              <p className="text-gray-300 text-lg leading-relaxed">
                {experience.fullDescription}
              </p>
            </div>

            {/* Achievements */}
            <div className="mb-8">
              <h3 className="text-red-400 uppercase tracking-widest text-sm font-bold mb-4">
                Key Achievements
              </h3>
              <ul className="space-y-3">
                {experience.achievements.map((achievement, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.1 }}
                    className="flex items-start gap-3 text-gray-300"
                  >
                    <span className="text-red-500 text-xl mt-1 flex-shrink-0">✦</span>
                    <span className="text-base leading-relaxed">{achievement}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Impact */}
            <div className="mb-8">
              <h3 className="text-red-400 uppercase tracking-widest text-sm font-bold mb-4">
                Business Impact
              </h3>
              <div className="px-6 py-4 rounded-2xl bg-red-500/10 border border-red-500/30">
                <p className="text-red-200 font-semibold text-lg">{experience.impact}</p>
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <h3 className="text-red-400 uppercase tracking-widest text-sm font-bold mb-4">
                Technologies & Tools
              </h3>
              <div className="flex flex-wrap gap-3">
                {experience.tech.map((tech, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                    className="px-5 py-2.5 rounded-xl bg-red-500/15 backdrop-blur-md border border-red-500/40 text-red-300 text-sm font-bold tracking-wider uppercase hover:bg-red-500/25 transition-all"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </div>
          </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

const Experience = () => {
  const [selectedExperience, setSelectedExperience] = useState(null);
  return (
    <>
    <section
      id="experience"
      className="
        relative
        min-h-screen
        px-6
        md:px-16
        py-32
        overflow-hidden
      "
    >
      {/* GLOW */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          w-[500px]
          h-[500px]
          bg-red-600/10
          rounded-full
          blur-[160px]
          -translate-x-1/2
          -translate-y-1/2
        "
      ></div>

      {/* TITLE */}
      <motion.div
        initial={{
          opacity: 0,
          y: 80,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          duration: 1,
        }}
        viewport={{
          once: true,
        }}
        className="
          relative
          z-10
          text-center
          mb-28
        "
      >
        <p
          className="
            text-red-500
            uppercase
            tracking-[6px]
            text-sm
            mb-5
          "
        >
          Professional Journey
        </p>

        <h2
          className="
            text-5xl
            md:text-7xl
            font-black
            text-white
          "
          style={{
            fontFamily: "Orbitron",
          }}
        >
          EXPERIENCE
          <span className="text-red-600">
            LOG
          </span>
        </h2>
      </motion.div>

      {/* TIMELINE */}
      <div
        className="
          relative
          z-10
          max-w-5xl
          mx-auto
        "
      >
        {/* CENTER LINE */}
        <div
          className="
            absolute
            left-1/2
            top-0
            w-[2px]
            h-full
            bg-gradient-to-b
            from-transparent
            via-red-500/50
            to-transparent
            hidden
            md:block
          "
        ></div>

        {/* ITEMS */}
        <div className="space-y-24">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{
                opacity: 0,
                y: 100,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              transition={{
                duration: 0.8,
                delay: index * 0.2,
              }}
              viewport={{
                once: true,
              }}
              className={`
                relative
                flex
                flex-col
                md:flex-row
                items-center
                ${
                  index % 2 === 0
                    ? "md:justify-start"
                    : "md:justify-end"
                }
              `}
            >
              {/* DOT */}
              <div
                className="
                  absolute
                  left-1/2
                  top-10
                  w-5
                  h-5
                  rounded-full
                  bg-red-500
                  shadow-[0_0_20px_red]
                  -translate-x-1/2
                  hidden
                  md:block
                "
              ></div>

              {/* CARD */}
              <motion.div
                whileHover={{ scale: 1.05, y: -10 }}
                onClick={() => setSelectedExperience(exp)}
                className="
                  w-full md:w-[45%] p-10 rounded-[35px]
                  bg-white/[0.03] backdrop-blur-2xl
                  border border-white/10
                  hover:border-red-500/40 hover:bg-white/[0.08]
                  shadow-[0_8px_40px_0_rgba(0,0,0,0.4)]
                  transition-all duration-500
                  cursor-pointer
                  relative group overflow-hidden
                "
              >
                {/* Animated gradient background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Glow effect */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-red-600/10 rounded-full blur-[60px] pointer-events-none group-hover:bg-red-500/15 transition-colors duration-700" />

                <div className="relative z-10">
                  {/* ROLE */}
                  <h3
                    className="
                      text-3xl
                      font-black
                      text-white
                      group-hover:text-red-400
                      transition-colors duration-300
                    "
                  >
                    {exp.role}
                  </h3>

                  {/* COMPANY */}
                  <p
                    className="
                      mt-2
                      text-red-400
                      font-bold
                      text-lg
                    "
                  >
                    {exp.company}
                  </p>

                  {/* DURATION */}
                  <p
                    className="
                      mt-2
                      text-sm
                      text-gray-400
                      tracking-wide
                    "
                  >
                    📅 {exp.duration}
                  </p>

                  {/* DESCRIPTION */}
                  <p
                    className="
                      mt-6
                      text-gray-300
                      leading-[1.8]
                      line-clamp-3
                    "
                  >
                    {exp.description}
                  </p>

                  {/* CLICK TO VIEW HINT */}
                  <p className="mt-4 text-red-400/60 text-sm font-light tracking-widest uppercase group-hover:text-red-300 transition-colors">
                    ✦ Click to View Details ✦
                  </p>

                  {/* TECH */}
                  <div
                    className="
                      mt-8
                      flex
                      flex-wrap
                      gap-3
                    "
                  >
                  {exp.tech.map((tech, techIndex) => (
                    <motion.span
                      key={techIndex}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: techIndex * 0.05 }}
                      className="
                        px-4
                        py-2
                        rounded-full
                        bg-red-600/15
                        backdrop-blur-md
                        border
                        border-red-500/30
                        text-sm
                        font-bold
                        text-red-300
                        hover:bg-red-500/25
                        transition-all
                      "
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

      </div>

    </section>

    {/* Experience Modal */}
    {selectedExperience && (
      <ExperienceModal
        experience={selectedExperience}
        isOpen={!!selectedExperience}
        onClose={() => setSelectedExperience(null)}
      />
    )}
    </>
  );
};

export default Experience;