module.exports = {
  moduleNameMapper: {
    "src/App.test.js": "src/App.test.js.js",
  },
};
module.exports = {
  transformIgnorePatterns: ["node_modules/(?!axios|src/App.test.js)"],
};
