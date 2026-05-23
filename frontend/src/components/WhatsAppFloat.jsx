import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { buildWhatsAppHref } from "../lib/content";

const WhatsAppFloat = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.a
          initial={{ opacity: 0, y: 30, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.9 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          href={buildWhatsAppHref()}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-40 flex items-center gap-3 bg-sand text-ink pl-5 pr-6 py-4 shadow-2xl golden-glow hover:bg-ivory transition-colors duration-500"
          data-testid="floating-whatsapp-cta"
        >
          <svg
            viewBox="0 0 32 32"
            className="w-5 h-5"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M19.1 17.3c-.3-.1-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.8.9-1 1.1-.2.2-.4.2-.7.1-.3-.1-1.2-.5-2.3-1.4-.9-.7-1.4-1.6-1.6-1.9-.2-.3 0-.5.1-.6.1-.1.3-.3.4-.5.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5-.1-.2-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 1-1 2.5s1 2.9 1.1 3.1c.1.2 2 3.1 4.9 4.3.7.3 1.2.5 1.6.6.7.2 1.3.2 1.8.1.5-.1 1.7-.7 1.9-1.4.2-.7.2-1.3.2-1.4-.1-.2-.3-.2-.6-.3zM16 4C9.4 4 4 9.4 4 16c0 2.3.6 4.4 1.7 6.3L4 28l5.9-1.5c1.8 1 3.9 1.5 6.1 1.5 6.6 0 12-5.4 12-12S22.6 4 16 4zm0 22c-2 0-3.9-.5-5.5-1.5l-.4-.2-3.5.9 1-3.4-.3-.4C5.7 19.8 5 17.9 5 16c0-6.1 4.9-11 11-11s11 4.9 11 11-4.9 11-11 11z" />
          </svg>
          <span className="text-[11px] uppercase tracking-[0.28em] font-medium">
            Concierge
          </span>
        </motion.a>
      )}
    </AnimatePresence>
  );
};

export default WhatsAppFloat;
