/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1A1C1E",
        foreground: "#FFFBFF",
        secondary100: "#2F3236",
        secondary:"#212326",
        accent:"#D62828",
        textSecondary:"#D0D0D0",
        text:"#FFFBFF",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
      },
    },
  },
  plugins: [],
};
