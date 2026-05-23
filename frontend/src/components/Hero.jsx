import React from "react";
import { motion } from "framer-motion";
import { ASSETS, HERO, buildWhatsAppHref } from "../lib/content";
import Particles3D from "./Particles3D";

const ease = [0.16, 1, 0.3, 1];

const Hero = () => {
  return (
    <section
      id="hero"
      className="relative min-h-[100svh] w-full overflow-hidden bg-ink"
      data-testid="hero-section"
    >
      {/* Background image with slow pan */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center animate-slow-pan"
          style={{ backgroundImage: `url(${ASSETS.hero})` }}
        />
        {/* Cinematic vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/70" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-ink/40" />
      </div>

      {/* WebGL particles overlay — subtle environmental dust */}
      <Particles3D className="z-[1]" />

      {/* Top-left overline */}
      <div className="absolute top-28 md:top-32 left-6 md:left-12 z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease, delay: 0.6 }}
          className="flex items-center gap-4"
        >
          <span className="h-px w-12 bg-sand" />
          <span className="text-[10px] md:text-xs uppercase tracking-[0.32em] text-sand">
            {HERO.overline}
          </span>
        </motion.div>
      </div>

      {/* Center stage content */}
      <div className="relative z-10 flex min-h-[100svh] items-end md:items-center">
        <div className="max-w-[1400px] mx-auto w-full px-6 md:px-12 pb-20 md:pb-0">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease, delay: 0.9 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[7.5rem] leading-[0.95] tracking-tight text-ivory max-w-5xl"
            data-testid="hero-title"
          >
            {HERO.title}
            <br />
            <span className="italic text-sand">{HERO.titleAccent}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.4, ease, delay: 1.2 }}
            className="mt-8 max-w-xl text-base md:text-lg text-bone/75 font-light tracking-wide leading-relaxed"
          >
            {HERO.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease, delay: 1.5 }}
            className="mt-12 flex flex-wrap items-center gap-6"
          >
            <a
              href={buildWhatsAppHref(
                "I'd like to continue my journey with Golden Palm City."
              )}
              target="_blank"
              rel="noreferrer"
              className="group relative inline-flex items-center gap-3 bg-sand text-ink px-8 py-5 text-[11px] uppercase tracking-[0.28em] hover:bg-ivory transition-colors duration-700"
              data-testid="hero-cta-button"
            >
              <span>{HERO.cta}</span>
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
                →
              </span>
            </a>

            <button
              onClick={() =>
                document
                  .getElementById("discovery")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-[11px] uppercase tracking-[0.28em] text-bone/80 luxe-link"
              data-testid="hero-scroll-button"
            >
              Scroll to discover
            </button>
          </motion.div>
        </div>
      </div>

      {/* Bottom credentials marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 1.8 }}
        className="absolute bottom-6 md:bottom-8 left-6 md:left-12 right-6 md:right-12 z-10 flex items-end justify-between"
      >
        <div className="hidden md:block text-[10px] uppercase tracking-[0.3em] text-bone/50">
          Shadnagar · Rangareddyguda · India
        </div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-bone/50 flex items-center gap-4">
          <span className="hidden sm:inline">RERA</span>
          <span className="hidden sm:inline opacity-30">·</span>
          <span className="hidden sm:inline">HMDA</span>
          <span className="hidden sm:inline opacity-30">·</span>
          <span>From ₹5,000 / sq.yd</span>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2.2 }}
        className="hidden md:flex absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex-col items-center gap-3"
      >
        <span className="text-[9px] uppercase tracking-[0.32em] text-bone/40">
          Scroll
        </span>
        <div className="h-12 w-px scroll-track">
          <div className="h-1/2 w-full bg-sand animate-shimmer" />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
