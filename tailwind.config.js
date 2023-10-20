/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#BC202E",
        foreground: "#FFF",
        secondaryForeground: "#0F0F12",
        background: "#F0F2F5",
        disabled: "#E5E5E5",
        error: "#FF263A",
      },
    },
  },
};
