const withTM = require('next-transpile-modules')([
  '@react-spectrum/form',
  '@react-spectrum/icon',
  '@react-spectrum/label',
  '@react-spectrum/layout',
  '@react-spectrum/provider',
  '@react-spectrum/textfield',
  '@spectrum-icons/ui',
  '@react-spectrum/color',
  '@react-spectrum/theme-default',
]);


module.exports = withTM({
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = 'electron-renderer';
    }

    return config;
  },
});
