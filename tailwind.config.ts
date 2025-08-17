import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ocean: "hsl(210, 100%, 40%)",
        daylight: "hsl(220, 40%, 100%)",
      },
    },
  },
  plugins: [],
}

export default config
