/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./node_modules/flowbite/**/*.js",
    "./index.html"
  ],
  theme: {
    extend: {
      'animation': {
            'text':'text 5s ease infinite',
        },
        'keyframes': {
            'text': {
                '0%, 100%': {
                   'background-size':'300% 300%',
                    'background-position': 'left center'
                },
                '50%': {
                   'background-size':'300% 300%',
                    'background-position': 'right center'
                }
            },
        },
        content: {
          'link': 'url("/assets/link.svg")',
        },

    },
  },
  plugins: [  
    require('flowbite/plugin')
  ],
}

