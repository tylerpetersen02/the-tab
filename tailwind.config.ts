import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        white: "#FFFFFF",
        "off-white": "#FAFAF8",
        "light-gray": "#F3F4F6",
        "medium-gray": "#D4D0CC",
        "dark-gray": "#6B7280",
        black: "#0A0A0A",
        ink: "#001524",
        teal: "#15616d",
        papaya: "#ffecd1",
        orange: "#ff7d00",
        brandy: "#78290f",
      },
      spacing: {
        "nav-height": "100px",
      },
      minHeight: {
        touch: "44px",
      },
      minWidth: {
        touch: "44px",
      },
      fontFamily: {
        sans: ["Nunito Sans", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
