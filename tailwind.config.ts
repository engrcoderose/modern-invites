import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./features/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        wedding: {
          ivory: "rgb(var(--wedding-color-ivory) / <alpha-value>)",
          paper: "rgb(var(--wedding-color-paper) / <alpha-value>)",
          mist: "rgb(var(--wedding-color-mist) / <alpha-value>)",
          "sage-soft": "rgb(var(--wedding-color-sage-soft) / <alpha-value>)",
          sage: "rgb(var(--wedding-color-sage) / <alpha-value>)",
          "sage-deep": "rgb(var(--wedding-color-sage-deep) / <alpha-value>)",
          ink: "rgb(var(--wedding-color-ink) / <alpha-value>)",
          gold: "rgb(var(--wedding-color-gold) / <alpha-value>)",
          line: "rgb(var(--wedding-color-line) / <alpha-value>)",
        },
        ivory: '#f8f5ef',
        ink: {
          DEFAULT: '#202421',
          muted: '#66706a',
        },
        forest: {
          DEFAULT: '#173d32',
          light: '#204b3e',
        },
        eucalyptus: {
          DEFAULT: '#6f927f',
          dark: '#527362',
        },
        champagne: {
          DEFAULT: '#c7a96b',
          light: '#ead8ae',
          dark: '#9d7f47',
        },
        sage: {
          '50': '#f0f7f4',
          '100': '#dceee4',
          '200': '#bcdcc9',
          '300': '#8fc2a5',
          '400': '#5fa37c',
          '500': '#3d8560',
          '600': '#2d6b4e',
          '700': '#255640',
          '800': '#204536',
          '900': '#1c3a2e',
          '950': '#0e2018'
        },
        gold: {
          '50': '#fef9f0',
          '100': '#fef3e0',
          '200': '#fde4b8',
          '300': '#fbce85',
          '400': '#f8b048',
          '500': '#f59e0b',
          '600': '#d97706',
          '700': '#b45309',
          '800': '#92400e',
          '900': '#78350f'
        },
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      fontFamily: {
        "wedding-display": ["var(--font-playfair)", "Georgia", "serif"],
        "wedding-body": ["var(--font-libre-baskerville)", "Georgia", "serif"],
        "wedding-script": ["var(--font-mea-culpa)", "cursive"],
        elegant: ['var(--font-playfair)', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        imperial: ['var(--font-imperial)', 'script'],
        ebGaramond: ['var(--font-eb-garamond)', 'serif'],
        libreBaskerville: ['var(--font-libre-baskerville)', 'serif'],
        instrumentSerif: ['var(--font-instrument-serif)', 'serif'],
        meaCulpa: ['var(--font-mea-culpa)', 'serif'],
        petitFormalScript: ['var(--font-petit-formal-script)', 'cursive'],
      },
      borderRadius: {
        wedding: "var(--wedding-radius-card)",
        "wedding-control": "var(--wedding-radius-control)",
        "wedding-pill": "9999px",
        "wedding-arch": "999px 999px var(--wedding-radius-card) var(--wedding-radius-card)",
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        "wedding-fade-up": {
          from: { opacity: "0", transform: "translateY(1.5rem)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "wedding-fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "wedding-soft-float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-0.4rem)" },
        },
        "wedding-draw": {
          from: { strokeDashoffset: "1" },
          to: { strokeDashoffset: "0" },
        },
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        }
      },
      animation: {
        "wedding-fade-up":
          "wedding-fade-up var(--wedding-duration-slow) var(--wedding-ease-out) both",
        "wedding-fade-in":
          "wedding-fade-in var(--wedding-duration-base) ease-out both",
        "wedding-soft-float": "wedding-soft-float 5s ease-in-out infinite",
        "wedding-draw":
          "wedding-draw 1.6s var(--wedding-ease-out) both",
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      },
      boxShadow: {
        "wedding-card": "var(--wedding-shadow-card)",
        "wedding-soft": "var(--wedding-shadow-soft)",
        "wedding-focus": "0 0 0 3px rgb(var(--wedding-color-sage) / 0.2)",
      },
      spacing: {
        "wedding-gutter": "var(--wedding-space-gutter)",
        "wedding-section": "var(--wedding-space-section)",
        "wedding-section-sm": "var(--wedding-space-section-sm)",
      },
      maxWidth: {
        "wedding-copy": "42rem",
        "wedding-content": "74rem",
        "wedding-wide": "90rem",
      },
      transitionTimingFunction: {
        "wedding-out": "var(--wedding-ease-out)",
      },
      fontSize: {
        "wedding-display": [
          "clamp(3.25rem, 10vw, 7.5rem)",
          { lineHeight: "0.9", letterSpacing: "-0.035em" },
        ],
        "wedding-title": [
          "clamp(2.25rem, 6vw, 4.75rem)",
          { lineHeight: "1", letterSpacing: "-0.025em" },
        ],
        "wedding-heading": [
          "clamp(1.75rem, 4vw, 3rem)",
          { lineHeight: "1.1", letterSpacing: "-0.015em" },
        ],
        "wedding-lead": [
          "clamp(1.05rem, 2vw, 1.3rem)",
          { lineHeight: "1.85", letterSpacing: "0.045em" },
        ],
        "wedding-eyebrow": [
          "0.75rem",
          { lineHeight: "1.4", letterSpacing: "0.24em" },
        ],
      },
    }
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;

