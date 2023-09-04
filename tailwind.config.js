/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        tomato: "hsl(4, 100%, 67%)",
        "dark-slate-grey": "hsl(234, 29%, 20%)",
        charcoal: "hsl(235, 18%, 26%)",
        grey: "hsl(231, 7%, 60%)",
        white: "hsl(0, 0%, 100%)",
        error: "hsl(4,100%,67%,15%)",
      },
    },
    
  },
  plugins: [],
};
