const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Nunito', ...defaultTheme.fontFamily.sans],
            },
            backgroundColor: {
                'bibletime-pink': '#c551b4',
                'bibletime-orange': '#f78d22',
                'bibletime-red': '#d72424',
                'bibletime-green': '#008c44',
                'bibletime-blue': '#1e3877',
                'kidspace':'#f0c864',
                'teenspace':'#f07878',
                'lifespace':'#6edcc8',
                'pbsblue': '#2A62E7',
            },
            
        },
    },

    plugins: [require('@tailwindcss/forms')],
};
