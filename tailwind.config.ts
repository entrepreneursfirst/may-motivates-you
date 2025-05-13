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
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				commitify: {
					background: '#FFFFF0',
					yellow: '#fcc01b',
					blue: '#5555FF',
					purple: '#B26BCA',
					text: '#000000',
					secondary: '#737373',
				},
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'ping': {
					'75%, 100%': {
						transform: 'scale(2)',
						opacity: '0'
					}
				},
				'ping-slow': {
					'0%': { transform: 'scale(1)', opacity: '0.6' },
					'100%': { transform: 'scale(1.6)', opacity: '0' }
				},
				'ping-medium': {
					'0%': { transform: 'scale(1)', opacity: '0.7' },
					'100%': { transform: 'scale(1.5)', opacity: '0' }
				},
				'ping-fast': {
					'0%': { transform: 'scale(1)', opacity: '0.8' },
					'100%': { transform: 'scale(1.4)', opacity: '0' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'bounce-light': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' },
				},
				'phone-vibrate': {
					'0%': { transform: 'rotate(-10deg)' },
					'50%': { transform: 'rotate(-14deg)' },
					'100%': { transform: 'rotate(-10deg)' }
				},
				'sheet-enter': {
					'0%': { transform: 'translateX(100%) scale(0.95)', opacity: '0' },
					'100%': { transform: 'translateX(0) scale(1)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'ping': 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
				'ping-slow': 'ping-slow 3s ease-in-out infinite',
				'ping-medium': 'ping-medium 2.5s ease-in-out infinite 0.3s',
				'ping-fast': 'ping-fast 2s ease-in-out infinite 0.6s',
				'float': 'float 6s ease-in-out infinite',
				'bounce-light': 'bounce-light 3s ease-in-out infinite',
				'phone-vibrate': 'phone-vibrate 2.5s ease-in-out infinite', // Slowed down from 1.5s to 2.5s
				'sheet-enter': 'sheet-enter 0.3s ease-out'
			},
			fontFamily: {
				'poppins': ['Poppins', 'sans-serif'],
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
