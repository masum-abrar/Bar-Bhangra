import React from "react";
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

const SocialSection = () => {
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
    <div className="relative py-20 bg-linear-to-b from-black via-gray-950 to-black text-white overflow-hidden ">
      {/* ===== Section Header ===== */}
      <div className="text-center mb-16">
        <div className="inline-flex items-center justify-center mb-6">
          <div className="w-12 h-px bg-linear-to-r from-transparent to-red-600 mr-4" />
          <span className="text-red-600 text-2xl">🌐</span>
          <div className="w-12 h-px bg-linear-to-l from-transparent to-red-600 ml-4" />
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
          Stay{" "}
          <span className="text-transparent bg-clip-text bg-linear-to-r from-red-600 to-red-400">
            Connected
          </span>
        </h2>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light leading-relaxed">
          Follow us on social media or join our WhatsApp community for instant
          updates.
        </p>
      </div>

      {/* Social & WhatsApp Section */}
      <div className="flex flex-col justify-around md:flex-row items-start md:items-center gap-8 max-w-6xl mx-auto">
        {/* LEFT : Social Icons */}
        <div>
          <h4 className="text-lg font-semibold text-white mb-4">Follow Us</h4>

          <div className="flex gap-4">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group w-12 h-12 rounded-full
                             bg-gray-900/50 border border-gray-800/50
                             flex items-center justify-center
                             text-gray-400
                             hover:text-white
                             hover:border-red-600/50
                             hover:bg-gray-800/70
                             transition-all duration-300
                             hover:-translate-y-1"
                aria-label={social.label}
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* RIGHT : WhatsApp Join Section */}
        <div
          className="relative  overflow-hidden p-6 rounded-2xl
                       bg-linear-to-br from-green-900/30 to-green-800/20
                       border border-green-700/30 backdrop-blur-sm
                       hover:border-green-500/50 transition-all duration-300"
        >
          <div className="flex items-center gap-4">
            {/* Icon */}
            <div
              className="w-12 h-12 shrink-0 rounded-full
                           bg-green-600/20
                           flex items-center justify-center
                           text-green-400 text-xl"
            >
              <FaWhatsapp />
            </div>

            {/* Content */}
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-white">
                Join Our WhatsApp Community
              </h4>
              <p className="text-gray-400 text-sm mt-1">
                Instant updates, offers & exclusive nights.
              </p>
            </div>

            {/* Join Button */}
            <a
              href="https://chat.whatsapp.com/YOUR_GROUP_INVITE_LINK"
              target="_blank"
              rel="noopener noreferrer"
              className="relative overflow-hidden inline-flex items-center gap-2
                           px-6 py-3 rounded-xl font-medium text-white
                           bg-linear-to-r from-green-500 to-green-600
                           transition-all duration-300
                           hover:from-green-600 hover:to-green-700
                           hover:shadow-lg hover:shadow-green-500/30
                           active:scale-95
                           group"
            >
              {/* splash effect */}
              <span
                className="absolute inset-0 bg-white/20 scale-0 rounded-full
                             group-hover:scale-150
                             group-hover:opacity-0
                             transition-all duration-500"
              />

              <span className="relative z-10">Join</span>
              <span className="relative z-10 text-lg group-hover:translate-x-1 transition-transform">
                →
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SocialSection;
