import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ash-black': '#0a0a0a',
        'charcoal': '#1c1c1c',
        'ember': '#2a1a0a',
        'flame-orange': '#ff6b00',
        'flame-bright': '#ff9500',
        'flame-red': '#cc2200',
        'gold': '#d4af37',
        'gold-light': '#f0d060',
        'ash-gray': '#4a4a4a',
        'smoke': '#888888',
        'parchment': '#c8b89a',
      },
      fontFamily: {
        'cinzel': ['Cinzel', 'Georgia', 'serif'],
        'playfair': ['Playfair Display', 'Georgia', 'serif'],
        'caveat': ['Caveat', 'cursive'],
        'noto': ['Noto Sans TC', 'sans-serif'],
      },
      animation: {
        'flicker': 'flicker 3s ease-in-out infinite',
        'float-up': 'floatUp 8s linear infinite',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
        'scan-line': 'scanLine 3s linear infinite',
        'typewriter': 'typewriter 3s steps(40) forwards',
        'wing-left': 'wingLeft 4s ease-in-out infinite',
        'wing-right': 'wingRight 4s ease-in-out infinite',
      },
      keyframes: {
        flicker: {
          '0%, 100%': { opacity: '1' },
          '33%': { opacity: '0.8' },
          '66%': { opacity: '0.95' },
        },
        floatUp: {
          '0%': { transform: 'translateY(100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '0.6' },
          '90%': { opacity: '0.3' },
          '100%': { transform: 'translateY(-10vh) rotate(360deg)', opacity: '0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 10px #ff6b00, 0 0 20px #ff6b00' },
          '50%': { boxShadow: '0 0 20px #ff6b00, 0 0 40px #ff6b00, 0 0 60px #ff9500' },
        },
        scanLine: {
          '0%': { top: '0%' },
          '100%': { top: '100%' },
        },
        typewriter: {
          '0%': { width: '0' },
          '100%': { width: '100%' },
        },
        wingLeft: {
          '0%, 100%': { transform: 'rotate(-20deg) scaleX(0.9)' },
          '50%': { transform: 'rotate(-40deg) scaleX(1.1)' },
        },
        wingRight: {
          '0%, 100%': { transform: 'rotate(20deg) scaleX(0.9)' },
          '50%': { transform: 'rotate(40deg) scaleX(1.1)' },
        },
      },
      backgroundImage: {
        'flame-gradient': 'radial-gradient(ellipse at center, #ff6b00 0%, #cc2200 40%, transparent 70%)',
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #f0d060 50%, #d4af37 100%)',
        'parchment-texture': 'url("/parchment.svg")',
      },
    },
  },
  plugins: [],
}
export default config
