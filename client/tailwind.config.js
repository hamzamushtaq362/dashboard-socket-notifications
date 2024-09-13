/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "rgba(25, 40, 78, 1)",
        "custom-lightBlue": "#0E77891A",

        "custom-purple": "rgba(14, 119, 137, 1)",
        "custom-blue1": "#3C5A85",
        "custom-grey": "#8C8787",
        offwhite: "#eaeaea",
        aboutustext: "#8C8888",
        "custom-white": "#FFFFFF",
        primaryText: "#0E7789",
        dottedBorder: "#3C5A85",
        webHeading: "#1B2B4E",
        webDescrip: "#8C8787",
        btnGroup: "#E1ECF1",
        fromclr: "#0E7789",
        footerBg: "#273C69",
        toclr: "#3C5A85",
        firstProcess: "#30D1C7",
        webdevHover: "#30B1C7",
        checks: "#25324B",
        backgroundColor: "#f8f9fc",
        heading: "#0E7789",
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["ligth", "dark"],
  },
};
