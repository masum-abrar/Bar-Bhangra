"use client";

import React, { useState, useEffect, useRef } from "react";
import {
  ChevronLeft,
  Calendar,
  Clock,
  Music,
  Utensils,
  Star,
  Sparkles,
} from "lucide-react";
import gsap from "gsap";

const EventsPage = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const containerRef = useRef(null);
  const cardsRef = useRef([]);
  const gridRef = useRef(null);

  // Fetch events
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://bar-bhangra-backend.vercel.app/api/v1/bar-events"
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch events: ${response.status}`);
        }

        const data = await response.json();
        setEvents(data.data || []);
      } catch (err) {
        setError(err.message || "Failed to load events");
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  // GSAP Animations
  useEffect(() => {
    if (!loading && events.length > 0) {
      // Animate background grid
      gsap.fromTo(
        ".grid-bg-dot",
        {
          scale: 0,
          opacity: 0,
        },
        {
          scale: 1,
          opacity: 0.1,
          duration: 1,
          stagger: {
            amount: 0.5,
            grid: [15, 8],
            from: "random",
          },
          ease: "power2.out",
        }
      );

      // Animate cards
      gsap.fromTo(
        cardsRef.current.filter((card) => card !== null),
        {
          y: 60,
          opacity: 0,
          scale: 0.9,
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.2)",
        }
      );

      // Animate title and back button
      gsap.fromTo(
        ".page-title",
        {
          y: -30,
          opacity: 0,
        },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.3,
        }
      );

      gsap.fromTo(
        ".back-btn",
        {
          x: -30,
          opacity: 0,
        },
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          delay: 0.5,
        }
      );
    }
  }, [loading, events]);

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  // Format time
  const formatTime = (time) => {
    if (!time) return "";
    return time.replace(/^(\d{2}):(\d{2})$/, (match, h, m) => {
      const hour = parseInt(h);
      const suffix = hour >= 12 ? "PM" : "AM";
      const displayHour = hour % 12 || 12;
      return `${displayHour}:${m} ${suffix}`;
    });
  };

  // Handle card hover animation
  const handleCardMouseEnter = (index) => {
    gsap.to(cardsRef.current[index], {
      y: -10,
      scale: 1.02,
      duration: 0.3,
      ease: "power2.out",
    });
  };

  const handleCardMouseLeave = (index) => {
    gsap.to(cardsRef.current[index], {
      y: 0,
      scale: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  };
  const getEventStatus = (date, start, end) => {
    const now = new Date();
    const eventDate = new Date(date);

    // Same day event time handling (optional advanced)
    if (eventDate.toDateString() === now.toDateString()) {
      return "Ongoing";
    }

    if (eventDate > now) return "Upcoming";
    return "Past";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white p-4 md:p-6 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="fixed inset-0 overflow-hidden z-0">
        <div
          ref={gridRef}
          className="absolute inset-0 grid grid-cols-15 grid-rows-8 gap-4"
        >
          {Array.from({ length: 120 }).map((_, i) => (
            <div
              key={i}
              className="grid-bg-dot w-1 h-1 bg-gradient-to-br from-red-600 to-red-700 rounded-full opacity-0"
            />
          ))}
        </div>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-gray-900" />
      </div>

      {/* Content */}
      <div ref={containerRef} className="relative z-10 max-w-7xl mx-auto">
        {/* Back Button */}
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="back-btn group inline-flex items-center gap-3 px-5 py-3 rounded-xl 
                     bg-gradient-to-r from-red-600/20 to-red-700/20 backdrop-blur-md
                     border border-red-600/30 hover:border-red-500/50
                     hover:bg-gradient-to-r hover:from-red-600/30 hover:to-red-700/30
                     transition-all duration-300"
          >
            <ChevronLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium">Back</span>
          </button>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block mb-6">
            <Sparkles className="w-8 h-8 text-red-500 mb-4 mx-auto animate-pulse" />
            <h1 className="page-title text-4xl md:text-6xl font-bold mb-4">
              <span className="bg-gradient-to-r from-red-600 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                All Our Exclusive Events
              </span>
            </h1>
            <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
              Exclusive nights, unforgettable experiences
            </p>
          </div>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            <div className="px-6 py-3 bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-xl border border-red-600/30">
              <p className="text-gray-400 text-sm">Total Events</p>
              <p className="text-2xl font-bold">{events.length}</p>
            </div>
            <div className="px-6 py-3 bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-xl border border-red-600/30">
              <p className="text-gray-400 text-sm">This Month</p>
              <p className="text-2xl font-bold">
                {
                  events.filter(
                    (e) => new Date(e.date).getMonth() === new Date().getMonth()
                  ).length
                }
              </p>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-red-600/10 to-red-700/10 rounded-2xl p-6 border border-red-600/20 animate-pulse"
              >
                <div className="h-48 bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-xl mb-4"></div>
                <div className="h-6 bg-gradient-to-r from-red-600/20 to-red-700/20 rounded mb-3"></div>
                <div className="h-4 bg-gradient-to-r from-red-600/20 to-red-700/20 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gradient-to-r from-red-600/20 to-red-700/20 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        )}

        {/* Error State */}
        {error && !loading && (
          <div className="text-center py-20">
            <div className="inline-block p-8 bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-2xl border border-red-600/30">
              <p className="text-2xl text-red-400 mb-4">
                ⚠️ Error Loading Events
              </p>
              <p className="text-gray-300">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-6 px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 rounded-xl font-medium hover:shadow-lg hover:shadow-red-500/30 transition-all duration-300"
              >
                Try Again
              </button>
            </div>
          </div>
        )}

        {/* Events Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => (
              <div
                key={event.id}
                ref={(el) => (cardsRef.current[index] = el)}
                onMouseEnter={() => handleCardMouseEnter(index)}
                onMouseLeave={() => handleCardMouseLeave(index)}
                className="group relative overflow-hidden rounded-2xl 
                         bg-gradient-to-br from-red-600/10 via-red-700/10 to-red-800/10 
                         backdrop-blur-md border border-red-600/30 
                         hover:border-red-500/50 transition-all duration-300"
              >
                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-red-900/20 to-transparent z-10" />
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    onError={(e) => {
                      e.target.style.display = "none";
                      e.target.parentElement.innerHTML = `
                        <div class="w-full h-full flex items-center justify-center bg-gradient-to-br from-red-600 to-red-700">
                          <Calendar class="w-16 h-16 text-white/40" />
                        </div>
                      `;
                    }}
                  />

                  {/* Date Badge */}
                  <div className="absolute top-4 left-4 z-20">
                    <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-red-600 to-red-700 rounded-full text-sm font-medium shadow-lg">
                      <Calendar className="w-4 h-4" />
                      <span>{formatDate(event.date)}</span>
                    </div>
                  </div>

                  {/* Premium Badge */}
                  {/* Event Status Badge */}
                  <div className="absolute top-4 right-4 z-20">
                    {(() => {
                      const status = getEventStatus(
                        event.date,
                        event.start,
                        event.end
                      );

                      if (status === "Upcoming") {
                        return (
                          <div
                            className="flex items-center gap-1 px-3 py-2 
                        bg-gradient-to-r from-green-500 to-emerald-600
                        rounded-full text-sm font-bold shadow-lg"
                          >
                            <Sparkles className="w-3 h-3" />
                            <span>Upcoming</span>
                          </div>
                        );
                      }

                      if (status === "Ongoing") {
                        return (
                          <div
                            className="flex items-center gap-1 px-3 py-2 
                        bg-gradient-to-r from-yellow-500 to-orange-500
                        rounded-full text-sm font-bold shadow-lg animate-pulse"
                          >
                            <Clock className="w-3 h-3" />
                            <span>Ongoing</span>
                          </div>
                        );
                      }

                      return (
                        <div
                          className="flex items-center gap-1 px-3 py-2 
                      bg-gradient-to-r from-gray-600 to-gray-700
                      rounded-full text-sm font-bold shadow-lg opacity-80"
                        >
                          <Calendar className="w-3 h-3" />
                          <span>Past</span>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Event Content */}
                <div className="p-6">
                  {/* Title */}
                  <h3 className="text-xl font-bold mb-4 text-white group-hover:text-red-300 transition-colors">
                    {event.title}
                  </h3>

                  {/* Time */}
                  <div className="flex items-center gap-3 mb-4 p-3 bg-gradient-to-r from-red-600/20 to-red-700/20 rounded-xl">
                    <Clock className="w-5 h-5 text-red-400" />
                    <div className="text-sm">
                      <span className="text-gray-300">
                        {formatTime(event.start)}
                      </span>
                      <span className="mx-2 text-gray-500">-</span>
                      <span className="text-gray-300">
                        {formatTime(event.end)}
                      </span>
                    </div>
                  </div>

                  {/* Special Menu */}
                  {event.specialMenu && event.specialMenu.length > 0 && (
                    <div className="mb-4">
                      <div className="flex items-center gap-2 mb-3">
                        <Utensils className="w-5 h-5 text-orange-400" />
                        <h4 className="font-medium text-gray-300">
                          Special Menu
                        </h4>
                      </div>
                      <div className="space-y-2">
                        {event.specialMenu.map((item, idx) => (
                          <div
                            key={idx}
                            className="text-sm p-2 bg-gradient-to-r from-red-600/10 to-red-700/10 rounded-lg"
                          >
                            <div className="flex justify-between">
                              <span className="text-gray-200">{item.name}</span>
                              {item.price && (
                                <span className="text-yellow-400">
                                  {item.price}
                                </span>
                              )}
                            </div>
                            {item.description && (
                              <p className="text-gray-400 text-xs mt-1">
                                {item.description}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Plan */}
                  {event.plan && event.plan.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Music className="w-5 h-5 text-purple-400" />
                        <h4 className="font-medium text-gray-300">
                          Event Plan
                        </h4>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {event.plan.map((item, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 bg-gradient-to-r from-red-600/20 to-red-700/20 text-sm rounded-full border border-red-600/30"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Book Now Button */}
                  {/* <button
                    className="w-full py-3 bg-gradient-to-r from-red-600 to-red-700 
                                   hover:from-red-700 hover:to-red-800 rounded-xl font-medium
                                   hover:shadow-lg hover:shadow-red-500/30
                                   transition-all duration-300 group/btn"
                  >
                    <span className="flex items-center justify-center gap-2">
                      Book Now
                      <ChevronLeft className="w-5 h-5 rotate-180 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </button> */}
                </div>

                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-red-600/0 via-red-600/10 to-red-600/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            ))}
          </div>
        )}

        {/* Footer */}
        {!loading && !error && events.length > 0 && (
          <div className="mt-16 pt-8 border-t border-red-600/20 text-center">
            <p className="text-gray-400 text-sm">
              Showing{" "}
              {/* <span className="text-red-400 font-medium">{events.length}</span>{" "} */}
              All Our Exclusive events
            </p>
            <p className="text-gray-500 text-xs mt-2">
              All events feature exclusive experiences and premium services
            </p>
          </div>
        )}
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-gradient-to-br from-red-600 to-red-700 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default EventsPage;
