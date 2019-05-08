const {
  addLessLoader,
  fixBabelImports,
  override
} = require("customize-cra");

module.exports = {
  webpack: override(
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: { '@primary-color': '#8fc31f' },
    }),
    fixBabelImports("babel-plugin-import", {
      libraryName: "antd",
      style: true
    })
  )
};
