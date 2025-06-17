// stores/auth.js
import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: null,
    accessToken: null,
    refreshToken: null,
    isAuthenticated: false,
  }),

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
        console.log("Login URL:", apiUrl.auth.login);
        console.log("Login credentials:", { email });

        const response = await fetch(apiUrl.auth.login, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        console.log("Login response status:", response.status);

        // Check if the response is valid before trying to parse JSON
        if (!response.ok) {
          const errorText = await response.text();
          console.error("Error response text:", errorText);

          try {
            const errorData = JSON.parse(errorText);
            throw new Error(
              errorData.message ||
                `Login failed with status: ${response.status}`
            );
          } catch (e) {
            throw new Error(
              `Login failed with status: ${response.status}. Response was not valid JSON.`
            );
          }
        }

        // Get response as text first for debugging
        const responseText = await response.text();
        console.log("Raw response text:", responseText);

        // Try to parse as JSON
        let data;
        try {
          data = JSON.parse(responseText);
          console.log("Login response data:", data);
          console.log("Response data type:", typeof data);
          console.log("Response data keys:", Object.keys(data));
        } catch (e) {
          console.error("JSON parse error:", e);
          throw new Error("Invalid JSON response from server");
        }
        // Handle the TransformInterceptor's response wrapping
        if (data.data && typeof data.data === "object") {
          console.log(
            "Found data property, appears to be from TransformInterceptor"
          );
          data = data.data;
        }

        console.log("Processing data after transformation:", data);

        // Ensure the response has the required structure
        if (!data.user || !data.access_token || !data.refresh_token) {
          console.error("Invalid response format after transformation:", data);

          // Attempt to construct the expected structure from what we have
          if (data.id && data.email && data.role) {
            console.log(
              "Found user data in root object, restructuring response"
            );
            data = {
              user: {
                id: data.id,
                email: data.email,
                name: data.name || data.email.split("@")[0],
                role: data.role,
              },
              access_token: data.access_token || data.accessToken || data.token,
              refresh_token:
                data.refresh_token || data.refreshToken || data.token,
            };
          } else {
            throw new Error(
              "Invalid response format from server. Missing user data or tokens."
            );
          }
        }
        console.log("Setting user data:", data.user);
        console.log("Setting tokens:", {
          accessToken: !!data.access_token,
          refreshToken: !!data.refresh_token,
        });

        this.setUser(data.user);
        this.setTokens(data.access_token, data.refresh_token);

        console.log("Auth state after login:", {
          isAuthenticated: this.isAuthenticated,
          hasUser: !!this.user,
          role: this.user?.role,
        });

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

        const data = await response.json();

        if (!response.ok) {
          this.logout();
          return false;
        }

        this.setUser(data.user);
        this.setTokens(data.access_token, data.refresh_token);
        return true;
      } catch (error) {
        this.logout();
        return false;
      }
    },

    logout() {
      this.user = null;
      this.accessToken = null;
      this.refreshToken = null;
      this.isAuthenticated = false;

      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      localStorage.removeItem("user");
    },
    initFromStorage() {
      if (typeof window !== "undefined") {
        console.log("Initializing auth state from storage");
        const accessToken = localStorage.getItem("access_token");
        const refreshToken = localStorage.getItem("refresh_token");
        const userStr = localStorage.getItem("user");

        console.log("Storage state:", {
          hasAccessToken: !!accessToken,
          hasRefreshToken: !!refreshToken,
          hasUserData: !!userStr,
        });

        if (accessToken && refreshToken && userStr) {
          try {
            const userData = JSON.parse(userStr);
            console.log("Parsed user data:", userData);

            this.accessToken = accessToken;
            this.refreshToken = refreshToken;
            this.user = userData;
            this.isAuthenticated = true;

            console.log("Authentication restored from storage");
          } catch (e) {
            console.error("Error restoring auth from storage:", e);
            this.logout();
          }
        } else {
          console.log("Incomplete auth data in storage, not restoring session");
        }
      }
    },
  },
});
