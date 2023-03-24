/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  daisyui: {
    themes: [
      {
        myTheme: {
          primary: '#FF4500',
          'primary-focus': '#D23200',
          'primary-content': '#FFFFFF',
          secondary: '#FFD500',
          'secondary-focus': '#B38600',
          'secondary-content': '#FFFFFF',
          accent: '#FFFFFF',
          'accent-focus': '#E0E0E0',
          'accent-content': '#121212',
          neutral: '#FFFFFF',
          'neutral-focus': '#E0E0E0',
          'neutral-content': '#121212',
          'base-100': '#1A1A1A',
          'base-200': '#121212',
          'base-300': '#272727',
          'base-content': '#FFFFFF',
          info: '#007BFF',
          success: '#28A745',
          warning: '#FFC107',
          error: '#DC3545',
        },
      },
    ],
  },
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
