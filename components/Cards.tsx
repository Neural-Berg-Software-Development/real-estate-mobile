// Import app constants
import icons from "@/constants/icons";
import images from "@/constants/images";
import React from "react";
// React Native UI components
import { Image, Text, TouchableOpacity, View } from "react-native";

// Props interface for card components
interface Props {
  onPress?: () => void; // Optional tap handler
}

/**
 * Featured Card Component - Large property card for featured listings
 * Displays property image, rating, title, location, price, and heart icon
 * Uses gradient overlay for text readability over images
 * Currently shows hardcoded data - should be made dynamic with property data
 * @param {Function} onPress - Optional callback when card is tapped
 */
export const FeaturedCard = ({ onPress }: Props) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="flex flex-col items-start w-60 h-80 relative"
    >
      {/* Background property image */}
      <Image source={images.japan} className="size-full rounded-2xl" />

      {/* Gradient overlay for text readability */}
      <Image
        source={images.cardGradient}
        className="size-full rounded-2xl absolute bottom-0"
      />

      {/* Rating badge positioned at top right */}
      <View className="flex flex-row items-center bg-white/90 px-3 py-1.5 rounded-full absolute top-5 right-5">
        <Image source={icons.star} className="size-3.5" />
        <Text className="text-xs font-rubik-bold text-primary-300 ml-1">
          4.4
        </Text>
      </View>

      {/* Property details positioned at bottom */}
      <View className=" flex flex-col items-start absolute bottom-5 inset-x-5">
        {/* Property title - truncated to one line */}
        <Text
          className="text-xl font-rubik-extrabold text-white"
          numberOfLines={1}
        >
          Modern Apartment
        </Text>

        {/* Property location */}
        <Text className="text-base font-rubik text-white">
          22 W 15th St, New York
        </Text>

        {/* Price and heart icon row */}
        <View className="flex flex-row items-center justify-between w-full">
          <Text className="text-xl font-rubik-extrabold text-white">$2500</Text>
          {/* Heart icon for favorites - currently inactive */}
          <Image source={icons.heart} className="size-5" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

/**
 * Regular Card Component - Standard property card for general listings
 * Currently a placeholder implementation showing only basic text
 * Future implementation should include:
 * - Property image
 * - Property title, location, and price
 * - Property rating and amenities
 * - Compact layout for list views
 * - Touch handling for navigation to property details
 */
export const Card = () => {
  return (
    <View>
      {/* Placeholder text - to be replaced with full card implementation */}
      <Text>Card</Text>
    </View>
  );
};
