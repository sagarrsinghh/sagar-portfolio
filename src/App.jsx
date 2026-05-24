import { useEffect, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import WebBackground from "./components/WebBackground";
import CustomCursor from "./components/CustomCursor";
import Loader from "./components/Loader";
import Particles from "./components/Particles";
import Rain from "./components/Rain";
import Lightning from "./components/Lightning";
import StormDust from "./components/StormDust";
import Fog from "./components/Fog";
import WebShooter from "./components/WebShooter";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Achievements from "./sections/Achievements";
import Contact from "./sections/Contact";
import SmoothScroll from "./components/SmoothScroll";
import WebScrollProgress from "./components/WebScrollProgress";
import AudioController from "./components/AudioController";

// New Portfolio & Transition Imports
import WebCurtain from "./components/WebCurtain";
import VideoHero from "./sections/VideoHero";
import VideoShowcase from "./sections/VideoShowcase";
import VideoSkills from "./sections/VideoSkills";
import VideoStory from "./sections/VideoStory";


function App() {

  const [loading, setLoading] = useState(true);
  const [storm, setStorm] = useState(false);
  const [lightningFlash, setLightningFlash] = useState(false);

  // Dual-Portfolio view switching states
  const [activePortfolio, setActivePortfolio] = useState("tech"); // "tech" or "video"
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTogglePortfolio = () => {
    setIsTransitioning(true);
    // Swap state precisely mid-shutter sweep
    setTimeout(() => {
      setActivePortfolio((prev) => (prev === "tech" ? "video" : "tech"));
      window.scrollTo(0, 0); // Snap viewport back to top
    }, 425);
    
    // Conclude transition
    setTimeout(() => {
      setIsTransitioning(false);
    }, 850);
  };

  useEffect(() => {
    if (!storm && lightningFlash) {
      setLightningFlash(false);
    }
  }, [storm, lightningFlash]);

  const stormClasses = storm
    ? lightningFlash
      ? "contrast-125 brightness-100"
      : "grayscale contrast-125 brightness-75"
    : "";

  return (

    <div
      className={`
        relative
        min-h-screen
        text-white

        transition-[filter]
        duration-700

        ${stormClasses}
      `}
    >

      {/* LOADER */}
      {loading && <Loader onComplete={() => setLoading(false)} />}

      {/* PORTFOLIO STATE TRANSITION CURTAIN */}
      <WebCurtain isTransitioning={isTransitioning} activePortfolio={activePortfolio} />

      {/* MAIN WEBSITE */}
      {!loading && (

        <>

          {/* CUSTOM CURSOR */}
          <CustomCursor />

          {/* WEB-SWING SCROLL PROGRESS */}
          <WebScrollProgress 
            activePortfolio={activePortfolio} 
            onTogglePortfolio={handleTogglePortfolio} 
          />

          {/* CINEMATIC AUDIO DASHBOARD */}
          <AudioController />

          {/* WEB BACKGROUND */}
          <WebBackground />

          {/* PARTICLES */}
          <Particles />

          {/* RAIN */}
          <Rain storm={storm} />

          {/* LIGHTNING */}
          <Lightning
            storm={storm}
            setLightningFlash={setLightningFlash}
          />

          {/* STORM DUST */}
          <StormDust storm={storm} />

          {/* FOG */}
          <Fog storm={storm} />

          {/* NAVBAR */}
          <Navbar activePortfolio={activePortfolio} />

          {/* WEB SHOOTER CLICK SYSTEM */}
          <WebShooter />



          {/* MAIN CONTENT */}
          <div
            className={`
              relative
              z-10

              ${storm ? "animate-[shake_0.25s_ease-in-out]" : ""}
            `}
          >
            {activePortfolio === "tech" ? (
              <>
                <Hero onTogglePortfolio={handleTogglePortfolio} />
                <About />
                <Skills />
                <Projects />  
                <Experience />
                <Achievements />  
                <Contact /> 
              </>
            ) : (
              <>
                <VideoHero onWatchShowreelClick={() => {
                  const editsEl = document.getElementById("edits");
                  if (editsEl) editsEl.scrollIntoView({ behavior: "smooth" });
                }} />
                <VideoShowcase />
                <VideoStory />
                <VideoSkills />
                <Contact />
              </>
            )}
            <SmoothScroll />

          </div>

        </>

      )}

    </div>
  );
}

export default App;