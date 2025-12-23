"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaStar } from "react-icons/fa";
import { useRouter } from "next/navigation";
import API from "@/libs/Api";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function HistorySection() {
  const sectionRef = useRef(null);
  const router = useRouter();
  const [histories, setHistories] = useState([]);
  const [loading, setLoading] = useState(true);

  const imageRefs = useRef([]);
  const titleRefs = useRef([]);
  const paraRefs = useRef([]);

  // Fetch histories from API
  const fetchHistories = async () => {
    try {
      const res = await API.get("/history");
      setHistories(res.data.data || []);
    } catch (err) {
      console.error(err);
      console.error("Failed to fetch history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistories();
  }, []);

  // GSAP animation
  // useEffect(() => {
  //   if (!loading && histories.length > 0) {
  //     histories.forEach((_, index) => {
  //       const tl = gsap.timeline({
  //         scrollTrigger: {
  //           trigger: sectionRef.current,
  //           start: "top 80%",
  //           toggleActions: "play none none reverse",
  //         },
  //       });

  //       gsap.set([imageRefs?.current[index]], { opacity: 0, y: 50 });
  //       gsap.set([titleRefs?.current[index]], { opacity: 0, x: -30 });
  //       gsap.set([paraRefs?.current[index]], { opacity: 0, y: 20 });

  //       tl.to(imageRefs.current[index], {
  //         opacity: 1,
  //         y: 0,
  //         duration: 1.2,
  //         ease: "power3.out",
  //       })
  //         .to(titleRefs.current[index], {
  //           opacity: 1,
  //           x: 0,
  //           duration: 0.8,
  //           ease: "back.out(1.7)",
  //         })
  //         .to(paraRefs.current[index], {
  //           opacity: 1,
  //           y: 0,
  //           duration: 0.8,
  //           ease: "power3.out",
  //         });
  //     });

  //     return () => {
  //       ScrollTrigger.getAll().forEach((t) => t.kill());
  //     };
  //   }
  // }, [loading, histories]);

  return (
    <section
      ref={sectionRef}
      id="history"
      className="relative py-24 text-gray-300 overflow-hidden
             bg-[radial-gradient(ellipse_at_top,_rgba(239,68,68,0.12),_transparent_55%),linear-gradient(to_bottom,_#000000,_#050505,_#000000)]"
    >
      {/* 🔴 Soft moving glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2
                  w-[600px] h-[600px] rounded-full
                  bg-red-600/10 blur-[140px]"
      />

      {/* ✨ Subtle grain texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'url(\'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="160" height="160"><filter id="n"><feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="4"/></filter><rect width="100%" height="100%" filter="url(%23n)" opacity="0.4"/></svg>\')',
        }}
      />

      {/* CONTENT */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {loading ? (
            <p className="text-center text-gray-400 text-lg">
              Loading history...
            </p>
          ) : histories.length === 0 ? (
            <p className="text-center text-gray-400 text-lg">
              No history found.
            </p>
          ) : (
            histories.map((h, index) => (
              <div
                key={h.id}
                className="grid md:grid-cols-2 gap-12 items-center
             rounded-3xl p-8 md:p-12
             bg-black/40 backdrop-blur-lg border border-red-600/30
             shadow-2xl"
              >
                {/* Image */}
                {h.imageUrl && (
                  <div
                    ref={(el) => (imageRefs.current[index] = el)}
                    className="relative group rounded-xl overflow-hidden border border-gray-800/50 shadow-xl"
                  >
                    <img
                      src={h?.imageUrl}
                      alt={h?.title}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-105 "
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
                  </div>
                )}

                {/* Content */}
                {/* Content */}
                <div className="space-y-6 relative z-10">
                  {/* Title + Star */}
                  <div className="flex items-center gap-3">
                    <FaStar
                      className="text-red-500 text-lg md:text-xl animate-pulse" // subtle premium feel
                    />
                    <h2 className="history-title text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
                      {h?.title}
                    </h2>
                  </div>

                  {/* Description */}
                  <div
                    className="history-description prose prose-invert max-w-none text-gray-300 leading-relaxed line-clamp-4 overflow-hidden"
                    style={{ wordBreak: "break-word" }} // prevent weird line shifts
                    dangerouslySetInnerHTML={{ __html: h?.description }}
                  />

                  {/* Button */}
                  <button
                    onClick={() => router.push("/history")}
                    className="btn-splash relative overflow-hidden inline-flex items-center gap-2
               px-6 py-2 rounded-lg font-semibold text-white
               bg-gradient-to-r from-red-600 to-red-700
               hover:scale-105 hover:shadow-xl
               transition-all duration-300"
                  >
                    {/* Splash Effect */}
                    <span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                 -translate-x-full group-hover:translate-x-full
                 transition-transform duration-700 ease-in-out"
                    />

                    <span className="relative z-10">Read Full History</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
