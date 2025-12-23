"use client";
import { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaCrown,
  FaWineGlassAlt,
  FaPhoneAlt,
} from "react-icons/fa";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);

      // Update active section based on scroll position
      const sections = ["home", "events", "menu", "gallery", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on link click
  const handleLinkClick = (section) => {
    setIsOpen(false);
    setActiveSection(section);
  };

  // Menu items data
  const menuItems = [
    { id: "home", label: "Home" },
    { id: "events", label: "Events" },
    { id: "menu", label: "Menu" },
    { id: "gallery", label: "Gallery" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <>
      {/* Premium Navbar */}
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 ${
          scrolled
            ? "bg-black/95 backdrop-blur-xl py-3 border-b border-gray-800/50 shadow-2xl"
            : "bg-linear-to-b from-black/95 via-black/90 to-transparent py-5"
        }`}
      >
        {/* Top decorative border */}
        {/* <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-600 to-transparent opacity-50" /> */}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo/Brand Section */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-amber-600 rounded-xl flex items-center justify-center transform rotate-45">
                  <FaWineGlassAlt className="text-white -rotate-45 text-lg" />
                </div>
                <div className="absolute -top-1 -right-1">
                  <FaCrown className="text-yellow-400 text-xs" />
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-white font-bold text-xl lg:text-2xl tracking-tight">
                  BAR{" "}
                  <span className="bg-gradient-to-r from-red-500 to-amber-500 bg-clip-text text-transparent">
                    BHANGRA
                  </span>
                </h1>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {menuItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={() => handleLinkClick(item.id)}
                  className={`relative px-6 py-2 rounded-lg transition-all duration-300 ${
                    activeSection === item.id
                      ? "text-white"
                      : "text-gray-300 hover:text-white"
                  }`}
                >
                  <span className="relative z-10 font-medium tracking-wide">
                    {item.label}
                  </span>

                  {/* Active indicator */}
                  {activeSection === item.id && (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-r from-red-600/20 to-transparent rounded-lg border border-red-600/30" />
                      <div className="absolute bottom-0 left-1/4 right-1/4 h-0.5 bg-gradient-to-r from-red-500 to-amber-500 rounded-full" />
                    </>
                  )}

                  {/* Hover effect */}
                  {!activeSection && (
                    <div className="absolute inset-0 opacity-0 hover:opacity-100 bg-gray-900/30 rounded-lg transition-opacity duration-300" />
                  )}
                </a>
              ))}

              {/* CTA Button */}
              <a
                href="#contact"
                onClick={() => handleLinkClick("contact")}
                className="relative overflow-hidden ml-4 px-6 py-3
    bg-gradient-to-r from-red-600 to-red-700
    text-white font-semibold rounded-xl
    flex items-center gap-2
    transition-all duration-300
    hover:shadow-xl hover:shadow-red-600/30
    hover:scale-105
    group"
              >
                {/* Animated Splash Effect */}
                <span
                  className="absolute inset-0 
      bg-gradient-to-r from-transparent via-white/30 to-transparent
      -translate-x-full
      group-hover:translate-x-full
      transition-transform duration-700 ease-in-out
      animate-splash"
                />

                {/* Shimmer Effect (Optional - Extra shine) */}
                <span
                  className="absolute inset-0
      bg-gradient-to-r from-transparent via-white/10 to-transparent
      -translate-x-full
      animate-shimmer"
                />

                {/* Content */}
                <FaPhoneAlt className="relative z-10 text-sm" />
                <span className="relative z-10">Book Now</span>
              </a>
            </nav>

            {/* Mobile menu button */}
            <div className="flex items-center gap-4 lg:hidden">
              <a
                href="#contact"
                onClick={() => handleLinkClick("contact")}
                className="px-4 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white text-sm font-semibold rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-300"
              >
                Book
              </a>
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2.5 rounded-lg bg-gray-900/50 backdrop-blur-sm border border-gray-800 text-gray-300 hover:text-white hover:border-gray-700 transition-all duration-300"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <FaTimes className="text-xl" />
                ) : (
                  <FaBars className="text-xl" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Menu */}
      <div
        className={`fixed inset-0 z-[99] lg:hidden transition-all duration-500 ${
          isOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-black/90 backdrop-blur-lg transition-opacity duration-500 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Menu Content */}
        <div
          className={`absolute top-24 right-4 left-4 bg-gradient-to-b from-gray-900 to-black rounded-2xl border border-gray-800/50 shadow-2xl overflow-hidden transition-all duration-500 transform ${
            isOpen ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          {/* Menu Header */}
          <div className="p-6 border-b border-gray-800/50">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-amber-600 rounded-xl flex items-center justify-center">
                <FaWineGlassAlt className="text-white text-xl" />
              </div>
              <div>
                <h2 className="text-white font-bold text-xl">BAR BHANGRA</h2>
                <p className="text-gray-400 text-sm">Premium Lounge & Events</p>
              </div>
            </div>
          </div>

          {/* Mobile Menu Items */}
          <div className="p-4">
            {menuItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={() => handleLinkClick(item.id)}
                className={`flex items-center gap-4 p-4 rounded-xl mb-2 transition-all duration-300 ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-red-600/20 to-red-600/10 border border-red-600/30"
                    : "hover:bg-gray-800/50 border border-transparent"
                }`}
              >
                <div
                  className={`w-2 h-2 rounded-full ${
                    activeSection === item.id
                      ? "bg-gradient-to-r from-red-500 to-amber-500"
                      : "bg-gray-600"
                  }`}
                />
                <span
                  className={`text-lg font-medium ${
                    activeSection === item.id ? "text-white" : "text-gray-300"
                  }`}
                >
                  {item.label}
                </span>
                {activeSection === item.id && (
                  <div className="ml-auto w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                )}
              </a>
            ))}
          </div>
        </div>

        {/* Close button for mobile */}
        <button
          onClick={() => setIsOpen(false)}
          className={`absolute top-8 right-4 p-3 bg-gray-900/80 backdrop-blur-md rounded-full border border-gray-800 text-white transition-all duration-300 ${
            isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          aria-label="Close menu"
        >
          <FaTimes className="text-lg" />
        </button>
      </div>

      {/* Scroll progress indicator */}
      <div
        className="fixed top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-red-600 via-amber-500 to-red-600 z-101 transform origin-left transition-transform duration-300"
        style={{
          transform: `scaleX(${scrolled ? "1" : "0"})`,
          opacity: scrolled ? 1 : 0,
        }}
      />
    </>
  );
}
