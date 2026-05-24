import { useRef } from "react";

import gsap from "gsap";

const MagneticButton = ({ children }) => {

  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {

    const button = buttonRef.current;

    const rect = button.getBoundingClientRect();

    const x = e.clientX - (rect.left + rect.width / 2);

    const y = e.clientY - (rect.top + rect.height / 2);

    gsap.to(button, {
      x: x * 0.25,
      y: y * 0.25,
      duration: 0.4,
      ease: "power3.out",
    });

  };

  const handleMouseLeave = () => {

    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.3)",
    });

  };

  return (

    <button

      ref={buttonRef}

      onMouseMove={handleMouseMove}

      onMouseLeave={handleMouseLeave}

      className="
        px-8
        py-4

        rounded-full

        bg-red-600

        hover:bg-red-700

        transition-all
        duration-300

        font-semibold
        tracking-wide

        shadow-[0_0_25px_rgba(255,0,0,0.5)]

        relative
        overflow-hidden
      "
    >

      {/* GLOW */}
      <span
        className="
          absolute
          inset-0

          bg-gradient-to-r
          from-transparent
          via-white/10
          to-transparent

          opacity-0
          hover:opacity-100

          transition-all
          duration-500
        "
      ></span>

      {/* TEXT */}
      <span className="relative z-10">

        {children}

      </span>

    </button>

  );
};

export default MagneticButton;