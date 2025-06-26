import React, { useRef, useState } from "react";
import { gsap } from "gsap";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";
import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";

// Register GSAP plugins
gsap.registerPlugin(MotionPathPlugin);

const UltraButton = () => {
  const buttonRef = useRef(null);
  const [isClicked, setIsClicked] = useState(false);
  const particles = Array(12).fill(0);

  useGSAP(
    () => {
      const button = buttonRef.current;
      if (!button) return;

      // Magnetic effect
      button.addEventListener("mousemove", (e) => {
        const rect = button.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;

        gsap.to(button, {
          x: x * 15,
          y: y * 15,
          duration: 0.5,
          ease: "power2.out",
        });
      });

      button.addEventListener("mouseleave", () => {
        gsap.to(button, {
          x: 0,
          y: 0,
          duration: 0.5,
          ease: "elastic.out(1, 0.5)",
        });
      });

      // Click animation
      button.addEventListener("click", () => {
        setIsClicked(true);
        setTimeout(() => setIsClicked(false), 1000);

        gsap.to(button, {
          scale: 0.9,
          duration: 0.1,
          yoyo: true,
          repeat: 1,
        });

        // Particle explosion
        gsap.to(".particle", {
          x: () => Math.random() * 200 - 100,
          y: () => Math.random() * 200 - 100,
          opacity: 0,
          duration: 1,
          stagger: 0.02,
          ease: "power2.out",
        });
      });
    },
    { scope: buttonRef }
  );

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <div className="relative">
        {/* Floating particles */}
        {isClicked &&
          particles.map((_, i) => (
            <motion.div
              key={i}
              className="particle absolute w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500"
              initial={{
                x: 0,
                y: 0,
                opacity: 1,
                scale: Math.random() * 0.5 + 0.5,
              }}
            />
          ))}

        {/* Glow effect */}
        <motion.div
          className="absolute -inset-4 bg-blue-500/20 rounded-2xl blur-xl"
          animate={{
            opacity: [0.2, 0.4, 0.2],
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Main button */}
        <motion.button
          ref={buttonRef}
          className="relative overflow-hidden px-10 py-5 bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-xl rounded-2xl shadow-2xl z-10"
          whileHover={{
            background: [
              "linear-gradient(to bottom right, #2563eb, #7c3aed)",
              "linear-gradient(to bottom right, #3b82f6, #8b5cf6)",
            ],
            transition: {
              duration: 0.5,
              repeat: Infinity,
              repeatType: "reverse",
            },
          }}
        >
          <span className="relative z-10 flex items-center gap-2">
            <motion.span
              animate={{ rotate: isClicked ? 360 : 0 }}
              transition={{ duration: 0.5 }}
            >
              ✨
            </motion.span>
            Click Me
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              👆
            </motion.span>
          </span>

          {/* Animated border */}
          <motion.div
            className="absolute inset-0 rounded-2xl border-2 border-white/20 pointer-events-none"
            animate={{
              borderColor: [
                "rgba(255,255,255,0.2)",
                "rgba(255,255,255,0.4)",
                "rgba(255,255,255,0.2)",
              ],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Ripple layer */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl">
            <motion.div
              className="absolute bg-white/10 w-full h-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0, 0.3, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
            />
          </div>
        </motion.button>
      </div>
    </div>
  );
};

export default UltraButton;
