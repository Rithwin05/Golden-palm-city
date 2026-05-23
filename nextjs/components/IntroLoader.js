"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ease = [0.16, 1, 0.3, 1];
const INTRO_KEY = "gpc_intro_seen_v2";

export default function IntroLoader({ onDone }) {
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState("loading"); // loading -> reveal -> done

  useEffect(() => {
    let raf;
    const start = performance.now();
    const total = 2200;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / total);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.round(eased * 100));
      if (p < 1) raf = requestAnimationFrame(tick);
      else {
        setTimeout(() => setPhase("reveal"), 200);
        setTimeout(() => {
          setPhase("done");
          onDone && onDone();
        }, 1500);
      }
    };
    raf = requestAnimationFrame(tick);
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = "";
    };
  }, [onDone]);

  return (
    <AnimatePresence>
      {phase !== "done" && (
        <motion.div
          key="intro"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1, ease }}
          className="fixed inset-0 z-[100] bg-ink overflow-hidden"
          data-testid="intro-loader"
        >
          {/* Radial golden glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-ink via-dune to-ink" />
          <div
            className="absolute inset-0 opacity-[0.4] mix-blend-overlay"
            style={{
              background:
                "radial-gradient(ellipse at 50% 60%, rgba(217,154,91,0.18) 0%, transparent 60%)",
            }}
          />

          {/* Curtain reveal panels */}
          <AnimatePresence>
            {phase === "reveal" && (
              <>
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: "-100%" }}
                  transition={{ duration: 1.4, ease }}
                  className="absolute inset-x-0 top-0 h-1/2 bg-ink z-20"
                />
                <motion.div
                  initial={{ y: 0 }}
                  animate={{ y: "100%" }}
                  transition={{ duration: 1.4, ease, delay: 0.05 }}
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-ink z-20"
                />
              </>
            )}
          </AnimatePresence>

          {/* Center content */}
          <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease }}
              className="flex items-center gap-4 mb-8"
            >
              <span className="h-px w-12 bg-sand" />
              <span className="text-[10px] uppercase tracking-[0.32em] text-sand">
                Kings Pride
              </span>
              <span className="h-px w-12 bg-sand" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, ease, delay: 0.2 }}
              className="font-display text-5xl md:text-7xl lg:text-8xl text-ivory tracking-tight text-center leading-[0.95]"
            >
              Golden <span className="italic text-sand">Palm</span> City
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
              className="mt-4 text-xs md:text-sm uppercase tracking-[0.32em] text-bone/50"
            >
              Discovering tomorrow
            </motion.p>

            {/* Progress */}
            <div className="mt-16 w-[280px] md:w-[420px]">
              <div className="flex items-baseline justify-between mb-3">
                <span className="text-[10px] uppercase tracking-[0.3em] text-bone/40">
                  Composing
                </span>
                <span
                  className="font-display text-xl text-sand tabular-nums"
                  data-testid="intro-counter"
                >
                  {String(count).padStart(3, "0")}
                </span>
              </div>
              <div className="h-px w-full bg-bone/10 relative overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-sand"
                  initial={{ width: "0%" }}
                  animate={{ width: `${count}%` }}
                  transition={{ duration: 0.05, ease: "linear" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
