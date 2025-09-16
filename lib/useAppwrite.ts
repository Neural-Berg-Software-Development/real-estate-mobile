// React hooks for state management and side effects
import { useCallback, useEffect, useState } from "react";
import { Alert } from "react-native";

// Type definition for hook configuration options
interface UseAppwriteOptions<T, P extends Record<string, string | number>> {
  fn: (params: P) => Promise<T>; // Async function to execute (API call)
  params?: P; // Parameters to pass to the function
  skip?: boolean; // Whether to skip initial execution
}

// Type definition for hook return values
interface UseAppwriteReturn<T, P> {
  data: T | null; // The fetched data or null
  loading: boolean; // Loading state indicator
  error: string | null; // Error message or null
  refetch: (newParams: P) => Promise<void>; // Function to refetch data
}

/**
 * Custom React hook for managing Appwrite API calls with built-in state handling
 * Provides loading states, error handling, and refetch functionality
 * @param {Function} fn - The async function to execute (API call)
 * @param {Object} params - Default parameters to pass to the function
 * @param {boolean} skip - Whether to skip the initial API call
 * @returns {Object} Hook state including data, loading, error, and refetch function
 */
export const useAppwrite = <T, P extends Record<string, string | number>>({
  fn, // The asynchronous function to fetch data
  params = {} as P, // Default fetch parameters (empty object if not provided)
  skip = false, // Skip initial execution if true
}: UseAppwriteOptions<T, P>): UseAppwriteReturn<T, P> => {
  // State management for API call results
  const [data, setData] = useState<T | null>(null); // Stores fetched data
  const [loading, setLoading] = useState(!skip); // Loading state (true unless skipped)
  const [error, setError] = useState<string | null>(null); // Error state

  /**
   * Memoized function to fetch data and handle states
   * Sets loading to true, clears errors, then executes the API call
   */
  const fetchData = useCallback(
    async (fetchParams: P) => {
      setLoading(true); // Start loading
      setError(null); // Clear previous errors

      try {
        // Execute the provided async function with parameters
        const result = await fn(fetchParams);
        setData(result); // Store successful result
      } catch (err: unknown) {
        // Handle and format error messages
        const errorMessage =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(errorMessage); // Store error in state
        Alert.alert("Error", errorMessage); // Show user-facing error
      } finally {
        setLoading(false); // Always stop loading
      }
    },
    [fn] // Recreate only if the function reference changes
  );

  // Automatically fetch data on component mount, unless 'skip' is true
  useEffect(() => {
    if (!skip) {
      fetchData(params);
    }
  }, []); // Empty dependency array - run only on mount

  // Refetch function allows manual data fetching with new parameters
  const refetch = async (newParams: P) => await fetchData(newParams);

  // Return all state values and refetch function
  return { data, loading, error, refetch };
};
