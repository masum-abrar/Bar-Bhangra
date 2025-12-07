"use client";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaStar, FaUtensils, FaClock, FaCalendarAlt } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HistorySection() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const titleRef = useRef(null);
  const paraRef = useRef(null);
  const cardRefs = useRef([]);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        toggleActions: "play none none reverse",
      },
    });

    gsap.set([imageRef.current], { opacity: 0, y: 50 });
    gsap.set([titleRef.current], { opacity: 0, x: -30 });
    gsap.set([paraRef.current], { opacity: 0, y: 20 });
    gsap.set(cardRefs.current, { opacity: 0, y: 30 });

    tl.to(
      imageRef.current,
      { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
      0.2
    )
      .to(
        titleRef.current,
        { opacity: 1, x: 0, duration: 0.8, ease: "back.out(1.7)" },
        0.4
      )
      .to(
        paraRef.current,
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
        0.6
      )
      .to(
        cardRefs.current,
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" },
        0.8
      );

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  const featureItems = [
    { icon: <FaStar className="text-red-500" />, label: "Exclusive Events" },
    {
      icon: <FaUtensils className="text-red-500" />,
      label: "Signature Cuisine",
    },
    { icon: <FaClock className="text-red-500" />, label: "Vibrant Nights" },
    {
      icon: <FaCalendarAlt className="text-red-500" />,
      label: "Long-standing Legacy",
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="history"
      className="relative py-20 bg-black text-gray-300 overflow-hidden"
    >
      {/* Background Gradients */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-red-600/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-l from-red-600/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-2 gap-12 items-center">
        {/* Image */}
        <div
          ref={imageRef}
          className="relative group rounded-xl overflow-hidden border border-gray-800/50 shadow-2xl"
        >
          <img
            src="/history.jpg"
            alt="History"
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        </div>

        {/* Content */}
        <div className="space-y-6">
          <div className="flex items-center gap-3">
            <FaStar className="text-red-500 text-lg md:text-xl" />
            <h2
              ref={titleRef}
              className="text-3xl md:text-4xl font-bold text-white"
            >
              History of Bar Bhangra
            </h2>
          </div>

          <p ref={paraRef} className="text-gray-400 leading-relaxed">
            Bar Bhangra started in 2015 with a vision to bring Desi nightlife to
            Helsinki. Over the years, it has evolved into an iconic spot for
            unforgettable nights, vibrant music, and premium experiences. Join
            us in celebrating a story that blends culture, music, and
            excellence.
          </p>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
            {featureItems.map((item, index) => (
              <div
                key={item.label}
                ref={(el) => (cardRefs.current[index] = el)}
                className="bg-gray-900/50 backdrop-blur-md p-4 rounded-xl border border-gray-800/50 flex items-center gap-3 hover:bg-gray-900/70 transition-all duration-300"
              >
                {item.icon}
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
