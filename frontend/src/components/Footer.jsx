import React from "react";
import { BRAND, buildWhatsAppHref, NAV_LINKS } from "../lib/content";

const Footer = () => {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };
  return (
    <footer
      className="relative bg-ink border-t border-bone/10"
      data-testid="site-footer"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <div className="font-display text-3xl md:text-4xl text-ivory leading-tight">
              Golden <span className="italic text-sand">Palm</span> City
            </div>
            <p className="mt-4 text-sm text-bone/60 font-light leading-relaxed max-w-sm">
              A {BRAND.parent} initiative — India's first cinematic future-land
              luxury experience. {BRAND.tagline}.
            </p>
          </div>

          <div className="md:col-span-3">
            <div className="text-[10px] uppercase tracking-[0.28em] text-sand mb-5">
              Journey
            </div>
            <ul className="space-y-3">
              {NAV_LINKS.map((l) => (
                <li key={l.id}>
                  <button
                    onClick={() => scrollTo(l.id)}
                    className="text-sm text-bone/70 hover:text-sand luxe-link"
                    data-testid={`footer-nav-${l.id}`}
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-4">
            <div className="text-[10px] uppercase tracking-[0.28em] text-sand mb-5">
              Concierge
            </div>
            <div className="space-y-3 text-sm text-bone/70">
              <div>
                <a
                  className="luxe-link"
                  href={`tel:${BRAND.phonePrimary.replace(/\s/g, "")}`}
                  data-testid="footer-phone-primary"
                >
                  {BRAND.phonePrimary}
                </a>
              </div>
              <div>
                <a
                  className="luxe-link"
                  href={`tel:${BRAND.phoneSecondary.replace(/\s/g, "")}`}
                  data-testid="footer-phone-secondary"
                >
                  {BRAND.phoneSecondary}
                </a>
              </div>
              <div>
                <a
                  className="luxe-link text-sand"
                  href={buildWhatsAppHref()}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="footer-whatsapp-link"
                >
                  WhatsApp the Concierge →
                </a>
              </div>
              <div className="pt-2 text-xs text-bone/50 leading-relaxed">
                {BRAND.officeAddress}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-bone/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-[10px] uppercase tracking-[0.28em] text-bone/40">
          <div>© {new Date().getFullYear()} Kings Pride · Golden Palm City</div>
          <div className="flex items-center gap-6">
            <span>RERA Approved</span>
            <span>HMDA Approved</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
