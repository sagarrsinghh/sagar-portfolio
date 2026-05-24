import { motion } from "framer-motion";
import { useTransparentSpider } from "../hooks/useTransparentSpider";

const particles = [...Array(25)];

const Particles = () => {
  const transparentSpider = useTransparentSpider();

  return (

    <div
      className="
        fixed
        inset-0
        overflow-hidden
        pointer-events-none
        z-[1]
      "
    >

      {particles.map((_, index) => {

        const size = Math.random() * 10 + 10;

        const left = Math.random() * 100;

        const duration = Math.random() * 12 + 12;

        const delay = Math.random() * 8;

        const rotate = Math.random() * 360;

        return (

          <motion.div

            key={index}

            initial={{
              y: "100vh",
              rotate: rotate,
              opacity: 0,
            }}

            animate={{
              y: "-10vh",
              rotate: rotate + (Math.random() > 0.5 ? 90 : -90),
              opacity: [0, 0.75, 0],
            }}

            transition={{
              duration,
              repeat: Infinity,
              delay,
              ease: "linear",
            }}

            className="absolute flex items-center justify-center pointer-events-none"

            style={{
              width: `${size}px`,
              height: `${size}px`,
              left: `${left}%`,
            }}

          >
            {transparentSpider && (
              <img
                src={transparentSpider}
                alt="Black Spider Particle"
                className="w-full h-full object-contain"
                style={{
                  filter: "drop-shadow(0 0 4px rgba(239, 68, 68, 0.95)) drop-shadow(0 0 1px rgba(0, 0, 0, 0.9))",
                }}
              />
            )}
          </motion.div>

        );

      })}

    </div>

  );
};

export default Particles;