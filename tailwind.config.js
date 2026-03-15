/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'primary-cyan': '#06B6D4',
        'primary-orange': '#FB923C',
        'bg-light': '#FAFAFA',
      },
      boxShadow: {
        'neumorphic-light': '8px 8px 16px #e0e0e0, -8px -8px 16px #ffffff',
        'neumorphic-dark': '8px 8px 16px #d0d0d0, -8px -8px 16px #ffffff',
        'neumorphic-inset': 'inset 4px 4px 8px #e0e0e0, inset -4px -4px 8px #ffffff',
      },
    },
  },
  plugins: [],
}
