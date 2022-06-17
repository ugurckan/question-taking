function withOpacityValue(variable) {
  return ({ opacityValue }) => {
    if (opacityValue === undefined) {
      return `rgb(var(${variable}))`;
    }
    return `rgb(var(${variable}) / ${opacityValue})`;
  };
}

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        fig: {
          700: withOpacityValue("--tw-fig-700"),
          600: withOpacityValue("--tw-fig-600"),
          300: withOpacityValue("--tw-fig-300"),
        },
        wgreen: {
          400: withOpacityValue("--tw-wg-400"),
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
