import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Scrapbook color palette
        scrapbook: {
          cream: '#FFF7EB',
          blush: '#F3D7D1',
          sage: '#C9D5C0',
          cornflower: '#94A9D1',
          gray: '#5E5E5E',
          brown: '#A0835F',
          yellow: '#F4D36B',
          berry: '#B65A5A',
          lavender: '#C7B7E5',
        },
      },
      fontFamily: {
        handwriting: ["var(--font-handwriting)", "cursive"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: ["var(--font-sans)", "Inter", "sans-serif"],
      },
      boxShadow: {
        'tape': '0 2px 8px rgba(0, 0, 0, 0.1)',
        'polaroid': '0 4px 16px rgba(0, 0, 0, 0.15)',
        'paper': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'soft': '0 2px 12px rgba(0, 0, 0, 0.08)',
      },
      backgroundImage: {
        'watercolor-warm': 'radial-gradient(ellipse at top left, rgba(244, 211, 107, 0.2), transparent 60%)',
        'watercolor-cool': 'radial-gradient(ellipse at top right, rgba(148, 169, 209, 0.2), transparent 60%)',
        'watercolor-earth': 'radial-gradient(ellipse at bottom left, rgba(160, 131, 95, 0.15), transparent 60%)',
        'watercolor-soft': 'radial-gradient(ellipse at center, rgba(243, 215, 209, 0.2), transparent 70%)',
        'paper-texture': 'url("data:image/svg+xml,%3Csvg width=\'100\' height=\'100\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' /%3E%3CfeColorMatrix type=\'saturate\' values=\'0\'/%3E%3C/filter%3E%3Crect width=\'100\' height=\'100\' filter=\'url(%23noise)\' opacity=\'0.03\'/%3E%3C/svg%3E")',
      },
      rotate: {
        '1': '1deg',
        '2': '2deg',
        '-1': '-1deg',
        '-2': '-2deg',
      },
    },
  },
  plugins: [],
};
export default config;
