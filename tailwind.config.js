const colors = require('tailwindcss/colors');

module.exports = {
  purge: ['./src/**/*{html,js}'],
  theme: {
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
