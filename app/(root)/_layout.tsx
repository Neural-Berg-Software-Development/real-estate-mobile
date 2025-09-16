// React Native components for loading indicator and safe area
import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import global authentication context hook
import { useGlobalContext } from "@/lib/global-provider";
// Expo Router components for navigation and slot rendering
import { Redirect, Slot } from "expo-router";

/**
 * App Layout Component - Authentication guard for protected routes
 * Shows loading spinner while checking auth, redirects to sign-in if not authenticated
 * Renders child routes if user is authenticated
 */
export default function AppLayout() {
  // Get authentication state from global context
  const { loading, isLoggedIn } = useGlobalContext();

  // Show loading spinner while checking authentication status
  if (loading) {
    return (
      <SafeAreaView className="bg-white h-full flex justify-center items-center">
        {/* Loading spinner with primary color */}
        <ActivityIndicator className="text-primary-300" size="large" />
      </SafeAreaView>
    );
  }

  // Redirect to sign-in screen if user is not authenticated
  if (!isLoggedIn) return <Redirect href="/sign-in" />;

  // Render child routes if user is authenticated
  return <Slot />;
}
