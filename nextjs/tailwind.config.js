/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
    "./app/**/*.{js,jsx}",
    "./lib/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-cormorant)", "serif"],
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        ink: "#0f0d0c",
        sand: "#d99a5b",
        ivory: "#f4f1eb",
        palm: "#2c402d",
        dune: "#1a1714",
        bone: "#e8e4db",
      },
      keyframes: {
        "slow-pan": {
          "0%": { transform: "scale(1.08) translate3d(0,0,0)" },
          "100%": { transform: "scale(1.18) translate3d(-1%,-1%,0)" },
        },
        shimmer: {
          "0%, 100%": { opacity: 0.4 },
          "50%": { opacity: 0.85 },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-in": {
          "0%": { opacity: 0, transform: "translateY(20px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 40px -10px rgba(217,154,91,0.3)" },
          "50%": { boxShadow: "0 0 80px -10px rgba(217,154,91,0.55)" },
        },
      },
      animation: {
        "slow-pan": "slow-pan 24s ease-in-out infinite alternate",
        shimmer: "shimmer 4s ease-in-out infinite",
        marquee: "marquee 40s linear infinite",
        "fade-in": "fade-in 0.8s ease forwards",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
