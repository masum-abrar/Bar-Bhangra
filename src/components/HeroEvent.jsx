"use client";
import { events } from "../data/events";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaCalendarAlt,
  FaClock,
  FaStar,
  FaRegHeart,
  FaShare,
  FaUtensils,
} from "react-icons/fa";
import Premium3DButton from "./Premium3DButton";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroEvent() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const menuItemsRef = useRef([]);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    gsap.set([imageRef.current, contentRef.current], { opacity: 0, y: 50 });
    gsap.set(titleRef.current, { opacity: 0, x: -30 });
    gsap.set(menuItemsRef.current, { opacity: 0, y: 20 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(
      imageRef.current,
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
      0.2
    )
      .to(
        contentRef.current,
        { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
        0.4
      )
      .to(
        titleRef.current,
        { opacity: 1, x: 0, duration: 0.8, ease: "back.out(1.7)" },
        0.6
      );

    gsap.to(menuItemsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: 0.15,
      delay: 1,
      scrollTrigger: { trigger: contentRef.current, start: "top 70%" },
    });

    gsap.to(imageRef.current, {
      y: -20,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);
  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(
          "https://bar-bhangra-backend.vercel.app/api/v1/bar-events"
        );
        const data = await res.json();
        if (data.success && data.data.length > 0) {
          setEvent(data.data[0]); // use first event
        } else {
          console.error("No events found");
        }
      } catch (err) {
        console.error("Failed to fetch events", err);
      }
    };
    fetchEvent();
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative pt-32 pb-28 bg-black text-white overflow-hidden"
    >
      {/* Pixel Grid Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(#0f0f0f_1px,transparent_1px),linear-gradient(90deg,#0f0f0f_1px,transparent_1px)] bg-[size:40px_40px] opacity-40" />

        {/* Animated Red Pixels */}
        <div className="absolute inset-0">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-[2px] h-[2px] bg-red-500 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                boxShadow: "0 0 8px 2px rgba(239, 68, 68, 0.5)",
              }}
            />
          ))}
        </div>

        {/* Grid Overlays */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600 to-transparent" />

        {/* Corner Grid Accents */}
        <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-red-600" />
        <div className="absolute top-0 right-0 w-20 h-20 border-r-2 border-t-2 border-red-600" />
        <div className="absolute bottom-0 left-0 w-20 h-20 border-l-2 border-b-2 border-red-600" />
        <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-red-600" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image Container */}
          <div ref={imageRef} className=" relative">
            <div
              className="relative overflow-hidden rounded-2xl border border-gray-800 group bg-black"
              style={{
                boxShadow:
                  "0 20px 40px rgba(0,0,0,0.7), inset 0 1px 0 rgba(255,255,255,0.1)",
              }}
            >
              {/* 🌟 Animated Glow Effect */}
              <div
                className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-700"
                style={{
                  background:
                    "linear-gradient(45deg, #ff0000, #ff7300, #fffb00, #48ff00, #00ffd5, #002bff, #ff00c8, #ff0000)",
                  backgroundSize: "400% 400%",
                  animation: "gradient 3s ease infinite",
                  filter: "blur(10px)",
                  zIndex: 0,
                }}
              />

              {/* 💫 Particle System */}
              <div className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute rounded-full"
                    style={{
                      width: "4px",
                      height: "4px",
                      background:
                        i % 3 === 0
                          ? "#ef4444"
                          : i % 3 === 1
                          ? "#3b82f6"
                          : "#8b5cf6",
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      boxShadow: `0 0 ${i % 2 === 0 ? "15px" : "8px"} ${
                        i % 3 === 0
                          ? "#ef4444"
                          : i % 3 === 1
                          ? "#3b82f6"
                          : "#8b5cf6"
                      }`,
                      animation: `float ${
                        2 + Math.random() * 2
                      }s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>

              {/* 🎭 Main Image Container */}
              <div className="relative z-20 overflow-hidden rounded-2xl">
                {/* ✨ Shine Effect */}
                <div
                  className="absolute inset-0 z-30 opacity-0 group-hover:opacity-50 transition-opacity duration-700"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)",
                    transform: "translateX(-100%)",
                    transition: "transform 1.5s ease-in-out, opacity 0.7s",
                  }}
                />

                {/* 🖼 Image */}
                <img
                  src={event?.imageUrl}
                  alt={event?.title}
                  className="w-full h-[500px] object-cover relative z-20 btn-splash"
                  style={{
                    transition: "all 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
                    transform: "scale(1)",
                    filter: "brightness(0.9) contrast(1.1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05)";
                    e.currentTarget.style.filter =
                      "brightness(1.1) contrast(1.2)";
                    e.currentTarget.parentElement.querySelector(
                      ".shine-effect"
                    ).style.transform = "translateX(100%)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.filter =
                      "brightness(0.9) contrast(1.1)";
                    e.currentTarget.parentElement.querySelector(
                      ".shine-effect"
                    ).style.transform = "translateX(-100%)";
                  }}
                />

                {/* 🔥 Overlay Gradient */}
                <div
                  className="absolute inset-0 z-25 pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 30%, transparent 70%, rgba(0,0,0,0.8) 100%)",
                    opacity: 0.7,
                    transition: "opacity 0.5s",
                  }}
                />
              </div>

              {/* 🎨 Neon Border Effect */}
              <div className="absolute inset-0 rounded-2xl z-15 pointer-events-none overflow-hidden">
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-500/30 transition-all duration-500" />

                {/* Animated Border Pixels */}
                <div className="absolute inset-0">
                  {[...Array(16)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute"
                      style={{
                        width: "3px",
                        height: "3px",
                        background: `linear-gradient(45deg, ${
                          i % 4 === 0
                            ? "#ef4444"
                            : i % 4 === 1
                            ? "#3b82f6"
                            : i % 4 === 2
                            ? "#8b5cf6"
                            : "#10b981"
                        })`,
                        left: i % 4 === 0 ? "0" : "auto",
                        right: i % 4 === 1 ? "0" : "auto",
                        top: i % 4 === 2 ? "0" : "auto",
                        bottom: i % 4 === 3 ? "0" : "auto",
                        margin:
                          i % 4 === 0 || i % 4 === 1
                            ? `-1.5px 0 0 ${i % 4 === 0 ? "-1.5px" : "auto"}`
                            : `${i % 4 === 2 ? "-1.5px" : "auto"} 0 0 ${
                                i % 4 === 3 ? "auto" : "-1.5px"
                              }`,
                        transform: `translate${
                          i % 4 === 0 || i % 4 === 1 ? "Y" : "X"
                        }(${i * 6.25}%)`,
                        opacity: 0,
                        boxShadow: `0 0 8px ${
                          i % 4 === 0
                            ? "#ef4444"
                            : i % 4 === 1
                            ? "#3b82f6"
                            : i % 4 === 2
                            ? "#8b5cf6"
                            : "#10b981"
                        }`,
                        transition: "opacity 0.5s",
                        transitionDelay: `${i * 50}ms`,
                      }}
                    />
                  ))}
                </div>
              </div>

              {/* ⚡ Premium Badge - 3D Effect */}
              <div className="absolute top-4 left-4 z-40">
                <div className="relative">
                  {/* Badge Shadow */}
                  <div
                    className="absolute -inset-1 bg-gradient-to-r from-red-600 via-purple-600 to-blue-600 
                       rounded-lg blur opacity-0 group-hover:opacity-70 transition duration-700"
                  />

                  {/* Badge Content */}
                  <div
                    className="relative px-4 py-2 rounded-lg"
                    style={{
                      background:
                        "linear-gradient(145deg, rgba(0,0,0,0.9), rgba(30,30,30,0.9))",
                      border: "1px solid rgba(255,255,255,0.1)",
                      boxShadow:
                        "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <div className="relative">
                        <FaStar
                          className="text-yellow-400 text-lg"
                          style={{
                            filter: "drop-shadow(0 0 8px rgba(234,179,8,0.6))",
                            animation: "spin 3s linear infinite",
                          }}
                        />
                        <div className="absolute inset-0 bg-yellow-400 blur-sm opacity-0 group-hover:opacity-50" />
                      </div>
                      <span
                        className="font-bold text-sm tracking-wider bg-gradient-to-r from-red-600 to-red-700"
                        style={{
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                          textShadow: "0 2px 4px rgba(0,0,0,0.3)",
                        }}
                      >
                        PREMIUM
                      </span>
                      <div
                        className="w-2 h-2 rounded-full bg-green-500 ml-1"
                        style={{
                          boxShadow: "0 0 8px #10b981",
                          animation: "pulse 2s infinite",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* 💎 Corner Highlights */}
              <div
                className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-red-500/50 
                   rounded-tl-lg opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{
                  boxShadow: "-2px -2px 10px rgba(239,68,68,0.3)",
                }}
              />
              <div
                className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-blue-500/50 
                   rounded-tr-lg opacity-0 group-hover:opacity-100 transition-all duration-500 delay-100"
                style={{
                  boxShadow: "2px -2px 10px rgba(59,130,246,0.3)",
                }}
              />
              <div
                className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-purple-500/50 
                   rounded-bl-lg opacity-0 group-hover:opacity-100 transition-all duration-500 delay-200"
                style={{
                  boxShadow: "-2px 2px 10px rgba(139,92,246,0.3)",
                }}
              />
              <div
                className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-green-500/50 
                   rounded-br-lg opacity-0 group-hover:opacity-100 transition-all duration-500 delay-300"
                style={{
                  boxShadow: "2px 2px 10px rgba(16,185,129,0.3)",
                }}
              />

              {/* 🌌 Floating Info (Optional) */}
            </div>
          </div>

          {/* Content Section */}
          <div ref={contentRef}>
            {/* Title */}
            <div className="mb-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-px bg-gradient-to-r from-red-600 to-transparent" />
                <span className="text-red-400 font-semibold tracking-widest uppercase text-xs">
                  Exclusive Dining
                </span>
              </div>

              <h2
                ref={titleRef}
                className="text-5xl md:text-6xl font-bold mb-6"
              >
                <span className="text-white block">{event?.title}</span>
                {/* <span className="text-red-500 block mt-2">Experience</span> */}
              </h2>

              {/* Info Grid */}
              <div className="grid grid-cols-2 gap-4 mt-8">
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-600/20 rounded">
                      <FaCalendarAlt className="text-red-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Date</p>
                      <p className="text-white font-medium">
                        {event?.date
                          ? new Date(event.date).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            })
                          : ""}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-600/20 rounded">
                      <FaClock className="text-red-400" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm">Time</p>
                      <p className="text-white font-medium">
                        {event?.start} - {event?.end}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Menu Section */}
            <div className="mt-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-8 h-px bg-red-600" />
                <h3 className="text-2xl font-bold text-white">Featured Menu</h3>
              </div>

              <div className="space-y-3">
                {event?.specialMenu?.map((item, index) => (
                  <div
                    key={item?.name}
                    ref={(el) => (menuItemsRef.current[index] = el)}
                    className="group bg-gray-900/30 p-4 rounded-lg border border-gray-800 hover:border-red-600 transition-all duration-300 hover:bg-gray-900/50"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-red-600 rounded-full" />
                        <div>
                          <h4 className="text-white font-semibold group-hover:text-red-300 transition-colors">
                            {item?.name}
                          </h4>
                          <p className="text-gray-400 text-sm mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-bold text-red-400">
                          {item?.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            {/* View All Events Button */}
            <div className="mt-14 flex justify-start">
              <Premium3DButton />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
