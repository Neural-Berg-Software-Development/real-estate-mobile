// Import custom card components
import { Card, FeaturedCard } from "@/components/Cards";
// Import search component
import Search from "@/components/Search";
// Import app constants
import icons from "@/constants/icons";
import images from "@/constants/images";
// React Native UI components
import { Image, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Home Screen Component - Main app dashboard showing user greeting, search, and property listings
 * Features user avatar, greeting message, search functionality, and property cards
 * This is the default tab screen (index) that users see when authenticated
 */
export default function Index() {
  return (
    <SafeAreaView className="bg-white h-full">
      {/* Main content container with horizontal padding */}
      <View className="px-5">
        {/* Header section with user info and notifications */}
        <View className="flex flex-row items-center justify-between mt-5">
          {/* User greeting section with avatar and text */}
          <View className="flex flex-row items-center">
            {/* User avatar - circular image */}
            <Image source={images.avatar} className="size-12 rounded-full" />
            {/* Greeting text container */}
            <View className="flex flex-col items-start ml-2 justify-center">
              {/* Time-based greeting */}
              <Text className="text-xs font-rubik text-black-100">
                Good Morning
              </Text>
              {/* User name - hardcoded for now */}
              <Text className="text-base font-rubik-medium text-black-300">
                Adrian
              </Text>
            </View>
          </View>
          {/* Notification bell icon */}
          <Image source={icons.bell} className="size-6" />
        </View>

        {/* Search component for property search */}
        <Search />

        {/* Featured section header */}
        <View className="my-5">
          <View className="flex flex-row items-center justify-between">
            {/* Section title */}
            <Text className="text-xl font-rubik-bold text-black-300">
              Featured
            </Text>
            {/* See all button - currently inactive */}
            <TouchableOpacity>
              <Text className="text-base font-rubik-bold text-primary-300">
                See All
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Property cards display */}
        <FeaturedCard />
        <Card />
      </View>
    </SafeAreaView>
  );
}
