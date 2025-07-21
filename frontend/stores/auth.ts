// stores/auth.ts
import { defineStore } from "pinia";

// Types for better type safety
export interface User {
  id: string;
  email: string;
  name: string;
  role: "ADMIN" | "EDITOR" | "USER";
  createdAt?: string;
  updatedAt?: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface AuthResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

export interface LoginResult {
  success: boolean;
  user?: User;
  isAuthenticated?: boolean;
  error?: string;
}

export const useAuthStore = defineStore("auth", {
  state: (): AuthState => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
  }),

  getters: {
    isAdmin: (state): boolean => state.user?.role === "ADMIN",
    isEditor: (state): boolean => state.user?.role === "EDITOR",
    hasAdminAccess: (state): boolean =>
      state.user?.role === "ADMIN" || state.user?.role === "EDITOR",
    userRole: (state): string | undefined => state.user?.role,
    userName: (state): string | undefined => state.user?.name,
    userEmail: (state): string | undefined => state.user?.email,
    isReady: (state): boolean => !state.isLoading,
  },

  actions: {
    setUser(user: User): void {
      this.user = user;
    },

    setTokens(accessToken: string, refreshToken: string): void {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.isAuthenticated = !!accessToken;

      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        localStorage.setItem("user", JSON.stringify(this.user));
      }
    },

    clearAuth(): void {
      console.log("Clearing authentication state...");
      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;
      this.isAuthenticated = false;
      this.isLoading = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
        console.log("🧹 Cleared localStorage tokens");
      }
    },

    // Force clear all auth data and redirect to login
    forceLogout(): void {
      console.log("🔄 Force logout - clearing all authentication data");
      this.clearAuth();

      // Clear any additional storage items that might exist
      if (typeof window !== "undefined") {
        // Clear any other auth-related items
        Object.keys(localStorage).forEach((key) => {
          if (
            key.includes("token") ||
            key.includes("auth") ||
            key.includes("user")
          ) {
            localStorage.removeItem(key);
            console.log(`🧹 Removed localStorage item: ${key}`);
          }
        });

        // Force redirect to login
        window.location.href = "/login";
      }
    },

    async login(email: string, password: string): Promise<LoginResult> {
      this.isLoading = true;
      try {
        console.log("Auth store login attempt:", { email });

        const config = useRuntimeConfig();
        const response = await fetch(
          `${config.public.apiBase}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          }
        );

        console.log("Login response status:", response.status);

        if (!response.ok) {
          let errorMessage = "Login failed";
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch (e) {
            errorMessage = `HTTP ${response.status}: ${response.statusText}`;
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();
        console.log("Login successful:", {
          user: data.user,
          hasAccessToken: !!data.access_token,
          hasRefreshToken: !!data.refresh_token,
        });

        // Handle NestJS response format
        let responseData: AuthResponse = data;
        if (data.data && typeof data.data === "object") {
          responseData = data.data;
        }

        // Validate response structure
        if (
          !responseData.user ||
          !responseData.access_token ||
          !responseData.refresh_token
        ) {
          throw new Error("Invalid response format from server");
        }

        // Check user permissions
        if (
          !responseData.user.role ||
          !["ADMIN", "EDITOR"].includes(responseData.user.role)
        ) {
          throw new Error(
            "Access denied. Only administrators and editors can access the dashboard."
          );
        }

        // Set user and tokens
        this.setUser(responseData.user);
        this.setTokens(responseData.access_token, responseData.refresh_token);

        console.log("Authentication successful, tokens stored");

        return {
          success: true,
          user: this.user!,
          isAuthenticated: this.isAuthenticated,
        };
      } catch (error) {
        console.error("Login error:", error);
        this.clearAuth();
        return {
          success: false,
          error: (error as Error).message || "An error occurred during login",
        };
      } finally {
        this.isLoading = false;
      }
    },

    async refreshAccessToken(): Promise<boolean> {
      if (!this.refreshToken) {
        console.error("❌ No refresh token available");
        console.error(
          "❌ localStorage refresh_token:",
          localStorage.getItem("refresh_token")
        );
        return false;
      }

      try {
        console.log("🔄 Attempting to refresh access token...");
        console.log(
          "🔄 Using refresh token:",
          this.refreshToken.substring(0, 20) + "..."
        );

        const config = useRuntimeConfig();
        const refreshUrl = `${config.public.apiBase}/api/auth/refresh`;
        console.log("🔄 Refresh URL:", refreshUrl);

        const response = await fetch(refreshUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh_token: this.refreshToken }),
        });

        console.log("📥 Refresh response status:", response.status);
        console.log(
          "📥 Refresh response headers:",
          Object.fromEntries(response.headers.entries())
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error("❌ Token refresh failed:", response.status, errorText);

          try {
            const errorData = JSON.parse(errorText);
            console.error("❌ Refresh error details:", errorData);
          } catch (e) {
            console.error("❌ Could not parse error response");
          }

          // Clear auth and redirect to login
          console.log("❌ Clearing authentication due to refresh failure");
          this.clearAuth();

          // Force redirect to login page
          if (typeof window !== "undefined") {
            window.location.href = "/login";
          }

          return false;
        }

        const data = await response.json();
        console.log("✅ Token refresh successful:", {
          hasUser: !!data.user,
          hasAccessToken: !!data.access_token,
          hasRefreshToken: !!data.refresh_token,
          dataStructure: Object.keys(data),
          newTokenPreview: data.access_token
            ? data.access_token.substring(0, 20) + "..."
            : "NO TOKEN",
        });

        // Handle NestJS TransformInterceptor response format
        let responseData: AuthResponse = data;
        if (data.data && typeof data.data === "object") {
          responseData = data.data;
        }

        // Validate response structure
        if (
          responseData.user &&
          responseData.access_token &&
          responseData.refresh_token
        ) {
          this.setUser(responseData.user);
          this.setTokens(responseData.access_token, responseData.refresh_token);
          console.log(
            "✅ Tokens updated successfully, new token length:",
            responseData.access_token.length
          );
          return true;
        }

        console.log(
          "❌ Invalid response structure from refresh, clearing auth"
        );
        this.clearAuth();

        // Force redirect to login page
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return false;
      } catch (error) {
        console.error("❌ Token refresh error:", error);
        this.clearAuth();

        // Force redirect to login page
        if (typeof window !== "undefined") {
          window.location.href = "/login";
        }

        return false;
      }
    },

    async logout(): Promise<void> {
      this.isLoading = true;

      // Try to call backend logout endpoint if we have a refresh token
      if (this.refreshToken) {
        try {
          const apiUrl = useApiUrl();
          await fetch(apiUrl.auth.logout, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh_token: this.refreshToken }),
          });
        } catch (error) {
          console.error("Error during logout:", error);
          // Continue with local logout even if backend call fails
        }
      }

      this.clearAuth();
    },

    async initFromStorage(): Promise<void> {
      if (typeof window !== "undefined") {
        this.isLoading = true;

        try {
          const accessToken = localStorage.getItem("access_token");
          const refreshToken = localStorage.getItem("refresh_token");
          const userStr = localStorage.getItem("user");

          if (accessToken && refreshToken && userStr) {
            const userData: User = JSON.parse(userStr);

            // Validate user has required permissions
            if (userData && ["ADMIN", "EDITOR"].includes(userData.role)) {
              this.accessToken = accessToken;
              this.refreshToken = refreshToken;
              this.user = userData;
              this.isAuthenticated = true;

              console.log("Auth restored from storage:", {
                user: userData.email,
                role: userData.role,
                hasToken: !!accessToken,
              });
            } else {
              console.warn(
                "User doesn't have required permissions, clearing auth"
              );
              this.clearAuth();
            }
          } else {
            console.log("No auth data found in storage");
            this.clearAuth();
          }
        } catch (e) {
          console.error("Error restoring auth from storage:", e);
          this.clearAuth();
        } finally {
          this.isLoading = false;
        }
      }
    },
  },
});
