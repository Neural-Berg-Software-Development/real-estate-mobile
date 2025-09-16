// Expo Router tab navigation component
import { Tabs } from "expo-router";
// React Native components for UI rendering
import { Image, ImageSourcePropType, Text, View } from "react-native";

// Import icon constants
import icons from "@/constants/icons";

/**
 * Tab Icon Component - Custom tab bar icon with title
 * Changes color and font weight based on focus state
 * @param {boolean} focused - Whether this tab is currently active
 * @param {ImageSourcePropType} icon - Icon image source
 * @param {string} title - Tab title text
 */
const TabIcon = ({
  focused,
  icon,
  title,
}: {
  focused: boolean;
  icon: ImageSourcePropType;
  title: string;
}) => (
  <View className="flex-1 mt-3 flex flex-col items-center">
    {/* Tab icon with dynamic tint color based on focus */}
    <Image
      source={icon}
      tintColor={focused ? "#0061FF" : "#666876"} // Primary blue when focused, gray when not
      resizeMode="contain"
      className="size-6"
    />
    {/* Tab title with dynamic styling based on focus */}
    <Text
      className={`${
        focused
          ? "text-primary-300 font-rubik-medium" // Active: primary color, medium font
          : "text-black-200 font-rubik" // Inactive: gray color, regular font
      } text-xs w-full text-center mt-1`}
    >
      {title}
    </Text>
  </View>
);

/**
 * Tabs Layout Component - Bottom tab navigator for main app screens
 * Configures tab bar styling and defines three main tabs: Home, Explore, Profile
 */
const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false, // Hide default labels (using custom TabIcon)
        tabBarStyle: {
          backgroundColor: "white", // White background
          position: "absolute", // Float above content
          borderTopColor: "#0061FF1A", // Light primary color border
          borderTopWidth: 1, // Thin top border
          minHeight: 70, // Adequate height for custom icons
        },
      }}
    >
      {/* Home Tab - Main property feed and search */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerShown: false, // No header (handled by screen itself)
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.home} title="Home" />
          ),
        }}
      />
      {/* Explore Tab - Property search and discovery */}
      <Tabs.Screen
        name="explore"
        options={{
          title: "Explore",
          headerShown: false, // No header (handled by screen itself)
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.search} title="Explore" />
          ),
        }}
      />
      {/* Profile Tab - User settings and preferences */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          headerShown: false, // No header (handled by screen itself)
          tabBarIcon: ({ focused }) => (
            <TabIcon focused={focused} icon={icons.person} title="Profile" />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
