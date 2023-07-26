module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        xxs: '360px',
        xsx: '450px',
        xss: '512px',
        xs: '600px',
        tablet: '640px',
        // => @media (min-width: 640px) { ... }

        laptop: '1024px',
        // => @media (min-width: 1024px) { ... }

        huge: '3840px',
        // => @media (min-width: 1280px) { ... }
      },
      colors: {
        'dark-gray': '#47495A',
        primary: '#4EADFF',
        mapCard: {
          hoveredBackground:
            'linear-gradient(142.01deg, #4EADFF -15.86%, #007696 174.52%)',
        },
      },
      boxShadow: {
        button: '0px 7px 34px rgba(78, 173, 255, 0.3)',
      },
      width: {
        1024: '1024px',
        1500: '1500px',
        600: '60rem',
        700: '70rem',
      },
      height: {
        500: '500px',
        300: '300px',
      },
    },
  },
  plugins: [],
}
