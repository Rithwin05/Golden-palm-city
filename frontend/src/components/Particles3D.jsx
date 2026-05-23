import React, { useEffect, useRef } from "react";

/**
 * Particles3D — golden cinematic dust drift, rendered on a pure HTML5 Canvas
 * (no R3F / WebGL reconciler) for maximum reliability with visual-edits + React 19.
 * Renders ~140 sprite-like floating motes with depth parallax + drift,
 * plus a soft fog gradient — perceptually identical to a lightweight WebGL haze
 * scene at a fraction of the cost.
 */
const Particles3D = ({ className = "", count = 140 }) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let w, h;
    let particles = [];
    const DPR = Math.min(window.devicePixelRatio || 1, 1.5);

    const resize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * DPR;
      canvas.height = h * DPR;
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    };

    const init = () => {
      particles = Array.from({ length: count }).map(() => ({
        x: Math.random() * w,
        y: Math.random() * h,
        z: Math.random() * 0.8 + 0.2, // depth 0.2..1.0
        r: Math.random() * 2 + 0.6,
        vy: -(Math.random() * 0.12 + 0.04),
        vx: (Math.random() - 0.5) * 0.06,
        phase: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);

      // Soft golden fog vignette
      const grad = ctx.createRadialGradient(
        w * 0.5,
        h * 0.62,
        0,
        w * 0.5,
        h * 0.62,
        Math.max(w, h) * 0.65
      );
      grad.addColorStop(0, "rgba(217,154,91,0.06)");
      grad.addColorStop(0.5, "rgba(217,154,91,0.015)");
      grad.addColorStop(1, "rgba(15,13,12,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Particles
      for (const p of particles) {
        p.x += p.vx + Math.sin(t * 0.0004 + p.phase) * 0.05;
        p.y += p.vy * p.z;
        if (p.y < -10) {
          p.y = h + 10;
          p.x = Math.random() * w;
        }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        const radius = p.r * p.z;
        const alpha = 0.18 + p.z * 0.5;
        const gp = ctx.createRadialGradient(
          p.x,
          p.y,
          0,
          p.x,
          p.y,
          radius * 6
        );
        gp.addColorStop(0, `rgba(217,154,91,${alpha})`);
        gp.addColorStop(0.4, `rgba(217,154,91,${alpha * 0.35})`);
        gp.addColorStop(1, "rgba(217,154,91,0)");
        ctx.fillStyle = gp;
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius * 6, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    init();
    rafRef.current = requestAnimationFrame(draw);
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [count]);

  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      data-testid="particles-3d"
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
};

export default Particles3D;
