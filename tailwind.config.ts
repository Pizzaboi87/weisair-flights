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
      backgroundImage: {
        gradientlight: "radial-gradient(circle 763px at 18.3% 24.1%, rgba(255, 249, 137, 1) 7.4%, rgba(226, 183, 40, 1) 58.3% )",
        gradientdark: "radial-gradient( circle 975px at 2.6% 48.3%,  rgba(0,8,120,1) 0%, rgba(95,184,224,1) 99.7% );",
      },
      colors: {
        primary: "#038C7F",
        secondary: "#F2C641",
        filllight: "#FAEDCD",
        filldark: "#264653",
        bgdark: "#565656",
        bglight: "#FEFAE0",
        textlight: "#FAEDCD",
        textdark: "#14213d",
        tertiary: {
          dark: "#fca311",
          light: "#bde0fe"
        },
      },
      fontFamily: {
        cuprum: ["var(--font-cuprum)", "sans-serif"],
      }
    },
  },
  plugins: [],
};
export default config;
