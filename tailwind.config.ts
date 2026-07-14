import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#06080e', panel: '#0b0e17',
        line: 'rgba(255,255,255,0.08)',
        body: '#e9ebf3', muted: '#9aa1b5', dim: '#5d6478',
        teal: '#5eead4', violet: '#a78bfa', fuchsia2: '#f0abfc', gold: '#fbbf24',
      },
      fontFamily: {
        display: ['var(--font-display)'], sans: ['var(--font-body)'], mono: ['var(--font-mono)'],
      },
      borderRadius: { glass: '22px', card: '18px' },
    },
  },
  plugins: [],
}
export default config
