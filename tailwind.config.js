/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./node_modules/flowbite/**/*.js"],
  theme: {
    fontSize: {
      title: `2.6rem;`,
      paragraph: `1.2rem;`
    },
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [require("flowbite/plugin")],
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
};

