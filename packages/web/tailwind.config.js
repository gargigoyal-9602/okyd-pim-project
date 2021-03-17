const colors = require('./theme/colors');
const fontFamily = require('./theme/fontFamily');
const screens = require('./theme/screens');

module.exports = {
  purge: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        ...fontFamily
      },
      screens: {
        ...screens
      },
      colors: {
        ...colors
      },
      boxShadow: {
        dealerCard: '0 4px 10px 8px rgba(35, 35, 35, 0.04)'
      },
      width: {
        68: '17rem',
        600: '600px'
      },
      maxWidth: {},
      minWidth: {},
      height: {},
      maxHeight: {},
      minHeight: {},
      lineHeight: {
        '0': 0
      },
      animation: {},
      listStyleType: {},
      borderWidth: {},
      spacing: {
        65: '16.25rem',
        68: '17rem',
        '14px': '14px'
      },
      gridTemplateColumns: {
        adminMemberListLayout: '48px 2.5fr 2fr 3fr 2.5fr 1.5fr',
        adminMemberTrailLayout: '2fr 3fr 3fr 4fr',
        adminRolesPermissionsListLayout: '2fr 8fr 2fr',
        permissionsListLayout: '6fr 1.5fr 1.5fr 1.5fr 1.5fr',
        categoriesListLayout: '4fr 3.25fr 1.75fr 2fr',
        brandsListLayout: '8fr 2fr 2fr'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
