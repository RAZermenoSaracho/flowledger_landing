import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
import plugin from "tailwindcss/plugin";
import { darkPalette } from "./src/constants/darkPalette";

const slateSteps = Object.keys(darkPalette);

function slateVariables(palette: Record<string, string>) {
  return Object.fromEntries(
    slateSteps.map((step) => {
      const hex = palette[step];
      const rgb = [1, 3, 5].map((start) => parseInt(hex.slice(start, start + 2), 16));
      return [`--slate-${step}`, rgb.join(" ")];
    })
  );
}

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
        coral: "#f97359",
        slate: Object.fromEntries(
          slateSteps.map((step) => [step, `rgb(var(--slate-${step}) / <alpha-value>)`])
        )
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
  plugins: [
    // `.dark` must follow `:root`: both selectors have equal specificity.
    plugin(({ addBase }) => {
      addBase({ ":root": slateVariables(colors.slate) });
      addBase({ ".dark": slateVariables(darkPalette) });
    })
  ]
} satisfies Config;
