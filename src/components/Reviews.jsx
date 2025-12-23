"use client";

import { useRef, useEffect, useState } from "react";
import { reviews } from "../data/reviews";
import {
  FaStar,
  FaQuoteLeft,
  FaChevronLeft,
  FaChevronRight,
  FaPlay,
  FaPause,
  FaCheckCircle,
  FaRegHeart,
  FaFire,
} from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SpecialReviews() {
  const sectionRef = useRef(null);
  const cardRefs = useRef([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);
  const progressRef = useRef(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Auto-slide with fixed logic
  useEffect(() => {
    let intervalId;

    const startAutoSlide = () => {
      if (isPlaying && !isAnimating) {
        intervalId = setInterval(() => {
          handleNextSlide();
        }, 5000);
      }
    };

    startAutoSlide();

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, isAnimating]);

  // GSAP animations
  useEffect(() => {
    gsap.set(cardRefs.current, {
      opacity: 0,
      y: 40,
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(cardRefs.current, {
      opacity: 1,
      y: 0,
      stagger: 0.1,
      duration: 0.8,
      ease: "power2.out",
    });

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  // Progress animation
  useEffect(() => {
    if (progressRef.current && isPlaying) {
      gsap.killTweensOf(progressRef.current);
      gsap.set(progressRef.current, { scaleX: 0 });

      gsap.to(progressRef.current, {
        scaleX: 1,
        duration: 5,
        ease: "linear",
      });
    }
  }, [activeIndex, isPlaying]);

  const handleNextSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const nextIndex = (activeIndex + 1) % reviews.length;

    gsap.to(cardRefs.current[activeIndex], {
      opacity: 0,
      x: -20,
      duration: 0.4,
      ease: "power2.inOut",
    });

    gsap.fromTo(
      cardRefs.current[nextIndex],
      { opacity: 0, x: 20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          setActiveIndex(nextIndex);
          setIsAnimating(false);
        },
      }
    );
  };

  const handlePrevSlide = () => {
    if (isAnimating) return;
    setIsAnimating(true);

    const prevIndex = (activeIndex - 1 + reviews.length) % reviews.length;

    gsap.to(cardRefs.current[activeIndex], {
      opacity: 0,
      x: 20,
      duration: 0.4,
      ease: "power2.inOut",
    });

    gsap.fromTo(
      cardRefs.current[prevIndex],
      { opacity: 0, x: -20 },
      {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: "power2.out",
        onComplete: () => {
          setActiveIndex(prevIndex);
          setIsAnimating(false);
        },
      }
    );
  };

  const goToSlide = (index) => {
    if (isAnimating || index === activeIndex) return;
    setIsAnimating(true);

    const direction = index > activeIndex ? 20 : -20;

    gsap.to(cardRefs.current[activeIndex], {
      opacity: 0,
      x: -direction,
      duration: 0.3,
      ease: "power2.inOut",
    });

    gsap.fromTo(
      cardRefs.current[index],
      { opacity: 0, x: direction },
      {
        opacity: 1,
        x: 0,
        duration: 0.3,
        ease: "power2.out",
        onComplete: () => {
          setActiveIndex(index);
          setIsAnimating(false);
        },
      }
    );
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <section
      ref={sectionRef}
      id="reviews"
      className="relative py-20 md:py-32 bg-gradient-to-b from-black via-gray-950 to-black text-white overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated gradient orbs */}
        <div className="absolute -top-20 -left-20 w-96 h-96 bg-gradient-to-br from-red-600/10 via-transparent to-red-600/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-gradient-to-tl from-red-600/10 via-transparent to-red-600/5 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(to right, #ffffff 1px, transparent 1px),
                             linear-gradient(to bottom, #ffffff 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Decorative lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 md:mb-24">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-red-600 mr-4" />
            <FaQuoteLeft className="text-red-600 text-2xl" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-red-600 ml-4" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Customer{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
              Testimonials
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Discover why our guests keep coming back for exceptional experiences
          </p>
        </div>

        {/* Main Slider */}
        <div className="relative">
          {/* Card Container */}
          <div className="relative h-[500px] md:h-[550px] mb-12">
            {reviews.map((review, index) => (
              <div
                key={review.id}
                ref={(el) => (cardRefs.current[index] = el)}
                className={`absolute inset-0 transition-opacity duration-300 ${
                  index === activeIndex
                    ? "opacity-100 pointer-events-auto"
                    : "opacity-0 pointer-events-none"
                }`}
              >
                {/* Card with gradient border */}
                <div className="relative h-full">
                  {/* Outer gradient border */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-red-600 via-red-500 to-red-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition-opacity" />

                  {/* Main card */}
                  <div className="relative h-full bg-gradient-to-br from-gray-900/80 via-black/80 to-gray-900/80 backdrop-blur-xl rounded-3xl border border-gray-800/50 overflow-hidden">
                    <div className="grid md:grid-cols-2 h-full">
                      {/* Left side - Image & Stats */}
                      <div className="relative p-8 md:p-10">
                        <div className="relative h-full rounded-2xl overflow-hidden">
                          <img
                            src={review.image}
                            alt={review.name}
                            className="w-full h-full object-cover"
                          />

                          {/* Gradient overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                          {/* Content overlay */}
                          <div className="absolute inset-0 p-6 flex flex-col justify-between">
                            {/* Top badges */}
                            <div className="flex justify-between items-start">
                              <div className="flex items-center gap-2 bg-black/60 backdrop-blur-sm px-4 py-2 rounded-full">
                                <FaFire className="text-red-500" />
                                <span className="text-white text-sm font-medium">
                                  Top Review
                                </span>
                              </div>

                              {/* Rating */}
                              <div className="flex items-center gap-1 bg-black/60 backdrop-blur-sm px-3 py-2 rounded-full">
                                {[...Array(5)].map((_, i) => (
                                  <FaStar
                                    key={i}
                                    className={`text-sm ${
                                      i < review.rating
                                        ? "text-yellow-400"
                                        : "text-gray-600"
                                    }`}
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Bottom info */}
                            <div>
                              <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-red-500/50">
                                  <img
                                    src={review.avatar}
                                    alt={review.name}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div>
                                  <h3 className="text-xl font-bold text-white">
                                    {review.name}
                                  </h3>
                                  <p className="text-red-300/80 text-sm">
                                    {review.role}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Right side - Review Content */}
                      <div className="p-8 md:p-10 flex flex-col justify-between">
                        <div>
                          {/* Quote icon */}
                          <div className="mb-6">
                            <FaQuoteLeft className="text-red-600/30 text-5xl" />
                          </div>

                          {/* Review text */}
                          <blockquote className="text-xl md:text-2xl text-gray-200 leading-relaxed md:leading-loose mb-8 font-light italic">
                            "{review.review}"
                          </blockquote>

                          {/* Verification badge */}
                          {review.verified && (
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-red-900/30 to-red-800/30 text-red-300 px-4 py-2 rounded-full border border-red-800/30 mb-6">
                              <FaCheckCircle className="text-red-400" />
                              <span className="text-sm font-medium">
                                Verified Purchase
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Review metadata */}
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <span className="text-gray-500 text-sm">
                              {review.date}
                            </span>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-2">
                            {review.tags?.map((tag, idx) => (
                              <span
                                key={idx}
                                className="inline-block px-3 py-1.5 text-xs font-medium bg-red-900/20 text-red-300 rounded-full border border-red-800/30"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="relative h-1.5 bg-gray-800/50 rounded-full overflow-hidden">
              <div
                ref={progressRef}
                className="absolute left-0 top-0 h-full w-full bg-gradient-to-r from-red-600 to-red-400 origin-left"
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className="text-gray-500 text-sm">
                Slide {activeIndex + 1} of {reviews.length}
              </span>
              <span className="text-red-400 text-sm font-medium">
                {isPlaying ? "Auto-playing" : "Paused"}
              </span>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
            {/* Navigation Dots */}
            <div className="flex items-center gap-3">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  disabled={isAnimating}
                  className={`relative transition-all duration-300 ${
                    isAnimating ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  <div
                    className={`w-10 h-1 rounded-full transition-all duration-300 ${
                      index === activeIndex
                        ? "bg-gradient-to-r from-red-600 to-red-400"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  />
                  {index === activeIndex && (
                    <div className="absolute -top-1 -left-1 -right-1 -bottom-1 bg-red-500/20 rounded-full animate-ping" />
                  )}
                </button>
              ))}
            </div>

            {/* Play/Pause & Arrows */}
            <div className="flex items-center gap-4">
              <button
                onClick={togglePlay}
                className={`flex items-center justify-center w-12 h-12 rounded-full transition-all duration-300 ${
                  isPlaying
                    ? "bg-red-600/10 text-red-500 border border-red-600/20"
                    : "bg-gray-800/50 text-gray-400 hover:text-white border border-gray-700/50"
                }`}
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
              >
                {isPlaying ? (
                  <FaPause className="text-lg" />
                ) : (
                  <FaPlay className="text-lg ml-0.5" />
                )}
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrevSlide}
                  disabled={isAnimating}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800/50 text-white border border-gray-700/50 hover:border-red-500/50 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  aria-label="Previous review"
                >
                  <FaChevronLeft />
                </button>

                <button
                  onClick={handleNextSlide}
                  disabled={isAnimating}
                  className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-800/50 text-white border border-gray-700/50 hover:border-red-500/50 hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                  aria-label="Next review"
                >
                  <FaChevronRight />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
