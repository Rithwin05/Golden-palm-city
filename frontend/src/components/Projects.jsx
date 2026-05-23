import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { buildWhatsAppHref } from "../lib/content";

const ease = [0.16, 1, 0.3, 1];
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`${API}/projects`);
        setProjects(res.data || []);
      } catch (e) {
        console.error("Failed to load projects", e);
      }
    })();
  }, []);

  return (
    <section
      id="projects"
      className="relative py-28 md:py-40 bg-ink"
      data-testid="projects-section"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease }}
          className="grid grid-cols-12 gap-6 md:gap-12 mb-16 md:mb-24"
        >
          <div className="col-span-12 md:col-span-6">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-10 bg-sand" />
              <span className="text-[10px] uppercase tracking-[0.32em] text-sand">
                Act 04 — Ownership
              </span>
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ivory tracking-tight">
              A constellation of{" "}
              <span className="italic text-sand">future-cities.</span>
            </h2>
          </div>
          <div className="col-span-12 md:col-span-5 md:col-start-8 flex items-end">
            <p className="text-base md:text-lg text-bone/70 font-light leading-relaxed">
              Four landscapes, one philosophy — peaceful, monumental, future-ready.
              Each a quiet invitation to belong before the world catches up.
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16">
          {projects.map((p, i) => (
            <motion.article
              key={p.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 1.2, ease, delay: i * 0.1 }}
              className={`group ${
                p.is_flagship ? "md:col-span-2" : ""
              }`}
              data-testid={`project-card-${p.slug}`}
            >
              <div className="img-reveal relative">
                <img
                  src={p.image_url}
                  alt={p.name}
                  className={`w-full object-cover ${
                    p.is_flagship
                      ? "h-[420px] md:h-[640px]"
                      : "h-[360px] md:h-[480px]"
                  }`}
                />
                {p.is_flagship && (
                  <div className="absolute top-6 left-6 bg-sand text-ink px-3 py-2 text-[10px] uppercase tracking-[0.28em]">
                    Flagship
                  </div>
                )}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 bg-gradient-to-t from-ink/90 via-ink/30 to-transparent">
                  <div className="flex items-baseline justify-between gap-6">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-sand mb-2">
                        {p.location}
                      </div>
                      <div className="font-display text-3xl md:text-4xl lg:text-5xl text-ivory leading-tight">
                        {p.name}
                      </div>
                    </div>
                    {p.price_from && (
                      <div className="text-right shrink-0 hidden sm:block">
                        <div className="text-[10px] uppercase tracking-[0.28em] text-bone/50 mb-1">
                          From
                        </div>
                        <div className="font-display text-xl md:text-2xl text-ivory">
                          {p.price_from}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 md:mt-8 grid grid-cols-12 gap-4 md:gap-8 items-start">
                <p className="col-span-12 md:col-span-6 text-base md:text-lg text-bone/70 font-light leading-relaxed">
                  {p.tagline}
                </p>
                <ul className="col-span-12 md:col-span-4 space-y-2">
                  {p.highlights?.slice(0, 4).map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-3 text-sm text-bone/70"
                    >
                      <span className="mt-2 h-px w-4 bg-sand shrink-0" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
                <div className="col-span-12 md:col-span-2 flex md:justify-end">
                  <a
                    href={buildWhatsAppHref(
                      `I'd like to explore ${p.name} (${p.location}). Please share details.`
                    )}
                    target="_blank"
                    rel="noreferrer"
                    className="luxe-link text-[10px] uppercase tracking-[0.3em] text-sand hover:text-ivory"
                    data-testid={`project-cta-${p.slug}`}
                  >
                    Explore →
                  </a>
                </div>
              </div>

              {p.approvals?.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-3">
                  {p.approvals.map((a) => (
                    <span
                      key={a}
                      className="text-[9px] uppercase tracking-[0.3em] text-bone/55 border border-bone/15 px-3 py-1.5"
                    >
                      {a}
                    </span>
                  ))}
                </div>
              )}
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
