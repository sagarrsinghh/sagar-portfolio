import { motion } from "framer-motion";

const Fog = ({ storm }) => {

  if (!storm) return null;

  return (

    <div
      className="
        fixed
        inset-0
        overflow-hidden
        pointer-events-none
        z-[2]
      "
    >

      {[...Array(6)].map((_, index) => (

        <motion.div

          key={index}

          initial={{
            x: "-30vw",
          }}

          animate={{
            x: "130vw",
          }}

          transition={{
            duration: 25 + index * 5,
            repeat: Infinity,
            ease: "linear",
          }}

          className="
            absolute
            rounded-full
            bg-white/10
          "

          style={{
            width: `${500 + index * 120}px`,
            height: `${180 + index * 60}px`,
            top: `${index * 15}%`,
            filter: "blur(90px)",
          }}

        ></motion.div>

      ))}

    </div>
  );
};

export default Fog;