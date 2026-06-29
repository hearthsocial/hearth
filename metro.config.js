const { getDefaultConfig } = require("expo/metro-config");

/** @type {import('expo/metro-config').ConfigT} */
const config = getDefaultConfig(__dirname);

const { transformer, resolver } = config;
resolver.assetExts.push("wasm");
resolver.sourceExts.push("wasm");
module.exports = config;
