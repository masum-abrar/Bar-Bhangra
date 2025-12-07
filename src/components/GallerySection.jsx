"use client";

import { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { FaQuoteLeft } from "react-icons/fa";

const slides = [
  {
    id: 1,
    title: "Exquisite Dining",
    image: "/review1.jpg",
  },
  {
    id: 2,
    title: "Crafted Cocktails",
    image: "/review2.jpg",
  },
  {
    id: 3,
    title: "Premium Ambiance",
    image: "/review3.jpg",
  },
  {
    id: 4,
    title: "Signature Dishes",
    image: "/review4.jpg",
  },
];

export default function SimpleAutoSlider() {
  const trackRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    // Clone slides for infinite effect
    const slidesEl = Array.from(track.children);
    slidesEl.forEach((slide) => {
      const clone = slide.cloneNode(true);
      track.appendChild(clone);
    });

    // Calculate total width
    const slideWidth = slidesEl[0].clientWidth + 24; // width + gap
    const totalWidth = slideWidth * slidesEl.length;

    const animate = () => {
      gsap.to(track, {
        x: -totalWidth / 2,
        duration: 30,
        ease: "none",
        onComplete: () => {
          gsap.set(track, { x: 0 });
          animate();
        },
      });
    };

    animate();

    return () => {
      gsap.killTweensOf(track);
    };
  }, []);

  return (
    <section className="relative py-16 bg-gradient-to-br from-red-900 via-black to-red-800 text-white overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Gradient Orbs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-red-600/40 to-red-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-red-600/40 to-red-600/10 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.05) 1px, transparent 1px),
                             linear-gradient(to bottom, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-red-500 mr-4" />
            <FaQuoteLeft className="text-red-500 text-2xl" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-red-500 ml-4" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 tracking-tight">
            Explore Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
              Gallery
            </span>
          </h2>

          <p className="text-gray-200 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            A glimpse into our finest dishes, cocktails, and the ambiance our
            guests love.
          </p>
        </div>

        {/* Slider */}
        <div ref={containerRef} className="overflow-hidden">
          <div
            ref={trackRef}
            className="flex gap-6"
            style={{ width: "max-content" }}
          >
            {slides.map((slide) => (
              <div
                key={slide.id}
                className="flex-shrink-0 w-[280px] md:w-[350px]"
              >
                <div className="relative rounded-xl overflow-hidden shadow-lg">
                  <div className="aspect-video">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                    <h3 className="text-lg font-semibold text-white">
                      {slide.title}
                    </h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
