// React imports for context creation and component types
import React, { ReactNode, createContext, useContext } from "react";

// Import authentication functions and custom hooks
import { getCurrentUser } from "./appwrite";
import { useAppwrite } from "./useAppwrite";

// Type definition for user data structure
interface User {
  $id: string; // Appwrite document ID
  name: string; // User's display name
  email: string; // User's email address
  avatar: string; // Generated avatar URL
}

// Type definition for global context values
interface GlobalContextType {
  isLoggedIn: boolean; // Authentication status
  user: User | null; // Current user data or null
  loading: boolean; // Loading state for user data
  refetch: (newParams?: Record<string, string | number>) => Promise<void>; // Function to refresh user data
}

// Create React context for global state management (undefined by default)
const GlobalContext = createContext<GlobalContextType | undefined>(undefined);

// Props type for GlobalProvider component
interface GlobalProviderProps {
  children: ReactNode; // Child components to wrap with context
}

/**
 * Global Provider component that wraps the app with authentication context
 * Fetches user data on mount and provides authentication state to all children
 * @param {ReactNode} children - Child components to provide context to
 */
export const GlobalProvider = ({ children }: { children: ReactNode }) => {
  // Use custom hook to manage user authentication state
  const {
    data: user, // Current user data (null if not authenticated)
    loading, // Loading state while fetching user
    refetch, // Function to refetch user data
  } = useAppwrite({
    fn: getCurrentUser, // Function to get current user from Appwrite
  });

  // Determine login status based on user data existence
  const isLoggedIn = !!user;
  // Boolean conversion examples:
  // !null = true => !true = false (not logged in)
  // !{user_object} = false => !false = true (logged in)

  // Uncomment for debugging user data:
  // console.log(JSON.stringify(user, null, 2));

  return (
    <GlobalContext.Provider
      value={{
        isLoggedIn, // Boolean authentication status
        user, // User object or null
        loading, // Loading state
        refetch, // Refetch function for updates
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

/**
 * Custom hook to access the global authentication context
 * Must be used within a GlobalProvider component tree
 * @returns {GlobalContextType} The global context values (user, loading, etc.)
 * @throws {Error} If used outside of GlobalProvider
 */
export const useGlobalContext = (): GlobalContextType => {
  // Get context value from GlobalContext
  const context = useContext(GlobalContext);

  // Throw error if hook is used outside of provider
  if (!context) {
    throw new Error("useGlobalContext must be used within a GlobalProvider");
  }

  return context; // Return context values
};

// Export GlobalProvider as default export
export default GlobalProvider;
