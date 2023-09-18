/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        erp_primary: "#007BFF",
        erp_secondary: "#6C757D",
        erp_success: "#28A745",
        erp_danger: "#DC3545",
        erp_warning: "#FFC107",
        erp_info: "#17A2B8",
        erp_light: "#F8F9FA",
        erp_dark: "#343A40",
        // Others
        erp_bg_main: "#EDE4D9",
        erp_blue: "blue",
      },
    },
  },
  plugins: [require("daisyui")],
};
