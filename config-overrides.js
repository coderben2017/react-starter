const { injectBabelPlugin } = require('react-app-rewired');

module.exports = function overrides(config, env) {
  config = injectBabelPlugin(
    ['import', { libraryName: 'antd', libraryDirectory: 'es', style: 'css' }],
    config,
  );
  return config;
};
