import React, { useEffect } from "react";
import "./App.css";
import { ReactLenis } from "lenis/react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Discovery from "./components/Discovery";
import Environment from "./components/Environment";
import Transformation from "./components/Transformation";
import Projects from "./components/Projects";
import Trust from "./components/Trust";
import Footer from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";

function App() {
  useEffect(() => {
    document.title = "Golden Palm City — Discover Tomorrow Early";
  }, []);

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
      <div className="App grain bg-ink text-bone min-h-screen" data-testid="app-root">
        <Header />
        <main>
          <Hero />
          <Discovery />
          <Environment />
          <Transformation />
          <Projects />
          <Trust />
        </main>
        <Footer />
        <WhatsAppFloat />
      </div>
    </ReactLenis>
  );
}

export default App;
