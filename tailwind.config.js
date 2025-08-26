/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class', // Habilitar dark mode basado en clase
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                // Colores de la marca
                background: {
                    DEFAULT: '#121212', // Dark
                    light: '#ffffff',   // Light
                },
                foreground: {
                    DEFAULT: '#ffffff', // Dark
                    light: '#000000',   // Light
                },
                primary: {
                    DEFAULT: '#FF4500',
                    50: '#FFF4ED',
                    100: '#FFE6D5',
                    200: '#FFCCAA',
                    300: '#FFA574',
                    400: '#FF743C',
                    500: '#FF4500',
                    600: '#E63900',
                    700: '#CC2E00',
                    800: '#A32400',
                    900: '#7A1B00',
                },
                // Colores para glass effects
                glass: {
                    light: 'rgba(255, 255, 255, 0.1)',
                    dark: 'rgba(0, 0, 0, 0.1)',
                }
            },
            fontFamily: {
                // Fuentes principales
                'sans': ['Poppins', 'sans-serif'],
                'mono': ['JetBrains Mono', 'monospace'],
                
                // Aliases específicos
                'poppins': ['Poppins', 'sans-serif'],
                'jetbrains': ['JetBrains Mono', 'monospace'],
                
                // Semantic aliases
                'heading': ['Poppins', 'sans-serif'],    // Para títulos
                'body': ['JetBrains Mono', 'monospace'], // Para textos de cuerpo
                'logo': ['JetBrains Mono', 'monospace'], // Para el logo
                
                // Fallbacks
                'display': ['Poppins', 'sans-serif'],
                'ui': ['JetBrains Mono', 'monospace']
            },
            backdropBlur: {
                xs: '2px',
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-in-out',
                'slide-up': 'slideUp 0.5s ease-out',
                'scale-in': 'scaleIn 0.3s ease-out',
                'scroll-left': 'scrollLeft 20s linear infinite',
                'scroll-right': 'scrollRight 20s linear infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                slideUp: {
                    '0%': { transform: 'translateY(20px)', opacity: '0' },
                    '100%': { transform: 'translateY(0)', opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                },
                scrollLeft: {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-33.333%)' },
                },
                scrollRight: {
                    '0%': { transform: 'translateX(-33.333%)' },
                    '100%': { transform: 'translateX(0)' },
                },
            },
            transformStyle: {
                'preserve-3d': 'preserve-3d'
            },
            perspective: {
                '1000': '1000px'
            },
            rotate: {
                'y-180': 'rotateY(180deg)'
            },
            backfaceVisibility: {
                'hidden': 'hidden'
            }
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        function ({ addUtilities }) {
            addUtilities({
                '.perspective-1000': {
                    perspective: '1000px',
                },
                '.transform-style-preserve-3d': {
                    transformStyle: 'preserve-3d',
                },
                '.backface-hidden': {
                    backfaceVisibility: 'hidden',
                },
                '.rotate-y-180': {
                    transform: 'rotateY(180deg)',
                },
                '.scale-x-flip': {
                    transform: 'scaleX(-1)',
                },
            })
        },
    ],
}