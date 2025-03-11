// module.exports = {
//   presets: [
//     'module:metro-react-native-babel-preset',
//     '@babel/preset-react',
//   ],
//   plugins: [],
// };

// module.exports = {
//   presets: [
//     'module:metro-react-native-babel-preset',
//     '@babel/preset-react',
//   ],
//   plugins: [],
// };

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo', // Expo's default preset
      '@babel/preset-react', // For JSX support
    ],
    plugins: [],
  };
};