import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

/**
 * AmbientAudio: Uses the Web Audio API to synthesize an extremely subtle
 * cinematic drone (no external audio file required). Two slow detuned sine
 * oscillators + filtered noise modulated by gentle LFOs — perceived as
 * distant wind / atmospheric texture. Muted by default; opt-in via toggle.
 */
const AmbientAudio = () => {
  const [playing, setPlaying] = useState(false);
  const ctxRef = useRef(null);
  const nodesRef = useRef({});

  const stop = () => {
    const ctx = ctxRef.current;
    const nodes = nodesRef.current;
    if (!ctx) return;
    try {
      if (nodes.master) {
        nodes.master.gain.cancelScheduledValues(ctx.currentTime);
        nodes.master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.8);
      }
      setTimeout(() => {
        try {
          Object.values(nodes).forEach((n) => {
            if (n && typeof n.stop === "function") n.stop();
            if (n && typeof n.disconnect === "function") n.disconnect();
          });
        } catch (e) {}
        try {
          ctx.close();
        } catch (e) {}
        ctxRef.current = null;
        nodesRef.current = {};
      }, 900);
    } catch (e) {}
  };

  const start = async () => {
    try {
      const Ctx = window.AudioContext || window.webkitAudioContext;
      if (!Ctx) return;
      const ctx = new Ctx();
      ctxRef.current = ctx;

      const master = ctx.createGain();
      master.gain.value = 0;
      master.connect(ctx.destination);

      // Two detuned drone oscillators
      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.value = 110; // A2
      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.value = 110 * 1.5; // perfect fifth, E3
      osc2.detune.value = -7;

      const oscGain = ctx.createGain();
      oscGain.gain.value = 0.06;

      // Lowpass filter for warmth
      const lp = ctx.createBiquadFilter();
      lp.type = "lowpass";
      lp.frequency.value = 800;
      lp.Q.value = 0.7;

      // Soft LFO modulating filter cutoff (gentle "breathing")
      const lfo = ctx.createOscillator();
      lfo.frequency.value = 0.07;
      const lfoGain = ctx.createGain();
      lfoGain.gain.value = 220;
      lfo.connect(lfoGain).connect(lp.frequency);

      // Pink-ish noise for wind texture
      const bufferSize = 2 * ctx.sampleRate;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99765 * b0 + white * 0.099046;
        b1 = 0.963 * b1 + white * 0.2965164;
        b2 = 0.57 * b2 + white * 1.0526913;
        data[i] = (b0 + b1 + b2 + white * 0.1848) * 0.07;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = noiseBuffer;
      noise.loop = true;

      const noiseFilter = ctx.createBiquadFilter();
      noiseFilter.type = "bandpass";
      noiseFilter.frequency.value = 600;
      noiseFilter.Q.value = 0.6;

      const noiseGain = ctx.createGain();
      noiseGain.gain.value = 0.18;

      osc1.connect(oscGain);
      osc2.connect(oscGain);
      oscGain.connect(lp);
      lp.connect(master);

      noise.connect(noiseFilter);
      noiseFilter.connect(noiseGain);
      noiseGain.connect(master);

      osc1.start();
      osc2.start();
      noise.start();
      lfo.start();

      // Gentle fade-in
      master.gain.linearRampToValueAtTime(0.32, ctx.currentTime + 2.2);

      nodesRef.current = { master, osc1, osc2, noise, lfo, oscGain, noiseGain, lp };
    } catch (e) {
      console.error("Audio init failed", e);
    }
  };

  const toggle = async () => {
    if (playing) {
      stop();
      setPlaying(false);
    } else {
      await start();
      setPlaying(true);
    }
  };

  useEffect(() => {
    return () => stop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, delay: 1.6 }}
      onClick={toggle}
      className="fixed bottom-6 left-6 z-40 flex items-center gap-2 bg-ink/70 backdrop-blur-md border border-bone/15 text-bone hover:text-sand hover:border-sand/40 px-3 py-3 transition-colors duration-500"
      data-testid="ambient-audio-toggle"
      aria-label={playing ? "Mute ambience" : "Play ambience"}
      title={playing ? "Mute ambience" : "Play ambient soundscape"}
    >
      {playing ? <Volume2 size={16} /> : <VolumeX size={16} />}
      <span className="text-[10px] uppercase tracking-[0.28em]">
        {playing ? "Ambience" : "Silent"}
      </span>
    </motion.button>
  );
};

export default AmbientAudio;
