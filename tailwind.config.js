/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep Indigo / Midnight Blue for important text and authoritative navigation
        primary: {
          50: '#F2F4F8',
          100: '#E4E9F2',
          200: '#C7D3E4',
          300: '#9FB5D2',
          400: '#6E90BC',
          500: '#476E9F',
          600: '#32527B',
          700: '#233C5D',
          800: '#192C45',
          900: '#122033', // Deep Tamil Nadu Academic Indigo
          950: '#0B1420', // Midnight
        },
        // Muted Turmeric / Warm Ochre (Restrained academic accent)
        accent: {
          50: '#FDFBF4',
          100: '#F9F5E5',
          200: '#F3E9C3',
          300: '#E9D696',
          400: '#DCBE63',
          500: '#C9A436', // Muted Turmeric Gold
          600: '#A88323',
          700: '#7F611A',
          800: '#634A19',
          900: '#4D3916',
          950: '#2C1F08',
        },
        // Terracotta / Earthy Red (South Indian regional architectural accent)
        terracotta: {
          50: '#FDF6F4',
          100: '#FAECE7',
          200: '#F4D6CD',
          300: '#EAB7A7',
          400: '#DE8E75',
          500: '#C86244', // Classic South Indian Terracotta
          600: '#B04C31',
          700: '#8E3A24',
          800: '#6E2E1D',
          900: '#542418',
        },
        // Warm Ivory / Paper Off-White / Natural Stone
        neutral: {
          50: '#FAF8F5', // Warm ivory / paper white
          100: '#F3F0E9', // Warm limestone
          200: '#E6E2D8', // Subtle parchment
          300: '#D2CDC0',
          400: '#9F998C',
          500: '#706B60',
          600: '#4F4B43',
          700: '#38352F',
          800: '#262420',
          900: '#181715',
          950: '#0E0D0C',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          warm: '#FAF8F5', // Warm ivory
          parchment: '#F5F2EB',
          card: '#FFFFFF',
          muted: '#F3F0E9',
          dark: '#122033',
        }
      },
      fontFamily: {
        serif: ['"DM Serif Display"', '"Noto Serif Tamil"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        tamil: ['"Noto Serif Tamil"', 'serif'],
      },
      borderRadius: {
        card: '0.375rem', // Crisp, dignified institutional border radius (not over-rounded SaaS)
        button: '0.25rem',
      },
      maxWidth: {
        'content': '76rem', // ~1216px
      },
      boxShadow: {
        'card': '0 2px 8px -2px rgba(15, 32, 56, 0.06), 0 4px 16px -2px rgba(15, 32, 56, 0.04)',
        'card-hover': '0 12px 28px -4px rgba(15, 32, 56, 0.12), 0 4px 12px -2px rgba(15, 32, 56, 0.06)',
        'elevated': '0 20px 40px -8px rgba(15, 32, 56, 0.16)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-down': 'slideDown 0.3s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      }
    },
  },
  plugins: [],
}
