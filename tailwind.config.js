module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],

    // enable dark mode via class strategy
    darkMode: 'class',

    theme: {
        extend: {
            fontFamily: {
                Ubuntu: [ 'Ubuntu', 'sans-serif'],
                sf_bold: ['SF-bold','sans-serif'],
                sf_black_italic: ['SF-black-italic','sans-serif'],
                sf_heavy_italic: ['SF-heavy-italic','sans-serif'],
                sf_light_italic: ['SF-light-italic','sans-serif'],
                sf_medium: ['SF-medium','sans-serif'],
                sf_regular: ['SF-regular','sans-serif'],
                sf_semi_bold_italic: ['SF-semi-bold-italic','sans-serif'],
                sf_thin_italic: ['SF-thin-italic','sans-serif'],
                sf_ultra_light_italic: ['SF-ultra-light-italic','sans-serif']
            },
            colors: {
                black: '#09090c',
                teal:'#00adb5',
                darkGray: '#121212',
                brightRed: 'hsl(12, 88%, 59%)',
                brightRedLight: 'hsl(12, 88%, 69%)',
                brightRedSupLight: 'hsl(12, 88%, 95%)',
                darkBlue: 'hsl(228, 39%, 23%)',
                darkGrayishBlue: 'hsl(227, 12%, 61%)',
                veryDarkBlue: 'hsl(233, 12%, 13%)',
            },
        },
    },
    
    plugins: [],
    
}
