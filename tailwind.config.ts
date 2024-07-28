import type { Config } from "tailwindcss";
import {any} from "prop-types";
const {nextui} = require("@nextui-org/react");


const config: {
  plugins: ReturnType<Plugin>[];
  theme: { extend: { backgroundImage: { "gradient-conic": string; "gradient-radial": string } } };
  darkMode: string;
  content: string[]
} = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
   darkMode: "class",
  plugins: [nextui()]
};
export default config;
