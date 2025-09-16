// Import app data and constants
import { settings } from "@/constants/data";
import icons from "@/constants/icons";
// Import authentication functions and global context
import { logout } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
import React from "react";
// React Native UI components
import {
  Alert,
  Image,
  ImageSourcePropType,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Type definition for settings item properties
interface SettingsItemProps {
  icon: ImageSourcePropType; // Icon image source
  title: string; // Display text
  onPress?: () => void; // Optional tap handler
  textStyle?: string; // Optional text styling
  showArrow?: boolean; // Whether to show right arrow
}

/**
 * Settings Item Component - Reusable row item for settings menu
 * Displays icon, title, and optional right arrow in a touchable row
 * @param {ImageSourcePropType} icon - Left icon image
 * @param {string} title - Item title text
 * @param {Function} onPress - Optional tap handler
 * @param {string} textStyle - Optional additional text styling
 * @param {boolean} showArrow - Whether to show right arrow (default: true)
 */
const SettingsItem = ({
  icon,
  title,
  onPress,
  textStyle,
  showArrow = true,
}: SettingsItemProps) => (
  <TouchableOpacity
    onPress={onPress}
    className="flex flex-row items-center justify-between py-3"
  >
    {/* Left side - icon and title */}
    <View className="flex flex-row items-center gap-3">
      {/* Settings item icon */}
      <Image source={icon} className="size-6" />
      {/* Settings item title with optional custom styling */}
      <Text
        className={`text-lg font-rubik-medium text-black-300
      ${textStyle}`}
      >
        {title}
      </Text>
    </View>

    {/* Right arrow - shown by default unless explicitly hidden */}
    {showArrow && <Image source={icons.rightArrow} className="size-5" />}
  </TouchableOpacity>
);

/**
 * Profile Screen Component - User profile and settings screen
 * Displays user information, avatar, and settings menu with logout functionality
 * Accessible via the Profile tab in bottom navigation
 */
const Profile = () => {
  // Get current user data and refetch function from global context
  const { user, refetch } = useGlobalContext();

  /**
   * Handles user logout process
   * Shows success/error alerts and refreshes auth state
   */
  const handleLogout = async () => {
    // Attempt to logout from Appwrite
    const result = await logout();

    if (result) {
      // Show success message and refresh authentication state
      Alert.alert("Success", "You have been logged out successfully");
      refetch(); // This will trigger redirect to sign-in screen
    } else {
      // Show error message if logout failed
      Alert.alert("Error", "An error occurred while logging out");
    }
  };

  return (
    <SafeAreaView className="h-full bg-white">
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerClassName="pb-32 px-7"
      >
        {/* Profile header with title and notification bell */}
        <View className="flex flex-row items-center justify-between mt-5">
          <Text className="text-xl font-rubik-bold">Profile</Text>
          <Image source={icons.bell} className="size-5" />
        </View>

        {/* User avatar and name section */}
        <View className="flex-row justify-center flex mt-5">
          <View className="flex flex-col items-center relative mt-5">
            {/* User avatar image from Appwrite-generated URL */}
            <Image
              source={{ uri: user?.avatar }}
              className="size-44 relative rounded-full"
            />

            {/* Edit profile picture button (positioned absolutely) */}
            <TouchableOpacity className="absolute bottom-11 right-2">
              <Image source={icons.edit} className="size-9" />
            </TouchableOpacity>

            {/* User display name */}
            <Text className="text-2xl font-rubik-bold mt-2">{user?.name}</Text>
          </View>
        </View>

        {/* Primary settings section - Bookings and Payments */}
        <View className="flex flex-col mt-10">
          <SettingsItem icon={icons.calendar} title="My Bookings" />
          <SettingsItem icon={icons.wallet} title="Payments" />
        </View>

        {/* General settings section - using data from constants */}
        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          {/* Render settings items starting from index 2 (skipping first two) */}
          {settings.slice(2).map((item, index) => (
            <SettingsItem key={index} {...item} />
          ))}
        </View>

        {/* Logout section - separated with border */}
        <View className="flex flex-col mt-5 border-t pt-5 border-primary-200">
          <SettingsItem
            icon={icons.logout}
            title="Logout"
            textStyle="text-danger" // Red text color for logout
            showArrow={false} // No right arrow for logout
            onPress={handleLogout} // Handle logout on press
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
