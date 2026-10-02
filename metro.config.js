const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').ConfigT} */
const config = getDefaultConfig(__dirname);

// Ensure .wasm is handled as an asset file, not source code
if (!config.resolver.assetExts.includes("wasm")) {
  config.resolver.assetExts.push("wasm");
}

config.resolver.sourceExts = config.resolver.sourceExts.filter(
  (ext) => ext !== "wasm"
);

module.exports = config;