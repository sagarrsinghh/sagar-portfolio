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

      {/* WEB CONTAINER */}
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

    </section>
  );
};

export default Skills;