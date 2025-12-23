"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flip } from "gsap/Flip";
import API from "@/libs/Api";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, Flip);
}

export default function HistoryFullPage() {
  const sectionRef = useRef(null);
  const imageContainerRef = useRef(null);
  const contentRef = useRef(null);
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const fetchHistories = async () => {
    try {
      const res = await API.get("/history");
      setHistories(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch history data:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistories();
  }, []);

  useEffect(() => {
    if (!loading && histories.length > 0) {
      const ctx = gsap.context(() => {
        // Parallax background
        gsap.to(".parallax-bg", {
          y: 100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
          },
        });

        // Main title animation
        gsap.from(".main-title", {
          scrollTrigger: {
            trigger: ".main-title",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
          y: 100,
          opacity: 0,
          duration: 1.5,
          ease: "power4.out",
        });

        // Animate navigation dots
        gsap.from(".nav-dot", {
          stagger: 0.1,
          scale: 0,
          opacity: 0,
          duration: 0.8,
          ease: "back.out(1.7)",
          delay: 0.5,
        });

        // Create image reveal animation
        histories.forEach((_, index) => {
          const imageElement = document.querySelector(
            `[data-image-index="${index}"]`
          );
          if (imageElement) {
            gsap.fromTo(
              imageElement,
              {
                clipPath: "inset(100% 0% 0% 0%)",
                scale: 1.2,
              },
              {
                clipPath: "inset(0% 0% 0% 0%)",
                scale: 1,
                duration: 1.2,
                ease: "power4.out",
                scrollTrigger: {
                  trigger: imageElement,
                  start: "top 80%",
                  end: "top 30%",
                  scrub: 1,
                  onEnter: () => setActiveIndex(index),
                  onEnterBack: () => setActiveIndex(index),
                },
              }
            );
          }
        });

        // Animate content cards
        gsap.utils.toArray(".content-card").forEach((card, i) => {
          gsap.fromTo(
            card,
            {
              x: i % 2 === 0 ? -50 : 50,
              opacity: 0,
              scale: 0.95,
            },
            {
              x: 0,
              opacity: 1,
              scale: 1,
              duration: 1,
              ease: "power3.out",
              scrollTrigger: {
                trigger: card,
                start: "top 85%",
                toggleActions: "play none none reverse",
              },
            }
          );
        });

        // Floating animation for decorative elements
        gsap.to(".float-element", {
          y: -20,
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          stagger: 0.2,
        });

        // Text reveal animation
        gsap.utils.toArray(".reveal-text").forEach((text) => {
          gsap.from(text, {
            scrollTrigger: {
              trigger: text,
              start: "top 90%",
            },
            y: 50,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
          });
        });
      }, sectionRef);

      return () => ctx.revert();
    }
  }, [loading, histories]);

  const handleNavClick = (index) => {
    if (isAnimating || index === activeIndex) return;

    setIsAnimating(true);
    setActiveIndex(index);

    // Image transition animation
    const currentImage = document.querySelector(
      `[data-image-index="${activeIndex}"]`
    );
    const nextImage = document.querySelector(`[data-image-index="${index}"]`);

    if (currentImage && nextImage) {
      const state = Flip.getState([currentImage, nextImage]);

      // Swap positions
      imageContainerRef.current.insertBefore(nextImage, currentImage);

      Flip.from(state, {
        duration: 1,
        ease: "power3.inOut",
        scale: true,
        absolute: true,
        onComplete: () => setIsAnimating(false),
      });

      // Crossfade effect
      gsap.to(currentImage, {
        opacity: 0,
        duration: 0.6,
        ease: "power2.inOut",
      });

      gsap.fromTo(
        nextImage,
        { opacity: 0 },
        { opacity: 1, duration: 0.8, ease: "power2.out", delay: 0.2 }
      );
    } else {
      setIsAnimating(false);
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-gradient-to-b from-gray-950 via-black to-gray-950 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-red-500/5 rounded-full blur-3xl float-element" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-purple-500/3 rounded-full blur-3xl float-element" />
        <div
          className="absolute top-1/3 right-1/3 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl float-element"
          style={{ animationDelay: "0.5s" }}
        />

        {/* Animated Grid */}
        <div className="absolute inset-0 opacity-10">
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white to-transparent"
              style={{ top: `${i * 5}%`, animationDelay: `${i * 0.1}s` }}
            />
          ))}
          {Array.from({ length: 20 }).map((_, i) => (
            <div
              key={i}
              className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-white to-transparent"
              style={{ left: `${i * 5}%`, animationDelay: `${i * 0.05}s` }}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 md:px-8 lg:px-16 pt-8 md:pt-16">
        {/* Header */}
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-block relative mb-6">
            <div className="absolute -inset-4 bg-gradient-to-r from-red-500/20 to-purple-500/20 blur-xl rounded-full" />
            <h1 className="main-title relative text-4xl md:text-6xl lg:text-7xl font-bold">
              <span className="bg-gradient-to-r from-white via-red-100 to-white bg-clip-text text-transparent">
                Our History
              </span>
            </h1>
          </div>
          <p className="reveal-text text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Explore the journey through time with our most significant moments
          </p>
        </div>

        {/* Image Gallery Container - ALWAYS ON TOP */}
        <div className="relative mb-12 md:mb-20">
          {/* Image Container */}
          <div
            ref={imageContainerRef}
            className="relative h-[300px] md:h-[500px] lg:h-[600px] rounded-3xl md:rounded-4xl overflow-hidden shadow-2xl shadow-black/50"
          >
            {histories.map((history, index) => (
              <div
                key={history.id}
                data-image-index={index}
                className={`absolute inset-0 transition-opacity duration-1000 ${
                  index === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              >
                {history.imageUrl ? (
                  <>
                    {/* Image */}
                    <img
                      src={history.imageUrl}
                      alt={history.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 hover:scale-105"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

                    {/* Image Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 lg:p-12">
                      <div className="max-w-4xl mx-auto">
                        {/* <div className="flex items-center gap-3 mb-3">
                          <span className="px-3 py-1 bg-black/40 backdrop-blur-sm rounded-full text-sm text-white/90 border border-white/10">
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span className="px-3 py-1 bg-red-500/20 backdrop-blur-sm rounded-full text-sm text-red-300 border border-red-500/30">
                            {new Date().getFullYear() -
                              (histories.length - index)}
                          </span>
                        </div> */}
                        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2">
                          {history.title}
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-purple-500 rounded-full mb-4" />
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-r from-red-500/20 to-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-10 h-10 md:w-12 md:h-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <p className="text-gray-400 text-lg">Historical Image</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Image Navigation Dots */}
          <div className="flex justify-center gap-3 mt-6 md:mt-8">
            {histories.map((_, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(index)}
                className={`nav-dot relative group transition-all duration-300 ${
                  index === activeIndex
                    ? "w-12 bg-gradient-to-r from-red-500 to-purple-500"
                    : "w-8 bg-gray-700 hover:bg-gray-600"
                } h-2 rounded-full`}
                disabled={isAnimating}
              >
                <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Event {index + 1}
                </span>
              </button>
            ))}
          </div>

          {/* Decorative Corner Elements */}
          <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-red-500/50 rounded-tl-lg" />
          <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-purple-500/50 rounded-tr-lg" />
          <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-blue-500/50 rounded-bl-lg" />
          <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-green-500/50 rounded-br-lg" />
        </div>

        {/* Content Cards */}
        <div ref={contentRef} className="max-w-6xl mx-auto">
          {loading ? (
            <div className="flex flex-col items-center justify-center min-h-[300px]">
              <div className="relative mb-6">
                <div className="w-16 h-16 border-4 border-transparent border-t-red-500 border-r-purple-500 border-b-blue-500 border-l-green-500 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 bg-gradient-to-r from-red-500 to-purple-500 rounded-full animate-pulse" />
                </div>
              </div>
              <p className="text-gray-400 text-lg">
                Loading historical moments...
              </p>
            </div>
          ) : histories.length === 0 ? (
            <div className="text-center py-16">
              <div className="inline-block p-8 bg-gradient-to-br from-gray-900 to-black rounded-3xl mb-6">
                <svg
                  className="w-20 h-20 text-gray-500 mx-auto"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl text-gray-300 mb-2">
                No History Available
              </h3>
              <p className="text-gray-500">
                Check back later for historical updates
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {histories.map((history, index) => (
                <div
                  key={history.id}
                  data-content-index={index}
                  className={`content-card group relative ${
                    index === activeIndex ? "lg:col-span-2" : ""
                  }`}
                >
                  {/* Card Glow Effect */}
                  <div
                    className={`absolute -inset-0.5 rounded-3xl blur transition duration-500 ${
                      index === activeIndex
                        ? "bg-gradient-to-r from-red-500/30 via-purple-500/30 to-blue-500/30 opacity-100"
                        : "bg-gradient-to-r from-gray-800 to-gray-900 opacity-30"
                    } group-hover:opacity-70`}
                  />

                  <div className="relative bg-gradient-to-br from-gray-900/90 to-black/90 backdrop-blur-sm rounded-3xl border border-gray-800/50 overflow-hidden">
                    {/* Card Header */}
                    <div className="p-6 md:p-8 border-b border-gray-800/50">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-2 h-2 rounded-full animate-pulse ${
                              index === activeIndex
                                ? "bg-green-500"
                                : "bg-yellow-500"
                            }`}
                          />
                          {/* <span className="text-sm text-gray-400">
                            Chapter {String(index + 1).padStart(2, "0")}
                          </span> */}
                        </div>
                        <span className="px-3 py-1 bg-black/40 rounded-full text-xs text-gray-300 border border-gray-700">
                          {index === activeIndex
                            ? "Currently Viewing"
                            : "Historical Record"}
                        </span>
                      </div>

                      <h3 className="text-xl md:text-2xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                          {history.title}
                        </span>
                      </h3>

                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-purple-500 flex items-center justify-center">
                            <div className="w-2 h-2 rounded-full bg-white" />
                          </div>
                          <span>Historical Event</span>
                        </div>
                        <div className="h-4 w-px bg-gray-700" />
                        <div className="flex items-center gap-1">
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>Milestone</span>
                        </div>
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 md:p-8">
                      <div className="prose prose-invert max-w-none">
                        <div
                          className="text-gray-300 leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: history.description,
                          }}
                        />
                      </div>

                      {/* Stats Bar */}
                      {/* <div className="mt-8 p-4 bg-black/30 rounded-xl border border-gray-800/50">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white mb-1">
                              {String(index + 1).padStart(2, "0")}
                            </div>
                            <div className="text-xs text-gray-400">Chapter</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white mb-1">
                              {new Date().getFullYear() -
                                (histories.length - index)}
                            </div>
                            <div className="text-xs text-gray-400">Year</div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white mb-1">
                              {((index * 100) / histories.length).toFixed(0)}%
                            </div>
                            <div className="text-xs text-gray-400">
                              Progress
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-2xl font-bold text-white mb-1">
                              {history.title.length}
                            </div>
                            <div className="text-xs text-gray-400">
                              Characters
                            </div>
                          </div>
                        </div>
                      </div> */}
                    </div>

                    {/* Card Footer */}
                    {/* <div className="px-6 md:px-8 py-4 bg-black/20 border-t border-gray-800/50">
                      <div className="flex items-center justify-between">
                        <button className="group/btn flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-gray-800 to-black rounded-lg hover:from-gray-700 hover:to-gray-900 transition-all duration-300 border border-gray-700 hover:border-gray-600">
                          <span className="text-gray-300 group-hover/btn:text-white">
                            Read More
                          </span>
                          <svg
                            className="w-4 h-4 text-gray-400 group-hover/btn:text-white transform group-hover/btn:translate-x-1 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M14 5l7 7m0 0l-7 7m7-7H3"
                            />
                          </svg>
                        </button>
                        <div className="flex items-center gap-2">
                          <div className="flex gap-1">
                            {[1, 2, 3].map((i) => (
                              <div
                                key={i}
                                className="w-1 h-1 rounded-full bg-gray-600"
                              />
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">
                            Historical Document
                          </span>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Floating Scroll Indicator */}
        {/* <div className="fixed right-8 top-1/2 transform -translate-y-1/2 z-20 hidden md:block">
          <div className="flex flex-col items-center gap-3">
            {histories.map((_, index) => (
              <button
                key={index}
                onClick={() => handleNavClick(index)}
                className={`relative group transition-all duration-300 ${
                  index === activeIndex
                    ? "w-3 h-12 bg-gradient-to-b from-red-500 to-purple-500 rounded-full"
                    : "w-2 h-2 bg-gray-600 hover:bg-gray-500 rounded-full"
                }`}
              >
                <span className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-sm text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  Event {index + 1}
                </span>
              </button>
            ))}
          </div>
        </div> */}
      </div>

      {/* Progress Bar */}
      {/* <div className="fixed bottom-0 left-0 right-0 h-1 bg-gray-800/50 z-20">
        <div
          className="h-full bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 transition-all duration-500"
          style={{ width: `${((activeIndex + 1) / histories.length) * 100}%` }}
        />
      </div> */}

      {/* Custom Styles */}
    </section>
  );
}
