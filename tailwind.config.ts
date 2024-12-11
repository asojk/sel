import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'
import animate from 'tailwindcss-animate'


export default {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			fontFamily: {
				serif: ['Lato', 'serif'],
				sans: ['Inter', 'sans-serif'],
			},
			fontSize: {
				'heading-1': ['2.25rem', { lineHeight: '2.5rem', fontWeight: '700' }],
				'heading-2': ['1.875rem', { lineHeight: '2.25rem', fontWeight: '600' }],
				'heading-3': ['1.5rem', { lineHeight: '2rem', fontWeight: '500' }],
				body: ['1rem', { lineHeight: '1.5rem' }],
			},
			spacing: {
				'content-padding': 'var(--content-padding)',
			},
			colors: {
				p: {
					'1': '#d0d7dd',
					'2': '#8e9fad',
					'3': '#607483',
					'4': '#43525c',
					'5': '#1e2529',
					DEFAULT: '#36454F',
					light: '#4B5A67',
					dark: '#243038',
				},
				s: {
					'2': '#5cb593',
					'3': '#3a8266',
					'4': '#224a3b',
					DEFAULT: '#AEE1CF',
					light: '#D3F4E8',
					dark: '#7FBFA5',
				},
				B: {
					'2': '#B1B1B1',
					'3': '#828282',
					'4': '#535353',
					DEFAULT: '#E8E8E8',
					light: '#F9F9F9',
					dark: '#BEBEBE',
				},
				a: {
					DEFAULT: '#33B588',
					light: '#4ECB9E',
					dark: '#208664',
					darker: '#224a3b',
				},
				n: {
					'1': '#fcfcfc',
					'2': '#f1f1f1',
					'3': '#dfdfdf',
					'4': '#cccccc',
					'5': '#aaaaaa',
					'6': '#898989',
					'7': '#707070',
					'8': '#5c5c5c',
					'9': '#454545',
					'900': '#1c1c1c',
					light: '#F5F5F5',
					dark: '#222222',
				},
				g: {
					'50': '#fcfcfc',
					'100': '#f1f1f1',
					'200': '#dfdfdf',
					'300': '#cccccc',
					'400': '#aaaaaa',
					'500': '#898989',
					'600': '#707070',
					'700': '#5c5c5c',
					'800': '#454545',
					'900': '#1c1c1c',
					b: '#090909',
					code: '#292C33',
				},
			},
			boxShadow: {
				neu1: '10px 10px 20px #b3b3b3, -10px -10px 20px #ffffff',
				neu2: 'shadow-[rgba(0,_0,_0,_0.2)_0px_60px_40px_-7px]',
				green: '1px 10px 100px 22px rgba(174, 225, 207, 0.8)',
				custom: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
				'custom-dark': '0 10px 15px -3px rgba(255, 255, 255, 0.1), 0 4px 6px -2px rgba(255, 255, 255, 0.05)',
			},
			animation: {
				breathe: 'breathe 12s cubic-bezier(0.4, 0, 0.6, 1) infinite',
				float: 'float 5s ease-in-out infinite',
				text: 'text 8s ease infinite',
				'pulse-slow': 'pulse 7s infinite',
				highlight: 'text 10s ease infinite',
				'delayed-fade-in': 'delayedFadeIn 6s ease-out forwards',
			},
			keyframes: {
				breathe: {
					'0%, 100%': {
						transform: 'scale(0.5)',
						opacity: '0.4',
					},
					'33%': {
						transform: 'scale(1)',
						opacity: '1',
					},
					'66%': {
						transform: 'scale(1)',
						opacity: '1',
					},
				},
				float: {
					'0%': {
						transform: 'translate(-50%, 0)',
					},
					'50%': {
						transform: 'translate(-50%, 30px)',
					},
					'100%': {
						transform: 'translate(-50%, 0)',
					},
				},
				text: {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'left center',
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center',
					},
				},
				highlight: {
					'0%, 100%': {
						'background-size': '250% 250%',
						'background-position': 'left top',
					},
					'50%': {
						'background-size': '250% 250%',
						'background-position': 'right bottom',
					},
				},
				delayedFadeIn: {
					'0%': { opacity: '0' },
					'66.67%': { opacity: '0' }, // 2 seconds of 3-second animation
					'100%': { opacity: '1' },
				},
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)',
			},
		},
	},
	plugins: [typography, animate],
} satisfies Config
