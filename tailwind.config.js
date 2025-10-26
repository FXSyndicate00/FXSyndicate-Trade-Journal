/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'background': '#121826',
        'surface': '#1a2233',
        'primary': '#4f46e5',
        'primary-hover': '#4338ca',
        'secondary': '#334155',
        'text-primary': '#f8fafc',
        'text-secondary': '#94a3b8',
        'success': '#22c55e',
        'danger': '#ef4444',
      },
    }
  },
  plugins: [],
}
