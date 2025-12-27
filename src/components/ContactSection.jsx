"use client";

import { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  FaMapMarkerAlt,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
  FaWhatsapp,
} from "react-icons/fa";
import API from "@/libs/Api";
import toast, { Toaster } from "react-hot-toast";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function ContactSection() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle"); // "idle" | "success" | "error"

  // Animation on scroll
  // useEffect(() => {
  //   const elements = formRef.current?.children || [];
  //   gsap.set(elements, { opacity: 0, y: 40 });

  //   const tl = gsap.timeline({
  //     scrollTrigger: {
  //       trigger: sectionRef.current,
  //       start: "top 80%",
  //       toggleActions: "play none none reverse",
  //     },
  //   });

  //   tl.to(elements, {
  //     opacity: 1,
  //     y: 0,
  //     stagger: 0.1,
  //     duration: 0.8,
  //     ease: "power2.out",
  //   });

  //   return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await API.post("/bar-contact", {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        message: formData.message,
      });

      setIsSubmitting(false);
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" });

      toast.success(
        "🎉 Message sent successfully! We'll get back to you soon.",
        {
          style: {
            background: "#111",
            color: "#fff",
            padding: "16px",
            borderRadius: "12px",
          },
          icon: "✉️",
        }
      );
    } catch (err) {
      console.error(err);
      setIsSubmitting(false);

      toast.error("❌ Something went wrong. Please try again later.", {
        style: {
          background: "#111",
          color: "#fff",
          padding: "16px",
          borderRadius: "12px",
        },
        icon: "⚠️",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: <FaMapMarkerAlt className="text-red-500" />,
      title: "Visit Us",
      details: ["Runeberginkatu 28", "00100 Helsinki, Finland"],
    },
    {
      icon: <FaPhone className="text-red-500" />,
      title: "Call Us",
      details: ["+358 40 123 4567", "+358 40 987 6543"],
    },
    {
      icon: <FaEnvelope className="text-red-500" />,
      title: "Email Us",
      details: ["info@mzcorporation.com", "reservations@mzcorporation.com"],
    },
    {
      icon: <FaClock className="text-red-500" />,
      title: "Opening Hours",
      details: ["Mon-Fri: 11:00 - 22:00", "Sat-Sun: 12:00 - 23:00"],
    },
  ];

  const socialLinks = [
    { icon: <FaFacebook />, href: "#", label: "Facebook" },
    { icon: <FaInstagram />, href: "#", label: "Instagram" },
    { icon: <FaTwitter />, href: "#", label: "Twitter" },
  ];

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative py-28 bg-linear-to-b from-black via-gray-950 to-black text-white overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* linear orbs */}
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-linear-to-br from-red-600/10 via-transparent to-red-600/5 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-linear-to-tl from-red-600/10 via-transparent to-red-600/5 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-linear(to right, white 1px, transparent 1px),
                             linear-linear(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Decorative lines */}
        <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-red-600/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-red-600/30 to-transparent" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center mb-6">
            <div className="w-12 h-px bg-linear-to-r from-transparent to-red-600 mr-4" />
            <span className="text-red-600 text-2xl">✉️</span>
            <div className="w-12 h-px bg-linear-to-l from-transparent to-red-600 ml-4" />
          </div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
            Get In{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-red-400">
              Touch
            </span>
          </h2>

          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
            Have questions? We're here to help. Send us a message and we'll
            respond as soon as possible.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">
                Contact Information
              </h3>

              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 rounded-xl bg-gray-900/30 backdrop-blur-sm border border-gray-800/50 hover:border-red-600/30 transition-all duration-300"
                  >
                    <div className="shrink-0 w-12 h-12 rounded-full bg-red-900/20 flex items-center justify-center">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-white mb-1">
                        {info.title}
                      </h4>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-gray-400 text-sm">
                          {detail}
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Company Info */}
            <div className="p-6 rounded-2xl bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-sm border border-gray-800/50">
              <h4 className="text-xl font-bold text-white mb-4">
                MZ Corporation OY
              </h4>
              <div className="space-y-2">
                <p className="text-gray-400">
                  Business ID: <span className="text-white">3478156-2</span>
                </p>
                <p className="text-gray-400">
                  VAT: <span className="text-white">FI34781562</span>
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="relative">
            {/* Status Messages */}
            {submitStatus === "success" && (
              <div className="mb-6 p-4 rounded-xl bg-linear-to-r from-emerald-900/30 to-emerald-800/20 border border-emerald-800/30 flex items-center gap-3">
                <FaCheckCircle className="text-emerald-400 text-xl" />
                <div>
                  <p className="font-semibold text-emerald-400">
                    Message Sent Successfully!
                  </p>
                  <p className="text-emerald-300/80 text-sm">
                    We'll get back to you within 24 hours.
                  </p>
                </div>
              </div>
            )}

            {submitStatus === "error" && (
              <div className="mb-6 p-4 rounded-xl bg-linear-to-r from-red-900/30 to-red-800/20 border border-red-800/30 flex items-center gap-3">
                <FaExclamationCircle className="text-red-400 text-xl" />
                <div>
                  <p className="font-semibold text-red-400">
                    Something went wrong
                  </p>
                  <p className="text-red-300/80 text-sm">
                    Please try again later.
                  </p>
                </div>
              </div>
            )}

            <div className="bg-linear-to-br from-gray-900/40 to-gray-900/20 backdrop-blur-xl rounded-2xl border border-gray-800/50 p-8">
              <h3 className="text-2xl font-bold text-white mb-2">
                Send us a Message
              </h3>
              <p className="text-gray-400 mb-8">
                Fill out the form below and we'll contact you soon
              </p>

              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Your Name *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Email Address *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all duration-300"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-6">
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-sm font-medium text-gray-300 mb-2"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all duration-300"
                      placeholder="+358 40 123 4567"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-300 mb-2"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3 bg-gray-900/50 backdrop-blur-sm border border-gray-800/50 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all duration-300 resize-none"
                    placeholder="Tell us how we can help you..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`btn-splash w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 ${
                    isSubmitting
                      ? "bg-gray-700 cursor-not-allowed"
                      : "bg-linear-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 hover:shadow-2xl hover:shadow-red-600/30"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane />
                      <span>Send Message</span>
                    </>
                  )}
                </button>
              </form>

              {/* Privacy Note */}
              <p className="text-gray-500 text-sm mt-6 text-center">
                By submitting this form, you agree to our{" "}
                <a
                  href="#"
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>
        </div>

        {/* Map Preview */}
      </div>
      <Toaster position="top-center" reverseOrder={false} duration={5000} />
    </section>
  );
}
