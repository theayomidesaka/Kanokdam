/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0B0F19',   // Deep futuristic midnight black/blue
          navy: '#131A2E',   // Dark card background
          border: '#1F293D', // Sleek card border
          light: '#F8FAFC',  // Main light background
          gray: '#94A3B8',   // Muted gray
          orange: '#FF5A1F', // Energy orange (representative of Perkins/Yorc power)
          amber: '#F59E0B',  // Amber warnings/accents
          blue: '#3B82F6',   // Electrical/tech blue
          green: '#10B981',  // Running/healthy green
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-up': 'slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-down': 'slideDown 0.3s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 2s infinite ease-in-out',
        'glow': 'glow 3s infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.97', transform: 'scale(0.99)' },
        },
        glow: {
          '0%': { 'box-shadow': '0 0 5px rgba(255, 90, 31, 0.2), 0 0 10px rgba(255, 90, 31, 0.1)' },
          '100%': { 'box-shadow': '0 0 20px rgba(255, 90, 31, 0.6), 0 0 30px rgba(255, 90, 31, 0.3)' }
        }
      }
    },
  },
  plugins: [],
}
