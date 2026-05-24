import { motion } from "framer-motion";

const dustParticles = [...Array(45)];

const StormDust = ({ storm }) => {

  if (!storm) return null;

  return (

    <div
      className="
        fixed
        inset-0
        pointer-events-none
        overflow-hidden
        z-[3]
      "
    >

      {dustParticles.map((_, index) => {

        const size = Math.random() * 120 + 40;

        const top = Math.random() * 100;

        const duration = Math.random() * 15 + 10;

        const delay = Math.random() * 5;

        return (

          <motion.div

            key={index}

            initial={{
              x: "-20vw",
              opacity: 0,
            }}

            animate={{
              x: "120vw",
              opacity: [0, 0.12, 0],
            }}

            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "linear",
            }}

            className="
              absolute
              rounded-full
              bg-white
            "

            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${top}%`,
              filter: "blur(45px)",
            }}

          ></motion.div>

        );

      })}

    </div>
  );
};

export default StormDust;