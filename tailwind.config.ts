import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        vazirmatn: "var(--font-vazirmatn)",
      },
      colors: {
        "regal-blue": {
          "50": "#f3f7fc",
          "100": "#e6eef8",
          "200": "#c6dbf1",
          "300": "#94bee5",
          "400": "#5b9cd5",
          "500": "#3680c1",
          "600": "#2664a3",
          "700": "#205184",
          "800": "#1e456d",
          "900": "#1e3b5c",
          "950": "#14273d",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
