import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1A7F37",
        secondary: "#14B8A6"
      }
    }
  },
  plugins: []
};

export default config;
