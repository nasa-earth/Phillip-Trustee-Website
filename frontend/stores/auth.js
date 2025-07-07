// stores/auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  }),

  getters: {
    isAdmin: (state) => state.user?.role === "ADMIN",
    isEditor: (state) => state.user?.role === "EDITOR",
    userRole: (state) => state.user?.role,
    userName: (state) => state.user?.name,
    userEmail: (state) => state.user?.email,
  },

  actions: {
    setUser(user) {
      this.user = user;
    },

    setTokens(accessToken, refreshToken) {
      this.accessToken = accessToken;
      this.refreshToken = refreshToken;
      this.isAuthenticated = !!accessToken;

      localStorage.setItem("access_token", accessToken);
      localStorage.setItem("refresh_token", refreshToken);
      localStorage.setItem("user", JSON.stringify(this.user));
    },
    async login(email, password) {
      try {
        const apiUrl = useApiUrl();

        const response = await fetch(apiUrl.auth.login, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
          let errorMessage = `Login failed with status: ${response.status}`;
          try {
            const errorData = await response.json();
            errorMessage = errorData.message || errorMessage;
          } catch (e) {
            // If error response isn't JSON, use status message
          }
          throw new Error(errorMessage);
        }

        const data = await response.json();

        // Handle NestJS TransformInterceptor response format
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
          throw new Error(
            "Invalid response format: missing user data or tokens"
          );
        }

        // Set user and tokens
        this.setUser(responseData.user);
        this.setTokens(responseData.access_token, responseData.refresh_token);

        return {
          success: true,
          user: this.user,
          isAuthenticated: this.isAuthenticated,
        };
      } catch (error) {
        console.error("Login error:", error);
        return {
          success: false,
          error: error.message || "An error occurred during login",
        };
      }
    },
    async refreshAccessToken() {
      if (!this.refreshToken) return false;

      try {
        const apiUrl = useApiUrl();
        const response = await fetch(apiUrl.auth.refresh, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ refresh_token: this.refreshToken }),
        });

        if (!response.ok) {
          this.logout();
          return false;
        }

        const data = await response.json();

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
          return true;
        }

        this.logout();
        return false;
      } catch (error) {
        console.error("Token refresh error:", error);
        this.logout();
        return false;
      }
    },

    async logout() {
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

      // Clear local state
      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;
      this.isAuthenticated = false;

      // Clear localStorage
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
    },
    initFromStorage() {
      if (typeof window !== "undefined") {
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");
        const userStr = localStorage.getItem("user");

        if (accessToken && refreshToken && userStr) {
          try {
            const userData = JSON.parse(userStr);

            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            this.user = userData;
            this.isAuthenticated = true;
          } catch (e) {
            console.error("Error restoring auth from storage:", e);
            this.logout();
          }
        }
      }
    },
  },
});
