const { getDefaultConfig } = require('metro-config');

module.exports = (async () => {
  let {
    resolver: { sourceExts, assetExts },
  } = await getDefaultConfig();
  assetExts = [...assetExts, 'woff', 'woff2', 'eot', 'html'].filter(ext => ext !== 'svg')
  return {
    transformer: {
      babelTransformerPath: require.resolve('react-native-svg-transformer'),
    },
    resolver: {
      assetExts: assetExts,
      sourceExts: [...sourceExts, 'svg', 'woff', 'html'],
    },
  };
})();