const { sentryWebpackPlugin } = require("@sentry/webpack-plugin");
const { override, addWebpackPlugin } = require("customize-cra");
const rewiredMap = () => (config) => {
  config.devtool = "source-map";
  return config;
};
module.exports = {
  webpack: override(
    rewiredMap(),
    addWebpackPlugin(
      sentryWebpackPlugin({
        url: "https://frontend-sentry.meiqia.com/",
        org: "meiqia",
        project: "fe-test",
        release: {
          name: "base-5",
          uploadLegacySourcemaps: { paths: ["build"] },
        },
        sourcemaps: { assets: "build/static/**", ignore: ["node_modules"] },
        cleanArtifacts: true,
        authToken:
          "356850d8761d435e9d1b86aaaa2fdd761d4e663136204624bd1e598ac6e95ba2",
      })
    )
  ),
};
