// Import app constants for icons and images
import icons from "@/constants/icons";
import images from "@/constants/images";
// Import authentication functions and global context
import { login } from "@/lib/appwrite";
import { useGlobalContext } from "@/lib/global-provider";
// Expo Router for navigation
import { Redirect } from "expo-router";
import React from "react";
// React Native UI components
import {
  Alert,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

/**
 * Sign In Screen Component - User authentication screen with Google OAuth
 * Displays welcome message, onboarding image, and Google sign-in button
 * Redirects to home if user is already authenticated
 */
const SignIn = () => {
  // Get authentication state and refetch function from global context
  const { refetch, loading, isLoggedIn } = useGlobalContext();

  // Redirect to home if user is already logged in (and not loading)
  if (!loading && isLoggedIn) return <Redirect href="/" />;

  /**
   * Handles Google OAuth login process
   * Shows success message and refreshes auth state on successful login
   * Shows error alert if login fails
   */
  const handleLogin = async () => {
    // Attempt to log in using Google OAuth
    const result = await login();

    if (result) {
      // Refresh authentication state after successful login
      refetch();
    } else {
      // Show error message if login failed
      Alert.alert("Error", "Failed to login");
    }
  };

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        {/* Onboarding illustration - takes up 2/3 of screen height */}
        <Image
          source={images.onboarding}
          className="w-full h-4/6"
          resizeMode="contain"
        />
        {/* Content container with horizontal padding */}
        <View className="px-10">
          {/* Welcome message - small uppercase text */}
          <Text className="text-base text-center uppercase font-rubik text-black-200">
            Welcome to RealEstate
          </Text>

          {/* Main headline with line break and highlighted text */}
          <Text className="text-3xl font-rubik-bold text-black-300 text-center mt-2">
            Let's Get You Closer to {"\n"}
            <Text className="text-primary-300"> Your Ideal Home</Text>
          </Text>

          {/* Login instruction text */}
          <Text className="text-lg font-rubik text-black-200 text-center mt-12">
            Login to RealEstate with Google
          </Text>

          {/* Google Sign-In Button with shadow effect */}
          <TouchableOpacity
            onPress={handleLogin}
            className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 mt-5"
          >
            {/* Button content - Google icon and text */}
            <View className="flex flex-row items-center justify-center">
              <Image
                source={icons.google}
                className="w-5 h-5"
                resizeMode="contain"
              />
              <Text className="text-lg font-rubik-medium text-black-300 ml-2">
                Continue with Google
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
