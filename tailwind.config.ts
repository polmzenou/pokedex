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
        gameboy: {
          darkest: '#0a1628',
          dark: '#1e3a5f',
          light: '#3b82f6',
          lightest: '#93c5fd',
        },
      },
      fontFamily: {
        pixel: ['"Press Start 2P"', 'cursive'],
      },
      animation: {
        'pixel-blink': 'pixelBlink 1s step-end infinite',
        'pixel-fade': 'pixelFade 150ms steps(3)',
        'sprite-bounce': 'spriteBounce 300ms ease-out',
      },
      keyframes: {
        pixelBlink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        pixelFade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        spriteBounce: {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}

export default config
