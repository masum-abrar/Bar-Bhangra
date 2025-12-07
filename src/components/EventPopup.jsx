"use client";
import { useState, useEffect, useRef } from "react";
import { events } from "../data/events";
import { gsap } from "gsap";
import {
  FaTimes,
  FaCalendarAlt,
  FaClock,
  FaUtensils,
  FaCrown,
  FaArrowRight,
  FaStar,
  FaChevronDown,
} from "react-icons/fa";

export default function EventPopup() {
  const [show, setShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const popupRef = useRef(null);
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const event = events[0];

  // Check for mobile on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    // Show popup after 1.5 seconds on desktop, 2 seconds on mobile
    const timer = setTimeout(() => setShow(true), isMobile ? 2000 : 1500);
    return () => clearTimeout(timer);
  }, [isMobile]);

  useEffect(() => {
    if (show && popupRef.current) {
      // Reset animations
      const initialProps = isMobile
        ? { opacity: 0, y: 50, scale: 0.95 }
        : { opacity: 0, scale: 0.8 };

      gsap.set([overlayRef.current, popupRef.current], initialProps);

      // Animate overlay
      gsap.to(overlayRef.current, {
        opacity: 1,
        duration: 0.4,
        ease: "power2.out",
      });

      // Animate popup with different animation for mobile
      if (isMobile) {
        gsap.to(popupRef.current, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.2)",
          delay: 0.1,
        });
      } else {
        gsap.to(popupRef.current, {
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: "back.out(1.4)",
          delay: 0.1,
        });
      }

      // Animate content items
      gsap.from(contentRef.current?.children || [], {
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.08,
        delay: 0.3,
      });
    }
  }, [show, isMobile]);

  const handleClose = () => {
    if (isMobile) {
      gsap.to(popupRef.current, {
        opacity: 0,
        y: 50,
        scale: 0.95,
        duration: 0.25,
        ease: "power2.in",
      });
    } else {
      gsap.to(popupRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.3,
        ease: "power2.in",
      });
    }

    gsap.to(overlayRef.current, {
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
      delay: 0.1,
      onComplete: () => setShow(false),
    });
  };

  if (!show) return null;

  return (
    <>
      {/* Overlay with Glass Effect */}
      <div
        ref={overlayRef}
        className="fixed inset-0 z-[100] flex items-center justify-center"
      >
        {/* Glass Overlay - Different opacity for mobile */}
        <div
          className="absolute inset-0 backdrop-blur-md"
          style={{
            backgroundColor: isMobile
              ? "rgba(0, 0, 0, 0.85)"
              : "rgba(0, 0, 0, 0.8)",
          }}
          onClick={handleClose}
        />

        {/* Animated Background Elements - Simplified for mobile */}
        {!isMobile && (
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-red-600/10 to-transparent rounded-full blur-2xl" />
            <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-gradient-to-l from-red-600/5 to-transparent rounded-full blur-2xl" />
          </div>
        )}
      </div>

      {/* Popup Modal */}
      <div
        ref={popupRef}
        className="fixed inset-0 z-[101] flex items-center justify-center p-3 sm:p-4 pointer-events-none"
      >
        <div className="relative w-full max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-2xl pointer-events-auto">
          {/* Premium Card Container - Responsive padding and height */}
          <div className="relative bg-gradient-to-br from-gray-900 via-black to-gray-950 rounded-2xl md:rounded-3xl overflow-hidden border border-gray-800/50 shadow-2xl max-h-[90vh] md:max-h-[85vh] overflow-y-auto">
            {/* Mobile Swipe Indicator */}
            {isMobile && (
              <div className="sticky top-0 z-30 flex justify-center pt-3 pb-2 bg-gradient-to-b from-gray-900 to-transparent">
                <div className="w-12 h-1.5 bg-gray-700 rounded-full"></div>
              </div>
            )}

            {/* Header with Image */}
            <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent z-10" />
              <img
                src={event.image}
                alt={event.title}
                className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700"
              />

              {/* Premium Badge - Responsive size */}
              <div className="absolute top-3 sm:top-4 left-3 sm:left-4 z-20">
                <div className="flex items-center gap-1.5 sm:gap-2 bg-gradient-to-r from-gray-900/90 to-black/90 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-red-600/30">
                  <FaCrown className="text-yellow-400 text-xs sm:text-sm" />
                  <span className="text-xs sm:text-sm font-bold bg-gradient-to-r from-yellow-300 to-amber-300 bg-clip-text text-transparent whitespace-nowrap">
                    EXCLUSIVE
                  </span>
                </div>
              </div>

              {/* Close Button - Mobile optimized */}
              <button
                onClick={handleClose}
                className="absolute top-3 sm:top-4 right-3 sm:right-4 z-20 w-8 h-8 sm:w-10 sm:h-10 bg-gray-900/80 backdrop-blur-md rounded-full border border-gray-700 flex items-center justify-center hover:bg-red-600 hover:border-red-500 transition-all duration-300 group"
                aria-label="Close popup"
              >
                <FaTimes className="text-gray-400 group-hover:text-white text-sm sm:text-lg transition-colors" />
              </button>
            </div>

            {/* Content Area - Responsive padding */}
            <div ref={contentRef} className="p-5 sm:p-6 md:p-8">
              {/* Title Section */}
              <div className="mb-5 sm:mb-6">
                <div className="flex items-center gap-2 mb-2 sm:mb-3">
                  <div className="w-6 sm:w-8 h-0.5 bg-gradient-to-r from-red-600 to-amber-500" />
                  <span className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-widest">
                    You're Invited
                  </span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                  <span className="bg-gradient-to-r from-red-400 via-red-500 to-amber-500 bg-clip-text text-transparent">
                    {event.title}
                  </span>
                </h2>

                <p className="text-gray-400 mt-2 sm:mt-3 text-sm sm:text-base leading-relaxed">
                  Experience an evening of exquisite dining and unparalleled
                  luxury. Join us for this exclusive culinary journey.
                </p>
              </div>

              {/* Event Details Grid - Stack on mobile */}
              <div className="grid grid-cols-1 xs:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
                <div className="bg-gray-900/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-gray-800/50">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-gradient-to-br from-red-900/30 to-red-900/10 rounded-lg">
                      <FaCalendarAlt className="text-red-400 text-sm sm:text-base" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-400">Date</p>
                      <p className="text-white font-semibold text-sm sm:text-base">
                        {event.date}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-900/50 backdrop-blur-sm p-3 sm:p-4 rounded-xl border border-gray-800/50">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="p-1.5 sm:p-2 bg-gradient-to-br from-red-900/30 to-red-900/10 rounded-lg">
                      <FaClock className="text-red-400 text-sm sm:text-base" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm text-gray-400">Time</p>
                      <p className="text-white font-semibold text-sm sm:text-base">
                        {event.start} - {event.end}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Special Menu Preview */}
              <div className="mb-6 sm:mb-8">
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <FaUtensils className="text-red-400 text-sm sm:text-base" />
                    <h3 className="text-lg sm:text-xl font-bold text-white">
                      Signature Dishes
                    </h3>
                  </div>
                  <span className="text-xs sm:text-sm text-gray-400 font-medium whitespace-nowrap">
                    Chef's Selection
                  </span>
                </div>

                <div className="space-y-2 sm:space-y-3">
                  {event.specialMenu.slice(0, 2).map((item, index) => (
                    <div
                      key={item.name}
                      className="flex justify-between items-center bg-gray-900/30 p-2.5 sm:p-3 rounded-lg border border-gray-800/30 hover:border-red-600/30 transition-all duration-300"
                    >
                      <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-0">
                        <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-gradient-to-r from-red-500 to-amber-500 rounded-full flex-shrink-0" />
                        <span className="text-white font-medium text-sm sm:text-base truncate">
                          {item.name}
                        </span>
                      </div>
                      <span className="text-amber-300 font-bold text-base sm:text-lg flex-shrink-0 ml-2">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>

                {/* View More on Mobile */}
                {isMobile && event.specialMenu.length > 2 && (
                  <button className="w-full mt-3 py-2 text-gray-400 text-sm flex items-center justify-center gap-1 hover:text-white transition-colors">
                    View {event.specialMenu.length - 2} more items
                    <FaChevronDown className="text-xs" />
                  </button>
                )}
              </div>

              {/* Event Highlights */}
              <div className="mb-6 sm:mb-8">
                <h3 className="text-lg sm:text-xl font-bold text-white mb-3 sm:mb-4 flex items-center gap-2">
                  <FaStar className="text-yellow-400 text-sm sm:text-base" />
                  Event Highlights
                </h3>
                <ul className="space-y-1.5 sm:space-y-2">
                  {event.plan?.slice(0, 3).map((point, index) => (
                    <li key={index} className="flex items-start gap-2 sm:gap-3">
                      <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-red-500 rounded-full mt-2 sm:mt-2.5 flex-shrink-0" />
                      <span className="text-gray-300 text-sm sm:text-base leading-relaxed">
                        {point}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Footer Note */}
              <p className="text-center text-gray-500 text-xs sm:text-sm mt-5 sm:mt-6 px-2">
                <span className="text-red-400 font-semibold">
                  Limited seats available
                </span>{" "}
                • Don't miss this exclusive experience
              </p>
            </div>
          </div>

          {/* Decorative Corner Elements - Hidden on mobile for simplicity */}
          {!isMobile && (
            <>
              <div className="absolute -top-2 -left-2 w-6 h-6 border-t-2 border-l-2 border-red-600 hidden md:block" />
              <div className="absolute -top-2 -right-2 w-6 h-6 border-t-2 border-r-2 border-red-600 hidden md:block" />
              <div className="absolute -bottom-2 -left-2 w-6 h-6 border-b-2 border-l-2 border-red-600 hidden md:block" />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 border-b-2 border-r-2 border-red-600 hidden md:block" />
            </>
          )}
        </div>
      </div>

      {/* Custom Animation Styles */}
      <style jsx>{`
        @keyframes pulse-glow {
          0%,
          100% {
            opacity: 0.5;
          }
          50% {
            opacity: 1;
          }
        }

        @keyframes swipe-up {
          0% {
            transform: translateY(100%);
          }
          100% {
            transform: translateY(0);
          }
        }

        .animate-pulse {
          animation: pulse-glow 2s ease-in-out infinite;
        }

        /* Hide scrollbar for Chrome, Safari and Opera */
        .overflow-y-auto::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .overflow-y-auto {
          -ms-overflow-style: none; /* IE and Edge */
          scrollbar-width: none; /* Firefox */
        }

        /* Mobile optimizations */
        @media (max-width: 640px) {
          .max-h-\[90vh\] {
            max-height: calc(100vh - 2rem);
          }
        }

        /* Small phone optimizations */
        @media (max-width: 375px) {
          .text-2xl {
            font-size: 1.5rem;
          }
          .p-5 {
            padding: 1rem;
          }
        }
      `}</style>
    </>
  );
}
