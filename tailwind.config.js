/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{tsx,ts}"],
  theme: {
    extend: {
      colors: {
        primary: "#FF637D",
        error: "#F63C3C",
        secondary: "#216FFF",
        success: "#2CE24E",
        warning: "#FFCC22",
        light: "#F8F8F8",
        dark: {
          100: "#353535",
          200: "#262626",
          300: "#171717",
          400: "#111111",
        },
      },
      textShadow: {
        xs: `-0 -1px 0 #0000001b, 0 -1px 0 #0000001b, -0 1px 0 #0000001b, 0 1px 0 #0000001b, -1px -0 0 #0000001b, 1px -0 0 #0000001b, -1px 0 0 #0000001b, 1px 0 0 #0000001b, -1px -1px 0 #0000001b, 1px -1px 0 #0000001b, -1px 1px 0 #0000001b, 1px 1px 0 #0000001b, -1px -1px 0 #0000001b, 1px -1px 0 #0000001b, -1px 1px 0 #0000001b, 1px 1px 0 #0000001b`,
        sm: `-0 -1px 0 #0000003a, 0 -1px 0 #0000003a, -0 1px 0 #0000003a, 0 1px 0 #0000003a, -1px -0 0 #0000003a, 1px -0 0 #0000003a, -1px 0 0 #0000003a, 1px 0 0 #0000003a, -1px -1px 0 #0000003a, 1px -1px 0 #0000003a, -1px 1px 0 #0000003a, 1px 1px 0 #0000003a, -1px -1px 0 #0000003a, 1px -1px 0 #0000003a, -1px 1px 0 #0000003a, 1px 1px 0 #0000003a`,
        md: `-0 -1px 0 #0000006e, 0 -1px 0 #0000006e, -0 1px 0 #0000006e, 0 1px 0 #0000006e, -1px -0 0 #0000006e, 1px -0 0 #0000006e, -1px 0 0 #0000006e, 1px 0 0 #0000006e, -1px -1px 0 #0000006e, 1px -1px 0 #0000006e, -1px 1px 0 #0000006e, 1px 1px 0 #0000006e, -1px -1px 0 #0000006e, 1px -1px 0 #0000006e, -1px 1px 0 #0000006e, 1px 1px 0 #0000006e`,
      },
    },
  },
  plugins: [require("tailwindcss-textshadow")],
};
