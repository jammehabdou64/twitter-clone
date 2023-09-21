import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "primary-orang": "#FF5722",
        primary: "rgb(29, 155, 240)",
        dark: "rgb(22, 24, 28)",
        "primary-light": "rgba(29, 156, 240, 0.185)",
        "primary-lighter": "rgba(91, 112, 131, 0.4)",
      },
      boxShadow: {
        light:
          " rgba(255, 255, 255, 0.2) 0px 0px 15px, rgba(255, 255, 255, 0.15) 0px 0px 3px 1px;",
      },
    },
  },
  plugins: [],
};
export default config;
