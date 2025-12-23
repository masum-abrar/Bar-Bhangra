import { useRef, useEffect } from "react";
import gsap from "gsap";

const SimpleAnimatedButton = () => {
  const buttonRef = useRef(null);

  useEffect(() => {
    const button = buttonRef.current;

    // Simple hover animation
    const handleMouseEnter = () => {
      gsap.to(button, {
        y: -8,
        scale: 1.05,
        boxShadow: "0 20px 40px rgba(239, 68, 68, 0.4)",
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(".arrow-icon", {
        x: 8,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleMouseLeave = () => {
      gsap.to(button, {
        y: 0,
        scale: 1,
        boxShadow: "0 10px 25px rgba(239, 68, 68, 0.25)",
        duration: 0.3,
        ease: "power2.out",
      });

      gsap.to(".arrow-icon", {
        x: 0,
        duration: 0.3,
        ease: "power2.out",
      });
    };

    const handleClick = (e) => {
      e.preventDefault();

      // Simple click animation
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.inOut",
        onComplete: () => {
          window.location.href = "/all-events";
        },
      });
    };

    button.addEventListener("mouseenter", handleMouseEnter);
    button.addEventListener("mouseleave", handleMouseLeave);
    button.addEventListener("click", handleClick);

    // Add subtle floating animation
    const floatAnimation = gsap.to(button, {
      y: -4,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      button.removeEventListener("mouseenter", handleMouseEnter);
      button.removeEventListener("mouseleave", handleMouseLeave);
      button.removeEventListener("click", handleClick);
      floatAnimation.kill();
    };
  }, []);

  return (
    <div className="mt-10 flex justify-start">
      <button
        ref={buttonRef}
        className="group relative inline-flex items-center gap-3 px-10 py-4 rounded-xl
               bg-gradient-to-br from-red-600 to-red-700
               text-white font-semibold tracking-wide
               shadow-[0_10px_25px_rgba(239,68,68,0.25)]
               transform transition-all duration-300
               hover:shadow-[0_20px_40px_rgba(239,68,68,0.4)]
               hover:scale-105
               overflow-hidden"
      >
        {/* 🔥 Splash Effect */}
        <span
          className="absolute inset-0 
      bg-gradient-to-r from-transparent via-white/30 to-transparent
      -translate-x-full
      group-hover:translate-x-full
      transition-transform duration-700 ease-in-out"
        />

        {/* ✨ Optional Shimmer */}
        <span
          className="absolute inset-0
      bg-gradient-to-r from-transparent via-white/30 to-transparent
      -translate-x-full
      animate-shimmer"
        />

        {/* Button text */}
        <span className="relative z-10">View All Events</span>

        {/* Arrow */}
        <span className="relative z-10 transform transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>

        {/* 3D Top Edge */}
        <div
          className="absolute -top-1 left-3 right-3 h-2 rounded-t-xl
                 bg-gradient-to-b from-red-400/50 to-transparent"
        />
      </button>
    </div>
  );
};

export default SimpleAnimatedButton;
