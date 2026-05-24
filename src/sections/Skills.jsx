import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const skills = [

  {
    name: "React",
    x: "18%",
    y: "18%",
  },

  {
    name: "NestJS",
    x: "72%",
    y: "20%",
  },

  {
    name: "NodeJS",
    x: "50%",
    y: "10%",
  },

  {
    name: "MySQL",
    x: "78%",
    y: "55%",
  },

  {
    name: "MongoDB",
    x: "30%",
    y: "52%",
  },

  {
    name: "TypeScript",
    x: "55%",
    y: "38%",
  },

  {
    name: "Java",
    x: "15%",
    y: "75%",
  },

  {
    name: "C++",
    x: "45%",
    y: "80%",
  },

  {
    name: "DSA",
    x: "75%",
    y: "78%",
  },

  {
    name: "TypeORM",
    x: "62%",
    y: "65%",
  },

  {
    name: "Tailwind",
    x: "10%",
    y: "40%",
  },

  {
    name: "Postman",
    x: "85%",
    y: "38%",
  },

];

const Skills = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (

    <section

      id="skills"

      className="
        relative
        min-h-screen

        overflow-hidden

        px-6
        md:px-16

        py-32
      "
    >

      {/* BACKGROUND GLOW */}
      <div
        className="
          absolute
          top-1/2
          left-1/2

          w-[500px]
          h-[500px]

          bg-red-600/10

          rounded-full

          blur-[150px]

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

          mb-24
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
          Powers & Abilities
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
          SKILL
          <span className="text-red-600">
            WEB
          </span>
        </h2>

      </motion.div>

      {/* MOBILE SKILLS GRIDFallback */}
      {isMobile ? (
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.85 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05 }}
              className="relative group p-5 rounded-2xl bg-white/[0.02] backdrop-blur-xl border border-red-500/20 text-center shadow-[0_0_15px_rgba(255,0,0,0.06)] hover:border-red-500/60 hover:shadow-[0_0_25px_rgba(255,0,0,0.25)] transition-all duration-300 cursor-default"
            >
              {/* Internal glow spot */}
              <div className="absolute inset-0 rounded-2xl bg-red-600/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              
              <span className="relative z-10 text-xs font-bold text-gray-300 group-hover:text-white font-mono tracking-widest uppercase">
                {skill.name}
              </span>
            </motion.div>
          ))}
        </div>
      ) : (
        /* DESKTOP WEB CONTAINER */
        <div
          className="
            relative
            z-10

            w-full
            h-[700px]
          "
        >

          {/* WEB LINES */}
          <svg
            className="
              absolute
              inset-0
              w-full
              h-full
            "
          >

            {skills.map((skill, index) => (

              skills.map((target, targetIndex) => {

                if (index === targetIndex) return null;

                return (

                  <line

                    key={`${index}-${targetIndex}`}

                    x1={skill.x}
                    y1={skill.y}

                    x2={target.x}
                    y2={target.y}

                    stroke="rgba(255,0,0,0.12)"
                    strokeWidth="1"

                  />

                );

              })

            ))}

          </svg>

          {/* SKILL NODES */}
          {skills.map((skill, index) => (

            <motion.div

              key={index}

              initial={{
                opacity: 0,
                scale: 0,
              }}

              whileInView={{
                opacity: 1,
                scale: 1,
              }}

              transition={{
                duration: 0.6,
                delay: index * 0.15,
              }}

              viewport={{
                once: true,
              }}

              whileHover={{
                scale: 1.15,
              }}

              className="
                absolute
                group
              "

              style={{
                left: skill.x,
                top: skill.y,
                transform: "translate(-50%, -50%)",
              }}
            >

              {/* GLOW */}
              <div
                className="
                  absolute
                  inset-0

                  rounded-full

                  bg-red-600/20

                  blur-2xl

                  scale-150

                  opacity-0
                  group-hover:opacity-100

                  transition-all
                  duration-500
                "
              ></div>

              {/* NODE */}
              <div
                className="
                  relative

                  px-8
                  py-5

                  rounded-full

                  bg-white/5

                  backdrop-blur-xl

                  border
                  border-red-500/30

                  text-white
                  font-semibold

                  tracking-wide

                  shadow-[0_0_25px_rgba(255,0,0,0.15)]

                  hover:border-red-500
                  hover:shadow-[0_0_40px_rgba(255,0,0,0.4)]

                  transition-all
                  duration-500
                "
              >

                {skill.name}

              </div>

            </motion.div>

          ))}

        </div>
      )}

    </section>
  );
};

export default Skills;