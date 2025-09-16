/**
 * Images Constants - Centralized image imports for the application
 * Contains all image assets used throughout the app including illustrations,
 * property photos, gradients, and UI elements
 */

// Onboarding and user interface images
import onboarding from "@/assets/images/onboarding.png"; // Welcome screen illustration
import avatar from "@/assets/images/avatar.png"; // Default user avatar
import noResult from "@/assets/images/no-result.png"; // Empty state illustration

// Property and location images
import newYork from "@/assets/images/new-york.png"; // New York property image
import japan from "@/assets/images/japan.png"; // Japan property image
import map from "@/assets/images/map.png"; // Map view image

// UI enhancement images
import cardGradient from "@/assets/images/card-gradient.png"; // Card overlay gradient
import whiteGradient from "@/assets/images/white-gradient.png"; // White gradient overlay
import barChart from "@/assets/images/bar-chart.png"; // Statistics chart image

/**
 * Default export object containing all images for easy import
 * Usage: import images from "@/constants/images"; then images.onboarding, images.avatar, etc.
 * Images are organized by usage context for better maintenance
 */
export default {
  // Onboarding & UI
  onboarding,
  avatar,
  noResult,

  // Properties & Locations
  newYork,
  japan,
  map,

  // Visual Enhancements
  cardGradient,
  whiteGradient,
  barChart,
};
