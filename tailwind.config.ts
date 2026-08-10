import type { Config } from "tailwindcss";

/**
 * Tailwind theme for the FlowLedger landing page. Color tokens are extracted
 * from the FlowLedger app (apps/web/tailwind.config.ts in the main repo) to
 * keep the landing page visually consistent with the product it promotes.
 */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#17211d",
        mint: "#dff8ea",
        pine: "#176b52",
        coral: "#f97359"
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif"
        ]
      }
    }
  },
  plugins: []
} satisfies Config;
