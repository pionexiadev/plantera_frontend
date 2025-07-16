
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        display: ["Montserrat", "sans-serif"],
      },
      colors: {
        plantera: {
          green: '#1A5F1F',       // Deeper green for better contrast
          lightGreen: '#4CAF50',  // More vibrant light green
          darkGreen: '#0D3F12',   // Very dark green for headers
          softGreen: '#E8F7E9',   // Ultra-soft green for backgrounds
          mintGreen: '#B3F0B8',   // Fresh mint for accents
          softYellow: '#FFF9C4',  // Warmer soft yellow
          softOrange: '#FFE0B2',  // More refined orange
          softPeach: '#FFEDE7',   // Delicate peach
          softBlue: '#E3F2FD',    // Fresh blue
          skyBlue: '#81D4FA',     // Vibrant sky blue
          earthBrown: '#6D4C41',  // Richer earth brown
          goldBrown: '#8D6E63',   // Golden brown
          wheat: '#FFF8E1',       // Creamy wheat
          pearl: '#F8F9FA',       // Pearl white
          slate: '#64748B',       // Modern slate
          charcoal: '#374151',    // Deep charcoal
        },
        // Modern gradient colors
        primary: {
          50: '#E8F7E9',
          100: '#C8E6C9', 
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
          950: '#0D3F12'
        },
        accent: {
          50: '#FFF9C4',
          100: '#FFF59D',
          200: '#FFF176',
          300: '#FFEE58',
          400: '#FFEB3B',
          500: '#FDD835',
          600: '#FBC02D',
          700: '#F9A825',
          800: '#F57F17',
          900: '#FF6F00'
        },
        border: "rgba(100, 116, 139, 0.15)",
        input: "rgba(100, 116, 139, 0.1)",
        ring: "#4CAF50",
        background: '#FFFFFF',
        foreground: '#0F172A'
      },
      backgroundColor: {
        DEFAULT: '#FBFAF5'
      },
      textColor: {
        DEFAULT: '#2E7D32'
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #4CAF50 0%, #2E7D32 100%)',
        'gradient-field': 'linear-gradient(135deg, #E8F7E9 0%, #C8E6C9 100%)',
        'gradient-soil': 'linear-gradient(135deg, #8D6E63 0%, #6D4C41 100%)',
        'gradient-sky': 'linear-gradient(135deg, #E3F2FD 0%, #81D4FA 100%)',
        'gradient-harvest': 'linear-gradient(135deg, #FFF8E1 0%, #FFF176 100%)',
        'gradient-growth': 'linear-gradient(135deg, #E8F7E9 0%, #4CAF50 100%)',
        'gradient-card': 'linear-gradient(135deg, #FFFFFF 0%, #F8F9FA 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.6) 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #FFE0B2 0%, #FDD835 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #E3F2FD 0%, #4FC3F7 100%)'
      },
      boxShadow: {
        'glass': '0 8px 32px rgba(31, 38, 135, 0.37)',
        'field': '0 4px 20px rgba(0, 0, 0, 0.08)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.06)',
        'card-hover': '0 8px 30px rgba(0, 0, 0, 0.12)',
        'soft': '0 2px 10px rgba(0, 0, 0, 0.04)',
        'inset-soft': 'inset 0 1px 2px rgba(0, 0, 0, 0.05)',
        'glow': '0 0 20px rgba(76, 175, 80, 0.3)',
        'glow-accent': '0 0 20px rgba(253, 216, 53, 0.3)'
      },
      animation: {
        'fade-up': 'fadeUp 0.5s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-in': 'slideIn 0.4s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-soft': 'pulseSoft 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'ripple': 'ripple 0.6s linear',
        'wiggle': 'wiggle 1s ease-in-out infinite'
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        },
        slideIn: {
          '0%': { opacity: '0', transform: 'translateX(-20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' }
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' }
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' }
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' }
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' }
        },
        ripple: {
          '0%': { transform: 'scale(0)', opacity: '1' },
          '100%': { transform: 'scale(4)', opacity: '0' }
        },
        glow: {
          '0%': { boxShadow: '0 0 20px rgba(76, 175, 80, 0.3)' },
          '100%': { boxShadow: '0 0 30px rgba(76, 175, 80, 0.5)' }
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' }
        }
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
