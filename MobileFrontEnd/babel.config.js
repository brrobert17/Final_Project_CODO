module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '@components': './components',
            '@interfaces': './utils/interfaces.ts',
            '@screens': './screens',
            '@assets': './assets',
            '@gStyle': './style.ts',
            '@dbConn': './DatabaseConn',
            '@utils': './utils'
          },
        },
      ],
      'react-native-reanimated/plugin',
    ],
  };
};
