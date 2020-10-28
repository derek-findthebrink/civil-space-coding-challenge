const { environment } = require("@rails/webpacker");
const Dotenv = require("dotenv-webpack");
const BabelEnginePlugin = require("babel-engine-plugin");

environment.plugins.append("Dotenv", new Dotenv());
environment.plugins.append(
  "BabelEngine",
  new BabelEnginePlugin({ presets: ["env"] }, { verbose: false })
);
environment.loaders.delete("nodeModules");
environment.config.merge({
  output: {
    filename: (chunkData) =>
      chunkData.chunk.name === "widget" ? "[name].js" : "[name]-[chunkhash].js",
  },
});

module.exports = environment;
