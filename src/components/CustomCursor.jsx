import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useTransparentSpider } from "../hooks/useTransparentSpider";

const CustomCursor = () => {
  const transparentSpider = useTransparentSpider();
  const cursorRef = useRef(null);
  const ringRef = useRef(null);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      return (
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
      );
    };

    if (checkTouch()) {
      setIsTouchDevice(true);
      return;
    }

    // Set initial offset using GSAP to prevent style collisions
    gsap.set(cursorRef.current, { xPercent: -50, yPercent: -50 });
    gsap.set(ringRef.current, { xPercent: -50, yPercent: -50 });

    const moveCursor = (e) => {
      gsap.to(cursorRef.current, {
        x: e.clientX,
        y: e.clientY,
        xPercent: -50,
        yPercent: -50,
        duration: 0.08,
      });

      gsap.to(ringRef.current, {
        x: e.clientX,
        y: e.clientY,
        xPercent: -50,
        yPercent: -50,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    const handleMouseDown = () => {
      gsap.to(cursorRef.current, { scale: 0.75, duration: 0.15 });
      gsap.to(ringRef.current, { scale: 1.4, duration: 0.15 });
    };

    const handleMouseUp = () => {
      gsap.to(cursorRef.current, { scale: 1, duration: 0.15 });
      gsap.to(ringRef.current, { scale: 1, duration: 0.15 });
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <>
      {/* MAIN CURSOR */}
      <div
        ref={cursorRef}
        className="
          fixed
          top-0
          left-0
          w-8
          h-8
          z-[9999]
          pointer-events-none
          flex
          items-center
          justify-center
        "
      >
        {/* SPIDER LOGO IMAGE CURSOR - JUST THE GLOWING SPIDER STRUCTURE */}
        {transparentSpider && (
          <img
            src={transparentSpider}
            alt="Spider Logo Cursor"
            className="w-8 h-8 object-contain pointer-events-none"
            style={{
              filter: "drop-shadow(0 0 6px rgba(239, 68, 68, 0.95)) drop-shadow(0 0 2px rgba(0, 0, 0, 1))",
            }}
          />
        )}
      </div>

      {/* OUTER RING */}
      <div
        ref={ringRef}
        className="
          fixed
          top-0
          left-0
          w-10
          h-10
          rounded-full
          border
          border-black/60
          z-[9998]
          pointer-events-none
        "
        style={{
          boxShadow: "0 0 25px rgba(0,0,0,0.95), 0 0 8px rgba(239,68,68,0.22)",
        }}
      ></div>

    </>

  );
};

export default CustomCursor;