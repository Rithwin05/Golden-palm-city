"use client";

import { motion } from "framer-motion";
import { ACTS, ASSETS } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1];

export default function Environment() {
  const act = ACTS[1];
  return (
    <section
      id="environment"
      className="relative py-28 md:py-40 bg-ink"
      data-testid="environment-section"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease }}
          className="grid grid-cols-12 gap-6 md:gap-12 mb-16 md:mb-24"
        >
          <div className="col-span-12 md:col-span-5">
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
          <div className="col-span-12 md:col-span-6 md:col-start-7 flex items-end">
            <p className="text-base md:text-lg text-bone/70 font-light leading-relaxed max-w-md">
              {act.body}
            </p>
          </div>
        </motion.div>

        {/* Bento environmental layout */}
        <div className="grid grid-cols-12 gap-4 md:gap-8">
          {/* Large boulevard image */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease }}
            className="col-span-12 md:col-span-8 img-reveal relative"
            data-testid="env-boulevard-image"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={ASSETS.envBoulevard}
              alt="Palm-lined boulevard at golden hour"
              className="w-full h-[440px] md:h-[600px] object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent">
              <div className="text-[10px] uppercase tracking-[0.3em] text-sand mb-2">
                Boulevards
              </div>
              <div className="font-display text-2xl md:text-3xl text-ivory">
                Palm-lined arteries, tranquil reflections.
              </div>
            </div>
          </motion.div>

          {/* Side stacked details */}
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.4, ease, delay: 0.15 }}
            className="col-span-12 md:col-span-4 flex flex-col gap-4 md:gap-8 md:mt-20"
          >
            <div className="img-reveal" data-testid="env-lifestyle-image">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={ASSETS.lifestyle}
                alt="Villa interior overlooking calm reflective water"
                className="w-full h-[260px] md:h-[340px] object-cover"
              />
            </div>

            <div className="bg-dune border border-bone/10 p-6 md:p-8">
              <div className="text-[10px] uppercase tracking-[0.3em] text-sand mb-4">
                Environment
              </div>
              <ul className="space-y-3 text-bone/80 font-light">
                {[
                  "Golden-hour realism",
                  "Eco-futuristic landscaping",
                  "Architectural breathing space",
                  "Water reflections & horizon depth",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <span className="mt-2 h-px w-4 bg-sand shrink-0" />
                    <span className="text-sm md:text-base">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
