export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {  // ✅ Move OUTSIDE extend
      primary: "#f8fafc",
      secondary: "#ffffff",
      accent: "#10b981",
      accentDark: "#059669",
      ink: "#0f172a",
      muted: "#64748b",
      border: "#e2e8f0",
    },
  },
  plugins: [],
}