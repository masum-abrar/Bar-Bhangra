"use client";
import { events } from "../data/events";
import { useEffect, useRef } from "react";
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

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HeroEvent() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const menuItemsRef = useRef([]);

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

  const event = events[0];

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
          <div ref={imageRef} className="relative">
            <div className="relative overflow-hidden rounded-xl border-2 border-gray-800 group">
              <div className="absolute inset-0 bg-gradient-to-tr from-red-600/10 via-transparent to-transparent z-10" />
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-[500px] object-cover transform transition-transform duration-700 group-hover:scale-105"
              />

              {/* Pixel Border Animation */}
              <div className="absolute inset-0 border-2 border-transparent group-hover:border-red-600/30 transition-all duration-500">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 bg-red-600"
                    style={{
                      left: i % 2 === 0 ? "0" : "auto",
                      right: i % 2 === 1 ? "0" : "auto",
                      top: `${i * 12.5 + 12.5}%`,
                    }}
                  />
                ))}
              </div>

              <div className="absolute top-4 left-4">
                <div className="bg-black/90 border border-red-600 px-4 py-2 rounded-md text-sm font-bold flex items-center gap-2">
                  <FaStar className="text-red-400" />
                  PREMIUM
                </div>
              </div>
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
                <span className="text-white block">{event.title}</span>
                <span className="text-red-500 block mt-2">Experience</span>
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
                      <p className="text-white font-medium">{event.date}</p>
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
                        {event.start} - {event.end}
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
                {event.specialMenu.map((item, index) => (
                  <div
                    key={item.name}
                    ref={(el) => (menuItemsRef.current[index] = el)}
                    className="group bg-gray-900/30 p-4 rounded-lg border border-gray-800 hover:border-red-600 transition-all duration-300 hover:bg-gray-900/50"
                  >
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <div className="w-2 h-2 bg-red-600 rounded-full" />
                        <div>
                          <h4 className="text-white font-semibold group-hover:text-red-300 transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-gray-400 text-sm mt-1">
                            {item.description}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-bold text-red-400">
                          {item.price}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
