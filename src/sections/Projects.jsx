import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FiGithub, FiX } from "react-icons/fi";
import { useTransparentSpider } from "../hooks/useTransparentSpider";

const projects = [
  {
    title: "Smart Data Center Monitoring Platform",
    description:
      "A full-stack enterprise monitoring and predictive intelligence platform developed during internship at DOIT&C – Bhamashah State Data Centre. The system automates ingestion, parsing, processing, analytics, alerts, metrics visualization, and infrastructure monitoring.",
    fullDescription: "Enterprise-grade monitoring platform that processes real-time data from multiple data centers, implements sophisticated analytics algorithms, and provides actionable insights through interactive dashboards.",
    tech: ["React", "NestJS", "MySQL", "TypeORM", "JWT", "Prediction"],
    github: "https://github.com/sagarrsinghh/smart-data-center-platform",
    features: [
      "Real-time data ingestion from 1000+ sensors",
      "Predictive anomaly detection algorithms",
      "Interactive React dashboards with WebSockets",
      "Comprehensive REST APIs with JWT auth",
      "Advanced MySQL query optimization",
    ]
  },
  {
    title: "WHAT A DRAG",
    description:
      "A scalable full-stack e-commerce platform with product management, JWT authentication, RBAC, client-manager architecture, secure APIs, and interactive shopping experience built using NestJS and React.",
    fullDescription: "Complete e-commerce solution featuring advanced authentication, role-based access control, real-time inventory management, and a modern React frontend with comprehensive product management.",
    tech: ["React", "NestJS", "TypeScript", "MySQL", "TypeORM", "JWT"],
    github: "https://github.com/sagarrsinghh/What-a-Drag",
    features: [
      "Role-based access control (Admin/Manager/User)",
      "Real-time inventory management",
      "Secure payment integration",
      "Advanced search & filtering",
      "Order tracking system",
    ]
  },
  {
    title: "Promptaify AI Code Generator",
    description:
      "An AI-powered web tool that generates code through text or voice prompts using OpenRouter APIs. Built with Spring Boot backend and real-time AI response integration.",
    fullDescription: "Cutting-edge AI assistant that transforms natural language prompts into functional code using advanced LLM integration and real-time processing capabilities.",
    tech: ["Java", "SpringBoot", "SQL", "OpenAI API", "JavaScript"],
    github: null,
    features: [
      "Text & voice prompt processing",
      "Real-time code generation",
      "Multiple language support",
      "Code syntax highlighting",
      "Prompt history & management",
    ]
  },
  {
    title: "BillStack Invoice System",
    description:
      "A full-stack billing and invoice management system designed for handling customers, items, GST-aware invoice generation, and scalable business workflows with secure backend integration.",
    fullDescription: "Comprehensive billing solution with GST compliance, advanced invoice generation, multi-customer support, and enterprise-grade security for business operations.",
    tech: ["React", "Vite", "NodeJS", "Express", "MySQL", "GST Billing"],
    github: "https://github.com/sagarrsinghh/BillStack",
    features: [
      "GST-compliant invoice generation",
      "Multi-customer management",
      "Real-time report generation",
      "PDF export capabilities",
      "Advanced analytics dashboard",
    ]
  },
  {
    title: "MusicDB Platform",
    description:
      "A music rating and review platform inspired by IMDb that allows users to search, explore, and review music albums and artists with backend SQL integration.",
    fullDescription: "Social music discovery platform enabling users to rate, review, and explore music content with advanced search and recommendation features.",
    tech: ["Java", "SQL", "HTML", "CSS", "JavaScript"],
    github: "https://github.com/sagarrsinghh/MusicDB",
    features: [
      "Album & artist database",
      "User rating system",
      "Advanced search functionality",
      "Review & feedback system",
      "Recommendation engine",
    ]
  },
];

// Card dimensions — keep in sync with the inline style below
const CARD_W = 450;
const CARD_GAP = 40;
// +1 for the outro CTA card
const totalSlide = projects.length * (CARD_W + CARD_GAP);

// ── Progress dot: isolated so hooks are called at the top of this component ──
function ProgressDot({ scrollYProgress, index, total }) {
  const lo = Math.max(0, (index - 0.5) / total);
  const mid = index / total;
  const hi = Math.min(1, (index + 0.5) / total);

  const width = useTransform(scrollYProgress, [lo, mid, hi], ["8px", "28px", "8px"]);
  const opacity = useTransform(scrollYProgress, [lo, mid, hi], [0.3, 1, 0.3]);

  return (
    <motion.div
      className="h-1.5 rounded-full bg-red-500"
      style={{ width, opacity }}
    />
  );
}

// ── Project card ──
function ProjectCard({ project, index, transparentSpider, onCardClick, isMobile }) {
  return (
    <motion.div
      onClick={() => onCardClick(project, index)}
      whileHover={isMobile ? { scale: 1.01 } : { scale: 1.05 }}
      className="
        relative group flex flex-col justify-between
        flex-shrink-0
        rounded-[32px]
        bg-white/[0.03] backdrop-blur-2xl
        border border-white/10
        hover:border-red-500/40 hover:bg-white/[0.06]
        shadow-[0_8px_40px_0_rgba(0,0,0,0.4)]
        transition-all duration-500
        overflow-hidden
        p-8
        cursor-pointer
        w-full
        md:w-[450px]
      "
      style={isMobile ? { minHeight: "auto" } : { width: `${CARD_W}px`, minHeight: "480px" }}
    >
      {/* Hover gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      {/* Big index number */}
      <div className="absolute -bottom-4 right-2 text-[120px] font-black text-white/[0.025] group-hover:text-red-500/[0.06] transition-colors duration-500 pointer-events-none select-none leading-none">
        0{index + 1}
      </div>

      {/* Spider badge */}
      {transparentSpider && (
        <img
          src={transparentSpider}
          alt="Spider Badge"
          className="absolute top-6 right-6 w-6 h-6 opacity-20 group-hover:opacity-100 group-hover:rotate-[360deg] group-hover:scale-125 transition-all duration-700 pointer-events-none"
          style={{ filter: "drop-shadow(0 0 8px rgba(239,68,68,0.9))" }}
        />
      )}

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col">
        <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white group-hover:text-red-400 transition-colors duration-300 pr-8">
          {project.title}
        </h3>

        <p className="mt-5 text-gray-300/80 text-sm md:text-base leading-relaxed flex-1">
          {project.description}
        </p>

        <div className="mt-7 mb-7 flex flex-wrap gap-2.5">
          {project.tech.map((tech, techIndex) => (
            <motion.span
              key={techIndex}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: techIndex * 0.05 }}
              className="px-4 py-2 rounded-lg bg-red-600/15 backdrop-blur-md border border-red-500/30 text-xs font-bold text-red-400/90 tracking-widest uppercase hover:bg-red-500/25 transition-all cursor-default"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="relative z-10 mt-auto">
        {project.github ? (
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-widest uppercase rounded-full border border-red-500/30 bg-red-500/5 hover:bg-red-500 hover:text-white text-red-300 transition-all duration-300"
          >
            <FiGithub className="w-4 h-4" />
            View Source
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold tracking-widest uppercase rounded-full border border-gray-500/30 text-gray-500 bg-black/20">
            Private Repository
          </span>
        )}
      </div>
    </motion.div>
  );
}

// ── Expanded Modal ──
function ExpandedModal({ project, index, isOpen, onClose, transparentSpider }) {
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
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            onWheel={(e) => e.stopPropagation()}
            onTouchMove={(e) => e.stopPropagation()}
            tabIndex={-1}
            role="dialog"
            aria-modal="true"
            className="
              fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
              w-[90%] max-w-2xl
              max-h-[85vh]
              overflow-hidden
              z-[9995]
              rounded-[40px]
              bg-white/[0.08] backdrop-blur-3xl
              border border-white/20
              shadow-2xl
              p-8
              md:p-10
              flex
              flex-col
            "
          >
            {/* Close button - Fixed absolute and positioned lower to clear fixed navbar */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                onClose();
              }}
              className="absolute top-10 right-10 md:top-12 md:right-12 p-2.5 hover:bg-white/10 rounded-full transition-all duration-300 z-[60] cursor-pointer pointer-events-auto"
              style={{ pointerEvents: "auto" }}
              aria-label="Close modal"
            >
              <FiX className="w-6 h-6 text-white" />
            </button>

            {/* Scrollable container for modal contents */}
            <div 
              className="overflow-y-auto pr-2 max-h-[calc(85vh-80px)] mt-12 md:mt-14 overscroll-contain"
              style={{ overscrollBehavior: "contain" }}
            >
              {/* Index number */}
              <div className="text-7xl font-black text-white/[0.08] mb-6">
                0{index + 1}
              </div>

            {/* Content */}
            <div>
              <div className="flex items-center gap-4 mb-6">
                {transparentSpider && (
                  <img
                    src={transparentSpider}
                    alt="Spider Badge"
                    className="w-8 h-8 opacity-70"
                    style={{ filter: "drop-shadow(0 0 12px rgba(239,68,68,0.6))" }}
                  />
                )}
                <h2 className="text-4xl md:text-5xl font-black text-white">
                  {project.title}
                </h2>
              </div>

              <p className="text-gray-300 text-lg leading-relaxed mb-8">
                {project.description}
              </p>

              {/* Full Description */}
              {project.fullDescription && (
                <div className="mb-8 p-6 rounded-2xl bg-white/[0.04] border border-white/10">
                  <p className="text-gray-300 leading-relaxed">
                    {project.fullDescription}
                  </p>
                </div>
              )}

              {/* Key Features */}
              {project.features && project.features.length > 0 && (
                <div className="mb-10">
                  <h3 className="text-red-400 uppercase tracking-widest text-sm font-bold mb-4">
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {project.features.map((feature, idx) => (
                      <motion.div
                        key={idx}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: idx * 0.08 }}
                        className="flex items-start gap-3 p-3 rounded-lg bg-red-500/5 border border-red-500/20"
                      >
                        <span className="text-red-500 text-lg mt-0.5 flex-shrink-0">✦</span>
                        <span className="text-gray-300 text-sm leading-relaxed">{feature}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}

              {/* Tech Stack */}
              <div className="mb-10">
                <h3 className="text-red-400 uppercase tracking-widest text-sm font-bold mb-4">
                  Technologies Used
                </h3>
                <div className="flex flex-wrap gap-3">
                  {project.tech.map((tech, idx) => (
                    <motion.span
                      key={idx}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="px-4 py-2.5 rounded-xl bg-red-500/10 backdrop-blur-md border border-red-500/30 text-red-300 text-sm font-bold tracking-wider uppercase hover:bg-red-500/20 transition-colors"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="flex gap-4 pt-8 border-t border-white/10">
                {project.github ? (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      flex items-center gap-3
                      px-8 py-4
                      rounded-full
                      bg-red-600 hover:bg-red-500
                      text-white
                      text-sm font-bold tracking-widest uppercase
                      shadow-[0_0_30px_rgba(239,68,68,0.4)]
                      hover:shadow-[0_0_50px_rgba(239,68,68,0.7)]
                      transition-all duration-300
                    "
                  >
                    <FiGithub className="w-5 h-5" />
                    View on GitHub
                  </a>
                ) : (
                  <div className="px-8 py-4 rounded-full bg-gray-500/10 text-gray-400 text-sm font-bold tracking-widest uppercase border border-gray-500/20">
                    Private Repository
                  </div>
                )}
              </div>
            </div>
          </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

// ── Main section ──
const Projects = () => {
  const [selectedCard, setSelectedCard] = useState(null);
  const transparentSpider = useTransparentSpider();
  const targetRef = useRef(null);
  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    // "start start" → when the section's top hits the viewport top
    // "end end"     → when the section's bottom hits the viewport bottom
    offset: ["start start", "end end"],
  });

  // Drive card track: starts at 0, ends when last card is centred
  const x = useTransform(scrollYProgress, [0, 1], [0, -totalSlide]);

  // Title fades out quickly once scrolling begins
  const titleOpacity = useTransform(scrollYProgress, [0, 0.07], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.07], [0, -24]);

  // Section height = scroll distance needed for all cards to pass
  // Minimal buffer to eliminate gap - cards finish scrolling right when section ends
  const sectionHeight = `calc(${totalSlide}px + 5vh)`;

  if (isMobile) {
    return (
      <>
      <section
        id="projects"
        className="relative bg-transparent py-24 px-6 w-full"
      >
        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/4 w-[280px] h-[280px] bg-red-600/5 rounded-full blur-[100px] pointer-events-none -z-10" />

        {/* Heading */}
        <div className="w-full text-center z-20 mb-16 flex-shrink-0">
          <p className="text-red-500 uppercase tracking-[8px] text-xs font-semibold mb-3">
            Featured Creations
          </p>
          <h2
            className="text-4xl font-black text-white"
            style={{ fontFamily: "Orbitron" }}
          >
            PROJECT<span className="text-red-600">VERSE</span>
          </h2>
        </div>

        {/* Vertical Stack List */}
        <div className="w-full flex flex-col items-center gap-8 max-w-xl mx-auto">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              index={index}
              transparentSpider={transparentSpider}
              onCardClick={(proj, idx) => setSelectedCard({ project: proj, index: idx })}
              isMobile={true}
            />
          ))}

          {/* Outro Card */}
          <div
            className="
              relative group flex flex-col justify-center
              rounded-[32px] overflow-hidden p-8
              border border-red-500/20
              bg-gradient-to-br from-red-950/20 via-black/60 to-black/80
              backdrop-blur-2xl
              shadow-[0_8px_40px_0_rgba(180,0,0,0.15)]
              transition-all duration-500
              hover:border-red-500/50 hover:shadow-[0_8px_60px_0_rgba(200,0,0,0.3)]
              w-full
            "
            style={{ minHeight: "360px" }}
          >
            {/* Web-line decoration */}
            <svg
              className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
              viewBox="0 0 450 480"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {[0,1,2,3,4,5].map(i => (
                <line key={i} x1="225" y1="0" x2={i*90} y2="480" stroke="#ef4444" strokeWidth="1"/>
              ))}
              {[60,120,180,240,300,360,420].map((y,i) => (
                <ellipse key={i} cx="225" cy={y} rx={225 - i*5} ry="30" stroke="#ef4444" strokeWidth="1"/>
              ))}
            </svg>

            <div className="relative z-10">
              <p className="text-red-500 uppercase tracking-[6px] text-xs font-semibold mb-6">
                There's more
              </p>

              <h2
                className="text-4xl font-black text-white leading-tight mb-6"
                style={{ fontFamily: "Orbitron" }}
              >
                WANT TO
                <br />
                <span className="text-red-500">SEE MORE?</span>
              </h2>

              <p className="text-gray-400 text-sm leading-relaxed mb-10">
                I'm constantly building new things. Let's create something extraordinary together.
              </p>

              <a
                href="https://github.com/sagarrsinghh"
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center gap-3
                  w-full sm:w-auto px-8 py-4
                  rounded-full
                  bg-red-600 hover:bg-red-500
                  text-white
                  text-sm font-bold tracking-widest uppercase
                  shadow-[0_0_30px_rgba(239,68,68,0.4)]
                  hover:shadow-[0_0_50px_rgba(239,68,68,0.7)]
                  transition-all duration-300
                  group/btn
                "
              >
                <FiGithub className="w-5 h-5" />
                View GitHub
                <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Expanded Modal */}
      {selectedCard && (
        <ExpandedModal
          project={selectedCard.project}
          index={selectedCard.index}
          isOpen={!!selectedCard}
          onClose={() => setSelectedCard(null)}
          transparentSpider={transparentSpider}
        />
      )}
      </>
    );
  }

  return (
    <>
    <section
      ref={targetRef}
      id="projects"
      className="relative bg-transparent"
      style={{ height: sectionHeight }}
    >
      {/* ── Sticky viewport — stays on screen until all cards pass ── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center gap-8 md:gap-12 py-8">

        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-red-600/10 rounded-full blur-[160px] pointer-events-none -z-10" />

        {/* Heading — visible only at the very start */}
        <motion.div
          style={{ opacity: titleOpacity, y: titleY }}
          className="w-full text-center z-20 px-6 pointer-events-none flex-shrink-0"
        >
          <p className="text-red-500 uppercase tracking-[8px] text-xs font-semibold mb-3">
            Featured Creations
          </p>
          <h2
            className="text-4xl md:text-6xl font-black text-white"
            style={{ fontFamily: "Orbitron" }}
          >
            PROJECT<span className="text-red-600">VERSE</span>
          </h2>
          <p className="text-gray-400 mt-4 text-sm animate-pulse tracking-widest">
            SCROLL DOWN TO EXPLORE ↓
          </p>
        </motion.div>

        {/* Horizontal track */}
        <div className="w-full flex items-center px-10 md:px-20 overflow-visible flex-grow">
          <motion.div
            style={{ x, gap: `${CARD_GAP}px` }}
            className="flex items-stretch"
          >
            {projects.map((project, index) => (
              <ProjectCard
                key={index}
                project={project}
                index={index}
                transparentSpider={transparentSpider}
                onCardClick={(proj, idx) => setSelectedCard({ project: proj, index: idx })}
              />
            ))}

            {/* ── Outro CTA card ── */}
            <div
              className="
                relative group flex-shrink-0 flex flex-col justify-center
                rounded-[32px] overflow-hidden p-10
                border border-red-500/20
                bg-gradient-to-br from-red-950/20 via-black/60 to-black/80
                backdrop-blur-2xl
                shadow-[0_8px_40px_0_rgba(180,0,0,0.15)]
                transition-all duration-500
                hover:border-red-500/50 hover:shadow-[0_8px_60px_0_rgba(200,0,0,0.3)]
              "
              style={{ width: `${CARD_W}px`, minHeight: "480px" }}
            >
              {/* Web-line decoration */}
              <svg
                className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none"
                viewBox="0 0 450 480"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {[0,1,2,3,4,5].map(i => (
                  <line key={i} x1="225" y1="0" x2={i*90} y2="480" stroke="#ef4444" strokeWidth="1"/>
                ))}
                {[60,120,180,240,300,360,420].map((y,i) => (
                  <ellipse key={i} cx="225" cy={y} rx={225 - i*5} ry="30" stroke="#ef4444" strokeWidth="1"/>
                ))}
              </svg>

              {/* Glow orb */}
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-red-600/20 rounded-full blur-[80px] pointer-events-none group-hover:bg-red-500/30 transition-colors duration-700" />

              {/* Content */}
              <div className="relative z-10">
                <p className="text-red-500 uppercase tracking-[6px] text-xs font-semibold mb-6">
                  There's more
                </p>

                <h2
                  className="text-5xl md:text-6xl font-black text-white leading-tight mb-6"
                  style={{ fontFamily: "Orbitron" }}
                >
                  WANT TO
                  <br />
                  <span className="text-red-500">SEE MORE?</span>
                </h2>

                <p className="text-gray-400 text-base leading-relaxed mb-10 max-w-xs">
                  I'm constantly building new things. Let's create something extraordinary together.
                </p>

                <a
                  href="https://github.com/sagarrsinghh"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    inline-flex items-center gap-3
                    px-8 py-4
                    rounded-full
                    bg-red-600 hover:bg-red-500
                    text-white
                    text-sm font-bold tracking-widest uppercase
                    shadow-[0_0_30px_rgba(239,68,68,0.4)]
                    hover:shadow-[0_0_50px_rgba(239,68,68,0.7)]
                    transition-all duration-300
                    group/btn
                  "
                >
                  <FiGithub className="w-5 h-5" />
                  View GitHub
                  <span className="inline-block transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Progress dots */}
        <div className="absolute bottom-8 left-0 w-full flex justify-center gap-2 z-20 pointer-events-none">
          {projects.map((_, i) => (
            <ProgressDot
              key={i}
              scrollYProgress={scrollYProgress}
              index={i}
              total={projects.length}
            />
          ))}
        </div>
      </div>
    </section>

    {/* Expanded Modal */}
    {selectedCard && (
      <ExpandedModal
        project={selectedCard.project}
        index={selectedCard.index}
        isOpen={!!selectedCard}
        onClose={() => setSelectedCard(null)}
        transparentSpider={transparentSpider}
      />
    )}
    </>
  );
};

export default Projects;