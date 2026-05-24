import { useEffect, useState } from "react";
import thunderSound from "../assets/sounds/thunder.mp3";

const createBolt = () => {

  const points = [];

  let x = 50;

  for (let i = 0; i < 12; i++) {

    x += (Math.random() - 0.5) * 20;

    points.push(`${x}% ${i * 10}%`);

  }

  return points.join(", ");
};

const Lightning = ({ storm, setLightningFlash }) => {

  const [bolts, setBolts] = useState([]);

  useEffect(() => {

    if (!storm) return;

    const thunder = new Audio(thunderSound);
    thunder.volume = 0.35;

    let intervalId = null;
    const flashTimeouts = [];
    const boltRemovalTimeouts = [];

    const clearPendingTimeouts = () => {
      flashTimeouts.forEach(clearTimeout);
      boltRemovalTimeouts.forEach(clearTimeout);
      flashTimeouts.length = 0;
      boltRemovalTimeouts.length = 0;
    };

    const triggerBolt = () => {
      const id = Date.now();
      const left = Math.random() * 100;
      const top = Math.random() * 20;
      const size = Math.random() * 300 + 200;
      const opacity = Math.random() * 0.5 + 0.5;

      const bolt = {
        id,
        left,
        top,
        size,
        opacity,
        path: createBolt(),
      };

      thunder.currentTime = 0;
      thunder.play().catch(() => {});
      setLightningFlash(true);

      const flashDuration =
        thunder.duration && !Number.isNaN(thunder.duration)
          ? thunder.duration * 1000
          : 180;

      flashTimeouts.push(
        setTimeout(() => {
          setLightningFlash(false);
        }, flashDuration)
      );

      setBolts((prev) => [...prev, bolt]);

      boltRemovalTimeouts.push(
        setTimeout(() => {
          setBolts((prev) => prev.filter((b) => b.id !== id));
        }, 250)
      );
    };

    const startInterval = (delay) => {
      if (intervalId) clearInterval(intervalId);
      intervalId = setInterval(triggerBolt, delay);
    };

    const initialDelay = 4000;
    startInterval(initialDelay);

    const updateInterval = () => {
      const durationMs =
        thunder.duration && !Number.isNaN(thunder.duration)
          ? thunder.duration * 1000
          : 0;

      if (durationMs > 0) {
        startInterval(Math.max(4000, durationMs + 2000));
      }
    };

    if (thunder.readyState >= 1) {
      updateInterval();
    } else {
      thunder.addEventListener("loadedmetadata", updateInterval);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
      clearPendingTimeouts();
      thunder.pause();
      thunder.currentTime = 0;
      thunder.removeEventListener("loadedmetadata", updateInterval);
    };

  }, [storm]);

  if (!storm) return null;

  return (

    <div className="fixed inset-0 z-5 pointer-events-none">

      {bolts.map((bolt) => (

        <div
          key={bolt.id}
          className="
            absolute
            animate-pulse
          "
          style={{
            left: `${bolt.left}%`,
            top: `${bolt.top}%`,
            opacity: bolt.opacity,
          }}
        >

          {/* MAIN LIGHTNING */}
          <svg
            width={bolt.size}
            height={bolt.size}
            viewBox="0 0 100 100"
            className="overflow-visible"
          >

            <polyline
              points={bolt.path}
              fill="none"
              stroke="white"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"

              style={{
                filter:
                  "drop-shadow(0 0 12px white) drop-shadow(0 0 25px rgba(255,255,255,0.9))",
              }}
            />

          </svg>

          {/* LIGHT GLOW */}
          <div
            className="
              absolute
              inset-0
              rounded-full
            "
            style={{
              background:
                "radial-gradient(circle, rgba(255,255,255,0.35), transparent 70%)",

              filter: "blur(60px)",
            }}
          ></div>

        </div>

      ))}

    </div>
  );
};

export default Lightning;