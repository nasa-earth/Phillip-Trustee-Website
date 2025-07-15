// stores/auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
  }),

  getters: {
    isAdmin: (state) => state.user?.role === "ADMIN",
    isEditor: (state) => state.user?.role === "EDITOR",
    hasAdminAccess: (state) =>
      state.user?.role === "ADMIN" || state.user?.role === "EDITOR",
    userRole: (state) => state.user?.role,
    userName: (state) => state.user?.name,
    userEmail: (state) => state.user?.email,
    isReady: (state) => !state.isLoading,
  },

  actions: {
    setUser(user) {
      this.user = user;
    },

    setTokens(accessToken, refreshToken) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.isAuthenticated = !!accessToken;

      if (typeof window !== "undefined") {
        localStorage.setItem("access_token", accessToken);
        localStorage.setItem("refresh_token", refreshToken);
        localStorage.setItem("user", JSON.stringify(this.user));
      }
    },

    clearAuth() {
      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;
      this.isAuthenticated = false;
      this.isLoading = false;

      if (typeof window !== "undefined") {
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        localStorage.removeItem("user");
      }
    },
    async login(email, password) {
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
        let responseData = data;
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
          user: this.user,
          isAuthenticated: this.isAuthenticated,
        };
      } catch (error) {
        console.error("Login error:", error);
        this.clearAuth();
        return {
          success: false,
          error: error.message || "An error occurred during login",
        };
      } finally {
        this.isLoading = false;
      }
    },
    async refreshAccessToken() {
      if (!this.refreshToken) {
        console.log("No refresh token available");
        return false;
      }

      try {
        console.log("Attempting to refresh access token...");
        const config = useRuntimeConfig();
        const response = await fetch(
          `${config.public.apiBase}/api/auth/refresh`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ refresh_token: this.refreshToken }),
          }
        );

        console.log("Refresh response status:", response.status);

        if (!response.ok) {
          console.log("Token refresh failed, logging out");
          this.logout();
          return false;
        }

        const data = await response.json();
        console.log("Token refresh successful");

        // Handle NestJS TransformInterceptor response format
        let responseData = data;
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
          console.log("Tokens updated successfully");
          return true;
        }

        console.log("Invalid response structure from refresh");
        this.logout();
        return false;
      } catch (error) {
        console.error("Token refresh error:", error);
        this.logout();
        return false;
      }
    },

    async logout() {
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

    async initFromStorage() {
      if (typeof window !== "undefined") {
        this.isLoading = true;

        try {
          const accessToken = localStorage.getItem("access_token");
          const refreshToken = localStorage.getItem("refresh_token");
          const userStr = localStorage.getItem("user");

          if (accessToken && refreshToken && userStr) {
            const userData = JSON.parse(userStr);

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
