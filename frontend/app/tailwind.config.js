const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ['./src/**/*.svelte', './public/*.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  variants: {},
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/ui', ({
      layout : 'sidebar'
    })),
    plugin(function({ addComponents }) {
      const widths = {
        '.min-w-half': {
          minWidth: '50%',
        },
        '.w-vw-90': {
          width: '90vw'
        },
        '.w-vw-80': {
          width: '80vw'
        },
        '.w-vw-85': {
          width: '85vw'
        },
        '.min-w-96': {
          minWidth: '24rem'
        },
      }
      addComponents(widths)
    })
  ]
}
