/**
 * Icons Constants - Centralized icon imports for the application
 * Contains all icon assets used throughout the app for consistency
 * Icons are organized by category: authentication, navigation, actions, amenities, etc.
 */

// Authentication and social icons
import google from "@/assets/icons/google.png";

// Navigation and tab icons
import home from "@/assets/icons/home.png";
import search from "@/assets/icons/search.png";
import person from "@/assets/icons/person.png";

// Action and interface icons
import bell from "@/assets/icons/bell.png";
import filter from "@/assets/icons/filter.png";
import star from "@/assets/icons/star.png";
import heart from "@/assets/icons/heart.png";
import backArrow from "@/assets/icons/back-arrow.png";
import rightArrow from "@/assets/icons/right-arrow.png";
import send from "@/assets/icons/send.png";
import edit from "@/assets/icons/edit.png";

// Settings and profile icons
import calendar from "@/assets/icons/calendar.png";
import info from "@/assets/icons/info.png";
import language from "@/assets/icons/language.png";
import logout from "@/assets/icons/logout.png";
import people from "@/assets/icons/people.png";
import shield from "@/assets/icons/shield.png";
import wallet from "@/assets/icons/wallet.png";

// Property detail icons
import bed from "@/assets/icons/bed.png";
import bath from "@/assets/icons/bath.png";
import area from "@/assets/icons/area.png";
import location from "@/assets/icons/location.png";

// Communication icons
import chat from "@/assets/icons/chat.png";
import phone from "@/assets/icons/phone.png";

// Amenity and facility icons
import carPark from "@/assets/icons/car-park.png";
import cutlery from "@/assets/icons/cutlery.png";
import dog from "@/assets/icons/dog.png";
import dumbell from "@/assets/icons/dumbell.png";
import laundry from "@/assets/icons/laundry.png";
import run from "@/assets/icons/run.png";
import swim from "@/assets/icons/swim.png";
import wifi from "@/assets/icons/wifi.png";

/**
 * Default export object containing all icons for easy import
 * Usage: import icons from "@/constants/icons"; then icons.home, icons.search, etc.
 * Icons are grouped logically for better organization and maintenance
 */
export default {
  // Authentication & Social
  google,

  // Navigation & Tabs
  home,
  search,
  person,

  // Actions & Interface
  bell,
  filter,
  star,
  heart,
  backArrow,
  rightArrow,
  send,
  edit,

  // Settings & Profile
  calendar,
  info,
  language,
  logout,
  people,
  shield,
  wallet,

  // Property Details
  bed,
  bath,
  area,
  location,

  // Communication
  chat,
  phone,

  // Amenities & Facilities
  carPark,
  cutlery,
  dog,
  dumbell,
  laundry,
  run,
  swim,
  wifi,
};
