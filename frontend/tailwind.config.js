/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  darkMode:'class',
  theme: {
    extend: {
      colors:{'primary':'#000000',
              'secondary':'#F2F2F2',
              'secondary-border':'#DBDBDB',
              'common-blue' :'#0092F1',
              'badge-notification':'#FF3040',
              'secondary-hover':'#F2F2F2',
              'primary-hover':'#1A1A1A',
              'primary-border':'#121212'
    }
    },
  },
  plugins: [nextui(),require('flowbite/plugin')],
}