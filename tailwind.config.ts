// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  theme: {
    extend: {
      keyframes: {
        // Nowa animacja dla paska ładowania
        "infinite-loading": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(200%)" },
        },
      },
      animation: {
        // Przypisanie animacji (trwa 1.5 sekundy, porusza się liniowo w nieskończoność)
        "infinite-loading": "infinite-loading 1.5s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
