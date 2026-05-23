import React from "react";
import { motion } from "framer-motion";
import { ACTS, ASSETS } from "../lib/content";

const ease = [0.16, 1, 0.3, 1];

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.3 },
  transition: { duration: 1.2, ease },
};

const Discovery = () => {
  const act = ACTS[0];
  return (
    <section
      id="discovery"
      className="relative py-32 md:py-44 lg:py-56 bg-ink overflow-hidden"
      data-testid="discovery-section"
    >
      {/* Subtle background texture */}
      <div
        className="absolute inset-0 opacity-[0.06] bg-cover bg-center"
        style={{ backgroundImage: `url(${ASSETS.duneTexture})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/95 to-ink" />

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

            <motion.h2
              {...fadeUp}
              transition={{ duration: 1.4, ease, delay: 0.1 }}
              className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.02] text-ivory max-w-5xl tracking-tight"
              data-testid="discovery-title"
            >
              A visionary luxury ecosystem,{" "}
              <span className="italic text-sand">discovered before</span> the
              rest of the world arrives.
            </motion.h2>

            <motion.p
              {...fadeUp}
              transition={{ duration: 1.2, ease, delay: 0.25 }}
              className="mt-10 max-w-2xl text-lg md:text-xl text-bone/70 font-light leading-relaxed"
            >
              {act.body}
            </motion.p>

            {/* Editorial quotes row */}
            <motion.div
              {...fadeUp}
              transition={{ duration: 1.2, ease, delay: 0.4 }}
              className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14"
            >
              {[
                {
                  k: "Pace",
                  v: "Cinematic, slow, monumental.",
                },
                {
                  k: "Lighting",
                  v: "Engineered for golden-hour realism.",
                },
                {
                  k: "Atmosphere",
                  v: "Palm wind, water reflection, depth.",
                },
              ].map((item) => (
                <div key={item.k}>
                  <div className="text-[10px] uppercase tracking-[0.3em] text-sand mb-3">
                    {item.k}
                  </div>
                  <div className="font-display text-2xl md:text-3xl text-ivory leading-tight">
                    {item.v}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Discovery;
