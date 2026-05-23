import React, { useEffect, useState } from "react";
import "./App.css";
import { ReactLenis } from "lenis/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import IntroLoader from "./components/IntroLoader";
import AmbientAudio from "./components/AmbientAudio";
import Home from "./pages/Home";
import ProjectDetail from "./pages/ProjectDetail";

const INTRO_KEY = "gpc_intro_seen_v1";

function App() {
  const [introDone, setIntroDone] = useState(() => {
    try {
      return typeof window !== "undefined" && sessionStorage.getItem(INTRO_KEY) === "1";
    } catch (e) {
      return false;
    }
  });

  useEffect(() => {
    document.title = "Golden Palm City — Discover Tomorrow Early";
  }, []);

  const onIntroDone = () => {
    try {
      sessionStorage.setItem(INTRO_KEY, "1");
    } catch (e) {}
    setIntroDone(true);
  };

  return (
    <ReactLenis
      root
      options={{
        lerp: 0.08,
        duration: 1.4,
        smoothWheel: true,
        smoothTouch: false,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      }}
    >
      <BrowserRouter>
        <div className="App grain bg-ink text-bone min-h-screen" data-testid="app-root">
          {!introDone && <IntroLoader onDone={onIntroDone} />}
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
          </Routes>
          <Footer />
          <WhatsAppFloat />
          <AmbientAudio />
        </div>
      </BrowserRouter>
    </ReactLenis>
  );
}

export default App;
