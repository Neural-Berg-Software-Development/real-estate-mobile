// Import app constants
import icons from "@/constants/icons";
// Expo Router hooks for navigation and route parameters
import { router, useLocalSearchParams, usePathname } from "expo-router";
import React, { useState } from "react";
// React Native UI components
import { Image, TextInput, TouchableOpacity, View } from "react-native";
// Debounce hook for search optimization
import { useDebouncedCallback } from "use-debounce";

/**
 * Search Component - Reusable search input with debounced search functionality
 * Features search icon, text input, and filter button
 * Updates URL parameters with search query for state persistence
 * Used in the home screen for property search
 */
const Search = () => {
  // Get current route path and search parameters
  const path = usePathname();
  const params = useLocalSearchParams<{ query?: string }>();

  // Initialize search state with existing query parameter (empty string if none)
  const [search, setSearch] = useState(params.query ?? "");

  // Debounced callback to update URL parameters after user stops typing
  // 500ms delay prevents excessive URL updates while typing
  const debouncedSearch = useDebouncedCallback(
    (text: string) => router.setParams({ query: text }),
    500
  );

  /**
   * Handles search input changes
   * Updates local state immediately and triggers debounced URL update
   * @param {string} text - Current search input value
   */
  const handleSearch = (text: string) => {
    setSearch(text); // Update UI immediately
    debouncedSearch(text); // Update URL params after delay
  };

  return (
    {/* Search container with light background and border */}
    <View
      className="flex flex-row items-center justify-between w-full px-4 rounded-lg
     bg-accent-100 border border-primary-100 mt-5 py-2"
    >
      {/* Search input section - flex-1 to take remaining space */}
      <View className="flex-1 flex flex-row items-center justify-start z-50">
        {/* Search icon */}
        <Image source={icons.search} className="size-5" />

        {/* Text input with search functionality */}
        <TextInput
          value={search}
          onChangeText={handleSearch}
          placeholder="Search for anything"
          className="text-sm font-rubik text-black-300 ml-2 flex-1"
          textAlignVertical="center" // Keeps text aligned with icon
          // @ts-ignore - Android-specific prop to fix padding issues
          includeFontPadding={false} // Fixes Android baseline padding
        />
      </View>

      {/* Filter button - currently inactive but ready for implementation */}
      <TouchableOpacity>
        <Image source={icons.filter} className="size-5" />
      </TouchableOpacity>
    </View>
  );
};

export default Search;
