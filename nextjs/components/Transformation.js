"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ACTS, ASSETS } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1];

const phases = [
  {
    no: "I",
    label: "Land",
    body: "Quiet, sun-baked geography aligned to future major infrastructure routes, chosen for maximum peace and long-term exponential growth.",
    image: ASSETS.semiHero,
    bgPosition: "center center",
  },
  {
    no: "II",
    label: "Architecture",
    body: "Monumental modern geometry, premium ivory stone structures, palm-tree shadows, and calm proportion designed for legacy families.",
    image: ASSETS.lifestyle,
    bgPosition: "center center",
  },
  {
    no: "III",
    label: "Ecosystem",
    body: "Wide palm avenues, high-end clubhouse, eco-futuristic landscaped parks, and calm glassy water bodies composed for complete aesthetic harmony.",
    image: ASSETS.envBoulevard,
    bgPosition: "center center",
  },
  {
    no: "IV",
    label: "Future-City",
    body: "Connected, breathing, and fully alive — a premium, luxurious sanctuary discovered before the rush of the world arrives.",
    image: ASSETS.hero,
    bgPosition: "center 30%",
  },
];

export default function Transformation() {
  const act = ACTS[2];
  const [activePhase, setActivePhase] = useState(0);

  return (
    <section
      id="transformation"
      className="relative py-28 md:py-40 bg-ink overflow-hidden border-t border-sand/5"
      data-testid="transformation-section"
    >
      {/* Dynamic Ambient Background Previewer (Right / Full-screen overlay on desktop) */}
      <div className="absolute inset-0 md:left-1/2 md:w-1/2 w-full h-full opacity-20 pointer-events-none z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhase}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 0.35, scale: 1.02 }}
            exit={{ opacity: 0, scale: 1 }}
            transition={{ duration: 0.8, ease }}
            className="absolute inset-0 bg-cover"
            style={{
              backgroundImage: `url(${phases[activePhase].image})`,
              backgroundPosition: phases[activePhase].bgPosition,
            }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-ink" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12 z-10">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease }}
          className="max-w-3xl"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="h-px w-10 bg-sand" />
            <span className="text-[10px] uppercase tracking-[0.32em] text-sand">
              Act 03 — {act.label}
            </span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ivory tracking-tight">
            The city does not arrive.{" "}
            <span className="italic text-sand">It unfolds.</span>
          </h2>
          <p className="mt-8 text-base md:text-lg text-bone/70 font-light leading-relaxed max-w-2xl">
            {act.body}
          </p>
        </motion.div>

        {/* Interactive Phased Timeline Flow Grid */}
        <div className="mt-20 md:mt-24 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {phases.map((p, i) => {
            const isActive = activePhase === i;
            return (
              <motion.div
                key={p.no}
                initial={{ opacity: 0, y: 45 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.8, ease, delay: i * 0.12 }}
                onMouseEnter={() => setActivePhase(i)}
                onClick={() => setActivePhase(i)}
                className={`p-8 md:p-10 cursor-pointer transition-all duration-700 relative overflow-hidden flex flex-col justify-between min-h-[280px] group ${
                  isActive
                    ? "bg-dune/35 border border-sand/35 shadow-[0_15px_40px_rgba(217,154,91,0.06)]"
                    : "bg-dune/10 border border-bone/10 hover:border-bone/25 hover:bg-dune/20"
                }`}
                data-testid={`transformation-phase-${i + 1}`}
              >
                {/* Micro-glow indicator on top border */}
                <div
                  className={`absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-sand to-transparent transition-opacity duration-700 ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />

                <div className="flex items-baseline justify-between mb-8 relative z-10">
                  <span
                    className={`font-display text-5xl md:text-6xl transition-colors duration-500 ${
                      isActive ? "text-sand" : "text-bone/35 group-hover:text-bone/60"
                    }`}
                  >
                    {p.no}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.3em] text-bone/45 font-body">
                    Phase
                  </span>
                </div>

                <div className="relative z-10">
                  <div className={`font-display text-2xl mb-4 transition-colors duration-500 ${
                    isActive ? "text-sand" : "text-ivory"
                  }`}>
                    {p.label}
                  </div>
                  <p className="text-sm text-bone/70 font-light leading-relaxed">
                    {p.body}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
