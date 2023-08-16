module.exports = {
  devServer: {
    port: 3001
  },
  eslint: {
    enable: false,
  },
  style: {
    postcss: {
      plugins: [require("tailwindcss"), require("autoprefixer")],
    },
  },
};
