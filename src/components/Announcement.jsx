"use client";
import { useEffect, useState, useRef } from "react";
import { LuMegaphone, LuDot } from "react-icons/lu";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

if (typeof window !== "undefined") {
  gsap.registerPlugin(TextPlugin);
}

const Announcement = () => {
  const [announcements, setAnnouncements] = useState([]);
  const containerRef = useRef(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await fetch(
          "https://bar-bhangra-backend.vercel.app/api/v1/announcements",
        );
        const json = await res.json();

        if (json?.success && json.data?.length > 0) {
          const latest = json.data.sort(
            (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
          )[0];
          setAnnouncements([latest]);
        }
      } catch (err) {
        console.error("Failed to load announcement", err);
      }
    };

    fetchAnnouncements();
  }, []);

  useEffect(() => {
    if (announcements.length > 0) {
      const ctx = gsap.context(() => {
        gsap.from(".announcement-box", {
          opacity: 0,
          y: 20,
          duration: 1,
          stagger: 0.3,
          ease: "power2.out",
        });

        announcements.forEach((_, i) => {
          const target = `.typewriter-${i}`;
          const fullText = announcements[i].text;

          gsap.to(target, {
            duration: fullText.length * 0.05,
            text: fullText,
            ease: "none",
            delay: i * 0.5 + 0.5,
          });
        });
      }, containerRef);
      return () => ctx.revert();
    }
  }, [announcements]);

  if (!announcements || announcements.length === 0) return null;

  return (
    <section ref={containerRef} className="w-full bg-black py-24 px-6 ">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-8 border-b border-red-900/30 pb-4">
          <LuMegaphone className="text-red-600 text-xl" />
          <h2 className="text-white text-lg uppercase tracking-[0.3em] font-semibold">
            Announcement
          </h2>
        </div>

        <div className="space-y-6">
          {announcements?.map((item, index) => (
            <div
              key={item.id || index}
              className="announcement-box group relative bg-zinc-900/30 p-6 rounded-xl border-l-2 border-red-600 hover:bg-zinc-900/50 transition-colors"
            >
              <div className="flex items-start gap-4">
                <LuDot className="text-red-600 text-3xl mt-[-4px] shrink-0" />

                <p
                  style={{
                    color: item.color || "#ffffff",
                    fontWeight: item.isBold ? "700" : "400",
                    fontStyle: item.isItalic ? "italic" : "normal",
                  }}
                  className={`typewriter-${index} text-lg lg:text-3xl leading-relaxed tracking-tight min-h-[1.5em]`}
                ></p>
              </div>

              <span className="inline-block w-[2px] h-[1.2em] bg-red-600 ml-1 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Announcement;
