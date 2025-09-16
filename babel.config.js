/**
 * Babel Configuration File
 * Configures Babel transpilation for Expo and NativeWind integration
 * Required for proper JSX transformation and style processing
 */

module.exports = function (api) {
  // Enable caching for better performance
  api.cache(true);

  return {
    presets: [
      // Expo preset with NativeWind JSX import source
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],

      // NativeWind preset for Tailwind CSS class processing
      "nativewind/babel",
    ],
  };
};
