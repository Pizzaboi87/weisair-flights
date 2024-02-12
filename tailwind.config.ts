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
        gradientdark: "linear-gradient( 86.3deg,  rgba(0,78,150,1) 3.6%, rgba(8,24,100,1) 87.6% );",
        gradientgreen: "linear-gradient( 117deg,  rgba(123,216,96,1) 39.2%, rgba(255,255,255,1) 156.2% );"
      },
      colors: {
        filllight: "#FAEDCD",
        filldark: "#264653",
        bgdark: "#14213d",
        bglight: "#FEFAE0",
        textlight: "#FAEDCD",
        textdark: "#14213d",
        yellow: "#F2C641",
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
