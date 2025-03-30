/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          primary: {
            DEFAULT: '#3490dc',
            light: '#6cb2eb',
            dark: '#2779bd',
          },
          secondary: {
            DEFAULT: '#ffed4a',
            light: '#fff382',
            dark: '#e3ac08',
          },
          accent: {
            DEFAULT: '#38c172',
            light: '#51d88a',
            dark: '#1f9d55',
          }
        },
      },
    },
    plugins: [],
  }