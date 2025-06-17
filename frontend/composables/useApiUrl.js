// composables/useApiUrl.js
export const useApiUrl = () => {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;

  // Log the API base URL to help with debugging
  console.log("API Base URL:", apiBase);
  return {
    auth: {
      login: `${apiBase}/api/auth/login`,
      debugLogin: `${apiBase}/api/auth/debug-login`, // Add debug endpoint
      refresh: `${apiBase}/api/auth/refresh`,
      register: `${apiBase}/api/auth/register`,
    },
    // Add other API endpoints as needed
    posts: {
      list: `${apiBase}/api/posts`,
      get: (id) => `${apiBase}/api/posts/${id}`,
    },
    categories: {
      list: `${apiBase}/api/categories`,
    },
    events: {
      list: `${apiBase}/api/events`,
    },
    // etc.
  };
};
