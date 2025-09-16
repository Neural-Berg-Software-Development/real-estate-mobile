// Expo modules for deep linking and web browser functionality
import * as Linking from "expo-linking";
import * as WebBrowser from "expo-web-browser";
// Appwrite SDK imports for authentication and avatar services
import { Account, Avatars, Client, OAuthProvider } from "react-native-appwrite";

// Appwrite configuration object containing platform identifier and environment variables
export const config = {
  platform: "com.issath.realestate", // Bundle identifier for the app
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT, // Appwrite server endpoint
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID, // Unique project identifier
};

// Initialize Appwrite client instance
export const client = new Client();

// Configure the client with endpoint, project ID, and platform
client
  .setEndpoint(config.endpoint!) // Set the Appwrite server URL
  .setProject(config.projectId!) // Set the project ID for API calls
  .setPlatform(config.platform!); // Set platform identifier for proper SDK behavior

// Initialize Appwrite services using the configured client
export const avatar = new Avatars(client); // Service for generating user avatars
export const account = new Account(client); // Service for user authentication and account management

/**
 * Handles user login using Google OAuth through Appwrite
 * Opens a web browser for OAuth flow, then creates a user session
 * @returns {Promise<boolean>} True if login successful, false otherwise
 */
export async function login() {
  try {
    // Create a deep link URL for OAuth redirect after authentication
    const redirectUri = Linking.createURL("/");

    // Initialize OAuth2 flow with Google provider
    const response = await account.createOAuth2Token(
      OAuthProvider.Google, // Use Google as OAuth provider
      redirectUri // Where to redirect after successful authentication
    );

    // Check if OAuth token creation was successful
    if (!response) throw new Error("Failed to login");

    // Open system browser for OAuth authentication flow
    const browserResult = await WebBrowser.openAuthSessionAsync(
      response.toString(), // OAuth URL from Appwrite
      redirectUri // Expected redirect URI after auth
    );

    // Verify that user completed the OAuth flow successfully
    if (browserResult.type !== "success") throw new Error("Failed to login");

    // Parse the callback URL to extract authentication parameters
    const url = new URL(browserResult.url);

    // Extract secret and userId from OAuth callback URL
    const secret = url.searchParams.get("secret")?.toString();
    const userId = url.searchParams.get("userId")?.toString();

    // Ensure required authentication parameters are present
    if (!secret || !userId) throw new Error("Failed to login");

    // Create user session using the OAuth credentials
    const session = await account.createSession(userId, secret);

    // Verify session creation was successful
    if (!session) throw new Error("Failed to create a session");

    return true; // Login successful
  } catch (error) {
    console.error(error); // Log error for debugging
    return false; // Login failed
  }
}

/**
 * Handles user logout by deleting the current session
 * @returns {Promise<boolean>} True if logout successful, false otherwise
 */
export async function logout() {
  try {
    // Delete the current active session from Appwrite
    await account.deleteSession("current");
    return true; // Logout successful
  } catch (error) {
    console.error(error); // Log error for debugging
    return false; // Logout failed
  }
}

/**
 * Retrieves the current authenticated user's information
 * Generates an avatar URL based on user's initials if user exists
 * @returns {Promise<Object|null>} User object with avatar URL or null if not authenticated
 */
export async function getCurrentUser() {
  try {
    // Fetch current user account information from Appwrite
    const response = await account.get();

    // Check if user data exists (has a valid ID)
    if (response.$id) {
      // Generate an avatar image URL using user's name initials
      const userAvatar = avatar.getInitials(response.name);

      // Return user data with generated avatar URL
      return {
        ...response, // Spread all user properties (name, email, $id, etc.)
        avatar: userAvatar.toString(), // Add avatar URL as string
      };
    }
  } catch (error) {
    console.error(error); // Log error for debugging
    return null; // Return null if user not authenticated or error occurred
  }
}
