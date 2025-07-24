// components/effects/ConfettiSideCannons.jsx
"use client";

import confetti from "canvas-confetti";
import { useState } from "react";
import Button from "./Button";

export function ConfettiSideCannons() {
  const [isAnimating, setIsAnimating] = useState(false);

  const handleClick = () => {
    if (isAnimating) return; // Prevent multiple clicks

    setIsAnimating(true);
    const end = Date.now() + 3 * 1000; // 3 seconds
    const colors = ["#a786ff", "#fd8bbc", "#eca184", "#f8deb1"];

    const frame = () => {
      if (Date.now() > end) {
        setIsAnimating(false); // Reset after animation ends
        return;
      }

      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.5 },
        colors,
      });

      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.5 },
        colors,
      });

      requestAnimationFrame(frame);
    };

    frame();
  };

  return (
    <div className="relative">
      <Button
        id="realm-btn"
        title={isAnimating ? "CELEBRATING..." : "CELEBRATE 🎉"}
        containerClass={`mt-5 ${isAnimating ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleClick}
      />
    </div>
  );
}
