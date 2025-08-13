import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      colors: {
        // CSS Variable-based colors (YouMatter Theme)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        "accent-2": {
          DEFAULT: "hsl(var(--accent-2))",
          foreground: "hsl(var(--accent-2-foreground))",
        },
        "mood-medium": "hsl(var(--mood-medium))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        // Direct color values for mood visualization
        "mood-high": "#FF6B6B", // Coral Red
        "mood-low": "#4ECDC4", // Turquoise
        "mood-medium-direct": "#FFD93D", // Soft Yellow
      },
      backgroundImage: {
        "gradient-glass": "linear-gradient(to right, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
        "gradient-primary": "linear-gradient(135deg, #87A8A4, #6ED3CF)",
        "gradient-accent": "linear-gradient(135deg, #FF8C82, #FF9A92)",
        "gradient-warm": "linear-gradient(135deg, #FAF9F6, #F5F4F1)",
        "gradient-dark": "linear-gradient(135deg, #1A1A1A, #2A2A2A)",
      },
      backdropBlur: {
        xs: "2px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.4s ease-out",
        "scale-in": "scaleIn 0.3s ease-out",
        "bounce-gentle": "bounceGentle 0.6s ease-out",
        "glow": "glow 2s ease-in-out infinite alternate",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        bounceGentle: {
          "0%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.05)" },
          "100%": { transform: "scale(1)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(135, 168, 164, 0.5)" },
          "100%": { boxShadow: "0 0 20px rgba(135, 168, 164, 0.8)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      boxShadow: {
        "soft": "0 4px 14px rgba(0, 0, 0, 0.08)",
        "glow": "0 0 15px rgba(108, 99, 255, 0.3)",
        "glow-accent": "0 0 15px rgba(255, 107, 107, 0.3)",
        "glow-accent-2": "0 0 15px rgba(78, 205, 196, 0.3)",
      },
    },
  },
  plugins: [],
};

export default config;
