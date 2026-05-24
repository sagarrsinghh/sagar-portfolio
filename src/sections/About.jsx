import { motion } from "framer-motion";
import GlassCard from "../components/GlassCard";

const About = () => {
  return (
    <section
      id="about"
      className="
        relative
        min-h-screen
        px-6
        md:px-16
        py-32
        flex
        items-center
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
          absolute
          top-20
          left-10
          w-[300px]
          h-[300px]
          bg-red-600/10
          rounded-full
          blur-[120px]
        "
      ></div>

      {/* CONTENT */}
      <div
        className="
          relative
          z-10
          max-w-7xl
          mx-auto
          grid
          grid-cols-1
          md:grid-cols-2
          gap-20
          items-center
        "
      >
        {/* LEFT SIDE */}
        <motion.div
          initial={{
            opacity: 0,
            x: -80,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 1,
          }}
          viewport={{
            once: true,
          }}
        >
          {/* SMALL TITLE */}
          <p
            className="
              text-red-500
              uppercase
              tracking-[6px]
              text-sm
              mb-5
            "
          >
            The Developer Behind The Mask
          </p>

          {/* MAIN TITLE */}
          <h2
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
            WHO IS
            <span className="block text-red-600">
              SAGAR?
            </span>
          </h2>

          {/* DESCRIPTION */}
          <p
            className="
              mt-10
              text-gray-300
              leading-[1.9]
              text-lg
            "
          >
            Every hero has an origin story. Mine started with a blank screen and a burning question — what if software could feel alive? I'm Sagar, a Full Stack Developer who builds digital experiences that don't just work — they move, they breathe, they hit. With React on the front and NestJS holding the back, I architect systems that scale and interfaces that stick. Zero boring UIs. I don't write code. I pull threads.
          </p>
          <p
            className="
              mt-6
              text-gray-300
              leading-[2]
              text-lg
            "
          >
            I’m a Full Stack Developer obsessed with building cinematic,
            immersive, and scalable digital experiences.
            From intelligent backend architectures with NestJS to
            futuristic frontend systems with React and animation engines,
            I craft products that feel alive.
            I don’t just build interfaces —
            I build experiences.
          </p>
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{
            opacity: 0,
            x: 80,
          }}
          whileInView={{
            opacity: 1,
            x: 0,
          }}
          transition={{
            duration: 1,
          }}
          viewport={{
            once: true,
          }}
          className="
            grid
            grid-cols-2
            gap-6
          "
        >
          {/* CARD 1 */}
          <GlassCard
            className="p-8 rounded-[30px]"
            yOffset={0}
            delay={0}
          >
            <h3
              className="
                text-5xl
                font-black
                text-red-500
              "
            >
              10+
            </h3>

            <p
              className="
                mt-4
                text-gray-300
              "
            >
              Projects Built
            </p>
          </GlassCard>

          {/* CARD 2 */}
          <GlassCard
            className="p-8 rounded-[30px] md:mt-12"
            yOffset={0}
            delay={0}
          >
            <h3
              className="
                text-5xl
                font-black
                text-red-500
              "
            >
              3+
            </h3>

            <p
              className="
                mt-4
                text-gray-300
              "
            >
              Full Stack Systems
            </p>
          </GlassCard>

          {/* CARD 3 */}
          <GlassCard
            className="p-8 rounded-[30px]"
            yOffset={0}
            delay={0}
          >
            <h3
              className="
                text-5xl
                font-black
                text-red-500
              "
            >
              React
            </h3>

            <p
              className="
                mt-4
                text-gray-300
              "
            >
              Frontend Experiences
            </p>
          </GlassCard>

          {/* CARD 4 */}
          <GlassCard
            className="p-8 rounded-[30px] md:mt-12"
            yOffset={0}
            delay={0}
          >
            <h3
              className="
                text-5xl
                font-black
                text-red-500
              "
            >
              NestJS
            </h3>

            <p
              className="
                mt-4
                text-gray-300
              "
            >
              Backend Architectures
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
};

export default About;