import type { Config } from "tailwindcss";

export default {
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",

				// Primary Colors (Cyan)
				primary: {
					darkest: "hsl(184, 91%, 17%)",
					dark: "hsl(185, 84%, 25%)",
					medium: "hsl(184, 77%, 34%)",
					light: "hsl(184, 65%, 59%)",
					lightest: "hsl(186, 100%, 94%)",
				},

				// Neutral Colors (Warm Grey)
				neutral: {
					darkest: "hsl(42, 15%, 13%)",
					dark: "hsl(40, 13%, 23%)",
					medium: "hsl(41, 9%, 35%)",
					light: "hsl(39, 11%, 69%)",
					lightest: "hsl(40, 23%, 97%)",
				},

				// Accent Colors
				accent: {
					blue: {
						darkest: "hsl(205, 100%, 21%)",
						dark: "hsl(205, 87%, 29%)",
						medium: "hsl(205, 67%, 45%)",
						light: "hsl(205, 84%, 74%)",
						lightest: "hsl(205, 79%, 92%)",
					},
					red: {
						darkest: "hsl(360, 92%, 20%)",
						dark: "hsl(360, 85%, 25%)",
						medium: "hsl(360, 67%, 44%)",
						light: "hsl(360, 77%, 78%)",
						lightest: "hsl(360, 100%, 97%)",
					},
					yellow: {
						darkest: "hsl(43, 86%, 17%)",
						dark: "hsl(43, 77%, 27%)",
						medium: "hsl(42, 78%, 60%)",
						light: "hsl(45, 86%, 81%)",
						lightest: "hsl(45, 100%, 96%)",
					},
					teal: {
						darkest: "hsl(170, 97%, 15%)",
						dark: "hsl(168, 80%, 23%)",
						medium: "hsl(162, 63%, 41%)",
						light: "hsl(156, 73%, 74%)",
						lightest: "hsl(152, 68%, 96%)",
					},
				},
			},
		},
	},
	plugins: [],
} satisfies Config;
