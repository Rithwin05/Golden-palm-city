"use client";

import { useEffect, useState } from "react";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import IntroLoader from "@/components/IntroLoader";
import Hero from "@/components/Hero";
import Discovery from "@/components/Discovery";
import Environment from "@/components/Environment";
import Transformation from "@/components/Transformation";
import Projects from "@/components/Projects";
import Trust from "@/components/Trust";
import Footer from "@/components/Footer";
import WhatsAppFloat from "@/components/WhatsAppFloat";

const INTRO_KEY = "gpc_intro_seen_v2";

export default function HomeClient({ projects }) {
  const [introDone, setIntroDone] = useState(() => {
    if (typeof window === "undefined") return true;
    try {
      return sessionStorage.getItem(INTRO_KEY) === "1";
    } catch {
      return false;
    }
  });

  const onIntroDone = () => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch {}
    setIntroDone(true);
  };

  return (
    <SmoothScroll>
      {!introDone && <IntroLoader onDone={onIntroDone} />}
      <Header />
      <main>
        <Hero />
        <Discovery />
        <Environment />
        <Transformation />
        <Projects projects={projects} />
        <Trust />
      </main>
      <Footer />
      <WhatsAppFloat />
    </SmoothScroll>
  );
}
