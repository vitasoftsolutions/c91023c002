/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        erp_primary: "#6777EF",
        erp_bg_main: "#EDE4D9",
        erp_blue: "blue",
      },
    },
  },
  plugins: [require("daisyui")],
};
