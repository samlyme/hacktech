import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{js,ts,jsx,tsx}",
		"./index.html"
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
				},
				sleep: {
					purple: '#9b87f5',
					'light-purple': '#D6BCFA',
					'soft-purple': '#E5DEFF',
					'soft-blue': '#D3E4FD',
					'sky-blue': '#33C3F0',
					'bright-blue': '#1EAEDB',
					'dark-purple': '#1A1F2C',
					charcoal: '#221F26',
					gray: '#403E43',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
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
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' },
				},
				'pulse-soft': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' },
				},
				moveAround: {
					'0%':   { transform: 'translate(0, 0) scale(1)', opacity: '0.7' },
					'10%':  { transform: 'translate(60px, -40px) scale(1.1)', opacity: '0.8' },
					'20%':  { transform: 'translate(-30px, 100px) scale(1.05)', opacity: '0.9' },
					'35%':  { transform: 'translate(-120px, 30px) scale(1.2)', opacity: '0.7' },
					'50%':  { transform: 'translate(80px, 120px) scale(0.9)', opacity: '0.8' },
					'65%':  { transform: 'translate(-60px, -60px) scale(1.15)', opacity: '0.9' },
					'80%':  { transform: 'translate(100px, 20px) scale(1)', opacity: '0.7' },
					'100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.7' },
				},
				moveAround2: {
					'0%':   { transform: 'translate(0, 0) scale(1)', opacity: '0.6' },
					'15%':  { transform: 'translate(-60px, 80px) scale(1.12)', opacity: '0.8' },
					'30%':  { transform: 'translate(120px, -30px) scale(1.05)', opacity: '0.85' },
					'45%':  { transform: 'translate(30px, 100px) scale(1.18)', opacity: '0.7' },
					'60%':  { transform: 'translate(-100px, 40px) scale(0.95)', opacity: '0.8' },
					'75%':  { transform: 'translate(80px, -120px) scale(1.1)', opacity: '0.9' },
					'100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.6' },
				},
				moveAround3: {
					'0%':   { transform: 'translate(0, 0) scale(1)', opacity: '0.5' },
					'20%':  { transform: 'translate(100px, 100px) scale(1.15)', opacity: '0.7' },
					'40%':  { transform: 'translate(-80px, -40px) scale(1.05)', opacity: '0.8' },
					'60%':  { transform: 'translate(60px, -120px) scale(1.2)', opacity: '0.6' },
					'80%':  { transform: 'translate(-120px, 60px) scale(0.9)', opacity: '0.7' },
					'100%': { transform: 'translate(0, 0) scale(1)', opacity: '0.5' },
				},
				wave: {
					'0%': { transform: 'translateX(0)' },
					'100%': { transform: 'translateX(-50%)' },
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-soft': 'pulse-soft 4s ease-in-out infinite',
				'ambient-1': 'moveAround 18s ease-in-out infinite',
				'ambient-2': 'moveAround 22s ease-in-out infinite reverse',
				'ambient-3': 'moveAround2 28s ease-in-out infinite',
				'ambient-4': 'moveAround3 32s ease-in-out infinite',
				'wave': 'wave 15s linear infinite',
			},
			backgroundImage: {
				'gradient-sleep': 'linear-gradient(to bottom right, #1A1F2C, #403E43)',
				'gradient-cloud': 'linear-gradient(to bottom, #D3E4FD, #E5DEFF)',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
