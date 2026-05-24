import { useState } from "react";
import spiderLogo from "../assets/images/spider-logo.jpg";
import { FiMenu, FiX, FiVideo } from "react-icons/fi";

const Navbar = ({ activePortfolio = "tech" }) => {

  const [open, setOpen] = useState(false);

  const navLinks = activePortfolio === "tech"
    ? ["About", "Skills", "Projects", "Contact"]
    : ["Showreel", "Edits", "Toolkit", "Contact"];

  return (

    <nav
      className="
        fixed
        top-0
        left-0
        w-full
        z-50
        px-6
        py-5
      "
    >

      {/* NAV CONTAINER */}
      <div
        className="
          max-w-7xl
          mx-auto
          flex
          items-center
          justify-between

          bg-black/55
          backdrop-blur-2xl

          border
          border-red-500/35

          rounded-full

          px-8
          py-3.5

          shadow-[0_0_30px_rgba(220,38,38,0.18)]
          hover:shadow-[0_0_45px_rgba(220,38,38,0.32)]
          transition-all
          duration-500
        "
      >

        {/* LOGO */}
        <div
          className="
            flex
            items-center
            gap-2.5
            cursor-pointer
            group
          "
        >
          {activePortfolio === "tech" ? (
            <img
              src={spiderLogo}
              alt="Spidey"
              className="
                w-6
                h-6
                object-contain
                rounded-full
                transition-transform
                duration-700
                group-hover:rotate-[360deg]
              "
              style={{
                filter: "contrast(2.5) brightness(0.95) invert(1) drop-shadow(0 0 5px rgba(239, 68, 68, 0.85))",
                mixBlendMode: "screen",
              }}
            />
          ) : (
            <FiVideo 
              className="
                w-6
                h-6
                text-red-500
                filter
                drop-shadow-[0_0_5px_rgba(239,68,68,0.85)]
                transition-transform
                duration-700
                group-hover:rotate-[360deg]
              "
            />
          )}
          <span
            className="
              text-xl
              font-black
              tracking-[3px]
              bg-gradient-to-r
              from-red-500
              to-red-700
              bg-clip-text
              text-transparent
              transition-all
              duration-300
              group-hover:from-red-400
              group-hover:to-red-600
            "
            style={{
              fontFamily: "Orbitron",
            }}
          >
            {activePortfolio === "tech" ? "DEVELOPER" : "DIRECTOR"}
          </span>
        </div>

        {/* DESKTOP NAV */}
        <div
          className="
            hidden
            md:flex
            items-center
            gap-8
          "
        >

          {navLinks.map((link, index) => (

            <a
              key={index}
              href={`#${link.toLowerCase()}`}
              className="
                relative
                text-gray-300
                hover:text-red-500
                transition-all
                duration-300
                tracking-wide
                group
              "
            >

              {link}

              {/* UNDERLINE */}
              <span
                className="
                  absolute
                  left-0
                  -bottom-2
                  w-0
                  h-[2.5px]
                  bg-gradient-to-r
                  from-red-500
                  via-red-600
                  to-red-700
                  transition-all
                  duration-300
                  group-hover:w-full
                  shadow-[0_0_10px_rgba(239,68,68,0.8)]
                "
              ></span>

            </a>

          ))}


        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setOpen(!open)}
          className="
            md:hidden
            text-3xl
            text-red-500
          "
        >

          {open ? <FiX /> : <FiMenu />}

        </button>

      </div>

      {/* MOBILE MENU */}
      {open && (

        <div
          className="
            md:hidden
            mt-4

            bg-black/90
            backdrop-blur-xl

            border
            border-red-500/20

            rounded-3xl

            p-6

            flex
            flex-col
            gap-6

            shadow-[0_0_40px_rgba(255,0,0,0.12)]
          "
        >

          {navLinks.map((link, index) => (

            <a
              key={index}
              href={`#${link.toLowerCase()}`}
              onClick={() => setOpen(false)}
              className="
                text-gray-300
                hover:text-red-500
                transition-all
                duration-300
                text-lg
              "
            >
              {link}
            </a>

          ))}


        </div>

      )}

    </nav>
  );
};

export default Navbar;