import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";

const certifications = [
  {
    title: "Oracle Cloud Infrastructure AI Foundation Associate",
    description: "Certified in foundational AI concepts and Oracle Cloud AI services.",
  },
  {
    title: "Software Engineering Job Simulation",
    description: "Completed software engineering and technology job simulation experience programs.",
  },
  {
    title: "Smart India Hackathon 2024",
    description: "Participated in national-level innovation and problem-solving hackathon.",
  },
];

const achievements = [
  {
    title: "Class Representative",
    description: "Representing B.Tech CSE batch while coordinating academics and communication.",
  },
  {
    title: "NCC Cadet",
    description: "Achieved A Grade Certificate and participated in NCC camp under 10 RAJ Battalion.",
  },
  {
    title: "Olympiads",
    description: "Secured 2nd position in GK Olympiad and 3rd position in Maths Olympiad.",
  },
];

const Achievements = () => {
  return (
    <section
      id="achievements"
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
          top-1/2
          left-1/2
          w-[600px]
          h-[600px]
          bg-red-600/10
          rounded-full
          blur-[180px]
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
          Recognition & Journey
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
          ACHIEVEMENT
          <span className="text-red-600">
            VAULT
          </span>
        </h2>
      </motion.div>

      {/* GRID */}
      <div
        className="
          relative
          z-10
          grid
          grid-cols-1
          lg:grid-cols-2
          gap-12
        "
      >
        {/* CERTIFICATIONS */}
        <div>
          <h3
            className="
              text-3xl
              font-black
              text-white
              mb-10
            "
          >
            Certifications
          </h3>

          <div className="space-y-8">
            {certifications.map((item, index) => (
              <GlassCard
                key={index}
                xOffset={-80}
                delay={index * 0.15}
                className="p-8 rounded-[30px]"
              >
                <h4
                  className="
                    text-xl
                    font-bold
                    text-white
                  "
                >
                  {item.title}
                </h4>

                <p
                  className="
                    mt-4
                    text-gray-300
                    leading-[1.8]
                  "
                >
                  {item.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>

        {/* ACHIEVEMENTS */}
        <div>
          <h3
            className="
              text-3xl
              font-black
              text-white
              mb-10
            "
          >
            Achievements
          </h3>

          <div className="space-y-8">
            {achievements.map((item, index) => (
              <GlassCard
                key={index}
                xOffset={80}
                delay={index * 0.15}
                className="p-8 rounded-[30px]"
              >
                <h4
                  className="
                    text-xl
                    font-bold
                    text-white
                  "
                >
                  {item.title}
                </h4>

                <p
                  className="
                    mt-4
                    text-gray-300
                    leading-[1.8]
                  "
                >
                  {item.description}
                </p>
              </GlassCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;