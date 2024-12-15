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
					darkest: "hsl(184, 91%, 17%)", // #044E54
					dark: "hsl(185, 84%, 25%)", // #0A6C74
					medium: "hsl(184, 77%, 34%)", // #14919B
					light: "hsl(184, 65%, 59%)", // #54D1DB
					lightest: "hsl(186, 100%, 94%)", // #E0FCFF
				},

				// Neutral Colors (Blue Grey)
				neutral: {
					darkest: "hsl(209, 61%, 16%)", // #102A43
					dark: "hsl(211, 39%, 23%)", // #243B53
					medium: "hsl(209, 28%, 39%)", // #486581
					light: "hsl(211, 27%, 70%)", // #9FB3C8
					lightest: "hsl(210, 36%, 96%)", // #F0F4F8
				},

				// Supporting Colors
				accent: {
					indigo: {
						darkest: "hsl(234, 62%, 26%)", // #19216C
						dark: "hsl(232, 51%, 36%)", // #2D3A8C
						medium: "hsl(228, 45%, 45%)", // #4055A8
						light: "hsl(227, 50%, 59%)", // #647ACB
						lightest: "hsl(221, 68%, 93%)", // #E0E8F9
					},
					pink: {
						darkest: "hsl(330, 79%, 20%)", // #5C0B33
						dark: "hsl(331, 74%, 27%)", // #781244
						medium: "hsl(330, 63%, 47%)", // #C42D78
						light: "hsl(330, 77%, 76%)", // #F191C1
						lightest: "hsl(329, 100%, 94%)", // #FFE0F0
					},
					red: {
						darkest: "hsl(360, 92%, 20%)", // #610404
						dark: "hsl(360, 85%, 25%)", // #780A0A
						medium: "hsl(360, 67%, 44%)", // #BA2525
						light: "hsl(360, 77%, 78%)", // #F29B9B
						lightest: "hsl(360, 100%, 97%)", // #FFEEEE
					},
					yellow: {
						darkest: "hsl(43, 86%, 17%)", // #513C06
						dark: "hsl(43, 77%, 27%)", // #7C5E10
						medium: "hsl(42, 78%, 60%)", // #E9B949
						light: "hsl(45, 86%, 81%)", // #F8E3A3
						lightest: "hsl(45, 100%, 96%)", // #FFFAEB
					},
				},
			},
		},
	},
	plugins: [],
} satisfies Config;
