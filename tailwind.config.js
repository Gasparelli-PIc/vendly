/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        vendly: {
          primary: "#16A34A",
          bg: "#F9FAFB",
          card: "#FFFFFF",
          text: {
            DEFAULT: "#111827",
            secondary: "#6B7280"
          },
          border: "#E5E7EB",
          error: "#DC2626",
          warning: "#F59E0B"
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"]
      }
    },
  },
  plugins: [],
}
