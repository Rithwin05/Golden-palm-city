"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ACTS, ASSETS } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 1.2, ease },
};

function AnimatedCounter({ target, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - p, 4); // Quartic ease out for butter-smooth decelerating
      setCount(Math.round(eased * target));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }, [isInView, target]);

  return (
    <span ref={ref} className="font-display text-4xl md:text-5xl lg:text-6xl text-sand tabular-nums tracking-tight">
      {count}
      {suffix}
    </span>
  );
}

export default function Discovery() {
  const act = ACTS[0];

  // Motion variants for staggered word reveals
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const wordVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.9,
        ease,
      },
    },
  };

  return (
    <section
      id="discovery"
      className="relative z-10 -mt-[100vh] py-32 md:py-44 lg:py-56 bg-ink overflow-hidden shadow-[0_-40px_80px_rgba(15,13,12,0.98)] border-t border-sand/5"
      data-testid="discovery-section"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.05] bg-cover bg-center pointer-events-none"
        style={{ backgroundImage: `url(${ASSETS.duneTexture})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/95 to-ink pointer-events-none" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-12 gap-6 md:gap-12 items-start">
          {/* Vertical act marker */}
          <div className="hidden md:flex col-span-1 flex-col items-center gap-4 mt-3">
            <span className="text-[10px] uppercase tracking-[0.32em] text-sand">
              {act.no}
            </span>
            <div className="h-24 w-px bg-bone/20" />
          </div>

          <div className="col-span-12 md:col-span-11">
            <motion.div {...fadeUp} className="flex items-center gap-4 mb-10">
              <span className="h-px w-10 bg-sand" />
              <span className="text-[10px] md:text-xs uppercase tracking-[0.32em] text-sand">
                Act 01 — {act.label}
              </span>
            </motion.div>

            {/* Immersive Staggered Word Reveal */}
            <motion.h2
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.05] text-ivory max-w-5xl tracking-tight flex flex-wrap gap-x-[0.24em] gap-y-[0.08em]"
              data-testid="discovery-title"
            >
              {"A visionary luxury ecosystem,".split(" ").map((word, i) => (
                <motion.span key={`w1-${i}`} variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
              ))}
              <motion.span variants={wordVariants} className="inline-block italic text-sand font-serif">
                discovered
              </motion.span>
              <motion.span variants={wordVariants} className="inline-block italic text-sand font-serif">
                before
              </motion.span>
              {"the rest of the world arrives.".split(" ").map((word, i) => (
                <motion.span key={`w2-${i}`} variants={wordVariants} className="inline-block">
                  {word}
                </motion.span>
              ))}
            </motion.h2>

            <motion.p
              {...fadeUp}
              transition={{ duration: 1.2, ease, delay: 0.35 }}
              className="mt-10 max-w-2xl text-lg md:text-xl text-bone/70 font-light leading-relaxed"
            >
              {act.body}
            </motion.p>

            {/* Editorial interactive quotes row */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 1.2, ease, delay: 0.5 }}
              className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14"
            >
              {[
                { k: "Pace", v: "Cinematic, slow, monumental." },
                { k: "Lighting", v: "Engineered for golden-hour realism." },
                { k: "Atmosphere", v: "Palm wind, water reflection, depth." },
              ].map((item) => (
                <div key={item.k} className="group border-l border-sand/10 pl-6 py-1 hover:border-sand/40 transition-colors duration-500">
                  <div className="text-[10px] uppercase tracking-[0.3em] text-sand/55 group-hover:text-sand transition-colors duration-500 mb-3">
                    {item.k}
                  </div>
                  <div className="font-display text-2xl md:text-3xl text-ivory leading-tight group-hover:translate-x-1.5 transition-transform duration-500">
                    {item.v}
                  </div>
                </div>
              ))}
            </motion.div>

            {/* Premium Stats Grid with glowing floating cards */}
            <div className="mt-24">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 1.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
              >
                {[
                  { target: 4, suffix: "+", label: "Projects" },
                  { target: 500, suffix: "+", label: "Happy Families" },
                  { target: 15, suffix: " yrs", label: "Excellence" },
                  { target: 1, suffix: " KM", label: "From Highway" },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease, delay: i * 0.12 }}
                    whileHover={{ y: -6, scale: 1.02 }}
                    className="bg-dune/20 border border-bone/10 p-8 md:p-10 transition-all duration-500 hover:border-sand/35 hover:bg-dune/35 hover:shadow-[0_15px_40px_rgba(217,154,91,0.06)] group relative flex flex-col justify-between"
                  >
                    {/* Corner decorative bracket */}
                    <div className="absolute top-0 right-0 h-4 w-4 border-t border-r border-sand/0 group-hover:border-sand/30 transition-colors duration-500" />
                    <div>
                      <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                      <div className="mt-4 text-[10px] uppercase tracking-[0.28em] text-bone/50 group-hover:text-sand/80 transition-colors duration-500 font-body">
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
