import { ref } from "vue";
import { defineStore } from "pinia";

export type Role = "ADMIN" | "EDITOR";

interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
}

export const useAuthStore = defineStore("auth", () => {
  const user = ref<User | null>(null);
  const accessToken = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  function setUser(newUser: User | null) {
    user.value = newUser;
  }
  function setAccessToken(token: string | null) {
    accessToken.value = token;
    if (process.client) {
      if (token) {
        localStorage.setItem("access_token", token);
      } else {
        localStorage.removeItem("access_token");
      }
    }
  }

  function logout() {
    setUser(null);
    setAccessToken(null);
  }

  function hasRole(role: Role | Role[]): boolean {
    if (!user.value) return false;

    if (Array.isArray(role)) {
      return role.includes(user.value.role);
    }

    return user.value.role === role;
  }

  function setLoading(loading: boolean) {
    isLoading.value = loading;
  }

  function setError(errorMessage: string | null) {
    error.value = errorMessage;
  }

  function initializeFromStorage() {
    if (process.client) {
      const storedToken = localStorage.getItem("access_token");
      if (storedToken) {
        setAccessToken(storedToken);
      }
    }
  }
  if (process.client) {
    // Initialize from localStorage only on client side
    initializeFromStorage();
  }

  return {
    user,
    accessToken,
    isLoading,
    error,
    setUser,
    setAccessToken,
    setLoading,
    setError,
    logout,
    hasRole,
    initializeFromStorage,
  };
});

// Create a composable for easier access to auth functionality
export function useAuth() {
  return useAuthStore();
}
