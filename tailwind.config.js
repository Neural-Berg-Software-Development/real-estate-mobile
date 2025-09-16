/**
 * Tailwind CSS Configuration File
 * Configures Tailwind CSS for use with NativeWind in React Native
 * Defines custom fonts, colors, and styling tokens for the real estate app
 */

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Define content paths - where Tailwind should look for class names
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],

  // Use NativeWind preset for React Native compatibility
  presets: [require("nativewind/preset")],

  theme: {
    extend: {
      // Custom font family definitions using Rubik font
      fontFamily: {
        rubik: ["Rubik-Regular", "sans-serif"], // Base regular font
        "rubik-bold": ["Rubik-Bold", "sans-serif"], // Bold weight
        "rubik-extrabold": ["Rubik-ExtraBold", "sans-serif"], // Extra bold weight
        "rubik-medium": ["Rubik-Medium", "sans-serif"], // Medium weight
        "rubik-semibold": ["Rubik-SemiBold", "sans-serif"], // Semi-bold weight
        "rubik-light": ["Rubik-Light", "sans-serif"], // Light weight
      },

      // Custom color palette for the app
      colors: {
        // Primary blue color scheme
        primary: {
          100: "#0061FF0A", // Very light blue (4% opacity)
          200: "#0061FF1A", // Light blue (10% opacity)
          300: "#0061FF",   // Main blue color
        },

        // Accent colors for backgrounds
        accent: {
          100: "#FBFBFD", // Very light gray/white
        },

        // Black/gray color variations
        black: {
          DEFAULT: "#000000", // Pure black
          100: "#8C8E98",     // Light gray (text secondary)
          200: "#666876",     // Medium gray (text secondary)
          300: "#191D31",     // Dark gray (text primary)
        },

        // Error/danger color
        danger: "#F75555", // Red color for errors/logout
      },
    },
  },

  // No additional plugins required
  plugins: [],
};
