"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaStar, FaFire, FaWineGlassAlt, FaLeaf } from "react-icons/fa";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MenuSection() {
  const sectionRef = useRef(null);
  const categoryRefs = useRef([]);
  const itemRefs = useRef([]);
  const [activeCategory, setActiveCategory] = useState("all");
  const [hoveredItem, setHoveredItem] = useState(null);

  const [menuTypes, setMenuTypes] = useState([]);
  const [menuCategories, setMenuCategories] = useState([]);
  const [menuItems, setMenuItems] = useState([]);

  // Fetch API data
  useEffect(() => {
    async function fetchData() {
      try {
        const typesRes = await fetch(
          "https://bar-bhangra-backend.vercel.app/api/v1/menu-types"
        );
        const typesJson = await typesRes.json();
        setMenuTypes(typesJson.data || []);

        const categoriesRes = await fetch(
          "https://bar-bhangra-backend.vercel.app/api/v1/menu-categories"
        );
        const categoriesJson = await categoriesRes.json();
        setMenuCategories(categoriesJson.data || []);

        const itemsRes = await fetch(
          "https://bar-bhangra-backend.vercel.app/api/v1/menu-items"
        );
        const itemsJson = await itemsRes.json();
        setMenuItems(itemsJson.data || []);
      } catch (err) {
        console.error("Error fetching menu data:", err);
      }
    }
    fetchData();
  }, []);

  // GSAP animation
  useEffect(() => {
    gsap.set(categoryRefs.current, { opacity: 0, y: 50 });
    gsap.set(itemRefs.current, { opacity: 0, y: 60, scale: 0.95 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
        toggleActions: "play none none reverse",
      },
    });

    tl.to(categoryRefs.current, {
      opacity: 1,
      y: 0,
      stagger: 0.15,
      duration: 0.9,
      ease: "power2.out",
    }).to(
      itemRefs.current,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        stagger: 0.08,
        duration: 0.9,
        ease: "back.out(1.4)",
      },
      0.4
    );

    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, [menuItems]);

  // Map categories with items
  const categoriesWithItems = menuCategories.map((cat) => ({
    ...cat,
    items: menuItems.filter((item) => item.categoryId === cat.id),
    type: cat.menuType?.name || "other",
  }));

  // Filter displayed categories
  const displayedCategories =
    activeCategory === "all"
      ? categoriesWithItems
      : categoriesWithItems.filter(
          (cat) => cat.type === activeCategory || cat.id === activeCategory
        );

  // Category badges for filter buttons
  const categoryBadges = [
    { id: "all", label: "All", icon: <FaStar /> },
    ...menuTypes.map((type) => ({
      id: type.name,
      label: type.name.charAt(0).toUpperCase() + type.name.slice(1),
      icon: type.name === "drinks" ? <FaWineGlassAlt /> : <FaFire />,
    })),
  ];
  // Inside your component
  const ITEMS_PER_PAGE = 6; // Number of items per page

  // State to track pagination per category
  const [currentPage, setCurrentPage] = useState({});

  // Get items to display per category
  const getPaginatedItems = (cat) => {
    const page = currentPage[cat.id] || 1;
    const start = (page - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    return cat.items.slice(start, end);
  };

  // Total pages per category
  const getTotalPages = (cat) => {
    return Math.ceil(cat.items.length / ITEMS_PER_PAGE);
  };

  // Function to handle page change
  const handlePageChange = (catId, page) => {
    setCurrentPage((prev) => ({
      ...prev,
      [catId]: page,
    }));
  };

  return (
    <section
      ref={sectionRef}
      id="menu"
      className="relative py-28 bg-gradient-to-b from-black via-gray-950 to-black text-white overflow-hidden"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-red-600/30 to-transparent" />
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-gradient-to-br from-red-600/5 via-transparent to-red-600/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -right-40 w-80 h-80 bg-gradient-to-tl from-red-600/5 via-transparent to-red-600/5 rounded-full blur-3xl animate-pulse" />
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(to right, white 1px, transparent 1px),
                             linear-gradient(to bottom, white 1px, transparent 1px)`,
            backgroundSize: "50px 50px",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-red-600 mr-4" />
            <FaStar className="text-red-600 text-xl" />
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-red-600 ml-4" />
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 tracking-tight">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-red-400">
              Premium
            </span>{" "}
            Menu
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto font-light">
            Crafted with passion, served with excellence. Experience culinary
            artistry in every bite and sip.
          </p>
        </div>

        {/* Filter Buttons */}
        <div className="flex justify-center mb-16 flex-wrap gap-2">
          {categoryBadges.map((category, i) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              ref={(el) => (categoryRefs.current[i] = el)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? "bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-600/20"
                  : "text-gray-400 hover:text-white hover:bg-gray-800/30"
              }`}
            >
              {category.icon && <span>{category.icon}</span>}
              {category.label}
            </button>
          ))}
        </div>

        {/* Menu Items */}
        <div className="space-y-24">
          {displayedCategories.map((cat, i) => (
            <div key={cat.id} className="relative">
              <h4 className="text-2xl font-semibold text-white mb-8 pb-4 border-b border-gray-800/50">
                {cat.name}
              </h4>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {getPaginatedItems(cat).map((item, j) => (
                  <div
                    key={item.id}
                    ref={(el) => (itemRefs.current[i * 10 + j] = el)}
                    onMouseEnter={() => setHoveredItem(i * 10 + j)}
                    onMouseLeave={() => setHoveredItem(null)}
                    className="group relative"
                  >
                    {/* Badge */}
                    <div className="absolute top-4 left-4 z-20 bg-red-600/90 text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg">
                      {cat.name}
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-br from-red-600/10 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="relative bg-gradient-to-b from-gray-900/40 to-gray-900/20 backdrop-blur-xl rounded-2xl border border-gray-800/30 group-hover:border-red-600/50 group-hover:shadow-2xl group-hover:shadow-red-600/10 transition-all duration-500 overflow-hidden">
                      <div className="relative h-56 overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent z-10" />
                        <img
                          src={item?.imageUrl || "/menu/placeholder.jpg"}
                          alt={item?.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                      </div>

                      <div className="p-6 relative">
                        <div className="flex justify-between items-start mb-3">
                          <h5 className="text-xl font-bold text-white group-hover:text-red-400 transition-colors duration-300">
                            {item.name}
                          </h5>
                          <span className="text-2xl font-bold bg-gradient-to-r from-red-400 to-red-300 text-transparent bg-clip-text">
                            {item.price}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {item.tags?.map((tag, idx) => (
                            <span
                              key={idx}
                              className="inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full bg-gray-800/50 text-gray-300"
                            >
                              {tag.icon === "fire" && (
                                <FaFire className="text-xs" />
                              )}
                              {tag.icon === "leaf" && (
                                <FaLeaf className="text-xs" />
                              )}
                              {tag.label}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {getTotalPages(cat) > 1 && (
                <div className="flex justify-center gap-2 mt-6">
                  {Array.from({ length: getTotalPages(cat) }, (_, idx) => (
                    <button
                      key={idx}
                      onClick={() => handlePageChange(cat.id, idx + 1)}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        (currentPage[cat.id] || 1) === idx + 1
                          ? "bg-red-600 text-white"
                          : "bg-gray-800 text-gray-300 hover:bg-gray-700"
                      }`}
                    >
                      {idx + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
