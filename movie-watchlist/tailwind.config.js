module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundImage: (theme) => ({
        'hero-bg': "url('../src/assets/bg-grey-pattern.png')",
      }), 
      transformOrigin: {
        "0": "0%",
      },
      zIndex: {
        "-1": "-1",
      }
    },
  },
  variants: {
    borderColor: ["responsive", "hover", "focus", "focus-within"],
    extend: {
      backgroundColor: ['active'],
    },
  },
  plugins: [
    require('tailwindcss-debug-screens'),
    require('autoprefixer'),
    require('postcss')
  ]
};
