"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { HERO, buildWhatsAppHref } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1];

export default function Hero() {
  const ref = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [preloaded, setPreloaded] = useState(false);
  const [loadPercentage, setLoadPercentage] = useState(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Fade out text overlay elements as scroll progresses
  const opacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);

  const frameCount = 271;

  // Helper to draw image onto canvas preserving "cover" aspect ratio
  const drawImage = (img) => {
    if (!img || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    
    // Set buffer size to match physical display pixels for crispness
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    
    const imgWidth = img.width;
    const imgHeight = img.height;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;
    
    const scale = Math.max(canvasWidth / imgWidth, canvasHeight / imgHeight);
    const x = (canvasWidth - imgWidth * scale) / 2;
    const y = (canvasHeight - imgHeight * scale) / 2;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, x, y, imgWidth * scale, imgHeight * scale);
  };

  // Helper to retrieve closest loaded frame to avoid black flickers
  const getClosestFrame = (index) => {
    if (imagesRef.current[index]) return imagesRef.current[index];
    for (let i = index; i >= 0; i--) {
      if (imagesRef.current[i]) return imagesRef.current[i];
    }
    for (let i = index; i < frameCount; i++) {
      if (imagesRef.current[i]) return imagesRef.current[i];
    }
    return null;
  };

  // Preloading image frames in the background
  useEffect(() => {
    let active = true;
    const loadedImages = [];
    let loadedCounter = 0;

    // Load first frame immediately for instant visual
    const firstImg = new Image();
    firstImg.src = `/frames/ezgif-frame-001.jpg`;
    firstImg.onload = () => {
      if (!active) return;
      loadedImages[0] = firstImg;
      imagesRef.current[0] = firstImg;
      drawImage(firstImg);
      
      // Load remainder of the frames
      loadRemaining();
    };

    const loadRemaining = () => {
      for (let i = 2; i <= frameCount; i++) {
        const img = new Image();
        const frameIndex = i - 1;
        img.src = `/frames/ezgif-frame-${i.toString().padStart(3, "0")}.jpg`;
        img.onload = () => {
          if (!active) return;
          loadedImages[frameIndex] = img;
          imagesRef.current[frameIndex] = img;
          loadedCounter++;
          
          const pct = Math.round((loadedCounter / (frameCount - 1)) * 100);
          setLoadPercentage(pct);
          
          if (loadedCounter === frameCount - 1) {
            setPreloaded(true);
          }
        };
      }
    };

    return () => {
      active = false;
    };
  }, []);

  // Draw appropriate frame on scroll
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.min(
      frameCount - 1,
      Math.floor(latest * frameCount)
    );
    const img = getClosestFrame(frameIndex);
    if (img) {
      drawImage(img);
    }
  });

  // Redraw when the window resizes to ensure canvas dimensions are correct
  useEffect(() => {
    const handleResize = () => {
      const progress = scrollYProgress.get();
      const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(progress * frameCount)
      );
      const img = getClosestFrame(frameIndex);
      if (img) {
        drawImage(img);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [scrollYProgress]);

  return (
    <section
      id="hero"
      ref={ref}
      className="relative h-[300vh] w-full bg-ink"
      data-testid="hero-section"
    >
      {/* Sticky Inner container that stays fixed while scroll happens */}
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden">
        {/* Optimized Canvas Element */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        {/* Preloading Progress HUD */}
        {!preloaded && (
          <div className="absolute top-28 md:top-32 right-6 md:right-12 z-20 flex items-center gap-3 bg-ink/65 backdrop-blur-md px-4 py-2.5 border border-sand/10 rounded-full">
            <div className="h-1.5 w-1.5 rounded-full bg-sand animate-pulse" />
            <span className="text-[9px] uppercase tracking-[0.24em] font-body text-sand">
              Preloading Cinematic Experience: {loadPercentage}%
            </span>
          </div>
        )}

        {/* Cinematic Vignette Overlay Layers */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-ink/40 pointer-events-none z-1" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/60 via-transparent to-ink/30 pointer-events-none z-1" />
        <div
          className="absolute inset-0 pointer-events-none z-1"
          style={{
            background:
              "radial-gradient(ellipse at 60% 40%, rgba(217,154,91,0.03) 0%, transparent 65%)",
          }}
        />

        {/* Top-left overline */}
        <motion.div
          style={{ opacity }}
          className="absolute top-28 md:top-32 left-6 md:left-12 z-10"
        >
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
        </motion.div>

        {/* Center stage content */}
        <motion.div
          style={{ opacity }}
          className="relative z-10 flex min-h-[100svh] items-end md:items-center"
        >
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
        </motion.div>

        {/* Bottom credentials */}
        <motion.div
          style={{ opacity }}
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
          style={{ opacity }}
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
      </div>
    </section>
  );
}
