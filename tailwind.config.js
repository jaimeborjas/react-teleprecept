const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*{html,js}'],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    colors: {
      ...colors,
    },
    backgroundImage: {
      'home-curve': "url('/public/images/wave-haikei.svg')",
    },
  },
  corePlugins: {
    preflight: false,
  },
};
