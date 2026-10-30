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
          primary: "#173AD4",
          "primary-600": "#1B40C3",
          accent: "#2574EA",
          sky: "#95BEFA",
          tint: "#D9E9FF",
          bg: "#F7FCFF",
          "deep-1": "#042C9F",
          "deep-2": "#072784",
          navy: "#001244",
          ink: "#040925",
          slate: "#365185",
          card: "#FFFFFF"
        }
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"]
      },
      boxShadow: {
        "sp-soft": "0 4px 20px -2px rgba(23, 58, 212, 0.08), 0 2px 6px -1px rgba(0, 18, 68, 0.04)",
        "sp-lift": "0 12px 30px -4px rgba(23, 58, 212, 0.12), 0 4px 10px -2px rgba(0, 18, 68, 0.06)",
        "sp-glow": "0 0 40px -5px rgba(37, 116, 234, 0.25)"
      }
    }
  },
  plugins: []
};
var stdin_default = config;
export {
  stdin_default as default
};
