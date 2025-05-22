/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            display: ['group-hover'],
            fontFamily: {
                grotesk: ['Bw Nista Grotesk', 'sans-serif'],
            },

            colors: {
                main: '#F5F8FC',
                gray: {
                    DEFAULT: '#D9D9D9',
                    50: '#F8F8F8',
                    100: '#E8E4E4',
                    200: '#DDDDDD',
                    300: '#666',
                    800: '#1A1A1A',
                    CCC: '#5C5C5C',
                    900: '#999999',
                },

                green: {
                    DEFAULT: '#39B980',
                },

                blue: {
                    500: '#4488D9',
                    600: '#4c96ea',
                },

                purple: {
                    100: '#C444D9',
                },
            },

            borderRadius: {
                5: '5px',
                10: '10px',
                20: '20px',
                30: '30px',
                40: '40px',
            },

            boxShadow: {
                sign: '10px 10px 30px rgba(0, 0, 0, 0.22)',
                header: '10px 20px 30px rgba(0, 0, 0, 0.05)',
            },

            screens: {
                sx: '360px',
                ss: '480px',
                sm: '640px',
                md: '768px',
                lg: '1024px',
                xl: '1280px',
            },
        },
    },
    plugins: [],
}

