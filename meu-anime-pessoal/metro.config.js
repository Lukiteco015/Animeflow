const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// O input deve apontar para o seu arquivo de CSS global
module.exports = withNativeWind(config, { input: "./global.css" });