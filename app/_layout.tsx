// Import global authentication provider
import GlobalProvider from "@/lib/global-provider";
// Expo utilities for font loading and splash screen management
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
// React hook for side effects
import { useEffect } from "react";
// Import global CSS styles (Tailwind/NativeWind)
import "./global.css";

// Prevent the splash screen from auto-hiding before fonts load
SplashScreen.preventAutoHideAsync();

/**
 * Root Layout Component - Main app wrapper that provides global context and font loading
 * Handles splash screen management and wraps all app screens with authentication context
 */
export default function RootLayout() {
  // Load custom Rubik font family with different weights
  const [fontsLoaded] = useFonts({
    "Rubik-Bold": require("../assets/fonts/Rubik-Bold.ttf"),
    "Rubik-ExtraBold": require("../assets/fonts/Rubik-ExtraBold.ttf"),
    "Rubik-Light": require("../assets/fonts/Rubik-Light.ttf"),
    "Rubik-Medium": require("../assets/fonts/Rubik-Medium.ttf"),
    "Rubik-Regular": require("../assets/fonts/Rubik-Regular.ttf"),
    "Rubik-SemiBold": require("../assets/fonts/Rubik-SemiBold.ttf"),
  });

  // Hide splash screen once fonts are loaded
  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  // Show nothing (keep splash screen) while fonts are loading
  if (!fontsLoaded) {
    return null; // Keep showing splash screen while fonts load
  }

  return (
    // Wrap entire app with global authentication context
    <GlobalProvider>
      {/* Stack navigator without headers (handled by individual screens) */}
      <Stack screenOptions={{ headerShown: false }} />
    </GlobalProvider>
  );
}
