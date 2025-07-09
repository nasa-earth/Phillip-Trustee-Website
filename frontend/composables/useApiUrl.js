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
    users: {
      list: `${apiBase}/api/users`,
      get: (id) => `${apiBase}/api/users/${id}`,
      create: `${apiBase}/api/users`,
      update: (id) => `${apiBase}/api/users/${id}`,
      delete: (id) => `${apiBase}/api/users/${id}`,
    },
    partners: {
      list: `${apiBase}/api/partners`,
      get: (id) => `${apiBase}/api/partners/${id}`,
      create: `${apiBase}/api/partners`,
      update: (id) => `${apiBase}/api/partners/${id}`,
      delete: (id) => `${apiBase}/api/partners/${id}`,
    },
    faqs: {
      list: `${apiBase}/api/faqs`,
      get: (id) => `${apiBase}/api/faqs/${id}`,
      create: `${apiBase}/api/faqs`,
      update: (id) => `${apiBase}/api/faqs/${id}`,
      delete: (id) => `${apiBase}/api/faqs/${id}`,
      reorder: `${apiBase}/api/faqs/reorder`,
    },
    // etc.
  };
};
