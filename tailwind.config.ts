import type { Config } from "tailwindcss";
const {
  default: flattenColorPalette,
} = require("tailwindcss/lib/util/flattenColorPalette");
 
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        meteor: {
          "0%": { transform: "rotate(215deg) translateX(0)", opacity: "1" },
          "70%": { opacity: "1" },
          "100%": {
            transform: "rotate(215deg) translateX(-500px)",
            opacity: "0",
          },
        },
        glitch: {
          "0%": {
            color: "#f3f4f6",
            textShadow: "1px 1px 0px #a0f",
          },
          "25%": {
            color: "#9fddff",
            textShadow: "-1px -1px 0px #a0f",
          },
          "50%": {
            color: "#f9c0f0",
            textShadow: "1px -1px 0px #9fddff",
          },
          "75%": {
            color: "#e5e7eb",
            textShadow: "-1px 1px 0px #f9c0f0",
          },
          "100%": {
            color: "#f3f4f6",
            textShadow: "1px 1px 0px #a0f",
          },
        },

        twinkle: {
          "0%": { opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        trail: {
          "0%": { "--angle": "0deg" },
          "100%": { "--angle": "360deg" },
        },
        "blink-red": {
          "0%, 100%": {
            backgroundColor: "rgba(239, 68, 68, 0.7)",
            boxShadow: "0 0 30px 10px rgba(239, 68, 68, 0.5)",
          },
          "50%": {
            backgroundColor: "rgba(239, 68, 68, 0.5)",
            boxShadow: "0 0 30px 10px rgba(239, 68, 68, 1)",
          },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.75", scale: "0.9" },
          "50%": { opacity: "1", scale: "1" },
        },
        "marquee-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-y": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
      },
      animation: {
        "meteor-effect": "meteor 5s linear infinite",
        meteor: "meteor var(--duration) var(--delay) ease-in-out infinite",
        sparkle: "sparkle 2s ease-in-out infinite",
        "marquee-horizontal": "marquee-x var(--duration) infinite linear",
        "marquee-vertical": "marquee-y var(--duration) linear infinite",
        trail: "trail var(--duration) linear infinite",
        "blink-red": "blink-red 2s infinite linear",
      },

      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        striped:
          "repeating-linear-gradient(45deg, #3B3A3D, #3B3A3D 5px, transparent 5px, transparent 20px)",
      },
      colors: {
        lamaSky: "#C3EBFA",
        lamaSkyLight: "#EDF9FD",
        lamaPurple: "#CFCEFF",
        lamaPurpleLight: "#F1F0FF",
        lamaYellow: "#FAE27C",
        lamaYellowLight: "#FEFCE8",
      },
      fontSize: {
        "18px": "18px",
      },
    },
  },
  plugins: [require("tailwindcss-animate"),addVariablesForColors,],
};
function addVariablesForColors({ addBase, theme }: any) {
  let allColors = flattenColorPalette(theme("colors"));
  let newVars = Object.fromEntries(
    Object.entries(allColors).map(([key, val]) => [`--${key}`, val])
  );
 
  addBase({
    ":root": newVars,
  });
}
export default config;
