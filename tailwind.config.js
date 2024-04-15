/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      textColor: {
        primary: "rgb(20 184 166)",
        "lighter-primary": "rgba(0, 255, 225, 1)",
      },
      dropShadow: {
        outline: "0 1.2px 1.2px rgba(48, 48, 48, 1)",
      },
      backgroundColor: {
        primary: "rgb(20 184 166)",
      },
    },
  },
  plugins: [],
};
