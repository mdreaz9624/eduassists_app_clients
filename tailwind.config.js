// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   // The syntax must be require("daisyui")
//   plugins: [require("daisyui")],

//   daisyui: {
//     // You can add as many themes as you like here
//     themes: ["light", "dark", "cupcake", "emerald", "corporate", "bumblebee"],
//     darkTheme: "dark", 
//     base: true, 
//     utils: true,
//   },
// };


import daisyui from "daisyui"

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["light", "dark", "cupcake", "emerald", "corporate", "bumblebee"],
  },
};