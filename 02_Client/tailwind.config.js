console.log(process.env.NODE_ENV);
const purge = process.env.NODE_ENV === 'production';
/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: {enabled: purge, content: ['./build/**/*.{html,js}']},
  theme: {
    extend: {
      fontFamily: {
        'montagu': ['"Montagu Slab"']
      }
    },
  },
  plugins: [],
}

