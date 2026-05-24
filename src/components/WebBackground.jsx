import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import webImage from "../assets/images/spider-web.webp";
import spiderLogo from "../assets/images/spider-logo.jpg";

const WebBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: null, y: null });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationFrameId;
    let nodes = [];
    const maxNodes = 65;
    const connectionDist = 130;
    const mouseAttractDist = 260;

    // Load and pre-process the spider logo to glowing solid red with transparent background
    const spiderImg = new Image();
    let offscreenCanvas = null;

    spiderImg.onload = () => {
      const tempCanvas = document.createElement("canvas");
      tempCanvas.width = spiderImg.width || 120;
      tempCanvas.height = spiderImg.height || 120;
      const tempCtx = tempCanvas.getContext("2d");
      tempCtx.drawImage(spiderImg, 0, 0);

      try {
        const imgData = tempCtx.getImageData(0, 0, tempCanvas.width, tempCanvas.height);
        const data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];

          // If the pixel is dark, keep it pitch black and make it opaque
          if (r < 185 && g < 185 && b < 185) {
            data[i] = 0;       // R
            data[i + 1] = 0;   // G
            data[i + 2] = 0;   // B
            data[i + 3] = 255;  // Opaque
          } else {
            // Convert white background to transparent
            data[i + 3] = 0;
          }
        }
        tempCtx.putImageData(imgData, 0, 0);
        offscreenCanvas = tempCanvas;
      } catch (err) {
        console.warn("Canvas offscreen processing bypass:", err);
        offscreenCanvas = tempCanvas;
      }
    };
    spiderImg.src = spiderLogo;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      const w = canvas.width;
      const h = canvas.height;
      for (let i = 0; i < maxNodes; i++) {
        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.6,
          vy: (Math.random() - 0.5) * 0.6,
          radius: Math.random() * 2 + 1,
          baseVx: (Math.random() - 0.5) * 0.6,
          baseVy: (Math.random() - 0.5) * 0.6,
        });
      }
    };

    const handleMouseMove = (e) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const mouse = mouseRef.current;

      // Update and Draw Nodes
      nodes.forEach((node) => {
        // Natural float velocity
        node.vx += (node.baseVx - node.vx) * 0.05;
        node.vy += (node.baseVy - node.vy) * 0.05;

        // Mouse attraction physics
        if (mouse.x !== null && mouse.y !== null) {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseAttractDist) {
            // Stronger pull when closer, but with high damping for a smooth web-spring effect
            const force = (mouseAttractDist - dist) / mouseAttractDist;
            node.vx += (dx / dist) * force * 0.28;
            node.vy += (dy / dist) * force * 0.28;
          }
        }

        // Apply friction/damping
        node.vx *= 0.94;
        node.vy *= 0.94;

        // Move
        node.x += node.vx;
        node.y += node.vy;

        // Screen boundary bounce
        if (node.x < 0 || node.x > canvas.width) node.baseVx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.baseVy *= -1;

        // Clamp inside canvas bounds
        if (node.x < 0) node.x = 0;
        if (node.x > canvas.width) node.x = canvas.width;
        if (node.y < 0) node.y = 0;
        if (node.y > canvas.height) node.y = canvas.height;

        // Draw just the glowing black spider structure
        if (offscreenCanvas) {
          const size = node.radius * 6.5 + 9; // neat sizing: 15-28px
          
          // Set canvas shadow to glow exactly along the spider silhouette borders
          ctx.shadowColor = "rgba(239, 68, 68, 0.95)";
          ctx.shadowBlur = 7;
          ctx.shadowOffsetX = 0;
          ctx.shadowOffsetY = 0;

          // Draw transparent black spider in the center of the node position
          const spiderSize = size * 0.95;
          ctx.drawImage(
            offscreenCanvas,
            node.x - spiderSize / 2,
            node.y - spiderSize / 2,
            spiderSize,
            spiderSize
          );

          // Reset canvas shadow so it does not leak into other elements or connection lines
          ctx.shadowColor = "transparent";
          ctx.shadowBlur = 0;
        } else {
          // Fallback to circle node if image not loaded yet
          ctx.beginPath();
          ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(239, 68, 68, 0.55)";
          ctx.fill();
        }
      });

      // Draw Connection lines (Node to Node)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const n1 = nodes[i];
          const n2 = nodes[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < connectionDist) {
            const opacity = (1 - dist / connectionDist) * 0.16;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.strokeStyle = `rgba(239, 68, 68, ${opacity})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw Cursor Web Hub connections (Mouse to Nodes)
      if (mouse.x !== null && mouse.y !== null) {
        nodes.forEach((node) => {
          const dx = mouse.x - node.x;
          const dy = mouse.y - node.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseAttractDist - 40) {
            const opacity = (1 - dist / (mouseAttractDist - 40)) * 0.45;

            // Draw glowing Spidey web filament: a thicker crimson glow line underneath...
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(node.x, node.y);
            ctx.strokeStyle = `rgba(220, 38, 38, ${opacity * 0.65})`;
            ctx.lineWidth = 2.2;
            ctx.stroke();

            // ...and a sharp white core filament line on top!
            ctx.beginPath();
            ctx.moveTo(mouse.x, mouse.y);
            ctx.lineTo(node.x, node.y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.95})`;
            ctx.lineWidth = 0.9;
            ctx.stroke();
          }
        });
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 overflow-hidden bg-black">
      {/* WEB JPG/WEBP STATIC DEEP UNDERLAY */}
      <div
        className="absolute inset-0 opacity-15 bg-center bg-cover scale-105 pointer-events-none mix-blend-screen"
        style={{
          backgroundImage: `url(${webImage})`,
        }}
      ></div>

      {/* AMBIENT ROTATING RED AND BLUE GLOW SPOTS */}
      <motion.div
        className="absolute w-[500px] h-[500px] bg-red-600/10 rounded-full blur-[140px] pointer-events-none"
        animate={{
          x: [0, 200, -150, 0],
          y: [0, -150, 100, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      <motion.div
        className="absolute right-0 bottom-0 w-[450px] h-[450px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none"
        animate={{
          x: [0, -150, 100, 0],
          y: [0, 150, -100, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* INTERACTIVE WEB CANVAS MESH LAYER */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
};

export default WebBackground;