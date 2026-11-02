const config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/features/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        sp: {
          primary: "#1C4D8D",
          "primary-600": "#0F2854",
          accent: "#4988C4",
          sky: "#BDE8F5",
          tint: "#BDE8F5",
          bg: "#F8F9FA",
          "deep-1": "#1C4D8D",
          "deep-2": "#0F2854",
          navy: "#0F2854",
          ink: "#0F2854",
          slate: "#4A5568",
          card: "#FFFFFF",
          border: "rgba(15, 40, 84, 0.08)",
          "border-strong": "rgba(15, 40, 84, 0.15)"
        }
      },
      fontFamily: {
        display: ["var(--font-bricolage)", "var(--font-geist-sans)", "sans-serif"],
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"]
      },
      borderRadius: {
        "sp-sm": "10px",
        "sp-btn": "12px",
        "sp-md": "16px",
        "sp-lg": "28px"
      },
      boxShadow: {
        "sp-soft":
          "0 1px 2px rgba(15, 40, 84, 0.03), 0 4px 16px -2px rgba(15, 40, 84, 0.04), 0 12px 28px -6px rgba(15, 40, 84, 0.03)",
        "sp-lift":
          "0 2px 4px rgba(15, 40, 84, 0.04), 0 12px 28px -4px rgba(15, 40, 84, 0.08), 0 24px 48px -12px rgba(15, 40, 84, 0.06)",
        "sp-glow": "0 0 40px -5px rgba(73, 136, 196, 0.16)",
        "sp-btn-primary":
          "inset 0 1px 0 0 rgba(255, 255, 255, 0.14), 0 2px 6px -1px rgba(15, 40, 84, 0.22), 0 8px 20px -4px rgba(15, 40, 84, 0.14)",
        "sp-btn-outline":
          "inset 0 1px 0 0 rgba(255, 255, 255, 0.9), 0 1px 2px 0 rgba(15, 40, 84, 0.04)"
      }
    }
  },
  plugins: []
};

export default config;
