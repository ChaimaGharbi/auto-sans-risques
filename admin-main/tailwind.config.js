module.exports = {
  prefix: "tw-",
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        "1024": "1024px",
        "1500": "1500px",
        "600": "60rem",
        "700": "70rem",
      },
      height: {
        "400": "40rem",
        "700": "70rem",
      },
      colors: {
        primary: "#3699ff",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
