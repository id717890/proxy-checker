const path = require('path');
const CracoLessPlugin = require('craco-less');

module.exports = {
  webpack: {
    alias: {
      components: path.resolve(__dirname, 'src/components'),
      views: path.resolve(__dirname, 'src/views'),
      'app-constants': path.resolve(__dirname, 'src/common/constants'),
      store: path.resolve(__dirname, 'src/store'),
      helpers: path.resolve(__dirname, 'src/helpers'),
      'app-history': path.resolve(__dirname, 'src/common/history'),
      hooks: path.resolve(__dirname, 'src/hooks'),
      context: path.resolve(__dirname, 'src/context'),
    },
  },
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              'layout-body-background': '#ffffff',
            },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};
