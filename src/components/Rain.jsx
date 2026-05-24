import { motion } from "framer-motion";
import { useEffect } from "react";
import rainSound from "../assets/sounds/Rain.mp3";

const rainDrops = [...Array(220)];

const Rain = ({ storm }) => {
  useEffect(() => {
    if (!storm) return;

    const rainAudio = new Audio(rainSound);
    rainAudio.loop = true;
    rainAudio.volume = 0.22;
    rainAudio.play().catch(() => {});

    return () => {
      rainAudio.pause();
      rainAudio.currentTime = 0;
    };
  }, [storm]);

  if (!storm) return null;

  return (

    <div
      className="
        fixed
        inset-0
        pointer-events-none
        overflow-hidden
        z-2
      "
    >

      {rainDrops.map((_, index) => {

        const left = Math.random() * 100;

        const duration = Math.random() * 0.35 + 0.35;

        const delay = Math.random() * 2;

        const height = Math.random() * 35 + 15;

        const opacity = Math.random() * 0.7 + 0.3;

        return (

          <motion.div

            key={index}

            initial={{
              y: "-20vh",
              opacity: 0,
            }}

            animate={{
              y: "120vh",
              opacity: [0, opacity, 0],
            }}

            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "linear",
            }}

            className="
              absolute
              w-0.5
              rounded-full

              bg-linear-to-b
              from-white/0
              via-blue-200
              to-white/0
            "

            style={{
              left: `${left}%`,
              height: `${height}px`,
              filter: "blur(0.4px)",
              transform: "rotate(8deg)",
            }}

          ></motion.div>

        );

      })}

    </div>
  );
};

export default Rain;