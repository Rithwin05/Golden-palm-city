import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import axios from "axios";
import { buildWhatsAppHref, BRAND } from "../lib/content";

const ease = [0.16, 1, 0.3, 1];
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 1.1, ease },
};

const ProjectDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [allProjects, setAllProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImg, setActiveImg] = useState(0);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    setLoading(true);
    setActiveImg(0);
    (async () => {
      try {
        const [pRes, allRes] = await Promise.all([
          axios.get(`${API}/projects/${slug}`),
          axios.get(`${API}/projects`),
        ]);
        setProject(pRes.data);
        setAllProjects(allRes.data || []);
      } catch (e) {
        console.error(e);
        setProject(null);
      } finally {
        setLoading(false);
      }
    })();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ink text-bone">
        <div className="font-display text-2xl text-sand">Composing…</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-ink text-bone gap-6 px-6 text-center">
        <div className="font-display text-4xl">Project not found.</div>
        <Link
          to="/"
          className="text-[11px] uppercase tracking-[0.28em] text-sand luxe-link"
          data-testid="back-home-link"
        >
          ← Return Home
        </Link>
      </div>
    );
  }

  const gallery = project.gallery?.length ? project.gallery : [project.image_url];
  const others = allProjects.filter((p) => p.slug !== project.slug);

  return (
    <main className="bg-ink text-bone min-h-screen pt-24" data-testid="project-detail">
      {/* Back button */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-4">
        <button
          onClick={() => navigate("/")}
          className="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-bone/60 hover:text-sand luxe-link"
          data-testid="back-button"
        >
          <ArrowLeft size={14} /> Back to Journey
        </button>
      </div>

      {/* Hero */}
      <section className="relative mt-8 md:mt-12">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <div className="grid grid-cols-12 gap-8 md:gap-12 items-end">
            <motion.div {...fadeUp} className="col-span-12 md:col-span-7">
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-10 bg-sand" />
                <span className="text-[10px] uppercase tracking-[0.32em] text-sand">
                  {project.location}
                </span>
              </div>
              <h1
                className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[7rem] leading-[0.95] text-ivory tracking-tight"
                data-testid="project-title"
              >
                {project.name}
              </h1>
              <p className="mt-6 text-lg md:text-xl text-bone/70 font-light max-w-2xl leading-relaxed italic">
                {project.tagline}
              </p>
            </motion.div>
            <motion.div
              {...fadeUp}
              transition={{ duration: 1.1, ease, delay: 0.15 }}
              className="col-span-12 md:col-span-5 md:col-start-8"
            >
              <div className="grid grid-cols-2 gap-6 md:gap-8">
                {project.price_from && (
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.28em] text-bone/50 mb-2">
                      From
                    </div>
                    <div className="font-display text-2xl text-ivory">
                      {project.price_from}
                    </div>
                  </div>
                )}
                {project.plot_sizes && (
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.28em] text-bone/50 mb-2">
                      Plot sizes
                    </div>
                    <div className="font-display text-2xl text-ivory">
                      {project.plot_sizes}
                    </div>
                  </div>
                )}
                {project.approvals?.length > 0 && (
                  <div className="col-span-2">
                    <div className="text-[10px] uppercase tracking-[0.28em] text-bone/50 mb-2">
                      Approvals
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.approvals.map((a) => (
                        <span
                          key={a}
                          className="text-[10px] uppercase tracking-[0.3em] text-sand border border-sand/40 px-3 py-1.5"
                        >
                          {a}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>

          {/* Hero image with thumbnail strip */}
          <motion.div
            {...fadeUp}
            transition={{ duration: 1.4, ease, delay: 0.2 }}
            className="mt-12 md:mt-16"
          >
            <div className="img-reveal aspect-[16/9] md:aspect-[21/9] w-full bg-dune">
              <img
                src={gallery[activeImg]}
                alt={`${project.name} — ${activeImg + 1}`}
                className="w-full h-full object-cover"
                data-testid="gallery-main-image"
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-4 grid grid-cols-4 gap-2 md:gap-4">
                {gallery.map((g, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`aspect-[16/9] overflow-hidden transition-opacity duration-500 ${
                      activeImg === i ? "opacity-100" : "opacity-40 hover:opacity-80"
                    }`}
                    data-testid={`gallery-thumb-${i}`}
                  >
                    <img src={g} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Description + Highlights */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8 md:gap-16">
          <motion.div {...fadeUp} className="col-span-12 md:col-span-7">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-10 bg-sand" />
              <span className="text-[10px] uppercase tracking-[0.32em] text-sand">
                The Composition
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ivory leading-tight tracking-tight">
              {project.description?.split(" ").slice(0, 6).join(" ")}…
            </h2>
            <p className="mt-8 text-base md:text-lg text-bone/70 font-light leading-relaxed">
              {project.description}
            </p>

            {project.connectivity?.length > 0 && (
              <div className="mt-12">
                <div className="text-[10px] uppercase tracking-[0.3em] text-sand mb-4">
                  Connectivity
                </div>
                <ul className="space-y-3">
                  {project.connectivity.map((c) => (
                    <li key={c} className="flex items-start gap-4 text-bone/80">
                      <span className="mt-3 h-px w-6 bg-sand shrink-0" />
                      <span className="text-base md:text-lg">{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </motion.div>

          <motion.aside
            {...fadeUp}
            transition={{ duration: 1.1, ease, delay: 0.15 }}
            className="col-span-12 md:col-span-5 md:col-start-8"
          >
            <div className="bg-dune border border-bone/10 p-8 md:p-10">
              <div className="text-[10px] uppercase tracking-[0.3em] text-sand mb-6">
                Highlights
              </div>
              <ul className="space-y-4">
                {project.highlights?.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-4 text-bone/85 font-light"
                    data-testid="project-highlight-item"
                  >
                    <span className="mt-3 h-px w-5 bg-sand shrink-0" />
                    <span className="text-sm md:text-base">{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.aside>
        </div>
      </section>

      {/* Amenities */}
      {project.amenities?.length > 0 && (
        <section className="py-20 md:py-28 bg-dune/40 border-y border-bone/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <motion.div {...fadeUp} className="mb-12 md:mb-16">
              <div className="flex items-center gap-4 mb-6">
                <span className="h-px w-10 bg-sand" />
                <span className="text-[10px] uppercase tracking-[0.32em] text-sand">
                  Amenities
                </span>
              </div>
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ivory leading-tight tracking-tight max-w-3xl">
                Engineered to <span className="italic text-sand">breathe</span>.
              </h2>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-bone/10 border border-bone/10">
              {project.amenities.map((a, i) => (
                <motion.div
                  key={a}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.9, ease, delay: i * 0.05 }}
                  className="bg-ink p-6 md:p-8 min-h-[140px] flex flex-col justify-between"
                  data-testid="amenity-card"
                >
                  <span className="font-display text-3xl text-sand">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="text-sm md:text-base text-bone/85 font-light leading-tight">
                    {a}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Masterplan placeholder */}
      <section className="py-24 md:py-32">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div {...fadeUp} className="mb-10 md:mb-14">
            <div className="flex items-center gap-4 mb-6">
              <span className="h-px w-10 bg-sand" />
              <span className="text-[10px] uppercase tracking-[0.32em] text-sand">
                Masterplan
              </span>
            </div>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl text-ivory leading-tight tracking-tight max-w-3xl">
              A future-city, <span className="italic text-sand">composed.</span>
            </h2>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 1.2, ease, delay: 0.1 }}
            className="relative aspect-[16/9] bg-dune border border-bone/10 overflow-hidden"
          >
            {/* Decorative grid masterplan illustration */}
            <div className="absolute inset-0 grid-bg" />
            <svg
              viewBox="0 0 1200 600"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid meet"
            >
              <defs>
                <linearGradient id="boulevardG" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#d99a5b" stopOpacity="0" />
                  <stop offset="50%" stopColor="#d99a5b" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#d99a5b" stopOpacity="0" />
                </linearGradient>
              </defs>
              {/* Boulevards */}
              <line x1="0" y1="300" x2="1200" y2="300" stroke="url(#boulevardG)" strokeWidth="2" />
              <line x1="600" y1="0" x2="600" y2="600" stroke="url(#boulevardG)" strokeWidth="2" />
              {/* Plot grid */}
              {Array.from({ length: 14 }).map((_, i) => (
                <line
                  key={`v${i}`}
                  x1={(i + 1) * 80}
                  y1="80"
                  x2={(i + 1) * 80}
                  y2="520"
                  stroke="#e8e4db"
                  strokeOpacity="0.06"
                  strokeWidth="1"
                />
              ))}
              {Array.from({ length: 7 }).map((_, i) => (
                <line
                  key={`h${i}`}
                  x1="80"
                  y1={(i + 1) * 70}
                  x2="1120"
                  y2={(i + 1) * 70}
                  stroke="#e8e4db"
                  strokeOpacity="0.06"
                  strokeWidth="1"
                />
              ))}
              {/* Plots accent */}
              {[
                [200, 160, 60, 50],
                [320, 160, 60, 50],
                [800, 360, 60, 50],
                [920, 230, 60, 50],
                [440, 380, 60, 50],
              ].map((p, i) => (
                <rect
                  key={i}
                  x={p[0]}
                  y={p[1]}
                  width={p[2]}
                  height={p[3]}
                  fill="#d99a5b"
                  fillOpacity="0.18"
                  stroke="#d99a5b"
                  strokeOpacity="0.5"
                />
              ))}
              {/* Gate marker */}
              <circle cx="600" cy="540" r="10" fill="#d99a5b" />
              <text
                x="600"
                y="568"
                textAnchor="middle"
                fill="#e8e4db"
                fontSize="11"
                fontFamily="Outfit, sans-serif"
                letterSpacing="3"
              >
                ENTRANCE
              </text>
            </svg>
            <div className="absolute top-6 left-6 text-[10px] uppercase tracking-[0.3em] text-bone/50">
              Indicative layout
            </div>
            <div className="absolute bottom-6 right-6 text-[10px] uppercase tracking-[0.3em] text-sand">
              {project.area || "Master-planned community"}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Concierge CTA strip */}
      <section className="py-24 md:py-32 border-t border-bone/10">
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 grid grid-cols-12 gap-8 items-end">
          <motion.div {...fadeUp} className="col-span-12 md:col-span-8">
            <div className="text-[10px] uppercase tracking-[0.32em] text-sand mb-6">
              Reserve Your Place
            </div>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-ivory leading-[1.05] tracking-tight">
              Begin a quiet conversation about{" "}
              <span className="italic text-sand">{project.name}</span>.
            </h2>
          </motion.div>
          <motion.div
            {...fadeUp}
            transition={{ duration: 1.1, ease, delay: 0.15 }}
            className="col-span-12 md:col-span-4 flex md:justify-end"
          >
            <a
              href={buildWhatsAppHref(
                `Hello, I would like to explore ${project.name} (${project.location}). Please share details.`
              )}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-3 bg-sand text-ink px-8 py-5 text-[11px] uppercase tracking-[0.28em] hover:bg-ivory transition-colors duration-700"
              data-testid="project-concierge-cta"
            >
              <span>WhatsApp the Concierge</span>
              <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
                →
              </span>
            </a>
          </motion.div>
        </div>
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 mt-10 text-sm text-bone/55">
          {BRAND.phonePrimary} · {BRAND.phoneSecondary}
        </div>
      </section>

      {/* Other projects */}
      {others.length > 0 && (
        <section className="py-20 md:py-28 border-t border-bone/10">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="flex items-center gap-4 mb-10">
              <span className="h-px w-10 bg-sand" />
              <span className="text-[10px] uppercase tracking-[0.32em] text-sand">
                Continue the Constellation
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  to={`/projects/${o.slug}`}
                  className="group block"
                  data-testid={`other-project-link-${o.slug}`}
                >
                  <div className="img-reveal aspect-[4/3]">
                    <img
                      src={o.image_url}
                      alt={o.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="mt-4 flex items-center justify-between">
                    <div>
                      <div className="text-[10px] uppercase tracking-[0.3em] text-bone/50 mb-1">
                        {o.location}
                      </div>
                      <div className="font-display text-2xl text-ivory group-hover:text-sand transition-colors duration-500">
                        {o.name}
                      </div>
                    </div>
                    <span className="text-sand text-xl">→</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  );
};

export default ProjectDetail;
