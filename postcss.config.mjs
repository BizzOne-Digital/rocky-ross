/** Tailwind v4 — required for webpack production builds so `@import "tailwindcss"` expands. */
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
