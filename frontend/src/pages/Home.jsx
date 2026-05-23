import React from "react";
import Hero from "../components/Hero";
import Discovery from "../components/Discovery";
import Environment from "../components/Environment";
import Transformation from "../components/Transformation";
import Projects from "../components/Projects";
import Trust from "../components/Trust";

const Home = () => {
  return (
    <main>
      <Hero />
      <Discovery />
      <Environment />
      <Transformation />
      <Projects />
      <Trust />
    </main>
  );
};

export default Home;
