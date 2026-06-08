/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0a0a0f',
        bg2: '#111118',
        bg3: '#16161f',
        surface: '#1c1c28',
        surface2: '#222232',
        accent: '#7c6af7',
        accent2: '#5e4de6',
        greenCustom: '#3ec97d',
        cyanCustom: '#3ecbcf',
        textCustom: '#f0eff8',
        text2: '#9b99b8',
        text3: '#5e5c7a',
      },
      fontFamily: {
        head: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}