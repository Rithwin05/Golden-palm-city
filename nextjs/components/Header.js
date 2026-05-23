"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BRAND, NAV_LINKS, buildWhatsAppHref } from "@/lib/content";

const ease = [0.16, 1, 0.3, 1];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (window.scrollY / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setOpen(false);
  };

  return (
    <>
      {/* Scroll progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-sand z-[60] transition-all duration-100"
        style={{ width: `${scrollProgress}%` }}
      />

      <motion.header
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.2, ease }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          scrolled
            ? "backdrop-blur-2xl bg-ink/70 border-b border-bone/10 py-3"
            : "bg-transparent py-6"
        }`}
        data-testid="site-header"
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between">
          <button
            onClick={() => scrollTo("hero")}
            className="flex items-center gap-3 group"
            data-testid="brand-logo-button"
          >
            <span className="font-display text-2xl md:text-3xl text-ivory tracking-tight">
              Golden <span className="italic text-sand">Palm</span> City
            </span>
          </button>

          <nav className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className="text-[11px] uppercase tracking-[0.24em] text-bone/70 hover:text-sand luxe-link transition-colors duration-500"
                data-testid={`nav-link-${link.id}`}
              >
                {link.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href={buildWhatsAppHref()}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-ink bg-sand hover:bg-ivory transition-colors duration-500 px-5 py-3"
              data-testid="header-concierge-cta"
            >
              <span>Concierge</span>
              <span aria-hidden>→</span>
            </a>
            <button
              className="md:hidden p-2 text-bone"
              onClick={() => setOpen((v) => !v)}
              data-testid="mobile-menu-toggle"
              aria-label="Toggle menu"
            >
              {open ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center gap-8"
            data-testid="mobile-menu-overlay"
          >
            {NAV_LINKS.map((link, i) => (
              <motion.button
                key={link.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 + i * 0.08, duration: 0.6 }}
                onClick={() => scrollTo(link.id)}
                className="font-display text-4xl text-ivory hover:text-sand transition-colors"
                data-testid={`mobile-nav-${link.id}`}
              >
                {link.label}
              </motion.button>
            ))}
            <motion.a
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              href={buildWhatsAppHref()}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.24em] text-ink bg-sand px-6 py-4"
              data-testid="mobile-concierge-cta"
            >
              Concierge →
            </motion.a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
