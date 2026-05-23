import React from "react";
import { motion } from "framer-motion";
import { ACTS, ASSETS } from "../lib/content";

const ease = [0.16, 1, 0.3, 1];

const phases = [
  {
    no: "I",
    label: "Land",
    body: "Quiet, sun-baked geography aligned to future infrastructure routes.",
  },
  {
    no: "II",
    label: "Architecture",
    body: "Monumental geometry, ivory stone, palm shadows, calm proportion.",
  },
  {
    no: "III",
    label: "Ecosystem",
    body: "Boulevards, clubhouse, landscaped parks, water bodies — composed.",
  },
  {
    no: "IV",
    label: "Future-City",
    body: "Connected, breathing, alive — a sanctuary discovered before the rush.",
  },
];

const Transformation = () => {
  const act = ACTS[2];
  return (
    <section
      id="transformation"
      className="relative py-28 md:py-40 bg-ink overflow-hidden"
      data-testid="transformation-section"
    >
      {/* Floating background image */}
      <div className="absolute inset-y-0 right-0 w-full md:w-1/2 opacity-30">
        <div
          className="absolute inset-0 bg-cover bg-center animate-slow-pan"
          style={{ backgroundImage: `url(${ASSETS.semiHero})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/70 to-transparent" />
      </div>

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
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

        {/* Phased horizontal flow */}
        <div className="mt-20 md:mt-28 grid grid-cols-1 md:grid-cols-4 gap-px bg-bone/10 border border-bone/10">
          {phases.map((p, i) => (
            <motion.div
              key={p.no}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 1, ease, delay: i * 0.12 }}
              className="bg-ink p-8 md:p-10 group hover:bg-dune transition-colors duration-700"
              data-testid={`transformation-phase-${i + 1}`}
            >
              <div className="flex items-baseline justify-between mb-8">
                <span className="font-display text-5xl md:text-6xl text-sand">
                  {p.no}
                </span>
                <span className="text-[10px] uppercase tracking-[0.3em] text-bone/50">
                  Phase
                </span>
              </div>
              <div className="font-display text-2xl text-ivory mb-3">
                {p.label}
              </div>
              <p className="text-sm text-bone/65 font-light leading-relaxed">
                {p.body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Transformation;
