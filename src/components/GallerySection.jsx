"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";

export default function SimpleSlider() {
  const trackRef = useRef(null);
  const containerRef = useRef(null);

  const [slides, setSlides] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch slides
  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await fetch(
          "https://bar-bhangra-backend.vercel.app/api/v1/slider"
        );
        const data = await res.json();
        if (data.success) setSlides(data.data || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchSlides();
  }, []);

  // Slide handlers
  const slideBy = (direction) => {
    const track = trackRef.current;
    const container = containerRef.current;
    if (!track || !container) return;

    const slideWidth = track.children[0]?.clientWidth + 24 || 300;

    const maxScroll = track.scrollWidth - container.clientWidth;

    let nextX =
      gsap.getProperty(track, "x") +
      (direction === "left" ? slideWidth : -slideWidth);

    nextX = Math.min(0, nextX);
    nextX = Math.max(-maxScroll, nextX);

    gsap.to(track, {
      x: nextX,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <section
      id="gallery"
      className="relative py-16 bg-gradient-to-br from-red-900 via-black to-red-800 text-white overflow-hidden"
    >
      {/* Background decorations (unchanged) */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-red-600/40 to-red-600/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-gradient-to-tl from-red-600/40 to-red-600/10 rounded-full blur-3xl" />
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

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Explore Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-300">
              Gallery
            </span>
          </h2>

          <p className="text-gray-200 text-lg max-w-2xl mx-auto font-light">
            A glimpse into our finest dishes, cocktails, and the ambiance our
            guests love.
          </p>
        </div>

        {/* Slider */}
        <div className="relative">
          {/* Arrows */}
          {!loading && slides.length > 0 && (
            <>
              <button
                onClick={() => slideBy("left")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-red-600 transition p-3 rounded-full"
              >
                <FaChevronLeft />
              </button>

              <button
                onClick={() => slideBy("right")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/60 hover:bg-red-600 transition p-3 rounded-full"
              >
                <FaChevronRight />
              </button>
            </>
          )}

          {/* Content */}
          <div ref={containerRef} className="overflow-hidden">
            <div
              ref={trackRef}
              className="flex gap-6"
              style={{ width: "max-content", transform: "translateX(0px)" }}
            >
              {loading &&
                [...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="w-[280px] md:w-[350px] h-[200px] rounded-xl bg-white/10 animate-pulse"
                  />
                ))}

              {!loading &&
                slides.map((slide) => (
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
                        <h3 className="text-lg font-semibold">{slide.title}</h3>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
