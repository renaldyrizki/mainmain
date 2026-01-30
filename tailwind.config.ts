import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./contexts/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    theme: {
      extend: {
        animation: {
          "spin-slow": "spin 4s linear infinite",
        },
      },
    },
  },
  plugins: [],
};

export default config;
