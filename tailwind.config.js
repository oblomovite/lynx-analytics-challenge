/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {},
  },
  plugins: [require("flowbite/plugin")],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
};

