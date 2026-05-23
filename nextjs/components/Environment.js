"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ACTS, ASSETS } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1];

const tabData = [
  {
    id: "boulevards",
    title: "Palm Boulevards",
    image: ASSETS.envBoulevard,
    tagline: "Palm-lined arteries, tranquil reflections.",
    description: "Grand avenues sculpted with symmetric avenues of mature palms, designed to play with long evening shadows and reflect the premium, eco-futuristic architecture.",
    features: [
      "Grand 100-foot palm entryway",
      "Integrated water-absorbing avenue lanes",
      "Calibrated golden-hour landscape lighting",
      "Premium walking paths & clean corridors",
    ],
  },
  {
    id: "horizons",
    title: "Reflective Horizon",
    image: ASSETS.lifestyle,
    tagline: "Architectural breathing space & water symmetry.",
    description: "Sanctuaries planned to overlook expansive, glassy reflection pools and manicured horizon terraces, merging structure and natural liquid boundaries seamlessly.",
    features: [
      "Sunken terrace lounge layouts",
      "Ivory stone framing & clean geometric ratios",
      "Horizon-depth infinity reflections",
      "Eco-balanced recycling pond irrigation",
    ],
  },
  {
    id: "parks",
    title: "Scenic Future-Land",
    image: ASSETS.semiHero,
    tagline: "A breath of eco-futuristic fresh air.",
    description: "Sun-drenched botanical parks and modern open breathing spaces engineered for microclimate temperature reduction and physical tranquility.",
    features: [
      "Native drought-resilient vegetation",
      "Solar-shaded outdoor workstations",
      "Wide-acre preservation zones",
      "Microclimate palm-wind cooling setups",
    ],
  },
];

export default function Environment() {
  const act = ACTS[1];
  const [activeTab, setActiveTab] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Mouse-tracking 3D lens parallax hover effect
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width - 0.5) * 20; // range -10px to +10px
    const y = ((e.clientY - top) / height - 0.5) * 20;
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <section
      id="environment"
      className="relative py-28 md:py-40 bg-ink border-t border-sand/5"
      data-testid="environment-section"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease }}
          className="grid grid-cols-12 gap-6 md:gap-12 mb-12 md:mb-16"
        >
          <div className="col-span-12 md:col-span-6">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-10 bg-sand" />
              <span className="text-[10px] uppercase tracking-[0.32em] text-sand">
                Act 02 — {act.label}
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ivory tracking-tight">
              {act.title}
            </h2>
          </div>
          <div className="col-span-12 md:col-span-6 flex items-end">
            <p className="text-base md:text-lg text-bone/70 font-light leading-relaxed max-w-md">
              {act.body}
            </p>
          </div>
        </motion.div>

        {/* Premium Interactive Tabs Menu */}
        <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-12 border-b border-bone/10 pb-6">
          {tabData.map((tab, idx) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(idx)}
              className={`relative px-6 py-3.5 text-[10px] md:text-xs uppercase tracking-[0.24em] transition-all duration-500 rounded-none overflow-hidden ${
                activeTab === idx
                  ? "text-ink font-medium"
                  : "text-bone/60 hover:text-ivory bg-transparent"
              }`}
            >
              {activeTab === idx && (
                <motion.div
                  layoutId="activeEnvTabBg"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  className="absolute inset-0 bg-sand z-0"
                />
              )}
              <span className="relative z-10">{tab.title}</span>
            </button>
          ))}
        </div>

        {/* Interactive Bento Environmental Explorer Showcase */}
        <div className="grid grid-cols-12 gap-6 md:gap-10 items-stretch">
          {/* Main Visual Showcase (2/3 Grid) */}
          <div className="col-span-12 lg:col-span-8 flex flex-col justify-between">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease }}
              className="relative overflow-hidden cursor-crosshair h-[400px] md:h-[550px] border border-bone/10 bg-dune/20"
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              data-testid="env-explorer-visual"
            >
              {/* Image Cross-fade with 3D Lens Parallax */}
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeTab}
                  src={tabData[activeTab].image}
                  alt={tabData[activeTab].title}
                  initial={{ opacity: 0, scale: 1.08 }}
                  animate={{
                    opacity: 1,
                    scale: 1.04,
                    x: mousePos.x,
                    y: mousePos.y,
                  }}
                  exit={{ opacity: 0, scale: 1.02 }}
                  transition={{
                    opacity: { duration: 0.6 },
                    scale: { duration: 0.8, ease },
                    x: { type: "tween", ease: "easeOut", duration: 0.2 },
                    y: { type: "tween", ease: "easeOut", duration: 0.2 },
                  }}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Glowing Vignette Overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/20 to-transparent pointer-events-none" />

              {/* Dynamic bottom details overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                <div className="text-[9px] uppercase tracking-[0.3em] text-sand mb-2 font-body font-medium">
                  Showcase Landscape
                </div>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -15 }}
                    transition={{ duration: 0.5, ease }}
                    className="font-display text-xl sm:text-2xl md:text-3xl text-ivory tracking-tight"
                  >
                    {tabData[activeTab].tagline}
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Details & Information Deck (1/3 Grid) */}
          <div className="col-span-12 lg:col-span-4 flex flex-col justify-between">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.6, ease }}
                className="flex flex-col justify-between h-full bg-dune/20 border border-bone/10 p-8 md:p-10 relative overflow-hidden"
              >
                {/* Subtle corner decorative design */}
                <div className="absolute top-0 left-0 h-10 w-px bg-sand/10" />
                <div className="absolute top-0 left-0 h-px w-10 bg-sand/10" />

                <div>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-sand mb-6 font-body font-medium">
                    Showcase Details
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl text-ivory mb-5 leading-tight tracking-tight">
                    {tabData[activeTab].title}
                  </h3>
                  <p className="text-sm md:text-base text-bone/70 font-light leading-relaxed mb-8">
                    {tabData[activeTab].description}
                  </p>
                </div>

                <div className="border-t border-bone/10 pt-8 mt-auto">
                  <div className="text-[9px] uppercase tracking-[0.24em] text-sand mb-4 font-body">
                    Key Specifications
                  </div>
                  <ul className="space-y-4">
                    {tabData[activeTab].features.map((feat, i) => (
                      <motion.li
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: i * 0.1 }}
                        key={feat}
                        className="flex items-start gap-3 text-sm text-bone/80 font-light leading-snug group"
                      >
                        <span className="mt-2.5 h-1.5 w-1.5 rounded-full bg-sand shrink-0 shadow-[0_0_8px_rgba(217,154,91,0.6)] group-hover:scale-125 transition-transform duration-300" />
                        <span>{feat}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
