/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#FDFDFC",
          DEFAULT: "#FDFDFC",
          dark: "#111110"
        },
        secondary: {
          light: "#F1F0EF",
          dark: "#222221"
        },
        text: {
          light: "#21201C",
          dark: "#EEEEEC"
        },
        text2: {
          light: "#82827C",
          dark: "#7C7B74"
        },
        border: {
          light: "#e2e1de",
          dark: "#31312e"
        },
        size: {
          sm: "5.7818",
          base: "6.16875rem"
        }
      },
      boxShadow: {
        'feeling': '0 0px 22px -5px var(--tw-shadow-color), 0 0px 23px -6px var(--tw-shadow-color)'
      }
    },
  },
  plugins: [],
}

