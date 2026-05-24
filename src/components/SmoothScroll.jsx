import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

const SmoothScroll = () => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      lerp: 0.1,
      smoothWheel: true,
      smoothTouch: false,
      // Use the document root as the scroll element — this keeps window.scrollY
      // in sync naturally, which is what Framer Motion's useScroll reads.
      wrapper: window,
      content: document.documentElement,
    });

    let rafId;
    function raf(time) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });

    if (document.body) {
      resizeObserver.observe(document.body);
    }

    const timeoutId = setTimeout(() => {
      lenis.resize();
    }, 100);

    window.__lenis = lenis;

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      clearTimeout(timeoutId);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
};

export default SmoothScroll;