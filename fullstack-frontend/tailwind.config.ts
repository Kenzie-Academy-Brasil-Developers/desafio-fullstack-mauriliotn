import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          400: "#38bdf8",
          800: "#075985",
          900: "#0c4a6e",
        },
        gray: {
          100: "#f3f4f6",
          200: "#e5e7eb",
          800: "#1f2937",
          900: "#18181b",
        },
        green: {
          400: "#34d399",
          800: "#065f46",
          900: "#064e3b",
        },
        red: {
          500: "#ef4444",
          800: "#991b1b",
        },
      },
      animation: {
        "rotate-scale-up": "rotate-scale-up 1s ease-in",
        "slide-left":
          "slide-in-left 1s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.65s both",
        "slide-in-top": "slide-in-top 0.5s ease-in both",
        "slide-in-botton": "slide-in-botton 0.5s ease-in both",
        "scale-in-center":
          "scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both",
        "slide-name": "slide-in-left 0.5s ease-in 0.4s both",
        "slide-email": "slide-in-rigth 0.5s ease-in 0.5s both",
        "slide-password": "slide-in-left 0.5s ease-in 0.6s both",
        "slide-telefone": "slide-in-rigth 0.5s ease-in 0.7s both",
        "slide-button": "slide-in-top 0.5s ease-in 0.8s both",
      },
      keyframes: {
        spinner: {
          "0%": { transform: "rotate(0)" },
          "100%": { opacity: "1", transform: "rotate(360)" },
        },
        "rotate-scale-up": {
          "0%": { opacity: "0", transform: "rotate(-540deg) scale(0)" },
          "100%": { opacity: "1", transform: "rotate(0) scale(1)" },
        },
        "slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-1000px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-rigth": {
          "0%": { opacity: "0", transform: "translateX(1000px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "input-slide-in-left": {
          "0%": { opacity: "0", transform: "translateX(-500)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "input-slide-in-rigth": {
          "0%": { opacity: "0", transform: "translateX(500)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-top": {
          "0%": { opacity: "0", transform: "translateY(-1000px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "slide-to-top": {
          "0%": { opacity: "1", transform: "translateY(0)" },
          "100%": { opacity: "0", transform: "translateY(-1000px)" },
        },
        "slide-in-botton": {
          "0%": { opacity: "0", transform: "translateY(1000px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "scale-in-center": {
          "0%": { opacity: "0", transform: "scale(0)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
  variants: {
    extend: {
      autofill: ["hover", "focus"],
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
