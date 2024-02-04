import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#038C7F",
        secondary: "#F2C641",
        filllight: "#FAEDCD",
        filldark: "#264653",
        bgdark: "#565656",
        bglight: "#FEFAE0",
        textlight: "#FAEDCD",
        tertiary: {
          dark: "#3032A3",
          light: "#bde0fe"
        }
      },
      fontFamily: {
        cuprum: ["var(--font-cuprum)", "sans-serif"],
      }
    },
  },
  plugins: [],
};
export default config;
