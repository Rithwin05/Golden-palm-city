import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, Toaster } from "sonner";
import { ASSETS, TRUST_FACTS, BRAND, buildWhatsAppHref } from "../lib/content";

const ease = [0.16, 1, 0.3, 1];
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Trust = () => {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    interest: "Golden Palm City",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) {
      toast.error("Please share your name and phone to continue.");
      return;
    }
    setSubmitting(true);
    try {
      await axios.post(`${API}/concierge/inquiries`, form);
      toast.success("Reservation noted. Our concierge will reach you soon.");
      // Continue to WhatsApp as the cinematic conversion
      const wa = buildWhatsAppHref(
        `Hello, I'm ${form.name}. I'd like to reserve my place at ${form.interest}.${
          form.message ? " " + form.message : ""
        } My phone: ${form.phone}`
      );
      window.open(wa, "_blank", "noopener");
      setForm({
        name: "",
        phone: "",
        email: "",
        interest: "Golden Palm City",
        message: "",
      });
    } catch (err) {
      console.error(err);
      toast.error("Something interrupted us. Please try again or use WhatsApp.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section
      id="trust"
      className="relative py-28 md:py-40 bg-ink overflow-hidden"
      data-testid="trust-section"
    >
      {/* Texture backdrop */}
      <div
        className="absolute inset-0 opacity-[0.07] bg-cover bg-center"
        style={{ backgroundImage: `url(${ASSETS.duneTexture})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/95 to-ink" />

      <div className="relative max-w-[1400px] mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1.2, ease }}
          className="flex items-center gap-4 mb-12"
        >
          <span className="h-px w-10 bg-sand" />
          <span className="text-[10px] uppercase tracking-[0.32em] text-sand">
            Act 05 — Concierge
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-20">
          {/* Trust column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease }}
            className="md:col-span-6"
          >
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-ivory tracking-tight">
              Trust, before <span className="italic text-sand">transaction</span>.
            </h2>
            <p className="mt-6 text-base md:text-lg text-bone/70 font-light leading-relaxed max-w-xl">
              Approvals, infrastructure, and connectivity — the quiet
              architecture beneath the cinematic vision.
            </p>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-px bg-bone/10 border border-bone/10">
              {TRUST_FACTS.map((f) => (
                <div
                  key={f.label}
                  className="bg-ink p-6 md:p-7"
                  data-testid={`trust-fact-${f.label.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  <div className="text-[10px] uppercase tracking-[0.28em] text-bone/50 mb-3">
                    {f.label}
                  </div>
                  <div className="font-display text-2xl text-ivory">
                    {f.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-10 text-sm text-bone/60 font-light leading-relaxed max-w-md">
              <div className="text-[10px] uppercase tracking-[0.28em] text-sand mb-2">
                Office
              </div>
              {BRAND.officeAddress}
            </div>
          </motion.div>

          {/* Concierge column */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease, delay: 0.15 }}
            className="md:col-span-6 md:col-start-7"
            id="concierge"
          >
            <div className="bg-dune/80 backdrop-blur-md border border-bone/10 p-8 md:p-12 golden-glow">
              <div className="text-[10px] uppercase tracking-[0.32em] text-sand mb-4">
                Reserve Your Place
              </div>
              <h3 className="font-display text-3xl md:text-4xl text-ivory leading-tight mb-8">
                Begin a quiet conversation with our concierge.
              </h3>

              <form
                onSubmit={onSubmit}
                className="space-y-6"
                data-testid="concierge-form"
              >
                <div>
                  <label className="text-[10px] uppercase tracking-[0.28em] text-bone/50">
                    Your name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={onChange}
                    className="editorial-input"
                    placeholder="As you would like us to address you"
                    data-testid="concierge-input-name"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.28em] text-bone/50">
                      Phone
                    </label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={onChange}
                      className="editorial-input"
                      placeholder="+91"
                      data-testid="concierge-input-phone"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] uppercase tracking-[0.28em] text-bone/50">
                      Email (optional)
                    </label>
                    <input
                      name="email"
                      value={form.email}
                      onChange={onChange}
                      className="editorial-input"
                      placeholder="you@quiet.life"
                      data-testid="concierge-input-email"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.28em] text-bone/50">
                    Interest
                  </label>
                  <select
                    name="interest"
                    value={form.interest}
                    onChange={onChange}
                    className="editorial-input bg-transparent"
                    data-testid="concierge-input-interest"
                  >
                    <option className="bg-ink" value="Golden Palm City">
                      Golden Palm City
                    </option>
                    <option className="bg-ink" value="Vantage Farms">
                      Vantage Farms
                    </option>
                    <option className="bg-ink" value="Chandan Valley">
                      Chandan Valley
                    </option>
                    <option className="bg-ink" value="Doctor's Colony">
                      Doctor's Colony
                    </option>
                    <option className="bg-ink" value="Multiple projects">
                      Multiple projects
                    </option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] uppercase tracking-[0.28em] text-bone/50">
                    A few words (optional)
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={onChange}
                    rows={2}
                    className="editorial-input resize-none"
                    placeholder="Tell us what you envision"
                    data-testid="concierge-input-message"
                  />
                </div>

                <div className="pt-4 flex flex-wrap items-center gap-4">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="group inline-flex items-center gap-3 bg-sand text-ink px-8 py-4 text-[11px] uppercase tracking-[0.28em] hover:bg-ivory transition-colors duration-700 disabled:opacity-60"
                    data-testid="concierge-submit-button"
                  >
                    <span>
                      {submitting ? "Reserving..." : "Reserve Your Place"}
                    </span>
                    <span className="inline-block transition-transform duration-500 group-hover:translate-x-2">
                      →
                    </span>
                  </button>
                  <a
                    href={buildWhatsAppHref()}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[11px] uppercase tracking-[0.28em] text-bone/70 luxe-link"
                    data-testid="concierge-whatsapp-fallback"
                  >
                    Or speak on WhatsApp
                  </a>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: "#1a1714",
            color: "#e8e4db",
            border: "1px solid rgba(232,228,219,0.12)",
            borderRadius: 0,
            fontFamily: "Outfit, sans-serif",
            letterSpacing: "0.04em",
          },
        }}
      />
    </section>
  );
};

export default Trust;
