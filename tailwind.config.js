/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#0d1117', // Very dark blue, almost black
        'surface': '#161b22',    // Dark grey-blue for cards and modals
        'primary': '#58a6ff',    // Bright, accessible blue for primary actions
        'primary-hover': '#2f81f7', // Slightly darker blue for hover
        'secondary': '#21262d',    // Grey-blue for borders and secondary elements
        'text-primary': '#c9d1d9', // Soft white for primary text
        'text-secondary': '#8b949e', // Grey for secondary text
        'success': '#3fb950',    // Green for profit
        'danger': '#f85149',     // Red for loss
      },
    }
  },
  plugins: [],
}