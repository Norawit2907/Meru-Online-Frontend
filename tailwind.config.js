/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: 'fadeIn 2s ease-out',
        fadeInUp: 'fadeInUp 1.25s ease-in-out 0.25s 1',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translate3d(0, 100%, 0)' },
          '100%': { opacity: '1', transform: 'translate3d(0, 0, 0)' },
        },
      },
    },
  },
  plugins: [],
}

// module.exports = {
//   content: [
//     // ...
//     flowbite.content(),
//   ],
//   plugins: [
//     // ...
//     flowbite.plugin(),
//   ],
// };