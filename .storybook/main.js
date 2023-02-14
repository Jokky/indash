const viteTsConfigPaths = require('vite-tsconfig-paths').default;

module.exports = {
  'stories': [
    '../**/*.stories.@(js|jsx|ts|tsx)'
  ],
  'staticDirs': ['../public'],
  'addons': [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    'storybook-addon-next',
    'storybook-css-modules-preset',
    'storybook-addon-swc',
    {
      /**
       * Fix Storybook issue with PostCSS@8
       * @see https://github.com/storybookjs/storybook/issues/12668#issuecomment-773958085
       */
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
      },
    },
  ],
  futures: {
    buildStoriesJson: true,
  },
  'framework': '@storybook/react',
  'core': {
    'builder': '@storybook/builder-webpack5'
  },
}