const { override, addLessLoader } = require("customize-cra");

module.exports = override(
  addLessLoader({
    lessOptions: {
      javascriptEnabled: true,
      modifyVars: { "@base-color": "#F55C5C", "@B800": "#191D38", "@B700": "#272c4a" },
    },
  })
);
