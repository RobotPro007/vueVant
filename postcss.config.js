module.exports = {
  plugins: {
    "postcss-pxtorem": {
      rootValue: 37.5,
      propList: ["*"],
    },
    autoprefixer: { browsers: "last 5 version" },
  },
};
