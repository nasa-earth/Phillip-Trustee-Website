import { useAuth } from "./useAuth";

interface ApiOptions extends RequestInit {
  requiresAuth?: boolean;
}

interface ApiError {
  message: string;
  statusCode: number;
}

export function useApi() {
  const config = useRuntimeConfig();
  const auth = useAuth();
  const API_BASE_URL = config.public.apiBaseUrl;

  const makeRequest = async (endpoint: string, options: ApiOptions = {}) => {
    try {
      const url = `${API_BASE_URL}${endpoint}`;
      const requestHeaders = new Headers({
        "Content-Type": "application/json",
        Accept: "application/json",
      });

      if (options.headers) {
        Object.entries(options.headers).forEach(([key, value]) => {
          requestHeaders.append(key, value);
        });
      }

      // Add authorization header if required
      if (options.requiresAuth !== false && auth.accessToken) {
        requestHeaders.append("Authorization", `Bearer ${auth.accessToken}`);
      }

      const response = await fetch(url, {
        ...options,
        headers: requestHeaders,
        mode: "cors",
        credentials: "include",
      });

      const data = await response.json();

      if (!response.ok) {
        const error: ApiError = {
          message:
            typeof data.message === "string"
              ? data.message
              : Array.isArray(data.message)
              ? data.message[0]
              : "An error occurred",
          statusCode: response.status,
        };

        // Handle 401 unauthorized errors
        if (response.status === 401) {
          auth.logout();
          await navigateTo("/auth/login");
        }

        throw error;
      }

      return data;
    } catch (error) {
      console.error("API request failed:", error);
      throw error;
    }
  };

  return {
    makeRequest,
    post: <T = any>(endpoint: string, body: any, options?: ApiOptions) =>
      makeRequest(endpoint, {
        ...options,
        method: "POST",
        body: JSON.stringify(body),
      }) as Promise<T>,
    get: <T = any>(endpoint: string, options?: ApiOptions) =>
      makeRequest(endpoint, { ...options }) as Promise<T>,
    put: <T = any>(endpoint: string, body: any, options?: ApiOptions) =>
      makeRequest(endpoint, {
        ...options,
        method: "PUT",
        body: JSON.stringify(body),
      }) as Promise<T>,
    delete: <T = any>(endpoint: string, options?: ApiOptions) =>
      makeRequest(endpoint, {
        ...options,
        method: "DELETE",
      }) as Promise<T>,
  };
}
